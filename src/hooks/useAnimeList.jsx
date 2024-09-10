import { useState, useEffect } from 'react';
import { reqAnimeList } from '../services/animes';

export const useAnimeList = () => {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalAnimes, setTotalAnimes] = useState(0);
    const animesPerPage = 12; // Definir la cantidad de animes por página

    useEffect(() => {
        const fetchAnimeList = async () => {
            setLoading(true);
            try {
                const data = await reqAnimeList(currentPage, animesPerPage);
                setAnimeList(data);
                setTotalAnimes(500);  // Establecer manualmente un número si la API no da el total
            } catch (err) {
                setError('Error al obtener la lista de animes.');
            }
            setLoading(false);
        };

        fetchAnimeList();
    }, [currentPage]);

    const totalPages = Math.ceil(totalAnimes / animesPerPage);

    return {
        animeList,
        loading,
        error,
        currentPage,
        totalPages,
        setCurrentPage
    };
};
