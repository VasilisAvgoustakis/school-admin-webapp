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
    const personQueries = {
        personsData: "object", contactData: "array", addresses: "array", arb_grp: "array", bezugspersonen: "array", bezugskinder: "array"
    }

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

    describe("GET /personsRecords", () => {
        it("should get all records of a Person in the db.", (done)=>{
            chai.request(server)
                .get("/personsRecords")
                .query({table: "person_haushalt", person_id: "72", sortByColumn: "person_id"})
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                })
        })
    })

    // simple queries
    const simpleQueries = ["hausList", "agList", "lerngruppenList"]

    simpleQueries.forEach(queryname => {
        describe(`GET /${queryname}`, () => {
            it(`should get all all ${queryname} records in the db.`, (done)=>{
                chai.request(server)
                    .get(`/${queryname}`)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('array');
                    done();
                    })
            })
        })

    })
    


    describe("GET /anwohner", () => {
        it("should get all persons that live in a household.", (done)=>{
            chai.request(server)
                .get("/anwohner")
                .query({haushalt_id: "1"})
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                })
        })
    })


    describe("GET /ag_mitglieder", () => {
        it("should get all members of a workgroup.", (done)=>{
            chai.request(server)
                .get("/ag_mitglieder")
                .query({arbeitsgruppe_id: "4"})
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                })
        })
    })


    describe("GET /dataMultitablePerson", () => {
        it("should get all records of a Person in the db.", (done)=>{
            chai.request(server)
                .get("/dataMultitablePerson")
                .query({table1: "kind_lerngruppe", table2:"lerngruppen", person_id: "280", sortByColumn: "eintrittsdatum"})
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                })
        })
    })

    // multitable queries tests

    //dictionary containg parameter name as key and expected values as keyvalues
    const multiQueries = {
        haushalt_id: "2", 
    }

    const queryNames = ["dataMultitableHaus"]

    for (var n in multiQueries){
        let dictIndex = 0;
        describe(`GET /${queryNames[dictIndex]}`, () => {
            it("should get .", (done)=>{
                chai.request(server)
                    .get(`/${queryNames[dictIndex]}`)
                    .query({haushalt_id: '2'})
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a("array");
                    done();
                    })
            })
        })
        dictIndex++;
    }
    
})