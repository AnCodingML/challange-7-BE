import request from 'supertest';
import app from '../app';
import jwt from 'jsonwebtoken'

let server: any;
let token: string;

const user = {
   email: "superadmin@mail.com",
   password: '123',
}

beforeAll((done) => {
   server = app.listen(5000, () => {
       done()
   })
})

describe('POST /api/v1/login', () => {
   it('should response with 200 status code', async () => (
       request(server)
           .post('/api/v1/login')
           .send(user)
           .set('Accept', 'application/json')
           .then((res: { statusCode: unknown; body: any; }) => {
               token = res.body.token;
               expect(res.statusCode).toBe(201)
               expect(res.body).toEqual(
                   expect.objectContaining({
                       message: "Berhasil Login",
                       data: {
                           id: expect.any(Number),
                           email: user.email,
                           nama: expect.any(String),
                           token: expect.any(String),
                           role: expect.any(String),
                           avatar: expect.any(String),
                       }
                   })
               )
           })
   ))
   // 2. Email tidak ditemukan
   it('should response with 404 status code', async () => (
       request(server)
           .post('/api/v1/login')
           .send({
               ...user,
               email: 'testa@email.com'
           })
           .set('Accept', 'application/json')
           .then((res: { statusCode: unknown; body: unknown; }) => {
               expect(res.statusCode).toBe(404)
               expect(res.body).toEqual(
                   expect.objectContaining({
                       message: "Email tidak ditemukan!",
                   })
               )
           })
   ))
   // 3. password salah
   it('should response with 401 status code', async () => (
       request(server)
           .post('/api/v1/login')
           .send({
               ...user,
               password: "12"
           })
           .set('Accept', 'application/json')
           .then((res: { statusCode: unknown; body: unknown; }) => {
               expect(res.statusCode).toBe(401)
               expect(res.body).toEqual(
                   expect.objectContaining({
                       message: "Password salah!",
                   })
               )
           })
   ))
})

afterAll( async() => {
   server.close();
})