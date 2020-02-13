const request = require("supertest");
const app = require("./app");

const expectedListOfEndpoints = {
  "0": "GET /",
  "1": "GET /companies",
  "2": "GET /companies/:id",
  "3": "POST /companies/:id/reviews",
  "4": "GET /user"
};

describe("app.js", () => {
  it("GET / should return 200 and the list of endpoints", async () => {
    const { body: response } = await request(app)
      .get("/")
      .expect(200);
    expect(response).toEqual(expectedListOfEndpoints);
  });
});
