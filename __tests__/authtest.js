const server = require("../index");
const supertest = require("supertest")

const db = require("../data/dbconfig");

beforeEach(async () => {
    await db.seed.run()
})

 afterAll(async () => {
     await db.destroy()
 });


 describe("registration test", () => {
     it("POST /register",  () => {
         return supertest(server).post("/api/auth/register").send({ username: 'dpinkett', password: 'test1', Number: '155-555-5555'})
         .then(res => {expect(res.status).toBe(201)})
     })
     it("return status 500", () => {
         return supertest(server).post("/api/auth/register").send({username: 'dpiknett'})
         .then(res=> {expect(res.status).toBe(500)});
     })
 })

 describe("login test", () => {
     it("return Welcome ${user.username}", () => {
         return supertest(server).post("/api/auth/login").send({ username: 'dpinkett', password: 'test1'})
     })
     it('return 401 error', () => {
         return supertest(server).post('/api/auth/login').send({ username: '', password: ''})
         .then(res => {expect(res.status).toBe(401)})
     })
 })