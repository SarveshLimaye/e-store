require('dotenv').config({path:'..'});
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../index");
const mongoose = require('mongoose');
const connectDB  = require("../db/connect");
const Product = require('../models/product')


describe("api/products", () => {
    before(async () => {
      // before each test delete all users data
      require('dotenv').config();
      await connectDB(process.env.ENV1)
      await Product.deleteMany({});
    });
      // after each test delete all users data
    after(async () => {
        mongoose.disconnect();
      });

      // test case for registered user
      describe("GET /", () => {
        it("should return all products", async () => {
          const products = [
            {"name":"Mens T-Shirt",
            "price":1999,
            "rating":4.3,
            "freedelivery":true,
            "company":"Adidas",
            "image":"https://the-collective.imgix.net/img/app/product/6/687123-7293639.jpg?w=1600&auto=format"},
            {
            "name":"Mens Shirt",
            "price":4999,
            "rating":3.9,
            "freedelivery":true,
            "company":"H&M"
            }
          ];
          await Product.insertMany(products);
          const res = await request(app).get("/api/v1/products/");
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(2);
        });
      });

      // test for get user by id
      describe("GET/:id", () => {
        it("should return a product if valid id is passed", async () => {
          const product = new Product({
            
                "name":"Mens Sports T-Shirt",
                "price":999,
                "rating":4.3,
                "freedelivery":true,
                "company":"Nike",
                "image":"https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/jnighv6j24navz8l7xa5/sportswear-t-shirt-ff1fRb.png"
            
          })
          await product.save();
          const res = await request(app).get("/api/v1/products/" + product._id);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property("name", product.name);
        });
      });
      
})