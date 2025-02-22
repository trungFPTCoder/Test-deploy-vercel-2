import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFavoMovie } from '../../service/MovieService';
import { setFavoMovie } from '../MovieStore';
import LoadingComponent from '../LoadingComponent';

function FavoritiesMovie() {
  const favoMovies = useSelector((state) => state.favoMovie);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadFavoMovies = async () => {
      setLoading(true);
      const favoMoviesData = await fetchFavoMovie();
      // console.log(favoMoviesData);
      dispatch(setFavoMovie(favoMoviesData));
      setLoading(false);
    };
    loadFavoMovies();
  }, [dispatch]);
  // console.log(favoMovies);
  // const FavoriteMovie = favoMovies.
  return (
    <div>
      <div className='border border-light-1 text-light'>
        {loading ? (<LoadingComponent/>):(
          <div>
            {favoMovies.map((favoMovie)=>(
              <div key={favoMovie.id}>
                {/* <img src={favoMovie.poster_url} alt="" /> */}
                {favoMovie.FullName}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FavoritiesMovie
