import { Body, Controller, Get, Param, Post, Put, Delete, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto, UpdateReviewDto } from './review.dto';
import { ReviewPresenter } from './review.presenter';

@Controller('/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get(':bookId')
  public async listReviews(
    @Param('bookId') bookId: string,
    @Query('order') order: 'asc' | 'desc' = 'asc'  // Valeur par défaut
  ) {
    const reviews = await this.reviewService.listReviews(bookId, order);
    return reviews;
  }

  @Post()
  public async createReview(@Body() input: CreateReviewDto): Promise<ReviewPresenter> {
    const review = await this.reviewService.createReview(input);
    return ReviewPresenter.from(review);
  }

  @Put(':id')
  public async updateReview(@Param('id') id: string, @Body() input: UpdateReviewDto): Promise<ReviewPresenter> {
    const review = await this.reviewService.updateReview(id, input);
    return ReviewPresenter.from(review);
  }

  @Delete(':id')
  public async deleteReview(@Param('id') id: string): Promise<void> {
    await this.reviewService.deleteReview(id);
  }
}
