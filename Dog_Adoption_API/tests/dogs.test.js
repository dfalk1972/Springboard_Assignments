const request = require("supertest");
const { expect } = require("chai");
const { ObjectId } = require("mongodb");
const app = require("../app");

async function registerAndLogin(username, password) {
  const registerRes = await request(app)
    .post("/auth/register")
    .send({ username, password });

  const loginRes = await request(app)
    .post("/auth/login")
    .send({ username, password });

  return { userId: registerRes.body._id, token: loginRes.body.token };
}

async function createDog(token, name, description) {
  const res = await request(app)
    .post("/dogs")
    .set("Authorization", `Bearer ${token}`)
    .send({ name, description });

  return res;
}

async function adoptDog(token, dogId, thankYouMessage) {
  return await request(app)
    .post(`/dogs/${dogId}/adopt`)
    .set("Authorization", `Bearer ${token}`)
    .send({ thankYouMessage });
}

async function removeDog(token, dogId) {
  return await request(app)
    .delete(`/dogs/${dogId}`)
    .set("Authorization", `Bearer ${token}`);
}

async function listMine(token, query = {}) {
  return await request(app)
    .get("/dogs/mine")
    .set("Authorization", `Bearer ${token}`)
    .query(query);
}

async function listAdopted(token, query = {}) {
  return await request(app)
    .get("/dogs/adopted")
    .set("Authorization", `Bearer ${token}`)
    .query(query);
}

describe("Dog Routes", function () {
  describe("POST /dogs", function () {
    it("should create a dog and return 201", async function () {
      const owner = await registerAndLogin("dogowner1", "password123");
      const res = await createDog(owner.token, "Rex", "Good Boy!");

      expect(res.statusCode).to.equal(201);
      expect(res.body.dog).to.have.property("_id");
      expect(res.body.dog.name).to.equal("Rex");
      expect(res.body.dog.ownerId).to.equal(owner.userId);
    });

    it("register with missing name, should return 400", async function () {
      const owner = await registerAndLogin("dogowner2", "password123");
      const res = await createDog(owner.token, "", "Good Boy!");

      expect(res.statusCode).to.equal(400);
    });

    it("register with missing description, should return 400", async function () {
      const owner = await registerAndLogin("dogowner3", "password123");
      const res = await createDog(owner.token, "Sadie", "");

      expect(res.statusCode).to.equal(400);
    });
  });

  describe("POST /dogs/:id/adopt", function () {
    it("should adopt a dog and return 200", async function () {
      const owner = await registerAndLogin("dogowner4", "password123");
      const dog = await createDog(owner.token, "Sadie", "Sweet girl!");
      const adopter = await registerAndLogin("adopter4", "password123");
      const res = await adoptDog(
        adopter.token,
        dog.body.dog._id,
        "Thanks for letting me adopt this sweet girl.",
      );

      expect(res.statusCode).to.equal(200);
      expect(res.body.dog.status).to.equal("adopted");
      expect(res.body.dog.adopterId).to.equal(adopter.userId);
    });

    it("should try to adopt a dog with a missing thank you message and return 400", async function () {
      const owner = await registerAndLogin("dogowner5", "password123");
      const dog = await createDog(owner.token, "Sadie2", "Sweet girl!");
      const adopter = await registerAndLogin("adopter5", "password123");
      const res = await adoptDog(adopter.token, dog.body.dog._id, "");

      expect(res.statusCode).to.equal(400);
    });

    it("should try to adopt a dog with a missing dog id and return 404", async function () {
      const fakeId = new ObjectId().toString();
      const owner = await registerAndLogin("dogowner6", "password123");
      const dog = await createDog(owner.token, "Sadie3", "Sweet girl!");
      const adopter = await registerAndLogin("adopter6", "password123");
      const res = await adoptDog(adopter.token, fakeId, "Thanks");

      expect(res.statusCode).to.equal(404);
    });

    it("should try to adopt a dog that has already been adopted and return 409", async function () {
      const owner = await registerAndLogin("dogowner7", "password123");
      const dog = await createDog(owner.token, "Sadie2", "Sweet girl!");
      const adopter = await registerAndLogin("adopter7", "password123");
      await adoptDog(adopter.token, dog.body.dog._id, "Thanks");
      const res = await adoptDog(adopter.token, dog.body.dog._id, "Thanks");

      expect(res.statusCode).to.equal(409);
    });
    it("should try to adopt your own dog and return 403", async function () {
      const owner = await registerAndLogin("dogowner8", "password123");
      const dog = await createDog(owner.token, "Sadie2", "Sweet girl!");
      const res = await adoptDog(owner.token, dog.body.dog._id, "Thanks");

      expect(res.statusCode).to.equal(403);
    });
  });
  describe("DELETE /dogs/:id", function () {
    it("should delete a dog and return 204", async function () {
      const owner = await registerAndLogin("dogowner9", "password123");
      const dog = await createDog(owner.token, "Sadie9", "Sweet girl!");
      const res = await removeDog(owner.token, dog.body.dog._id);

      expect(res.statusCode).to.equal(204);
    });

    it("should try to delete a dog with a not valid id and return 404", async function () {
      const fakeId = new ObjectId().toString();
      const owner = await registerAndLogin("dogowner10", "password123");
      const dog = await createDog(owner.token, "Sadie10", "Sweet girl!");
      const res = await removeDog(owner.token, fakeId);

      expect(res.statusCode).to.equal(404);
    });

    it("should try to delete a dog that you did not register and return 403", async function () {
      const owner = await registerAndLogin("dogowner11", "password123");
      const otherUser = await registerAndLogin("dogowner12", "password123");
      const dog = await createDog(owner.token, "Sadie11", "Sweet girl!");
      const res = await removeDog(otherUser.token, dog.body.dog._id);

      expect(res.statusCode).to.equal(403);
    });

    it("should try to delete a dog that has already been adopted and return 400", async function () {
      const owner = await registerAndLogin("dogowner13", "password123");
      const dog = await createDog(owner.token, "Sadie13", "Sweet girl!");
      const adopter = await registerAndLogin("adopter13", "password123");
      await adoptDog(adopter.token, dog.body.dog._id, "Thanks");
      const res = await removeDog(owner.token, dog.body.dog._id);

      expect(res.statusCode).to.equal(400);
    });
  });
  describe("GET /mine", function () {
    it("should get a list of dogs I have listed and return them in an array", async function () {
      const owner = await registerAndLogin("dogowner14", "password123");
      await createDog(owner.token, "Sadie14", "Sweet girl!");
      await createDog(owner.token, "Sadie15", "Sweet girl!");
      const res = await listMine(owner.token);

      expect(res.statusCode).to.equal(200);
      expect(res.body.dogs).to.be.an("array");
      expect(res.body.dogs).to.have.lengthOf(2);
    });
  });

  describe("GET /adopted", function () {
    it("should get a list of dogs that have been adopted and return them in an array", async function () {
      const owner = await registerAndLogin("dogowner15", "password123");
      const dog = await createDog(owner.token, "Sadie16", "Sweet girl!");
      const adopter = await registerAndLogin("dogowner16", "password123");
      await adoptDog(
        adopter.token,
        dog.body.dog._id,
        "Thanks for letting me adopt this sweet girl.",
      );
      const res = await listAdopted(adopter.token);

      expect(res.statusCode).to.equal(200);
      expect(res.body.adopted).to.be.an("array");
      expect(res.body.adopted).to.have.lengthOf(1);
    });
  });
});
