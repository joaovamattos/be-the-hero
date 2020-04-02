const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  })

  it('should to be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "aaa",
        email: "contato@apad.com.br",
        whatsapp: "69984848484",
        city: "Vilhena",
        uf: "RO"
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  })
})