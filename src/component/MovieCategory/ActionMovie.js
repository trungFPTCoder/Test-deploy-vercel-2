import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieCate } from '../../service/MovieService';
import { setActionMovies, setactionMovies } from '../MovieStore';
import LoadingComponent from '../LoadingComponent';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
function ActionMovie({ cate }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const actionMovies = useSelector((state) => state.actionMovies);
    // useEffect(() => {
    //     const loadActionMovies = async () => {
    //         setLoading(true);
    //         const movieData = await fetchMovieCate(cate);
    //         dispatch(setActionMovies(movieData));
    //         setLoading(false);
    //     }
    //     loadActionMovies();
    // }, [dispatch, cate]);
    useEffect(() => {
        const loadActionMovies = async () => {
            setLoading(true);
            try {
                const movieData = await fetchMovieCate(cate);
                dispatch(setActionMovies(movieData));
            } catch (error) {
                console.error('Failed to fetch action movies:', error);
            } finally {
                setLoading(false);
            }
        }
        loadActionMovies();
    }, [dispatch, cate]);
    // console.log(actionMovies);
    if (loading) {
        return <LoadingComponent />
    }
    return (
        <div>
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={10}
                slidesPerView={6}
                navigation
                grabCursor={true}
                autoplay={{ delay: 4000 }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log('slide change')}
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
                {actionMovies.items.map((actionMovie) => (
                    <SwiperSlide>
                        <div className="card border-0 movie--width">
                            <div className='img-container overflow-hidden position-relative'>
                                <img src={actionMovie.thumb_url} className="card-img hover-thumb" alt={actionMovie.name} />
                                <div className="play-button">
                                    <Link to={`/watch/${actionMovie.slug}`}><FontAwesomeIcon icon={faPlayCircle} fontSize={60} color="white" /></Link>
                                </div>
                            </div>
                            <div className='movie--name position-absolute'>
                                <h6 className='text-center text-light'>{actionMovie.name}</h6>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default ActionMovie
