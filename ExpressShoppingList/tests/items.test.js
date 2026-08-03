const request = require("supertest");
const app = require("../app");
const items = require("../fakeDb");

beforeEach(function () {
  items.push({ name: "popsicle", price: 1.45 });
});

afterEach(function () {
  items.length = 0;               
});

describe("GET /items", function () {
  test("Gets a list of items", async function () {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ name: "popsicle", price: 1.45 }]);
  });

});

describe("POST /items", function(){
    test("Adds a new item to the grocery list", async function(){
        const res = await request(app).post("/items").send({name: "cheerios", price:9.99});
        expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({added: { name: "cheerios", price: 9.99 }});
    })
     test("Add a new item and name is not present", async function() {
        const res = await request(app).post("/items").send({ price:9.99});
        expect (res.statusCode).toBe(400);
        expect (res.body).toEqual({error: "Name is required"})
    })
  });
  
describe("GET /items/:name", function(){
    test("Gets an item by name", async function() {
        const res = await request(app).get("/items/popsicle");
        expect (res.statusCode).toBe(200);
        expect (res.body).toEqual({name: "popsicle", price: 1.45})
    });
    test("Get item by name and item is non existent", async function() {
        const res = await request(app).get("/items/notreal");
        expect (res.statusCode).toBe(404);
        expect (res.body).toEqual({error: "Item not found"})
    })
 }) 



describe ("PATCH /items/:name", function(){
    test("Updates an item", async function () {
    const res = await request(app).patch("/items/popsicle").send({ name: "popsicle", price:9.99});
    expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({updated: {name: "popsicle", price: 9.99}})
    });
   

    test ("Updates only an item, name survives", async function(){
        const res = await request(app).patch("/items/popsicle").send({ price:9.99});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({updated: {name: "popsicle", price: 9.99}})
    });


    test("Update an item and item is non existent", async function() {
        const res = await request(app).patch("/items/notreal").send({name: "popsicle", price:9.99});
        expect (res.statusCode).toBe(404);
        expect (res.body).toEqual({error: "Item not found"})
    })
 })


 describe("DELETE /items/:name", function(){
    test("Deletes an item by name", async function(){
        const res = await request(app).delete("/items/popsicle");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: "Deleted"})
    });
    test("Deletes an item and item is non existent", async function() {
        const res = await request(app).delete("/items/notreal")
        expect (res.statusCode).toBe(404);
        expect (res.body).toEqual({error: "Item not found"})
    })
 })
