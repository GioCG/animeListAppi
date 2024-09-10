import React from 'react';
import { useAnimeList, useAnime } from '../hooks/useAnime';
import { SearchAnime } from './SearchAnime';
import { ContainerAnime } from './ContainerAnime';

const AnimeApp = () => {
    const { animeList, loading, error, currentPage, totalPages, setCurrentPage } = useAnimeList();
    const { anime, handleGetAnime } = useAnime();

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <div className="text-center mt-5">Cargando...</div>;
    if (error) return <div className="text-center mt-5">{error}</div>;

    return (
        <div className="container">
            <SearchAnime handleGetAnime={handleGetAnime} />

            {!anime && (
                <>
                    <div className="row mt-4">
                        {animeList.map((anime) => (
                            <div key={anime.id} className="col-md-3 mb-4">
                                <div className="card">
                                    <img src={anime.imageUrl} alt={anime.title} className="card-img-top" />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{anime.title}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <nav className="mt-4">
                        <ul className="pagination justify-content-center">
                            {[...Array(totalPages)].map((_, idx) => (
                                <li
                                    key={idx}
                                    className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(idx + 1)}
                                    >
                                        {idx + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </>
            )}

            {anime && <ContainerAnime anime={anime} />}
        </div>
    );
};

export default AnimeApp;
