process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const db = require("../db");

let testBook;

beforeEach(async function () {
  await db.query("DELETE FROM books");
  const result = await db.query(
    `INSERT INTO books (
            isbn,
            amazon_url,
            author,
            language,
            pages,
            publisher,
            title,
            year) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
         RETURNING isbn,
                   amazon_url,
                   author,
                   language,
                   pages,
                   publisher,
                   title,
                   year`,
    [
      "0691161518",
      "http://a.co/eobPtX2",
      "Matthew Lane",
      "english",
      241,
      "Princeton University Press",
      "Power-Up",
      2017,
    ],
  );

  testBook = result.rows[0];
});

afterAll(async function () {
  await db.end();
});

describe("GET /books", function () {
  test("Gets a list of all the books in the db.", async function () {
    const res = await request(app).get("/books");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ books: [testBook] });
  });
});

describe("GET /books/:id", function () {
  test("Gets one book by isbn number", async function () {
    const res = await request(app).get(`/books/${testBook.isbn}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ book: testBook });
  });

  test("Gets one book by isbn number and there is no isbn with the provided number", async function () {
    const res = await request(app).get("/books/000");
    expect(res.statusCode).toBe(404);
  });
});

describe("POST /books", function () {
  const newBook = {
    isbn: "06911615998",
    amazon_url: "http://a.co/eobPtX2",
    author: "Matthew Lane",
    language: "english",
    pages: 241,
    publisher: "Princeton University Press",
    title: "Power-Up",
    year: 2017,
  };
  test("Adds a new book", async function () {
    const res = await request(app).post("/books").send(newBook);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      book: newBook,
    });
  });
  const newBookMissingIsbn = {
    amazon_url: "http://a.co/eobPtX2",
    author: "Matthew Lane",
    language: "english",
    pages: 241,
    publisher: "Princeton University Press",
    title: "Power-Up",
    year: 2017,
  };
  test("Adds a new book with missing field", async function () {
    const res = await request(app).post("/books").send(newBookMissingIsbn);
    expect(res.statusCode).toBe(400);
  });
});

describe("PUT /books/:isbn", function () {
  const updatedBook = {
    isbn: "0691161518",
    amazon_url: "http://a.co/eobPtX2",
    author: "Matthew Lane",
    language: "english",
    pages: 500,
    publisher: "Princeton University Press",
    title: "Power-Up",
    year: 2017,
  };
  test("Updates a book", async function () {
    const res = await request(app)
      .put(`/books/${testBook.isbn}`)
      .send(updatedBook);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ book: updatedBook });
  });

  test("Updates a book with no matching isbn", async function () {
    const res = await request(app).put("/books/00000").send(updatedBook);
    expect(res.statusCode).toBe(404);
  });

  const updatedBookMissingPages = {
    isbn: "0691161518",
    amazon_url: "http://a.co/eobPtX2",
    author: "Matthew Lane",
    language: "english",
    publisher: "Princeton University Press",
    title: "Power-Up",
    year: 2017,
  };
  test("Updates a book with missing field", async function () {
    const res = await request(app)
      .put(`/books/${testBook.isbn}`)
      .send(updatedBookMissingPages);
    expect(res.statusCode).toBe(400);
  });
});

describe("DELETE /books/:isbn", function () {
  test("Deletes a book", async function () {
    const res = await request(app).delete(`/books/${testBook.isbn}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Book deleted" });
  });

  test("Deletes a book with bad isbn", async function () {
    const res = await request(app).delete("/books/0000");
    expect(res.statusCode).toBe(404);
  });
});
