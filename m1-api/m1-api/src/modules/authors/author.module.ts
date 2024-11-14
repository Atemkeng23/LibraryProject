import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorRepository } from './author.repository';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { AuthorEntity } from '../database/entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity])],
  controllers: [AuthorController],
  providers: [AuthorRepository, AuthorService],
  exports: [AuthorService, AuthorRepository],
})
export class AuthorModule {}

// author.module.ts




