const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = chai.should();
const config = require("../database/config.json")
//var connection = new Connection(config); 

const baseURL = "http://localhost:7071/api"

//const POST = require("../shared/db")

// We're testing if the post request is working on the create user functionality
// Describing method and route
describe("/POST", () => {
    // What do we expect? 
    it("it should post a user from the database", (done) => {
        let user = {
            firstName: "Melina", lastName:"Wayne", email: "Mel@gmail.com", password: "1234", age: 30, city: "Frederiksberg", gender: "Female", preferred_gender: "Male"
        }
        // Chai request is chained
        chai 
            .request(baseURL)
                //Route is added 
                .post("/createUser")
                    .send(user)
                    //Handling response 
                    .end((err, res) => {
                        //Validating http status code 
                        console.log(res.body)
                        should.not.exist(err)
                        console.log(res.status)
                        res.status.should.equal(200);
                        done();
        })
    })
})

// Checking if a certain amount of attributes are correct
describe("Checking a users attributes", () => {
    // What do we expect? 
    it("it should throw an error, because firstname is null", (done) => {
        let user = {
            firstName: null, lastName:"Carlsen", email: "hejjjj@gmail.com", password: "1234", age: 21, city: "Hørsholm", gender: "male", preferred_gender: "female"
        }
        // Chai request is chained
        chai 
            .request(baseURL)
                //Route is added 
                .post("/createUser")
                    .send(user)
                    //Handling response 
                    .end((err, res) => {
                        //Validating http status code 
                        //should.exist(err)
                        console.log(res.body)
                        console.log(res.status)
                        res.status.should.equal(400);
                        done();
        })
    })
    it("It should throw an error, because email doesnt have an @", (done) => {
        let user = {
            firstName: "Simon", lastName:"Carlsen", email: "thisIsNotAnEmail", password: "1234", age: 21, city: "Hørsholm", gender: "male", preferred_gender: "female"
        }
        // Chai request is chained
        chai 
            .request(baseURL)
                //Route is added 
                .post("/createUser")
                    .send(user)
                    //Handling response 
                    .end((err, res) => {
                        //Validating http status code 
                        //should.exist(err)
                        console.log(res.body)
                        console.log(res.status)
                        res.status.should.equal(400);
                        done();
        })
    })
    it("it should throw an error, because age is not an integer", (done) => {
        let user = {
            firstName: "Simon", lastName:"Carlsen", email: "heiiij@gmail.com", password: "1234", age: "enogtyve", city: "Hørsholm", gender: "male", preferred_gender: "female"
        }
        // Chai request is chained
        chai 
            .request(baseURL)
                //Route is added 
                .post("/createUser")
                    .send(user)
                    //Handling response 
                    .end((err, res) => {
                        //Validating http status code 
                        //should.exist(err)
                        console.log(res.body)
                        console.log(res.status)
                        res.status.should.equal(400);
                        done();
        })
    })
})

