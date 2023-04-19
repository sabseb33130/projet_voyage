import { Test, TestingModule } from '@nestjs/testing';
import { PhotoIdentiteController } from './photo-identite.controller';
import { PhotoIdentiteService } from './photo-identite.service';

describe('PhotoIdentiteController', () => {
  let controller: PhotoIdentiteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotoIdentiteController],
      providers: [PhotoIdentiteService],
    }).compile();

    controller = module.get<PhotoIdentiteController>(PhotoIdentiteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
