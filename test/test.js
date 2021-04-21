const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = chai.should();
const config = require("../shared/config.json")
//var connection = new Connection(config); 

const baseURL = "http://localhost:7071/api"

const POST = require("../shared/db")

// Describing method and route
describe("/POST", () => {
    // What do we expect? 
    it("it should post a user from the database", (done) => {
        let user = {
            firstName: "Kasper", lastName:"Johansen", email: "UnitTest@gmail.com", password: "1234", city: "Slangerup", country: "den", gender: "male", preferred_gender: "female"
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
                        //console.log(res.body, 'hej')
                        //should.not.exist(err)
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
