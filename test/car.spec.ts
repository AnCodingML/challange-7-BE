import request from 'supertest';
import app from '../app';
import { describe } from 'node:test';
import FormData from 'form-data';
import fs from 'fs-extra';
import path from 'path';

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
   it('should respond with 400 if required fields are missing', async () => {
      const response = await request(server)
         .post('/api/v1/cars')
         .set('Accept', 'application/json')
         .send();
      expect(response.statusCode).toBe(400);
   });
});

describe('deleteCar /api/v1/cars', () => {
   it('should respond with 400 if ID is not provided', () => {
      request(server)
         .delete('/api/v1/cars') // Ensure the route does not concatenate with null
         .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.text).toBe("ID tidak boleh kosong"); // Optional: Check response message
         });
   });

   it('should respond with 200 if deletion is successful', async() => {
      const id = '6e2bc663-5197-441a-957b-bc75e4a2da7c';
      request(server)
         .delete(`/api/v1/cars?id=${id}`) // Ensure proper query string parameter
         .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toBe("Data berhasil di hapus"); // Optional: Check response message
         });
   });

   it('should respond with 404 if ID is not found', () => {
      const id = 'nonexistent-id';
      request(server)
         .delete(`/api/v1/cars?id=${id}`) // Ensure proper query string parameter
         .then(response => {
            expect(response.statusCode).toBe(404);
            expect(response.text).toBe("Data tidak ditemukan!"); // Optional: Check response message
         });
   });
});


afterAll( async() => {
   server.close();
})