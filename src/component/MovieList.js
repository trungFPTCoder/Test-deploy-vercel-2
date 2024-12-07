import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewMovies } from "../service/MovieService";
import { setNewMovies } from "./MovieStore";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import '../assest/MovieList.css';
import { Helmet } from "react-helmet";
import LoadingComponent from "./LoadingComponent";
import { fetchMovieDetails } from '../service/MovieService';
import { setMovieDetails } from './MovieStore';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
function MovieList() {
  const newMovies = useSelector((state) => state.newMovies);
  const dispatch = useDispatch();
  const carouselRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [loading, setLoading] = useState(true);
  const movieDetails = useSelector((state) => state.movieDetails);
  const [slug, setSlug] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const moviesData = await fetchNewMovies();
      dispatch(setNewMovies(moviesData));
      setLoading(false);
    };
    loadMovies();
  }, [dispatch]);
  useEffect(() => {
    const loadMovieDetails = async () => {
      if (slug) {
        // setLoading(true);
        const moviesDetailData = await fetchMovieDetails(slug);
        dispatch(setMovieDetails(moviesDetailData));
        // setLoading(false);
      }
    };
    loadMovieDetails();
  }, [dispatch, slug]);
  useEffect(() => {
    if (newMovies.length > 0) {
      setSlug(newMovies[0].slug); // Set initial slug to the first movie's slug
    }
  }, [newMovies]);
  const handleSlideChange = (swiper) => {
    const currentSlideIndex = swiper.activeIndex;
    const currentMovie = newMovies[currentSlideIndex];
    if (currentMovie) {
      setSlug(currentMovie.slug);
    }
  };
  /////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    // Calculate the width of two columns
    const handleResize = () => {
      if (carouselRef.current) {
        const column = carouselRef.current.querySelector('.col-6');
        if (column) {
          const columnWidth = column.offsetWidth;
          setScrollDistance(columnWidth * 2);
        }
      }
    };

    // Call handleResize after a short delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(handleResize, 100);

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: scrollDistance, behavior: 'smooth' });
  };
  const convertTime = (time) => {
    const minutes = parseInt(time);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };
  if (!newMovies) {
    return <LoadingComponent />
  }
  if (loading) {
    return <LoadingComponent />
  }
  return (
    <div className="container-fluid bg-dark text-light pb-3" >
      <Helmet>
        <title>Trang chủ</title>
        <meta name="description" content="Trang chủ" />
      </Helmet>

      {/* swiper thử nghiệm */}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={handleSlideChange}
        grabCursor={true}
      >
        {newMovies.map((newMovie) => (
          <SwiperSlide key={newMovie.slug}>
            {/* <div className="position-relative"> */}
            <div className='img-container position-relative swiper--img'>
              <img src={newMovie.poster_url} className="w-100 object-fit-cover" alt={newMovie.name} />
              <div className="position-absolute mobile--view" style={{ top: '40%', left: '20px' }}>
                <div className="text-warp">
                  <p className="text-primary bg-dark opacity-75 h1 rounded p-2" style={{ width: 'fit-content' }}>{movieDetails.name}</p>
                </div>
                <div className='d-flex mt-3'>
                  <div className='border border-light border-1 mx-1 p-1 px-2 rounded' style={{ backgroundColor: '#343232', opacity: '0.7' }}>
                    {movieDetails.category?.[3].list[0].name}
                  </div>
                  <div className='border border-light border-1 mx-1 p-1 px-2 rounded' style={{ backgroundColor: '#343232', opacity: '0.7' }}>
                    {movieDetails.category?.[1].list[0].name}
                  </div>
                  <div className='border border-light border-1 mx-1 p-1 px-2 rounded' style={{ backgroundColor: '#343232', opacity: '0.7' }}>
                    {movieDetails.current_episode}
                  </div>
                  <div className='border border-light border-1 mx-1 p-1 px-2 rounded' style={{ backgroundColor: '#343232', opacity: '0.7' }}>
                    {convertTime(movieDetails.time) === '' ? convertTime(movieDetails.time) : 'Đang cập nhật'}
                  </div>
                </div>
                <div className='d-flex mt-2'>
                  {movieDetails.category?.[2].list.map((item) => (
                    <div className='category--movie mx-1 p-1 px-2 rounded' key={item.id}>
                      {item.name}
                    </div>
                  ))}
                </div>
                <div className="mt-2 des-movie">
                  <p className='text-light bg-dark opacity-75 rounded p-1'>{movieDetails.description}</p>
                </div>
              </div>
              <div className="play-button">
                <Link to={`/watch/${newMovie.slug}`}><FontAwesomeIcon icon={faPlayCircle} fontSize={60} color="white" /></Link>
              </div>
            </div>
            {/* </div> */}
          </SwiperSlide>
        ))}
      </Swiper>
      <h3 className="mb-3 mt-3">Phim mới cập nhật:</h3>
      // <div className="carousel-container">
      //   <button className="btn btn-secondary mx-3" onClick={scrollLeft}>{"<"}</button>
      //   <div className="row flex-nowrap overflow-auto" ref={carouselRef}>
      //     {Array.isArray(newMovies) ? (
      //       newMovies.map((newMovie) => (
      //         <div className="col-6 col-md-2 col-sm-3 mb-4" key={newMovie.slug}>
      //           <div className="card border-0 h-100 d-flex flex-column">
      //             <div className='img-container overflow-hidden position-relative'>
      //               <img src={newMovie.thumb_url} className="card-img hover-thumb" height={300} alt={newMovie.name} />
      //               <div className="play-button">
      //                 <Link to={`/watch/${newMovie.slug}`}><FontAwesomeIcon icon={faPlayCircle} fontSize={60} color="white" /></Link>
      //               </div>
      //             </div>
      //             <div className='movie--name position-absolute'>
      //               <h6 className='text-center text-light'>{newMovie.name}</h6>
      //             </div>
      //           </div>
      //         </div>
      //       ))
      //     ) : (
      //       <p>No movies available</p>
      //     )}
      //   </div>
      //   <button className="btn btn-secondary mx-3" onClick={scrollRight}>{">"}</button>
      // </div>    
        <div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={6}
          navigation
          grabCursor={true}
          autoplay={{ delay: 4000 }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 3,
              spaceBetween: 5,
              slidesPerGroup: 1
            },
            // when window width is >= 640px
            1024: {
              slidesPerView: 6,
              spaceBetween: 10,
              slidesPerGroup: 3
            },
            // when window width is >= 540px
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
              slidesPerGroup: 2
            }
          }}
        >
          {newMovies.map((newMovie) => (
            <SwiperSlide>
              <div className="card border-0">
                <div className='img-container overflow-hidden position-relative'>
                  <img src={newMovie.thumb_url} className="card-img hover-thumb" height={350} alt={newMovie.name} />
                  <div className="play-button">
                    <Link to={`/watch/${newMovie.slug}`}><FontAwesomeIcon icon={faPlayCircle} fontSize={60} color="white" /></Link>
                  </div>
                </div>
                <div className='movie--name position-absolute'>
                  <h6 className='text-center text-light'>{newMovie.name}</h6>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieList;
