const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";
const baseMacro = "http://localhost:3000/macro";

describe("routes : static", () => {

  describe("GET /", () => {

    it("should return status code 200", (done) => {

      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);

        done();
      });
    });
  });
  describe("GET /macro", () => {

    it("should return status code 200", (done) => {

      request.get(baseMacro, (err, res, body) => {
        expect(res.statusCode).toBe(200);

        done();
      });
    });

    it("should return string 'polo' ", (done) => {
      request.get(baseMacro, (err, res, body) => {
        expect(body).toContain('polo');

        done();
      });
    });
  });
});
