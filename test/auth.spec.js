// const request = require('supertest');
// const { sequelize } = require('../src/models');
// const app = require('../src/server');

// // jest.setTimeout(30000); // Increase the Jest timeout to 30 seconds

// beforeAll(async () => {
//   await sequelize.sync({ force: true });
// });

// describe('Auth Endpoints', () => {
//   it('Should register user successfully with default organisation', async () => {
//     const res = await request(app)
//       .post('/auth/register')
//       .send({
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'john.doe@example.com',
//         password: 'password123',
//         phone: '1234567890'
//       });

//     expect(res.statusCode).toEqual(201);
//     expect(res.body).toHaveProperty('status', 'success');
//     expect(res.body.data.user.firstName).toBe('John');
//     expect(res.body.data.user.lastName).toBe('Doe');
//   });

//   it('Should log the user in successfully', async () => {
//     const res = await request(app)
//       .post('/auth/login')
//       .send({
//         email: 'john.doe@example.com',
//         password: 'password123'
//       });

//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty('status', 'success');
//   });

//   it('Should fail if required fields are missing', async () => {
//     const res = await request(app)
//       .post('/auth/register')
//       .send({
//         firstName: 'John',
//         email: 'john.doe@example.com',
//         password: 'password123'
//       });

//     expect(res.statusCode).toEqual(422);
//     expect(res.body).toHaveProperty('status', 'Unprocessable Entity');
//   });

//   it('Should fail if there’s duplicate email or userID', async () => {
//     await request(app)
//       .post('/auth/register')
//       .send({
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'john.doe@example.com',
//         password: 'password123',
//         phone: '1234567890'
//       });

//     const res = await request(app)
//       .post('/auth/register')
//       .send({
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'john.doe@example.com',
//         password: 'password123',
//         phone: '1234567890'
//       });

//     expect(res.statusCode).toEqual(422);
//     expect(res.body).toHaveProperty('status', 'Unprocessable Entity');
//   });
// });



const request = require('supertest');
const { sequelize } = require('../src/models');
const app = require('../src/server');

beforeAll(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced');
  } catch (err) {
    console.error('Error syncing database:', err);
  }
});

afterAll(async () => {
  await sequelize.close(); // Close the database connection after tests
});

describe('Auth Endpoints', () => {
  it('Should register user successfully with default organisation', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phone: '1234567890'
      });

    console.log('Register response:', res.body);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body.data.user.firstName).toBe('John');
    expect(res.body.data.user.lastName).toBe('Doe');
  });

  it('Should log the user in successfully', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'john.doe@example.com',
        password: 'password123'
      });

    console.log('Login response:', res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'success');
  });

  it('Should fail if required fields are missing', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        firstName: 'John',
        email: 'john.doe@example.com',
        password: 'password123'
      });

    console.log('Missing fields response:', res.body);
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('status', 'Unprocessable Entity');
  });

  it('Should fail if there’s duplicate email or userID', async () => {
    await request(app)
      .post('/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phone: '1234567890'
      });

    const res = await request(app)
      .post('/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phone: '1234567890'
      });

    console.log('Duplicate email response:', res.body);
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('status', 'Unprocessable Entity');
  });
});


