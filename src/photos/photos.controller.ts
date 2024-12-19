import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
    Body,
    Delete,
    Param,
    HttpStatus,
    HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotosController {
    constructor(private readonly photosService: PhotosService) { }

    /*@Post('upload')
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads/photos',
          filename: (req, file, callback) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
        fileFilter: (req, file, callback) => {
          const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];//preguntar por el tipo de imagen
          if (!allowedMimeTypes.includes(file.mimetype)) {
            return callback(
              new BadRequestException('Tipo de archivo no permitido'),
              false,
            );
          }
          callback(null, true);
        },
        limits: {
          fileSize: 5 * 1024 * 1024,
        },
      }),
    )
    async uploadPhoto(
      @UploadedFile() file: Express.Multer.File,
      @Body('profileId') profileId: string,
    ) {
      if (!file) {
        throw new BadRequestException('No se proporcionó ningún archivo');
      }
  
      const photo = await this.photosService.createPhoto({
          url: `uploads/photos/${file.filename}`,
          profileId,
        });
  
      return photo;
    }*/

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', PhotosService.prototype.getMulterOptions()),
    )
    async uploadPhoto(
        @UploadedFile() file: Express.Multer.File,
        @Body('profileId') profileId: string,
    ) {
        if (!file) {
            throw new BadRequestException('NO_SE_PROPORCIONO_NINGUN_ARCHIVO');
        }

        return this.photosService.createPhoto({
            url: `uploads/photos/${file.filename}`,
            profileId,
        });
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deletePhoto(@Param('id') photoId: string) {
        await this.photosService.deletePhoto(photoId);
    }
}
