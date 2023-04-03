import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { AlbumsModule } from './albums/albums.module';
import { PhotosModule } from './photos/photos.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './albums/entities/album.entity';

import { Photo } from './photos/entities/photo.entity';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { Invitations } from './friends/entities/invitations.entity';
import { InvitationsModule } from './friends/invitations.module';

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
      entities: [User, Invitations, Photo, Album],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    InvitationsModule,
    PhotosModule,
    AlbumsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
