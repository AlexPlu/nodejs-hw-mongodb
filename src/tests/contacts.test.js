import request from 'supertest';
import app from '../server.js';
import mongoose from 'mongoose';

describe('Contacts API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return all contacts', async () => {
    const res = await request(app).get('/contacts');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
  });

  it('should create a new contact', async () => {
    const res = await request(app).post('/contacts').send({
      name: 'Jane Doe',
      phoneNumber: '+1234567891',
      contactType: 'personal',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('data');
  });

  it('should return a single contact', async () => {
    const res = await request(app).get('/contacts/{contactId}');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
  });

  it('should update a contact', async () => {
    const res = await request(app)
      .patch('/contacts/{contactId}')
      .send({ name: 'Jane Smith' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
  });

  it('should delete a contact', async () => {
    const res = await request(app).delete('/contacts/{contactId}');
    expect(res.statusCode).toEqual(204);
  });
});
