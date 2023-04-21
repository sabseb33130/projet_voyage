import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';
import { PhotosModule } from './photos/photos.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Album from './albums/entities/album.entity';
import Photo from './photos/entities/photo.entity';
import User from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

import Invitations from './invitations/entities/invitations.entity';
import { InvitationsModule } from './invitations/invitations.module';
import { PhotoIdentiteModule } from './photo-identite/photo-identite.module';
import { PhotoIdentite } from './photo-identite/entities/photo-identite.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Invitations, Photo, Album, PhotoIdentite],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    InvitationsModule,
    PhotosModule,
    AlbumsModule,
    AuthModule,
    PhotoIdentiteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
