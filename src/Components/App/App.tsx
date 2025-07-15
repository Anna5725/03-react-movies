
import css from "./App.module.css";
import SearchBar from '../SearchBar/SearchBar';
import MovieModal from '../MovieModal/MovieModal';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import type {Movie} from '../../types/movie';
import {fetchMovies} from '../../services/movieService';
import {useState} from "react";
import MovieLoader from '../Loader/Loader';
import MovieGrid from '../MovieGrid/MovieGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';


export default function App ()
{const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
      
      try {
          setMovies([]);
          setIsLoading(true);
          setIsError(false);
          setSelectedMovie(null);

          const data = await fetchMovies(query);

          if (data.length === 0) {
              toast("No movies found for your request.", {
                  duration: 2000,
                  position: 'top-center',
                });
          }

          setMovies(data);
   
      } catch {
          setIsError(true);
      } finally {
          setIsLoading(false);
      }
  };

  const handleSelectedMovie = (movie: Movie) => {
      setSelectedMovie(movie);
      setIsModalOpen(true);
  }

  const closeModal = () => {
      setSelectedMovie(null);
      setIsModalOpen(false);
  }
return(
<div className = {css.app}>
<SearchBar onSubmit = {handleSearch}/>
<MovieLoader/>
<Toaster/>
{isLoading && <MovieLoader />}

{isError && <ErrorMessage />}

{movies.length > 0 && <MovieGrid onSelect={handleSelectedMovie} movies={movies} />}

{isModalOpen && selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
</div>
);

}