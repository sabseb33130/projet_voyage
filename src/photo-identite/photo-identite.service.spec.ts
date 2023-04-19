import { Test, TestingModule } from '@nestjs/testing';
import { PhotoIdentiteService } from './photo-identite.service';

describe('PhotoIdentiteService', () => {
  let service: PhotoIdentiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotoIdentiteService],
    }).compile();

    service = module.get<PhotoIdentiteService>(PhotoIdentiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
