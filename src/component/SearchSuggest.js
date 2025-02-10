import React, { useCallback, useEffect, useState } from 'react'
import { setSearchMovies, setSearchMoviesSuggest } from './MovieStore';
import { fetchSearchMovie } from '../service/MovieService';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from './LoadingComponent';
import '../assest/SearchSuggest.css';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
function SearchSuggest({ keywordFromURL }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // useEffect(() => {
    //     const loadMovieSearch = async () => {
    //         try {
    //             setLoading(true);
    //             const searchMovieData = await fetchSearchMovie(keywordFromURL, currentPage);
    //             dispatch(setSearchMoviesSuggest(searchMovieData));
    //             setLoading(false);
    //         } catch (error) {
    //             // console.log(error);
    //             setLoading(false);
    //             return <div>Not found</div>
    //         }
    //     };
    //     loadMovieSearch();
    // }, [dispatch, keywordFromURL, currentPage]);
    const loadMovieSearch = useCallback(debounce(async (keyword, page) => {
        try {
            setLoading(true);
            const searchMovieData = await fetchSearchMovie(keyword, page);
            dispatch(setSearchMoviesSuggest(searchMovieData));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching movie data:', error);
        }
    }, 300), [dispatch]);
    useEffect(() => {
        if (keywordFromURL) {
            loadMovieSearch(keywordFromURL, currentPage);
        }
    }, [keywordFromURL, currentPage, loadMovieSearch]);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const searchMovies = useSelector((state) => state.searchMoviesSuggest);
    if (!searchMovies) {
        setLoading(true);
    }

    const convertTime = (time) => {
        const minutes = parseInt(time);
        if (isNaN(minutes)) {
            return 'Đang cập nhật';
        }
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };
    // console.log('2' + searchMovies.items);
    return (
        <div className='text-light'>
            <div className='position-relative'>
                <div className='container-result rounded-1 p-3'>
                    {loading ? (
                        <LoadingComponent />
                    ) : (
                        searchMovies.items?.length > 0 ? (
                            <div>
                                <p>Danh sách phim</p>
                                <hr />
                                {searchMovies.items.map((item, index) => (
                                    <Link to={`/watch/${item.slug}`} className='text-decoration-none text-light'>
                                        <div key={index} className='p-3 movie-item'>
                                            <div className="row">
                                                <div className="col-3 d-flex justify-content-center align-items-center">
                                                    <img src={item.thumb_url} className='rounded ' width={65} alt="" />
                                                </div>
                                                <div className="col-9">
                                                    <p className='movie---name mb-2'>{item.name}</p>
                                                    <p className='movie---name original--name'>{item.original_name}</p>
                                                    <p className='movie--detail mb-1'>{convertTime(item.time)} &#x2022; {item.current_episode} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className='text-center'>Không tìm thấy kết quả nào</div>
                        )
                    )}

                </div>
            </div>
        </div>
    )
}

export default SearchSuggest
