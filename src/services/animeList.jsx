const api_url = `https://kitsu.io/api/edge/anime`;

export const reqAnimeList = async (page = 1, limit = 12) => {
    const url = `${api_url}?page[limit]=${limit}&page[offset]=${(page - 1) * limit}`;
    const response = await fetch(url);
    const data = await response.json();

    return data.data.map(anime => ({
        id: anime.id,
        title: anime.attributes.titles.en_jp,
        imageUrl: anime.attributes.posterImage?.small,
    }));
};
