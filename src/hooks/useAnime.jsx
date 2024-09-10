import { useState } from 'react';
import { reqAnimeInfo } from '../services/animes';

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
