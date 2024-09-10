import React, { useState } from 'react';

export const ContainerAnime = ({ anime }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const episodesPerPage = 35;

    const indexOfLastEpisode = currentPage * episodesPerPage;
    const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
    const currentEpisodes = anime.episodes.slice(indexOfFirstEpisode, indexOfLastEpisode);

    const handleNextPage = () => {
        if (indexOfLastEpisode < anime.episodes.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="d-flex flex-row mt-5">
            <div className="p-2 card h-100 bg-secondary-subtle" style={{ width: '50%' }}>
                <img src={anime.url} className="card-img-top" alt={anime.title} style={{ width: '100%' }} />
                <ul className="list-group list-group-flush">
                    <li className="list-group-item list-group-item-secondary">
                        <h2>{anime.title}</h2>
                    </li>
                    <li className="list-group-item">
                        <p>{anime.description}</p>
                    </li>
                </ul>
            </div>

            <div className="p-2">
                <h3>Episodios</h3>
                <ul className="list-group">
                    {currentEpisodes.map((episode) => (
                        <li key={episode.number} className="list-group-item list-group-item-secondary">
                            <strong>Episodio {episode.number}:</strong> {episode.title}
                        </li>
                    ))}
                </ul>

                <div className="pagination-controls mt-3">
                    <button
                        className="btn btn-outline-secondary me-2"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Página Anterior
                    </button>

                    <button
                        className="btn btn-outline-secondary"
                        onClick={handleNextPage}
                        disabled={indexOfLastEpisode >= anime.episodes.length}
                    >
                        Siguiente Página
                    </button>
                </div>
            </div>
        </div>
    );
};
