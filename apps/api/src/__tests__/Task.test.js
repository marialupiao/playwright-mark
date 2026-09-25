const request = require('supertest');
const { app } = require('../app');
const database = require('../database');

describe('Tasks', () => {
  let connection;

  beforeAll(async () => {
    connection = await database();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  it('creates a new task', async () => {
    const response = await request(app).post('/tasks').send({
      name: 'Task Example',
      is_done: false,
    });

    expect(response.status).toBe(201);
  });

  it('rejects a task with an existing name', async () => {
    const response = await request(app).post('/tasks').send({
      name: 'Task Example',
      is_done: false,
    });

    expect(response.status).toBe(400);
  });
});
