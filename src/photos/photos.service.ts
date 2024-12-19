import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PhotosService {
  constructor(private prisma: PrismaService) {}

  async createPhoto(data: CreatePhotoDto) {
    return this.prisma.photo.create({
      data: {
        url: data.url,
        profile: {
          connect: {
            id: data.profileId
          }
        }
      }
    });
  }
}