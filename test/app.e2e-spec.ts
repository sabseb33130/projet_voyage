import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterEach(() => {
    app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  describe('/auth/login (POST)', () => {
    it('Dois retourner le token si tout va bien', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          pseudo: process.env.USERNAMETEST,
          password: process.env.PASSWORDTEST,
        })
        .expect(201);

      expect(response.body.data).toHaveProperty(['access_token']);
    });

    it('non ce n est pas la bonne combinaison', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ pseudo: 'blabla', password: 'wrongpassword' })
        .expect(401);
    });
  });
});
