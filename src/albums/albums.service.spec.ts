import { Test, TestingModule } from '@nestjs/testing';
import { AlbumsService } from './albums.service';
describe('FriendsService', () => {
  let service: AlbumsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlbumsService],
    }).compile();

    service = module.get<AlbumsService>(AlbumsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
