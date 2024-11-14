import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './author.entity';
import { BookEntity } from './book.entity';
import { ReviewEntity } from './review.entity';
import { Connection } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([AuthorEntity, BookEntity, ReviewEntity]),
  ],
})
export class DatabaseModule implements OnModuleInit {
  constructor(private readonly connection: Connection) {}

  // Cette méthode est appelée lorsque le module est initialisé
  async onModuleInit() {
    // Activer les contraintes de clé étrangère
    await this.connection.query('PRAGMA foreign_keys = ON');
  }
}
