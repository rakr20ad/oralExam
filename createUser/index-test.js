const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = chai.should();

const baseURL = "http://localhost:7071/api"

// We're testing if the post request is working on the create user functionality
// Describing method and route
describe("/POST", () => {
    // What do we expect? 
    it("it should post a user to the database", (done) => {
        let user = {
            firstName: "Melina", lastName:"Wayne", email: "Mwwe2@gmail.com", password: "1234", age: 30, city: "Frederiksberg", gender: "Female", preferred_gender: "Male"
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

// Checking if the inserted datatype matches with the requirements of our DB
describe("Validating a user's attributes by datatype", () => {
    // What do we expect? 
    it("it should have status code 400, because firstname is null", (done) => {
        let user = {
            firstName: null, lastName:"Carlsen", email: "hejmeddig2@gmail.com", password: "1234", age: 21, city: "Hørsholm", gender: "Male", preferred_gender: "Female"
        }
        // Chai request is chained
        chai 
            .request(baseURL)
                //Route is added 
                .post("/createUser")
                    .send(user)
                    //Handling response 
                    .end((err, res) => {
                        console.log(res.body)
                        console.log(res.status)
                        console.log(err)
                        res.status.should.equal(400);
                        done();
        })
    })
    it("it should have status code 400, because email doesnt have an @", (done) => {
        let user = {
            firstName: "Simon", lastName:"Carlsen", email: "thisIsNotAnEmail", password: "1234", age: 21, city: "Hørsholm", gender: "Male", preferred_gender: "Female"
        }
        // Chai request is chained
        chai 
            .request(baseURL)
                //Route is added 
                .post("/createUser")
                    .send(user)
                    //Handling response 
                    .end((err, res) => {
                        console.log(res.body)
                        console.log(res.status)
                        console.log(err)
                        res.status.should.equal(400);
                        done();
        })
    })
    it("it should have status code 400, because age is not an integer", (done) => {
        let user = {
            firstName: "Simon", lastName:"Carlsen", email: "email12@gmail.com", password: "1234", age: "enogtyve", city: "Hørsholm", gender: "Male", preferred_gender: "Female"
        }
        // Chai request is chained
        chai 
            .request(baseURL)
                //Route is added 
                .post("/createUser")
                    .send(user)
                    //Handling response 
                    .end((err, res) => {
                        console.log(err)
                        console.log(res.body)
                        console.log(res.status)
                        res.status.should.equal(400);
                        done();
        })
    })
})


