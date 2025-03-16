import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { fetchAccount, fetchFavoMovie, fetchMovieDetails } from '../service/MovieService';
import { useDispatch, useSelector } from 'react-redux';
import { setAccount, setFavoMovie, setMovieDetails } from './MovieStore';
import '../assest/WatchMovie.css';
import LoadingComponent from './LoadingComponent';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartBroken, faMicrophone, faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faClosedCaptioning } from '@fortawesome/free-regular-svg-icons';
// import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import bootstrap from '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min';
function WatchMovie() {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    let followMovie = () => {

    }
    const [follow, setFollow] = useState(followMovie());
    const movieDetails = useSelector((state) => state.movieDetails);
    // thử nghiệm theo dõi phim
    const accounts = useSelector((state) => state.account);
    useEffect(() => {
        const loadAccounts = async () => {
            setLoading(true);
            const accountsData = await fetchAccount();
            // console.log(favoMoviesData);
            dispatch(setAccount(accountsData));
            const moviesDetailData = await fetchMovieDetails(slug);
            dispatch(setMovieDetails(moviesDetailData));
            setLoading(false);
        };
        loadAccounts();
    }, [dispatch]);
    //   
    if (loading) {
        return <div><LoadingComponent></LoadingComponent></div>
    }
    // useEffect(() => {
    //     const loadMovieDetails = async () => {
    //         setLoading(true);
    //         const moviesDetailData = await fetchMovieDetails(slug);
    //         dispatch(setMovieDetails(moviesDetailData));
    //         setLoading(false);
    //     };
    //     loadMovieDetails();
    // }, [dispatch, slug]);
    //thử nghiệm theo dõi phim
    const username = sessionStorage.getItem('user');
    const email = sessionStorage.getItem('email');
    const accountUser = accounts.find((account) => account.FullName === username && account.email === email);
    console.log(accountUser);
    followMovie = () => {
        // const followedMovies = favoMovies.
        const followedMovies = accountUser.FavoriteMovie;
        return followedMovies.some((movie) => movie.slug === slug);
    }

    const formattedDate = new Date(movieDetails.created).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const convertTime = (time) => {
        const minutes = parseInt(time);
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };



    // console.log(followMovie())
    // 

    const handleFollowClick = () => {
        if (follow) {
            // Show the modal to confirm the action
            const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
            modal.show();
        } else {
            // Toggle the follow state
            if (username === null && email === null) {
                const modal = new bootstrap.Modal(document.getElementById('exampleModal1'));
                modal.show();
            }
            else {
                setFollow(!follow);
            }
        }
    };

    const confirmUnfollow = () => {
        setFollow(false);
    };
    return (
        <div className='bg-dark' >
            {/* background image */}
            <div
                className='background-container w-100'
                style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 100%), url(${movieDetails.poster_url})` }}
            >
            </div>
            <div className='container-fluid'>
                {/* meta tag không đụng */}
                <Helmet>
                    <title>{`Xem phim ${movieDetails.name}`}</title>
                    <meta name="description" content={movieDetails.name} />
                    {/* <meta property="og:image" content="https://mycinemavn.vercel.app/images/logo.png"/> */}
                </Helmet>
                <div style={{ marginTop: '-30vh' }}>
                    <div className='row g-2'>
                        <div className='col-md-4'>
                            <div className='card p-4 bg-dark text-light'>
                                <img src={movieDetails.thumb_url} className='w-50 card-img mx-auto' alt='Movie Thumbnail' />
                                <h5 className='mt-3'>{movieDetails.name}</h5>
                                <small className='text-warning'>{movieDetails.original_name}</small>
                                <div className='d-flex flex-wrap mt-3'>
                                    {movieDetails.category?.[3]?.list?.[0]?.name ? (
                                        <div className='border border-light border-1 mx-1 p-1 px-2 mb-2 rounded'>
                                            {movieDetails.category[3].list[0].name}
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    {movieDetails.category?.[1]?.list?.[0]?.name ? (
                                        <div className='border border-light border-1 mx-1 p-1 px-2 mb-2 rounded'>
                                            {movieDetails.category[1].list[0].name}
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    <div className='border border-light border-1 mx-1 p-1 px-2 mb-2 rounded'>
                                        {movieDetails.current_episode ? movieDetails.current_episode : 'Đang cập nhật'}
                                    </div>
                                    <div className='border border-light border-1 mx-1 p-1 px-2 mb-2 rounded'>
                                        {convertTime(movieDetails.time) === '' ? convertTime(movieDetails.time) : 'Đang cập nhật'}
                                    </div>
                                </div>
                                <div className='d-flex flex-wrap mt-2'>
                                    {/* {movieDetails.category[2]?.list?.map((item) => (
                                        <div className='category--movie mx-1 mb-2 p-1 px-2 rounded' key={item.id}>
                                            {item.name}
                                        </div>
                                    ))} */}
                                    {movieDetails.category && movieDetails.category[2] && movieDetails.category[2].list ? (
                                        movieDetails.category[2].list.map((item) => (
                                            <div className='category--movie mx-1 mb-2 p-1 px-2 rounded' key={item.id}>
                                                {item.name}
                                            </div>
                                        ))
                                    ) : (
                                        <div>No categories available</div>
                                    )}
                                </div>
                                <div className='mt-3'>
                                    <strong>Giới thiệu: </strong> <br />
                                    <small style={{ color: '#ddd' }}>{movieDetails.description}</small> <br />
                                    <p className='mt-3' style={{ color: '#ddd' }}><strong className='text-light'>Quốc gia: </strong>{movieDetails.category?.[4]?.list?.[0]?.name ? (movieDetails.category[4].list[0].name) : ('Đang cập nhật')}</p>
                                    <p className='mt-3' style={{ color: '#ddd' }}><strong className='text-light'>Đạo diễn: </strong>{movieDetails.director ? movieDetails.director : 'Đang cập nhật'}</p>
                                    <p className='mt-3' style={{ color: '#ddd' }}><strong className='text-light'>Diễn viên: </strong>{movieDetails.casts ? movieDetails.casts : 'Đang cập nhật'}</p>
                                    <p className='mt-3' style={{ color: '#ddd' }}><strong className='text-light'>Thời lượng: </strong>{convertTime(movieDetails.time) === '' ? convertTime(movieDetails.time) : 'Đang cập nhật'}</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-8'>
                            <div className='card p-4 bg-dark'>
                                <div className='d-flex'>
                                    <div className='row' style={{ width: '70%' }}>
                                        <div className="col-md-5">
                                            <Link to={`/watch/cinema/${slug}`} className='link-glow'>
                                                <button className='glow-on-hover position-relative' disabled={movieDetails.episodes?.length === 0}>
                                                    Xem phim
                                                    <FontAwesomeIcon icon={faPlay} className='position-absolute play-icon' style={{ right: '18%', top: '18px' }} />
                                                </button>
                                            </Link>
                                        </div>
                                        <div className="col-md-7">
                                            <button className={`btn ${follow ? 'btn-followed btn-danger' : 'btn-outline-danger'} text-light mt-2`} onClick={handleFollowClick}>
                                                {follow ?
                                                    (
                                                        <div>
                                                            <FontAwesomeIcon icon={faHeartSolid} color='red'></FontAwesomeIcon> Đã theo dõi

                                                        </div>
                                                    ) :
                                                    (
                                                        <div>
                                                            <FontAwesomeIcon icon={faHeartRegular} /> Theo dõi phim
                                                        </div>
                                                    )
                                                }
                                            </button>
                                            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered">
                                                    <div className="modal-content bg-dark text-light">
                                                        <div className="modal-header" data-bs-theme="dark">
                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Xác nhận</h1>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body text-center">
                                                            Bạn có chắc chắn muốn hủy theo dõi phim này không? <br></br>
                                                            Bạn vẫn có thể theo dõi lại phim này sau khi hủy.
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                                            <button type="button" className="btn btn-danger" onClick={confirmUnfollow} data-bs-dismiss="modal">Xác nhận</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* modal for login before */}
                                            <div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered">
                                                    <div className="modal-content bg-dark text-light">
                                                        <div className="modal-header" data-bs-theme="dark">
                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Yêu cầu đăng nhập</h1>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body text-center">
                                                            Vui lòng đăng nhập để theo dõi phim này.
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                                            <Link to={'/login'}><button type="button" className="btn btn-danger" data-bs-dismiss="modal">Đăng nhập</button></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='sharing d-flex align-items-center justify-content-center'>
                                        {/* <button className='btn btn-outline-danger text-light mx-2' onClick={() => setFollow(!follow)}>
                                            {follow ?
                                                (
                                                    <div>
                                                        <FontAwesomeIcon className='icon' icon={faHeart} /> Theo dõi phim
                                                    </div>
                                                ) :
                                                (
                                                    <div>
                                                        <FontAwesomeIcon icon={faHeart} /> Đã theo dõi
                                                    </div>
                                                )
                                            }

                                        </button> */}
                                        <h6 className='sharing--text'>Chia sẻ: </h6> &emsp;
                                        <div className='facebook-share-container'>
                                            <button
                                                className='btn'
                                                onClick={() => {
                                                    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=https://mycinemavn.vercel.app/watch/${slug}`;
                                                    const popupWidth = 600;
                                                    const popupHeight = 400;

                                                    // Lấy vị trí giữa màn hình
                                                    const left = window.screen.width / 2 - popupWidth / 2;
                                                    const top = window.screen.height / 2 - popupHeight / 2;

                                                    // Mở popup
                                                    window.open(
                                                        shareUrl,
                                                        'FacebookSharePopup',
                                                        `width=${popupWidth},height=${popupHeight},top=${top},left=${left},toolbar=0,status=0,resizable=1`
                                                    );
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faFacebook} color='blue' style={{ fontSize: '25px' }}></FontAwesomeIcon>
                                            </button>
                                        </div>
                                        <div className='facebook-share-container mx-2'>
                                            <button
                                                className='btn'
                                                onClick={() => {
                                                    const shareUrl = `https://twitter.com/intent/tweet?url=https://mycinemavn.vercel.app/watch/${slug}`;
                                                    const popupWidth = 600;
                                                    const popupHeight = 400;

                                                    // Lấy vị trí giữa màn hình
                                                    const left = window.screen.width / 2 - popupWidth / 2;
                                                    const top = window.screen.height / 2 - popupHeight / 2;

                                                    // Mở popup
                                                    window.open(
                                                        shareUrl,
                                                        'FacebookSharePopup',
                                                        `width=${popupWidth},height=${popupHeight},top=${top},left=${left},toolbar=0,status=0,resizable=1`
                                                    );
                                                }}
                                            >
                                                <img src='/images/twitter.png' width={30} />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                <div className="text-light mt-3">
                                    <ul className="nav nav-tabs nav--tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link nav--link active" id="description-tab" data-bs-toggle="tab"
                                                data-bs-target="#description" type="button" role="tab">Tập phim</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link nav--link" id="details-tab" data-bs-toggle="tab" data-bs-target="#details"
                                                type="button" role="tab">Mô tả phim</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link nav--link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews"
                                                type="button" role="tab">Bình luận</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content mt-3" id="myTabContent">
                                        <div className="tab-pane fade show active" id="description" role="tabpanel">
                                            <div className='mt-5'>
                                                <h4>Các bản chiếu</h4>
                                                <div className='row'>
                                                    {movieDetails.episodes?.map((episode) => (
                                                        <div className='col-md-6 col-sm-4' key={episode.id}>
                                                            <div className='card mt-3 language-hover w-100'>
                                                                <div className='row g-0'>
                                                                    <div className='col-8 p-3 bg-secondary rounded-start text-light'>
                                                                        {episode.server_name.includes('Vietsub') ? (
                                                                            <FontAwesomeIcon icon={faClosedCaptioning} fontSize={25} style={{ color: '#036bfc' }} />
                                                                        ) : (
                                                                            <FontAwesomeIcon icon={faMicrophone} fontSize={25} style={{ color: '#fc7f03' }} />
                                                                        )} &nbsp;
                                                                        {episode.server_name}
                                                                        <p className='mt-1 fw-medium'>{movieDetails.name}</p>
                                                                        <Link to={`/watch/cinema/${slug}?type=${episode.server_name}`} className='text-decoration-none '>
                                                                            <button type='button' className='btn btn-light p-1 px-2' style={{ fontSize: '14px', fontWeight: '500' }}>Xem bản này</button>
                                                                        </Link>
                                                                    </div>
                                                                    <div className='col-4'>
                                                                        <img src={movieDetails.thumb_url} className='w-100 rounded-end language-img'></img>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            {/* {movieDetails.category?.[1]?.list?.[0]?.name ? ( */}
                                            <div className='mt-5'>
                                                <h4 className='mb-3'>Các tập phim: </h4>
                                                <div className=''>
                                                    {movieDetails.episodes?.map((episode, index) => (
                                                        <div key={episode.id}>
                                                            {index > 0 && <hr />}
                                                            <h6>{episode.server_name}</h6>
                                                            <div className='row g-2 mt-2 mb-2'>
                                                                {episode.items.map((item) => (
                                                                    <div key={item.id} className='col-4 col-md-2 mb-1'>
                                                                        <Link to={`/watch/cinema/${slug}?tap=${item.name}&type=${episode.server_name}`} className='text-decoration-none text-light'>
                                                                            <div className='category--movie p-2 px-2 rounded text-center'>
                                                                                Tập {item.name} &nbsp; <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            {/* ) : (
                                                <div></div>
                                            )} */}
                                        </div>
                                        <div className="tab-pane fade" id="details" role="tabpanel">
                                            <p>{movieDetails.description}</p>
                                        </div>
                                        <div className="tab-pane fade" id="reviews" role="tabpanel">
                                            <p>Hiện tại chưa có bình luận nào</p>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ height: '275px' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default WatchMovie