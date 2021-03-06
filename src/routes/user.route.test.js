const request = require("supertest");
const app = require("../../src/app");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../../src/models/user.model");
const jwt = require("jsonwebtoken");
jest.mock("jsonwebtoken");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

describe("user", () => {
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
    const userData = [
      {
        id: "754aece9-64bf-42ab-b91c-bb65e2db3a37",
        firstName: "Humberto",
        lastName: "Bruen",
        email: "Timothy_VonRueden62@hotmail.com"
      }
    ];
    await User.create(userData);
  });

  afterEach(async () => {
    jest.resetAllMocks();
    await User.deleteMany();
  });

  it("GET / should return 200 and return user", async () => {
    const expectedUserData = [
      {
        id: "754aece9-64bf-42ab-b91c-bb65e2db3a37",
        firstName: "Humberto",
        lastName: "Bruen",
        email: "Timothy_VonRueden62@hotmail.com"
      }
    ];
    const { body: actualUser } = await request(app)
      .get("/")
      .expect(200);
    expect(actualUser).toMatchObject(expectedUserData[0]);
  });

  it("POST / should return 201 and return the new user", async () => {
    const newUser = {
      id: "854aece9-64bf-42ab-b91c-bb65e2db3a37",
      firstName: "Kate",
      lastName: "Green",
      email: "kategreen@hotmail.com"
    };
    const { body: user } = await (await request(app).post("/users"))
      .send(newUser)
      .expect(201);
    expect(user.email).toBe(newUser.email);
  });

  it(" POST /Login should respond with 200 and return the you are logged in message ", async () => {
    const correctUser = {
      userName: "Humberto Bruen",
      userId: "754aece9-64bf-42ab-b91c-bb65e2db3a37"
    };
  });
});
