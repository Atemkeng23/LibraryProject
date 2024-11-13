import { IsString, IsInt, IsOptional, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsString()
  bookId: string;
}

export class UpdateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @IsString()
  @IsOptional()
  comment?: string;
}

// Ajout d'une classe DTO pour le tri
export class ListReviewDto {
  @IsString()
  @IsOptional()
  order?: 'asc' | 'desc'; // Définit l'ordre de tri pour les avis
}
