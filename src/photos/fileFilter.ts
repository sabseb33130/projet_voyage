import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as mime from 'mime-types';

export const imageFileFilter = async (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return callback(
      new HttpException(
        `Type de fichier non supporté ${extname(file.originalname)}`,
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  console.log(file.path);

  const mimeType = mime.lookup(file.originalname);

  if (!mimeType || !mimeType.startsWith('image/')) {
    return callback(
      new HttpException(
        'Fichier non reconnu comme une image',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }

  callback(null, true);
};

export const editFileName = (req: any, file: any, callback: any) => {
  let filename = file.originalname;

  callback(null, filename);
};
