const chai = require('chai');
const chaiHttp = require("chai-http");
const server = require('../index.js');

//assert style
chai.should();

chai.use(chaiHttp);

describe('fuel api', () => 
    {
        /*describe("POST /register", ()=>{
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
        }) */
        describe("get /username", ()=>{
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
    })

