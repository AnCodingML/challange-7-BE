import request from 'supertest';
import app from '../app';
import { describe } from 'node:test';

let server: any;

beforeAll((done) => {
   server = app.listen(5001, () => {
       done()
   })
})

describe('GET /api/v1/cars', () => {
   it('should response with 200 status code', async () => (
      request(server)
         .get('/api/v1/cars')
         .then((res: { statusCode: unknown; body: any; }) => {
            expect(res.statusCode).toBe(200)
         })
   ))
})

describe('POST /api/v1/cars', () => {
   it('should be response with 400', () => {
      request(server)
         .post('/api/v1/cars')
         .send()
         .set('Accept', 'application/json')
         .then(response => {
            expect(response.statusCode).toBe(400);
          });
   })
})

describe('DELETE /api/v1/cars', () => {
   it ('should be response with 400', () => {
      const id = null
      request(server)
         .delete(`/api/v1/cars${id}`)
         .then(response => {
            expect(response.statusCode).toBe(400);
          });
   })
})


afterAll( async() => {
   server.close();
})