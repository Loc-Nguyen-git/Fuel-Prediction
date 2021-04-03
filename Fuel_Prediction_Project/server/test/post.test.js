const chai = require('chai');
const chaiHttp = require("chai-http");
const server = require('../index.js');

//assert style
chai.should();

chai.use(chaiHttp);

describe('fuel api', () => 
    {
        describe("POST /register", ()=>{
            it("should register data", (done) => {
                chai.request(server)
                    .post('/register')
                    .send({user_name: 'username', password:'password'})
                    .then((res)=>{
                        const body = res.body;
                        expect(body).to.equal("existed username");
                        done();
                    })
                    .catch((err) => done(err));
            })
        }) 
        describe("get /profile", ()=>{
            it("should get user data", (done) => {
                chai.request(server)
                    .get('/profile/chadr99')
                    .then((res)=>{
                        console.log(res.body);
                        const body = res.body;
                        body.should.have.property('full_name');
                        done();
                    })
            })
        })
        describe("post /signin", ()=>{
            it("should get user data", (done) => {
                chai.request(server)
                    .post('/signin')
                    .send({user_name: 'username', password:'password'})
                    .then((res)=>{
                        console.log(res.body);
                        const body = res.body;
                        body.should.have.property('user_name');
                        done();
                    })
            })
        })
        describe("post /profile", ()=>{
            it("should post user data", (done) => {
                chai.request(server)
                    .post('/profile/chadr99')
                    .send({full_name:"full name"})
                    .then((res)=>{
                        console.log(res.body);
                        const body = res.body;
                        expect(body).to.equal("profile was updated");
                        done();
                    })
            })
        })
        describe("get /fuelquote", ()=>{
            it("should get user data", (done) => {
                chai.request(server)
                    .get('/fuelquote/chadr99')
                    .then((res)=>{
                        console.log(res.body);
                        const body = res.body;
                        body.should.have.property('Gallons_Requested');
                        done();
                    })
            })
        })
        describe("post /fuelquote", ()=>{
            it("should post user data", (done) => {
                chai.request(server)
                    .post('/fuelquote/chadr99')
                    .send({Gallons_Requested:"12", Delivery_Address:"address"})
                    .then((res)=>{
                        console.log(res.body);
                        const body = res.body;
                        body.should.have.property('data added to fuel quote history');
                        done();
                    })
            })
        })

        describe("get /fuelquote", ()=>{
            it("should post user data", (done) => {
                chai.request(server)
                    .get('/fuelquote_address/chadr99')
                    .then((res)=>{
                        console.log(res.body);
                        const body = res.body;
                        body.should.have.property('data added to fuel quote history');
                        done();
                    })
            })
        })
        describe("get /fuelquote", ()=>{
            it("should post user data", (done) => {
                chai.request(server)
                    .get('/fuelquote_price/chadr99')
                    .then((res)=>{
                        console.log(res.body);
                        const body = res.body;
                        body.should.have.property('data added to fuel quote history');
                        done();
                    })
            })
        })
    })

