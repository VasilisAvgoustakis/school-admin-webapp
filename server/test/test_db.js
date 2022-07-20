/**
 * 1. enter server CLI
 * 2. netstat -ntlp to finde node GID
 * 3. kill -9 "GID#" to kill node
 * 4. npm test to run mocha test
 */


let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server.js");


//Assertion style
chai.should();

chai.use(chaiHttp);

//describe our test
describe('Test DB Connectivity', ()=>{
    
    /**
     * TEST POSTs   
     */

    describe("POST /register", () => {
        it("should return an object with a message after Registering.", (done)=>{
            chai.request(server)
                .post("/register")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                done();
                })
        })
    })

    describe("POST /login", () => {
        it("should return an object with session id after loging in.", (done)=>{
            chai.request(server)
                .post("/login")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                done();
                })
        })
    })

    // describe("POST /sessionId", () => {
    //     it("should return nothing since the session id passed does not corresponds to that of an active session.", (done)=>{
            
    //         chai.request(server)
    //             .post("/sessionId")
    //             .send({"params":{"session_id":"lajdhfiusHOILHJLKJHGsdgulsjkf45879"}})
    //             .end((err, response) => {
    //                 response.should.have.status(200)
    //                 // response.body.should.be.a('string');
    //             done();
    //             })
    //     })
    // })

    describe("POST /logout", () => {
        it("should return an object with string message after loging out.", (done)=>{
            chai.request(server)
                .post("/logout")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                done();
                })
        })
    })


    /**
     * TEST GETs
     */

    describe("GET /personsList", () => {
        it("should get all Persons in the db.", (done)=>{
            chai.request(server)
                .get("/personsList")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                })
        })
    })

    // all 'last id' relevant queries
    const lastIds = ["lastPersonsId", "lastHausId", "lastAgId", "lastLgId"]

    lastIds.forEach(queryname => {

        describe(`GET /${queryname}`, () => {
            it("should return the max existing id for the given entity.", (done)=>{
                chai.request(server)
                    .get(`/${queryname}`)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('array');
                    done();
                    })
            })
        })
        
    });


    // persons queries tests

    //dictionary containg query name as key and expected values as keyvalues
    const personQueries = {personsData: "object", contactData: "array", addresses: "array"}

    for (var q in personQueries){
        describe(`GET /${q}`, () => {
            it("should get Persons core data.", (done)=>{
                chai.request(server)
                    .get(`/${q}`)
                    .query({person_id: "72"})
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a(`${personQueries[q]}`);
                    done();
                    })
            })
        })
    }
})