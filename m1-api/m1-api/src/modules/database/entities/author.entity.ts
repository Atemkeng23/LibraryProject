import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
  } from 'typeorm';
  import { BookEntity } from './book.entity';
  
  @Entity('authors')
  export class AuthorEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ name: 'first_name', type: 'varchar' })
    firstName: string;
  
    @Column({ name: 'last_name', type: 'varchar' })
    lastName: string;
  
    @Column({ name: 'photo_url', type: 'varchar', nullable: true })
    photoUrl?: string;
  
    @Column({ name: 'biography', type: 'text', nullable: true })
    biography?: string;
  
    @Column({ name: 'book_count', type: 'int', default: 0 })
    bookCount: number;
  
    @Column({ name: 'average_rating', type: 'float', default: 0 })
    averageRating: number;
  
    @OneToMany(() => BookEntity, (book) => book.author)
    books: BookEntity[];
  }
  