// book.dto.ts
import { IsString, IsDateString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsDateString()
  publicationDate: string;

  @IsString()
  @IsUUID()  // Validation pour s'assurer que l'authorId est un UUID valide
  authorId: string;

  @IsNumber()
  price: number;
}

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsDateString()
  @IsOptional()
  publicationDate?: string;

  @IsString()
  @IsOptional()
  @IsUUID()  // Validation pour s'assurer que l'authorId est un UUID valide
  authorId?: string;

  @IsNumber()
  @IsOptional()
  price?: number;
}

// book.dto.ts
export class BookDto {
  id: string;
  title: string;
  authorId: string;
  publicationDate: Date;
  price: number;
  averageRating?: number;
}

