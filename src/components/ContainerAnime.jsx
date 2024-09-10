import React, { useState } from 'react';

export const ContainerAnime = ({ anime }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const episodesPerPage = 50;

    // Calcular índices de episodios que se mostrarán en la página actual
    const indexOfLastEpisode = currentPage * episodesPerPage;
    const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
    const currentEpisodes = anime.episodes.slice(indexOfFirstEpisode, indexOfLastEpisode);

    // Cambiar de página
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
        <div className="d-flex flex-row">
            {/* Contenedor de la imagen y la sinopsis */}
            <div className="p-2" style={{ width: '50%' }}>
                <img src={anime.url} alt={anime.title} style={{ width: '100%' }} />
                <h2>{anime.title}</h2>
                <p>{anime.description}</p>
            </div>

            {/* Contenedor de la lista de episodios */}
            <div className="p-2">
                <h3>Episodios</h3>
                <ul>
                    {currentEpisodes && currentEpisodes.length > 0 ? (
                        currentEpisodes.map((episode) => (
                            <li key={episode.number}>
                                <strong>Episodio {episode.number}:</strong> {episode.title}
                            </li>
                        ))
                    ) : (
                        <p>No hay episodios disponibles.</p>
                    )}
                </ul>

                {/* Controles de paginación */}
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


