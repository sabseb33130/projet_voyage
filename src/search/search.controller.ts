import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { UsersService } from 'src/users/users.service';
import { SearchDto } from './dto/searchDto';
import { SearchService } from './search.service.dto';
@ApiTags('api/search')
@Controller('api/search')
@UseInterceptors(ClassSerializerInterceptor)
export class SearchController {
  constructor(
    private readonly usersService: UsersService,
    private readonly searchService: SearchService,
  ) {}

  @ApiBody({ type: SearchDto })
  @Post()
  async search(@Body() searchDto: SearchDto) {
    console.log('input', searchDto.input);
    const searchUser = await this.searchService.searcha(searchDto.input);
    console.log('const', searchUser);

    return searchUser;
  }
}
