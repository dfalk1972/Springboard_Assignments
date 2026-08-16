const request = require("supertest");
const { expect } = require("chai");
const app = require("../app");

describe("Auth Routes", function () {
  describe("POST /auth/register", function () {
    it("should register a new user and return 201", async function () {
      const res = await request(app)
        .post("/auth/register")
        .send({ username: "testuser1", password: "password123" });

      expect(res.statusCode).to.equal(201);
      expect(res.body).to.have.property("_id");
      expect(res.body.username).to.equal("testuser1");
      expect(res.body).to.not.have.property("password");
    });

    it("user tries to register with no password, should return 400", async function () {
      const res = await request(app)
        .post("/auth/register")
        .send({ username: "testuser1", password: "" });

      expect(res.statusCode).to.equal(400);
    });

    it("user tries to register with no usernam, should return 400", async function () {
      const res = await request(app)
        .post("/auth/register")
        .send({ username: "", password: "password123" });

      expect(res.statusCode).to.equal(400);
    });

    it("user tries to register with duplicate username, should return 409", async function () {
      const res = await request(app)
        .post("/auth/register")
        .send({ username: "testuser1", password: "password123" });

      expect(res.statusCode).to.equal(409);
    });
  });

  describe("POST /auth/login", function () {
    it("user tries to login, should return 200", async function () {
      await request(app)
        .post("/auth/register")
        .send({ username: "loginuser", password: "password123" });
      const res = await request(app)
        .post("/auth/login")
        .send({ username: "loginuser", password: "password123" });

      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property("token");
    });

    it("user tries to login with wrong password, should return 401", async function () {
      await request(app)
        .post("/auth/register")
        .send({ username: "loginuser1", password: "password123" });
      const res = await request(app)
        .post("/auth/login")
        .send({ username: "loginuser1", password: "password123444" });

      expect(res.statusCode).to.equal(401);
    });

    it("user tries to login with wrong username, should return 401", async function () {
      await request(app)
        .post("/auth/register")
        .send({ username: "loginuser2", password: "password1234" });
      const res = await request(app)
        .post("/auth/login")
        .send({ username: "loginuser**", password: "password1234" });

      expect(res.statusCode).to.equal(401);
    });
  });
});
