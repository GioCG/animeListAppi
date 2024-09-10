import React, { useState } from 'react'

export const SearchAnime = ({ handleGetAnime }) => {
    const [animeName, setAnimeName] = useState('')

    return (
        <div className='d-flex flex-row justify-content-center align-items-center mt-3'>
            <form className='d-flex' onSubmit={(e) => { handleGetAnime(e, animeName) }}>
                <input
                    type='text'
                    placeholder="Search Anime"
                    className='form-control me-2'
                    onChange={(e) => { setAnimeName(e.target.value.toLowerCase()) }}
                />
                <input type='submit' value={'Search'} className='btn btn-outline-secondary' />
            </form>
        </div>
    );
};
