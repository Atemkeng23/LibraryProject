import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto, UpdateAuthorDto } from './author.dto';
import { AuthorPresenter } from './author.presenter';

@Controller('/authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  // Liste des auteurs
  @Get()
  public async listAuthors(): Promise<AuthorPresenter[]> {
    const authors = await this.authorService.listAuthors();
    return authors.map((author) => AuthorPresenter.from(author)); // Utilisation de "AuthorPresenter.from"
  }

  // Récupérer un auteur par ID
  @Get(':id')
  public async getAuthor(@Param('id') id: string): Promise<AuthorPresenter> {
    const author = await this.authorService.getAuthor(id);
    return AuthorPresenter.from(author);
  }

  // Récupérer la moyenne des notes pondérées pour un auteur
  @Get(':id/weighted-average-rating')
  public async getWeightedAverageRating(@Param('id') id: string): Promise<number> {
    return this.authorService.getWeightedAverageRatingForAuthor(id);
  }

  // Créer un auteur
  @Post()
  public async createAuthor(@Body() input: CreateAuthorDto): Promise<AuthorPresenter> {
    const author = await this.authorService.createAuthor(input);
    return AuthorPresenter.from(author);
  }

  // Mettre à jour un auteur
  @Put(':id')
  public async updateAuthor(@Param('id') id: string, @Body() input: UpdateAuthorDto): Promise<AuthorPresenter> {
    const author = await this.authorService.updateAuthor(id, input);
    return AuthorPresenter.from(author);
  }

  @Delete(':id')
  public async deleteAuthor(@Param('id') id: string): Promise<void> {
    await this.authorService.deleteAuthor(id);
  }
}
