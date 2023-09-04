import * as fs from 'fs';

// Importez votre enum FileType (assurez-vous que le chemin est correct)
import FileType from './fileFormat';
import { PhotosService } from '../photos.service';

// ...
export default function VerifFormatFichier(
  file: any,

  photosService: PhotosService,
) {
  // Assurez-vous que vous avez le chemin complet du fichier
  const filePath = `uploads/${file.originalname}`;
  console.log(file.originalname);
  const verif = file.originalname.split('.')[1];

  // Lisez le contenu du fichier
  fs.readFile(filePath, async (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier :', err);
      return;
    }

    // Convertissez les octets en hexadécimal
    const imgHex = data.toString('hex');

    // Vérifiez si imgHex correspond à l'une des signatures de formats de fichiers
    let fileType = null;

    for (const type in FileType) {
      if (imgHex.indexOf(FileType[type]) === 0) {
        // console.log('verif', FileType[type]);
        //  console.log(type);

        fileType = type;
        break;
      }
    }

    console.log(fileType, 'test', fileType === verif, verif);

    if (fileType === verif) {
      console.log(`Le fichier est de type ${fileType}`);
      // Faites ce que vous devez faire avec le type de fichier
    } else {
      console.log("Le type de fichier n'a pas pu être déterminé.");
      fs.unlink(`./uploads/${file.originalname}`, (err) => {
        if (err) {
          return err;
        }
      });
      photosService
        .delete(file.originalname)
        .then(() => {
          console.log(
            `Photo avec ID ${file.originalname} supprimée de la base de données.`,
          );
        })
        .catch((error) => {
          console.error(
            'Erreur lors de la suppression de la photo de la base de données :',
            error,
          );
        });
    }
  });
}
