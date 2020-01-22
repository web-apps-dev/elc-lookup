const request = require("supertest");
const app = require("../app");

afterAll(async () => {
  app.close();
});

describe("post queries", () => {
  it("search for sleek should return single item with id of 008", function(done) {
    request(app)
      .post("/sleek")
      .set("Accept", "application/json")
      .expect(res => {
        const resAsJson = JSON.parse(res.text);
        if (resAsJson.length != 1)
          throw new Error(
            `Incorrect number of items returned : ${resAsJson.length}`
          );
        if (resAsJson[0]._id !== "008")
          throw new Error(`Wrong item id returned : ${resAsJson[0]._id}`);
      })
      .expect(200, done);
  });
  it("search for damage should return 7 items", function(done) {
    request(app)
      .post("/damage")
      .set("Accept", "application/json")
      .expect(res => {
        const resAsJson = JSON.parse(res.text);
        if (resAsJson.length != 7)
          throw new Error(
            `Incorrect number of items returned : ${resAsJson.length}`
          );
      })
      .expect(200, done);
  });
});

describe("get / => All Products Data", () => {
  it("should return all 20 items", function(done) {
    request(app)
      .get("/")
      .set("Accept", "application/json")
      //.expect("Content-Type", /json/)
      //.expect(JSON.stringify({ body: "content" }))
      .expect(function(res) {
        if (JSON.parse(res.text).length != 20)
          throw new Error("Incorrect number of items returned.");
      })
      .expect(200, done);
  });
});

// a helper function to make a POST request.
function post(url, body) {
  const httpRequest = request(app).post(url);
  httpRequest.send(body);
  httpRequest.set("Accept", "application/json");
  httpRequest.set("Origin", "http://localhost:3035");
  return httpRequest;
}
