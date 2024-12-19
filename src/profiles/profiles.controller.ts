import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Prisma, Profile } from '@prisma/client';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) { }
  
  @Post()
  async createProfile(@Body() data: Prisma.ProfileCreateInput): Promise<Profile> {
    return this.profilesService.createProfile(data);
  }

  @Get()
  async findAll(@Query() params: {
    skip?: number;
    take?: number;
    where?: Prisma.ProfileWhereInput;
    orderBy?: Prisma.ProfileOrderByWithRelationInput;
  }): Promise<Profile[]> {
    return this.profilesService.profiles(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Profile> {
    return this.profilesService.profile({ id: id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.ProfileUpdateInput,
  ): Promise<Profile> {
    return this.profilesService.updateProfile({
      where: { id: id },
      data: data,
    });
  }

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
