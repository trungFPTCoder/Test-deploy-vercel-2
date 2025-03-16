import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAccount, fetchFavoMovie } from '../../service/MovieService';
import { setAccount, setFavoMovie } from '../MovieStore';
import LoadingComponent from '../LoadingComponent';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import '../../assest/MovieCate.css';
import '../../assest/FavoritiesMovie.css';
function FavoritiesMovie() {
  // const favoMovies = useSelector((state) => state.favoMovie);
  const accounts = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const loadFavoMovies = async () => {
  //     setLoading(true);
  //     const favoMoviesData = await fetchFavoMovie();
  //     // console.log(favoMoviesData);
  //     dispatch(setFavoMovie(favoMoviesData));
  //     setLoading(false);
  //   };
  //   loadFavoMovies();
  // }, [dispatch]);
  useEffect(() => {
    const loadAccounts = async () => {
      setLoading(true);
      const accountsData = await fetchAccount();
      // console.log(favoMoviesData);
      dispatch(setAccount(accountsData));
      setLoading(false);
    };
    loadAccounts();
  }, [dispatch]);
  // console.log(favoMovies);
  if (loading) return <LoadingComponent />
  // const FavoriteMovie = favoMovies.
  const username = sessionStorage.getItem('user');
  const email = sessionStorage.getItem('email');

  const accountUser = accounts.find((account) => account.FullName === username && account.email === email);
  console.log(accountUser);
  return (
    <div>
      <div className='border border-light-1 text-light p-3 rounded-2'>
        {loading ? (<LoadingComponent />) : (
          <div className='row'>
            {accountUser.FavoriteMovie.map((movie) => (
              <div className='col-6 col-md-3 col-sm-4 col-xl-2 mb-3'>
                <div className='card position-relative tooltip-wrapper border-0 w-100'>
                  <div className='img-container position-relative overflow-hidden'>
                    <img
                      src={movie.thumb_url}
                      alt={movie.name}
                      className='hover-thumb w-100 '
                    // height={200}
                    />
                    <div className="play-button">
                      <Link to={`/watch/${movie.slug}`}>
                        <FontAwesomeIcon icon={faPlayCircle} fontSize={60} color="white" />
                      </Link>
                    </div>
                  </div>
                  <div className='movie--name position-absolute'>
                    <Link to={`/watch/${movie.slug}`} className='text-decoration-none'>
                      <h6 className='text-center text-light'>{movie.name}</h6>
                    </Link>
                  </div>
                  <div className="tooltip-content-favo">{movie.name}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FavoritiesMovie