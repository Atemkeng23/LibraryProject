import axios from "axios";
import { AuthorModel, CreateAuthorModel } from "../models/AuthorModel";
import { BookModel } from "../models/BookModel";
import { useState, useEffect } from "react";

// Hook pour charger la liste des auteurs
export const useListAuthorProviders = () => {
    const [authors, setAuthors] = useState<AuthorModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fonction pour charger les auteurs depuis l'API
    const loadAuthors = () => {
        setLoading(true);
        axios
            .get<AuthorModel[]>("http://localhost:3001/authors")
            .then((response) => {
                setAuthors(response.data);
                setError(null);  // Réinitialiser l'erreur en cas de succès
            })
            .catch((error) => {
                setError("Erreur lors du chargement des auteurs");
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Utilisation de useEffect pour charger les auteurs au démarrage
    useEffect(() => {
        loadAuthors();
    }, []);

    // Fonction pour supprimer un auteur
    const onDelete = (id: string) => {
        axios
            .delete(`http://localhost:3001/authors/${id}`)
            .then(() => {
                setAuthors((prev) => prev.filter((author) => author.id !== id));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // Fonction pour mettre à jour un auteur
    // Fonction pour mettre à jour un auteur
    // Fonction pour mettre à jour un auteur
    const onUpdate = (id: string, name: string) => {
        // Vérifie si `name` est une chaîne de caractères valide
        if (typeof name !== "string" || name.trim() === "") {
            console.error("Le nom doit être une chaîne de caractères valide");
            return;
        }

        // Nettoyer le nom (retirer la ponctuation)
        const cleanedName = name.replace(/[^a-zA-Z\s]/g, "").trim();

        // Diviser le nom en prénom et nom de famille
        const [firstName, lastName] = cleanedName.split(" ");

        // Vérifier qu'il y a bien un prénom et un nom de famille
        if (!firstName || !lastName) {
            console.error("Le nom doit contenir un prénom et un nom de famille.");
            return;
        }

        // Si tout est valide, mettre à jour
        axios
            .patch(`http://localhost:3001/authors/${id}`, { firstName, lastName })
            .then(() => {
                setAuthors((prev) =>
                    prev.map((author) =>
                        author.id === id ? { ...author, firstName, lastName } : author
                    )
                );
            })
            .catch((error) => {
                console.error("Erreur lors de la mise à jour de l'auteur :", error);
            });
    };





    // Fonction pour créer un auteur
    const onCreate = (input: CreateAuthorModel) => {
        axios
            .post("http://localhost:3001/authors", { author: input })
            .then(() => {
                loadAuthors();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return {
        authors,
        loading,
        error,
        onCreate,
        loadAuthors,
        onUpdate,
        onDelete,
    };
};

export const useGetAuthorProvider = (id: string) => {
    const [author, setAuthor] = useState<AuthorModel | null>(null)
    const [books, setBooks] = useState<BookModel[]>([])

    const loadAuthor = () => {
        axios.get<AuthorModel>(`http://localhost:3001/authors/${id}`)
            .then((result) => {
                setAuthor(result.data)
                return result.data.id
            })
            .then((authorId) => {
                axios.get<BookModel[]>(`http://localhost:3001/books?authorId=${authorId}`)
                    .then((response) => setBooks(response.data.filter(book => book.authorId === authorId))) // Filtrer les livres par authorId
                    .catch((err) => console.error(err))
            })
            .catch((err) => console.error(err))
    }

    return { author, books, loadAuthor }
}
