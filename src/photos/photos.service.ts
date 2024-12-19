import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PhotosService {
    constructor(private prisma: PrismaService) { }

    getMulterOptions() {
        return {
            storage: diskStorage({
                destination: './uploads/photos',
                filename: (req, file, callback) => {
                    const uniqueSuffix =
                        Date.now() + '-' + Math.round(Math.random() * 1e9);
                    callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
                },
            }),
            fileFilter: (req, file, callback) => {
                const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
                if (!allowedMimeTypes.includes(file.mimetype)) {
                    return callback(
                        new BadRequestException('Tipo de archivo no permitido'),
                        false,
                    );
                }
                callback(null, true);
            },
            limits: {
                fileSize: 5 * 1024 * 1024, // 5MB
            },
        };
    }

    async createPhoto(data: CreatePhotoDto) {
        return this.prisma.photo.create({
            data: {
                url: data.url,
                profile: {
                    connect: {
                        id: data.profileId,
                    },
                },
            },
        });
    }

    /*async deletePhoto(id: string) {
      const photo = await this.prisma.photo.findUnique({ where: { id: id }});
      if(!photo) throw new NotFoundException('NOT_FOUND');
      
      return this.prisma.photo.delete({ where: {id: id}});
    }*/

    async deletePhoto(photoId: string) {
        const photo = await this.prisma.photo.findUnique({
            where: { id: photoId },
        });

        try {
            const archivoGuardado = photo.url;

            console.log(photoId);
            console.log(archivoGuardado);

            /*if (!photo || !fs.existsSync(archivoGuardado))
                throw new NotFoundException('NOT_FOUND');*/

            if (fs.existsSync(archivoGuardado)) {
                fs.unlinkSync(archivoGuardado);
            } else {
                console.warn(`no encontrado --> ${archivoGuardado}`);
            }
        } catch (error) {
           // console.error(`error --> ${archivoGuardado}`, error);
            throw new InternalServerErrorException('ERROR_DELETING_FILE');
            //throw new HttpException('ERROR', 403);
        }

        await this.prisma.photo.delete({ where: { id: photoId } });
    }
}
