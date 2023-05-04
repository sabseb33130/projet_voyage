import path, { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * @fonction middleware imagefileFilter:
 * * Vérifie si le type de fichier est une image.
 * * True : image téléchargée.
 */
export const fileFilter = (req: any, file: any, callback: any) => {
  callback(null, true);
  if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    callback(null, true);
  } else {
    callback(
      new HttpException(
        `type de fichier non supporté ${extname(file.originalname)}`,
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
};

/**
 * @fonction middleware editFileName:
 * * Crée un nom de fichier personnalisé en utilisant le nom d'origine, extension de fichier et nombre aléatoire.
 */
export const editFileName = (req: any, file: any, callback: any) => {
  // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); //retourne un numéro multer propre à chaque photo
  const ext = file.originalname; //extension du fichier original
  const filename = `${ext}`;
  console.log(filename);

  callback(null, filename);
};
