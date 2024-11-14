// review.entity.ts
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
  } from 'typeorm';
  import { BookEntity } from './book.entity';
  
  @Entity('reviews')
  export class ReviewEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ name: 'rating', type: 'int' })
    rating: number;
  
    @Column({ name: 'comment', type: 'text', nullable: true })
    comment?: string;
  
    @Column({ name: 'book_id', type: 'uuid' })
    bookId: string;
  
    @ManyToOne(() => BookEntity, (book) => book.reviews, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'book_id' })
    book: BookEntity;
  
    @CreateDateColumn()
    createdAt: Date;
  }
  