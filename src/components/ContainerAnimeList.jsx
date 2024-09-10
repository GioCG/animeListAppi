import React, { useState } from 'react';

export const ContainerAnimeList = ({ animeList, totalPages, currentPage, handlePageChange }) => {
    const [pageRange, setPageRange] = useState({ start: 0, end: 9 }); // Inicialmente mostramos las primeras 10 páginas

    const maxPageButtons = 10; 

    
    const handlePagination = (pageNumber) => {
        handlePageChange(pageNumber);

       
        if (pageNumber > pageRange.end + 1) {
            setPageRange({
                start: pageRange.start + maxPageButtons,
                end: Math.min(pageRange.end + maxPageButtons, totalPages - 1)
            });
        } else if (pageNumber <= pageRange.start) {
            setPageRange({
                start: Math.max(pageRange.start - maxPageButtons, 0),
                end: pageRange.start - 1
            });
        }
    };


    const handleNextRange = () => {
        if (pageRange.end < totalPages - 1) {
            setPageRange({
                start: pageRange.start + maxPageButtons,
                end: Math.min(pageRange.end + maxPageButtons, totalPages - 1)
            });
        }
    };

    const handlePrevRange = () => {
        if (pageRange.start > 0) {
            setPageRange({
                start: Math.max(pageRange.start - maxPageButtons, 0),
                end: pageRange.start - 1
            });
        }
    };

    return (
        <>  
            
            <div className="bg-dark text-white py-5">
                <div className="row mt-4">
                    {animeList.map((anime) => (
                        <div key={anime.id} className="col-md-3 mb-4">
                            <div className="card bg-secondary text-white">
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
                        <li className={`page-item ${pageRange.start === 0 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={handlePrevRange}>
                                &laquo; Anterior
                            </button>
                        </li>

                        {[...Array(totalPages).keys()].slice(pageRange.start, pageRange.end + 1).map((_, idx) => (
                            <li
                                key={idx}
                                className={`page-item ${currentPage === pageRange.start + idx + 1 ? 'active' : ''}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => handlePagination(pageRange.start + idx + 1)}
                                >
                                    {pageRange.start + idx + 1}
                                </button>
                            </li>
                        ))}

                        <li className={`page-item ${pageRange.end >= totalPages - 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={handleNextRange}>
                                Siguiente &raquo;
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
 
             
        </>

        
    );
};
