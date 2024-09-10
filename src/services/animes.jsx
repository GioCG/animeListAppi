const api_url = `https://kitsu.io/api/edge/anime`;

export const reqAnimeInfo = async (animeName) => {
        const url = await fetch(`${api_url}?filter[text]=${animeName}`);
        const resp = await url.json();
        
        const data = resp.data[0];

        const anime = {
            id: data.id,
            title: data.attributes.titles.en_jp,
            url: data.attributes.posterImage.original,
            description: data.attributes.synopsis,
            episodes: []
        };

        let episodes = []
        let nextPageUrl = `${api_url}/${anime.id}/episodes`

        while (nextPageUrl) {
            const episodesResp = await fetch(nextPageUrl)
            const episodesData = await episodesResp.json()

            const newEpisodes = episodesData.data.map(episode => ({
                number: episode.attributes.number,
                title: episode.attributes.titles.en_us || `Episodio ${episode.attributes.number}`,
                description: episode.attributes.synopsis || 'Sin descripción disponible'
            }))

            episodes = episodes.concat(newEpisodes)

            
            nextPageUrl = episodesData.links.next || null
        }

        anime.episodes = episodes;

        return anime;
}
