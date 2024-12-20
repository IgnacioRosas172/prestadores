import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import type { Profile } from '.prisma/client';
import { Prisma } from '.prisma/client';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) { }
  
  @ApiOperation({ summary: 'guardar un perfil' }) 
  @ApiBody({ type: CreateProfileDto }) 
  @Post('save')
  async createProfile(@Body() data: Prisma.ProfileCreateInput): Promise<Profile> {
    return this.profilesService.createProfile(data);
  }

  @ApiOperation({ summary: 'obtiene todos los perfiles' }) 
  @Get('getall')
  async findAll(@Query() params: { skip?: number; take?: number;
    where?: Prisma.ProfileWhereInput;
    orderBy?: Prisma.ProfileOrderByWithRelationInput;
  }): Promise<Profile[]> {
    return this.profilesService.profiles(params);
  }

  @ApiOperation({ summary: 'obtiene el perfil por id' }) 
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Profile> {
    return this.profilesService.profile({ id: id });
  }

  @ApiOperation({ summary: 'actualizar el perfil por id' }) 
  @ApiBody({ type: CreateProfileDto }) 
  @Patch(':id')
  async update( @Param('id') id: string, @Body() data: Prisma.ProfileUpdateInput,
  ): Promise<Profile> {
    return this.profilesService.updateProfile({
      where: { id: id },
      data: data,
    });
  }

  @ApiOperation({ summary: 'elimina el perfil por id' }) 
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Profile> {
    return this.profilesService.deleteProfile({ id: id });
  }
  /*@Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesService.remove(+id);
  }*/
}
