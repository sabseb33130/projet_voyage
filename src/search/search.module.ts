import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service.dto';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [SearchController],
  providers: [SearchService, UsersService],
})
export class SearchModule {}
