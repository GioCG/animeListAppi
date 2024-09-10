import { useState, useEffect } from 'react';
import { reqAnimeList, reqAnimeInfo } from '../services/animes';

export const useAnimeList = () => {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalAnimes, setTotalAnimes] = useState(0);
    const animesPerPage = 12; 

    useEffect(() => {
        const fetchAnimeList = async () => {
            setLoading(true);
            try {
                const data = await reqAnimeList(currentPage, animesPerPage);
                setAnimeList(data);
                setTotalAnimes(500); 
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
        currentPage,
        totalPages,
        setCurrentPage
    };
};

// Hook para obtener información de un anime específico
export const useAnime = () => {
    const [anime, setAnime] = useState(null);
    const [error, setError] = useState(null);

    const handleGetAnime = (e, name) => {
        e.preventDefault();
        setError(null);

        reqAnimeInfo(name)
            .then((data) => {
                if (data) {
                    setAnime(data);
                } else {
                    setError('Anime no encontrado');
                }
            })
            .catch((error) => setError('Error al buscar el anime'));
    };

    return {
        anime,
        error,
        handleGetAnime
    };
};
