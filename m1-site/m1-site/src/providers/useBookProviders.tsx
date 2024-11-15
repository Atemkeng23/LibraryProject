// providers/useBookProviders.tsx
import axios from "axios";
import { BookModel, CreateBookModel } from "../models/BookModel";
import { ReviewModel, CreateReviewModel } from "../models/ReviewModel";
import { useState } from "react";

export const useListBookProviders = () => {
  const [books, setBooks] = useState<BookModel[]>([]);

  const loadBooks = () => {
    axios
        .get<BookModel[]>("http://localhost:3001/books")
        .then((response) => {
          setBooks(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
  };

  const onDelete = (id: string) => {
    axios
        .delete(`http://localhost:3001/books/${id}`)
        .then(() => {
          setBooks((prev) => prev.filter((book) => book.id !== id));
        })
        .catch((error) => {
          console.error(error);
        });
  };

    // Fonction pour mettre à jour un livre
    const onUpdate = (id: string, updatedBook: BookModel) => {
        axios
            .put(`http://localhost:3001/books/${id}`, updatedBook)
            .then((response) => {
                setBooks((prevBooks) =>
                    prevBooks.map((book) =>
                        book.id === id ? { ...book, ...updatedBook } : book
                    )
                );
            })
            .catch((error) => {
                console.error("Erreur lors de la mise à jour du livre:", error);
            });
    };

  const onCreate = (input: CreateBookModel) => {
    axios
        .post("http://localhost:3001/books", { book: input })
        .then(() => {
          loadBooks();
        })
        .catch((error) => {
          console.error(error);
        });
  };

  return {
    books,
    onCreate,
    loadBooks,
    onUpdate,
    onDelete,
  };
};

export const useGetBookProvider = (id: string) => {
  const [book, setBook] = useState<BookModel | null>(null);
  const [reviews, setReviews] = useState<ReviewModel[]>([]);

  const loadBook = () => {
    axios
        .get<BookModel>(`http://localhost:3001/books/${id}`)
        .then((result) => setBook(result.data))
        .catch((err) => console.error(err));
  };

  const loadReviews = () => {
    axios
        .get<ReviewModel[]>(`http://localhost:3001/reviews/${id}`)
        .then((result) => setReviews(result.data))
        .catch((err) => console.error(err));
  };

  const onUpdate = (id: string, title: string) => {
    axios
        .patch(`http://localhost:3001/books/${id}`, { title })
        .then(() => {
          setBook({ ...book!, title });
        })
        .catch((error) => {
          console.error(error);
        });
  };

    const onCreateReview = async (review: CreateReviewModel) => {
        try {
            const response = await axios.post('http://localhost:3001/reviews', {
                rating: review.rating,     // Assurez-vous que "rating" est un nombre valide
                comment: review.comment,   // "comment" peut être une chaîne vide ou une chaîne valide
                bookId: review.bookId      // L'ID du livre auquel l'avis appartient
            });
            setReviews((prevReviews) => [...prevReviews, response.data]);
        } catch (error) {
            console.error('Erreur lors de la création de l\'avis:', error);
            alert('Il y a eu une erreur lors de l\'ajout de l\'avis. Veuillez vérifier les données.');
        }
    };

  const onDeleteReview = (id: string) => {
    axios
        .delete(`http://localhost:3001/reviews/${id}`)
        .then(() => {
          setReviews((prev) => prev.filter((review) => review.id !== id));
        })
        .catch((error) => {
          console.error(error);
        });
  };

  return { book, reviews, loadBook, loadReviews, onUpdate, onCreateReview, onDeleteReview };
};
