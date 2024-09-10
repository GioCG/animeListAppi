
import { useAnime } from '../hooks/useAnime';
import { SearchAnime } from './SearchAnime';
import { ContainerAnime } from './ContainerAnime';

const App = () => {
    const { anime, handleGetAnime } = useAnime();

    return (
        <div className="container">
            <SearchAnime handleGetAnime={handleGetAnime} />
            {anime && <ContainerAnime anime={anime} />}
        </div>
    );
};

export default App;
