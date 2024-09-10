import React from 'react';
import { useAnime } from '../hooks/useAnime';
import { useAnimeList } from '../hooks/useAnimeList';
import { SearchAnime } from './SearchAnime';
import { ContainerAnime } from './ContainerAnime';
import { ContainerAnimeList } from './ContainerAnimeList';



const AnimeApp = () => {
    const { animeList, loading, error, currentPage, totalPages, setCurrentPage } = useAnimeList();
    const { anime, handleGetAnime } = useAnime();

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <div className="text-center mt-5">Cargando...</div>;
    if (error) return <div className="text-center mt-5">{error}</div>;

    return (
        <body>
            <div className="container">
                
                <SearchAnime handleGetAnime={handleGetAnime} />

                {!anime && (
                    <ContainerAnimeList
                        animeList={animeList}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                    />
                )}

                {anime && <ContainerAnime anime={anime} />}
            </div>
        </body>
             

       
    );
};

export default AnimeApp;
