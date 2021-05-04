const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = chai.should();
const config = require("../database/config.json")
//var connection = new Connection(config); 

const baseURL = "http://localhost:7071/api"

//const POST = require("../shared/db")

//Her testes om en bruger rent faktisk oprettes til databasen
// Describing method and route
describe("/POST", () => {
    // What do we expect? 
    it("it should post a user from the database", (done) => {
        let user = {
            firstName: "Emilie", lastName:"Larsson", email: "el@gmail.com", password: "1234", age: "26", city: "Hornbæk", country: "den", gender: "female", preferred_gender: "female"
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
                        console.log(res.body, 'hej')
                        should.not.exist(err)
                        console.log(res.status, "nice")
                        res.status.should.equal(200);
                        res.body.should.be.a("object")
                        /*res.body.should.have.property('name')
                        res.body.should.have.property('email')
                        res.body.should.have.property('gender')
                        res.body.should.have.property('country')
                        res.body.should.have.property('birthday')
                        res.body.should.have.property('image')*/
                        done();
        })
    })
})

// Her tjekkes om fornavnet må være null
// Describing method and route
describe("Firstname must not be null", () => {
    // What do we expect? 
    it("it should throw an error, because firstname is null", (done) => {
        let user = {
            firstName: null, lastName:"Carlsen", email: "hejjjj@gmail.com", password: "1234", age: "21", city: "Hørsholm", country: "den", gender: "male", preferred_gender: "female"
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
                        console.log(res.body, 'cool')
                        console.log(res.status, 'nice')
                        res.status.should.equal(400);
                        res.body.should.be.a("object")
                        done();
        })
    })
})

// Her tjekkes om "country"-attributten må være længere end 3 karakterer
// Describing method and route
describe("Country can't be more than 3 letters", () => {
    // What do we expect? 
    it("it should throw an error, because country's length is more than 3 characters", (done) => {
        let user = {
            firstName: "Simon", lastName:"Carlsen", email: "heiiij@gmail.com", password: "1234", age: "21", city: "Hørsholm", country: "denmark", gender: "male", preferred_gender: "female"
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
                        console.log(res.body, 'cool')
                        console.log(res.status, 'nice')
                        res.status.should.equal(400);
                        res.body.should.be.a("object")
                        done();
        })
    })
})

// Her tjekkes om alder må være tekst
// Describing method and route
describe("age has to be an integer", () => {
    // What do we expect? 
    it("it should throw an error, because age is not an integer", (done) => {
        let user = {
            firstName: "Simon", lastName:"Carlsen", email: "heiiij@gmail.com", password: "1234", age: "enogtyve", city: "Hørsholm", country: "denmark", gender: "male", preferred_gender: "female"
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
                        console.log(res.body, 'cool')
                        console.log(res.status, 'nice')
                        res.status.should.equal(400);
                        res.body.should.be.a("object")
                        done();
        })
    })
})
