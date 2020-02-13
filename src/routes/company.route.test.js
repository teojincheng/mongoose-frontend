const request = require("supertest");
const app = require("../../src/app");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Company = require("../../src/models/company.model");
const jwt = require("jsonwebtoken");
jest.mock("jsonwebtoken");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

describe("company", () => {
  let mongoServer;
  beforeAll(async () => {
    try {
      mongoServer = new MongoMemoryServer();
      const mongoUri = await mongoServer.getConnectionString();
      await mongoose.connect(mongoUri);
    } catch (err) {
      console.error(err);
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    const companyData = [
      {
        id: "e5cc2c0a-93b5-4014-8910-6ed9f3056456",
        companyName: "Brakus, Aufderhar and Gutkowski",
        companySuffix: "and Sons",
        numberOfEmployees: 60497,
        description:
          "Voluptas reiciendis quasi expedita ex qui sit. Qui enim facilis adipisci qui.",
        reviews: [
          {
            id: "7da4d967-715b-4dc1-a74b-82a7992704f3",
            userId: "f6e016e6-e254-4375-bf82-797e6c00e3eb",
            userName: "Brennan Fisher",
            rating: 0,
            title: "eligendi adipisci",
            review:
              "Consequatur esse beatae voluptate voluptatibus expedita aperiam perspiciatis cumque voluptatem. Cum quasi dolor ut dignissimos illum magni eos. Et aspernatur illum commodi."
          },
          {
            id: "fa07ef47-5849-4642-8af0-640e4887b1e6",
            userId: "13d0782f-2793-4c83-8279-93c9a03b3ac3",
            userName: "Annalise Nicolas",
            rating: 4,
            title: "iusto consequatur",
            review:
              "Facere dicta delectus impedit sunt sed officia omnis. Officiis vel optio corrupti iure. Atque iusto nemo. Ut voluptas quaerat omnis quis impedit maiores nihil ipsam. Quod ea sed voluptates. Dolorem officia esse enim."
          }
        ]
      }
    ];
    await Company.create(companyData);
  });

  afterEach(async () => {
    jest.resetAllMocks();
    await Company.deleteMany();
  });

  it("GET /companies should return 200 and return a list of companies without reviews", async () => {
    const expectedCompanyData = [
      {
        id: "e5cc2c0a-93b5-4014-8910-6ed9f3056456",
        companyName: "Brakus, Aufderhar and Gutkowski",
        companySuffix: "and Sons",
        numberOfEmployees: 60497,
        description:
          "Voluptas reiciendis quasi expedita ex qui sit. Qui enim facilis adipisci qui."
      }
    ];

    const { body: actualCompany } = await request(app)
      .get("/companies")
      .expect(200);
    expect(actualCompany).toEqual(expectedCompanyData);
  });

  it("GET /companies/:id should return 200 and return one company info with review", async () => {
    const expectedCompanyData = [
      {
        id: "e5cc2c0a-93b5-4014-8910-6ed9f3056456",
        companyName: "Brakus, Aufderhar and Gutkowski",
        companySuffix: "and Sons",
        numberOfEmployees: 60497,
        description:
          "Voluptas reiciendis quasi expedita ex qui sit. Qui enim facilis adipisci qui.",
        reviews: [
          {
            id: "7da4d967-715b-4dc1-a74b-82a7992704f3",
            userId: "f6e016e6-e254-4375-bf82-797e6c00e3eb",
            userName: "Brennan Fisher",
            rating: 0,
            title: "eligendi adipisci",
            review:
              "Consequatur esse beatae voluptate voluptatibus expedita aperiam perspiciatis cumque voluptatem. Cum quasi dolor ut dignissimos illum magni eos. Et aspernatur illum commodi."
          },
          {
            id: "fa07ef47-5849-4642-8af0-640e4887b1e6",
            userId: "13d0782f-2793-4c83-8279-93c9a03b3ac3",
            userName: "Annalise Nicolas",
            rating: 4,
            title: "iusto consequatur",
            review:
              "Facere dicta delectus impedit sunt sed officia omnis. Officiis vel optio corrupti iure. Atque iusto nemo. Ut voluptas quaerat omnis quis impedit maiores nihil ipsam. Quod ea sed voluptates. Dolorem officia esse enim."
          }
        ]
      }
    ];

    const { body: actualCompany } = await request(app)
      .get(`/companies/${expectedCompanyData[0].id}`)
      .expect(200);
    expect(actualCompany).toEqual(expectedCompanyData);
  });

  /*
  it("POST /companies/:id/reviews should return 201 and respond with the review", async () => {
    const expectedReview = {
      rating: 4,
      title: "eligendi adipisci",
      review:
        "Et voluptatem voluptas quisquam quos officia assumenda. Mollitia delectus vitae quia molestias nulla ut hic praesentium. Sed et assumenda et iusto velit laborum sunt non."
    };
    jwt.verify.mockReturnValueOnce({});
    const { body: response } = await request(app)
      .post("/compaines/1/reviews")
      .expect(201)
      .send(expectedReview);

    expect(response).toEqual(expectedReview);
  });
  */
});
