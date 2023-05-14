import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AuthModule } from './auth.module';

describe('AuthController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/auth/login (POST)', () => {
    it('should return a JWT token if the credentials are valid', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ pseudo: 'jeanseb02', password: 'jeanseb02' })
        .expect(201);

      expect(response.body).toHaveProperty('accessToken');
    });

    it('should return a 401 error if the credentials are invalid', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ pseudo: 'blabla', password: 'wrongpassword' })
        .expect(401);
    });
  });
});
