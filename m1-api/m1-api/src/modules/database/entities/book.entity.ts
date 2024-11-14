import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
  } from 'typeorm';
  import { AuthorEntity } from './author.entity';
  import { ReviewEntity } from './review.entity';
  
  @Entity('books')
  export class BookEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ name: 'title', type: 'varchar' })
    title: string;
  
    @Column({ name: 'publication_date', type: 'date' })
    publicationDate: Date;
  
    @Column({ name: 'price', type: 'float' })
    price: number;
  
    @Column({ name: 'author_id', type: 'uuid' })
    authorId: string;
  
    @ManyToOne(() => AuthorEntity, (author) => author.books)
    @JoinColumn({ name: 'author_id' })
    author: AuthorEntity;
    @OneToMany(() => ReviewEntity, (review) => review.book)
    reviews: ReviewEntity[];
    // Ajoute cette ligne si tu n'as pas encore `averageRating`
    @Column({ type: 'decimal', nullable: true })
    averageRating?: number; // Propriété optionnelle
  
  
  }
  
  
  
  
  
  