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
    it("it should post an user from the database", (done) => {
        let user = {
            name: "hej", email: "hejsa@gmail.com", gender: "female", country: "den", birthday: "1988-01-01", image: "p"
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
                        res.should.have.status(200);
                        //res.body.should.be.a("array")
                        /*res.body.user.should.have.property('name')
                        res.body.user.should.have.property('email')
                        res.body.user.should.have.property('gender')
                        res.body.user.should.have.property('country')
                        res.body.user.should.have.property('birthday')
                        res.body.user.should.have.property('image')*/
                        done();
        })
    })
})
