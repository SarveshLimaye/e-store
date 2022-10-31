require('dotenv').config({path:'..'});
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../index");
const mongoose = require('mongoose');
const connectDB  = require("../db/connect");
const User = require('../models/user')


describe("api/users", () => {
    before(async () => {
      // before each test delete all users data
      require('dotenv').config();
      await connectDB(process.env.ENV1)
      await User.deleteMany({});
    });
      // after each test delete all users data
    after(async () => {
        mongoose.disconnect();
      });

      // test case for registered user
      describe("GET /", () => {
        it("should return all users", async () => {
          const users = [
            { name: "george", email: "geo@gmail.com" ,isSeller: false, image: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200', cart: []},
            { name: "maria", email: "maria@gmail.com" , isSeller: false, image: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200', cart: []}
          ];
          await User.insertMany(users);
          const res = await request(app).get("/api/users");
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(2);
        });
      });

      // test for get user by id
      describe("GET/:id", () => {
        it("should return a user if valid id is passed", async () => {
          const user = new User({
            name: "florian",
            email: "florian@gmail.com",
            isSeller: false, 
            image: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200', 
            cart: [], 
          });
          await user.save();
          const res = await request(app).get("/api/users/" + user._id);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property("name", user.name);
        });
      });
      
      //test for post user
      describe("POST /", () => {
        it("should add user when the all request body is valid", async () => {
          const res = await request(app)
            .post("/api/users/addUser")
            .send({
              name: "esteve",
              email: "esteve@gmail.com",
              isSeller: false,
              cart:['62a301e7d1c8532304e730be'],
            });
          const data = res.body;
          expect(res.status).to.equal(201);
          expect(data).to.have.property("_id");
          expect(data).to.have.property("name", "esteve");
          expect(data).to.have.property("email", "esteve@gmail.com");
          expect(data).to.have.property("isSeller", false);
          const user = await User.findOne({ email: 'esteve@gmail.com' });
          expect(user.name).to.equal('esteve');
          expect(user.email).to.equal('esteve@gmail.com');
        });
      });


})
