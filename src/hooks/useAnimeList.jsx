import { useState, useEffect } from 'react'
import { reqAnimeList} from '../services/animeList'

export const useAnimeList = () => {
    const [animeList, setAnimeList] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalAnimes, setTotalAnimes] = useState(0)
    const animesPerPage = 12

    useEffect(() => {
        const fetchAnimeList = async () => {
            setLoading(true)
            try {
                const data = await reqAnimeList(currentPage, animesPerPage)
                setAnimeList(data)
                setTotalAnimes(40000)
            } catch (err) {
                setError('Error al obtener la lista de animes.')
            }
            setLoading(false)
        };

        fetchAnimeList()
    }, [currentPage])

    const totalPages = Math.ceil(totalAnimes / animesPerPage)

    return {
        animeList,
        loading,
        currentPage,
        totalPages,
        setCurrentPage
    }
}
