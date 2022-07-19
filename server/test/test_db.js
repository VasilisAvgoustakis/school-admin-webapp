let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server.js");


//Assertion style
chai.should();

chai.use(chaiHttp);

//describe our test
describe('Test DB', ()=>{
    
    // Test GET
    describe("GET /personsList", () => {
        it("should get all Persons in the db", (done)=>{
            chai.request(server)
                .get("/personsList")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                })
        })
    })

    //Test POST
})