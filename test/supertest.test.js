import chai from "chai";
import supertest from "supertest";

//chai
const expect = chai.expect;
//supertest
const requester = supertest("http://localhost:3000");

describe("testing API", () => {
  describe("test ENDPOINT users", () => {
    it("Debería obtener la lista de usuarios de la API", (done) => {
      requester.get("/api/users").end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it("Debería crear un nuevo usuario", (done) => {
      const newUser = {
        "firstName": "John",
        "lastName": "Doe",
        "email": "johndoe@gmail.com",
        "password": "secretpassword"
      };
      requester
        .post("/api/users")
        .send(newUser)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
  });

  describe("test ENDPOINT products", () => {
    it("Debería obtener la lista de productos", (done) => {
      requester.get("/api/products").end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        done();
      });
    });
  });

  it("Debería obtener un producto por su ID", (done) => {
    const productId = "651a2e2311aaf2b9830807b8";
    requester.get(`/api/products/${productId}`).end((err, res) => {
      if(err){
        return done(err);
      }
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
      done();
    });
  });

  it("Debería crear un nuevo producto", (done) => {
    const newProduct = {
      title: "Bolso deportivo",
      description: " Bolso para mujer ",
      price: "35000",
      thumbnail: "https://i.ibb.co/WVDsG1g/bolso-Mujer.jpg",
      code: "1359",
      stock: 7,
      category: "Accesorios de mujer",
    };
    requester
      .post("/api/products/novel")
      .send(newProduct)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  describe("test ENDPOINT carts", () => {
    it("Debería obtener la lista de carritos", (done) => {
      requester.get("/api/carts").end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it("Debería crear un nuevo carrito", (done) => {
      const newCart = {};
      requester.post("/api/carts").send(newCart).end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });

  describe("test ENDPOINT sessions", () => {
    it("Debería autenticar a través de GitHub", (done) => {
      requester.get("/api/sessions/github").end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it("Debería manejar el callback de autenticación de GitHub", (done) => {
      requester.get("/api/sessions/githubcallback").end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it("Debería obtener la sesión actual", (done) => {
      requester.get("/api/sessions/current").end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });

  it("Debería obtener la lista de sesiones", (done) => {
    requester.get("/api/sessions").end((err, res) => {
      expect(res.status).to.equal(200);
      done();
    });
  });

  it("Debería crear una nueva sesión", (done) => {
    const newSession = {
      userId: "5c4736891a2f5b0d355764fe",
      token: "<KEY>",
      providerId: "google-oauth2|10926203741178085812"
    };
    requester.post("/api/sessions").send(newSession).end((err, res) => {
      expect(res.status).to.equal(200);
      done();
    });
  });
});



  