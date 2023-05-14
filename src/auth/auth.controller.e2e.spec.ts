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
    it('Dois retourner le token si tout va bien', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ pseudo: 'jeanseb02', password: 'jeanseb02' })
        .expect(201);

      expect(response.body).toHaveProperty('accessToken');
    });

    it('non ce n est pas la bonne combinaison', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ pseudo: 'blabla', password: 'wrongpassword' })
        .expect(401);
    });
  });
});
