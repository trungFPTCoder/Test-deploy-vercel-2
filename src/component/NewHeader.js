import { faBars, faSearch, faUser, faTimes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SearchSuggest from './SearchSuggest';//add new in 07/02/2025
// thử nghiệm gợi ý search
import '../assest/NewNavbar.css'
function NewHeader() {
    const [navbarBg, setNavbarBg] = useState('background-navbar pt-2 pb-2');//change new in 07/02/2025
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchInput, setSearchInput] = useState('d-none');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [display, setDisplay] = useState("d-none"); // new in 07/02/2025
    const searchInputRef = useRef(null);
    const searchRef = useRef([]);//change new in 07/02/2025
    const navigate = useNavigate();
    const handleScroll = () => {
        if (window.scrollY > 30) {
            setNavbarBg('background-navbar-2 tran-nav');//change new in 07/02/2025
        } else {
            setNavbarBg('background-navbar tran-nav pt-2 pb-2');//change new in 07/02/2025
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleSearch = () => {
        if (searchInput === 'd-none') {
            setIsSearchActive(!isSearchActive);
            setSearchInput('d-block');
            if (!isSearchActive) {
                setTimeout(() => {
                    searchInputRef.current.focus();
                }, 100); // Delay to ensure the input is visible before focusing
            }
        } else {
            setIsSearchActive(false);
            setSearchInput('d-none');
        }
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchKeyword.trim()) {
            navigate(`/tim-kiem?keyword=${searchKeyword}`);
        }
        setSearchKeyword('');
    };
    // lấy data user
    // const location = useLocation();
    // const { name, picture } = location.state || {};
    const name = sessionStorage.getItem('user');
    const picture = sessionStorage.getItem('picture');
    // console.log(name, picture);
    const handleRemoveSession = () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('picture');
        sessionStorage.removeItem('email');
    }
    // new in 07/02/2025
    const handleInputChange = (e) => {
        setSearchKeyword(e.target.value);
        setDisplay("d-block");
    };
    const handleDisplay = () => {
        if (searchKeyword) {
            setDisplay("d-block");
        } else {
            setDisplay("d-none");
        }
    }
    const handleClickOutside = (event) => {
        if (searchRef.current.every(ref => ref && !ref.contains(event.target))) {
            setDisplay("d-none");
        }
    };
    
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    // //////////////////////////////////////////
    return (
        <div>
            {/* desktop navbar */}
            <div className={`${navbarBg} text-light desktop-view position-fixed w-100`} style={{ zIndex: '1100' }}>
                <nav>
                    <div className="container-fluid pt-2 pb-2">
                        <div className="d-flex align-items-center">
                            <div className="navbar-brand mx-2">
                                <Link to={'/'} className='text-decoration-none'  >
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <img src='/images/logo.png' height="50" alt="Logo" />
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '10px' }}>
                                            <span className='fw-medium text-light' style={{ fontSize: '18px' }}>My Cinema</span>
                                            <small className='text-info' style={{ fontSize: '12px' }}>Xem là nghiền</small>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            {/* <div className="position-relative mx-2">
                                <form role='search' onSubmit={handleSearchSubmit}>
                                    <input type="text" placeholder="Tìm kiếm phim..." className="form-control search-input" size="45"
                                        style={{ paddingLeft: '40px' }} value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
                                    <button className='search-btn'>
                                        <FontAwesomeIcon icon={faSearch} color='white' className="position-absolute " />
                                    </button>
                                </form>
                            </div> */}
                            
                            {/* change new in 07/02/2025 */}
                            <div className="position-relative mx-2" ref={el => searchRef.current[0] = el}>
                                <form role='search' onSubmit={handleSearchSubmit}>
                                    <input type="text" placeholder="Tìm kiếm phim..." className="form-control search-input" size="45"
                                        style={{ paddingLeft: '40px' }} value={searchKeyword} onClick={handleDisplay} onChange={handleInputChange} />
                                    <button className='search-btn'>
                                        <FontAwesomeIcon icon={faSearch} color='white' className="position-absolute " />
                                    </button>
                                </form>
                                <div className={`${display}`}>
                                    <SearchSuggest keywordFromURL={searchKeyword} />
                                </div>
                            </div>
                            <div className="nav-item nav-item-hover mx-2">
                                <Link to={`/danh-sach/phim-le`} className="nav-link">Phim lẻ</Link>
                            </div>
                            <div className="nav-item nav-item-hover mx-2">
                                <Link to={`/danh-sach/phim-bo`} className="nav-link">Phim bộ</Link>
                            </div>
                            <div className="nav-item nav-item-hover mx-2">
                                <Link to={`/danh-sach/phim-dang-chieu`} className="nav-link">Phim đang chiếu</Link>
                            </div>
                            <div className="nav-item dropdown dropdown-hover mx-3">
                                <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    Thể loại
                                </div>
                                <ul className="dropdown-menu dropdown-menu-hover bg-dark p-2 border-1 border-light" style={{ width: '500px' }}
                                    aria-labelledby="navbarDropdown">
                                    <div className='row'>
                                        <div className='col-4'>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/chinh-kich'}>Phim chính
                                                    kịch</Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/hanh-dong'}>Phim hành
                                                    động</Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/phim-hai'}>Phim hài
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/lich-su'}>Phim lịch sử
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/bi-an'}>Phim bí ẩn</Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/gay-can'}>Phim gay cấn
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/tinh-cam'}>Phim tình cảm
                                                </Link>
                                            </li>
                                        </div>
                                        <div className='col-4'>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/phieu-luu'}>Phim phiêu
                                                    lưu</Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/hinh-su'}>Phim hình sự
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/gia-dinh'}>Phim gia đình
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/kinh-di'}>Phim kinh dị
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/lang-man'}>Phim lãng mạn
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/chien-tranh'}>Phim chiến
                                                    tranh</Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/hoat-hinh'}>Phim hoạt
                                                    hình</Link>
                                            </li>
                                        </div>
                                        <div className='col-4'>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/gia-tuong'}>Phim giả
                                                    tưởng</Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/tam-ly'}>Phim tâm lý
                                                </Link>
                                            </li>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                            <div className="nav-item dropdown dropdown-hover mx-3">
                                <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    Quốc gia
                                </div>
                                <ul className="dropdown-menu dropdown-menu-hover bg-dark p-2 border-1 border-light" style={{ width: '300px' }}
                                    aria-labelledby="navbarDropdown">
                                    <div className='row'>
                                        <div className='col-6'>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/au-my'}>Âu Mỹ</Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/anh'}>Anh</Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/trung-quoc'}>Trung quốc
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/indonesia'}>Indonesia
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/viet-nam'}>Việt Nam</Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/Phap'}>Pháp
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/hong-kong'}>Hồng Kông
                                                </Link>
                                            </li>
                                        </div>
                                        <div className='col-6'>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/han-quoc'}>Hàn Quốc</Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/nhat-ban'}>Nhật bản
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/thai-lan'}>Thái Lan
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/dai-loan'}>Đài Loan
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/nga'}>Nga
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/ha-lan'}>Hà Lan</Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/philippines'}>Philippines</Link>
                                            </li>
                                        </div>
                                    </div>
                                </ul>
                            </div>

                            <div style={{ marginLeft: 'auto' }}>
                                {name && picture ? (
                                    <>
                                        <div className="dropdown">
                                            <img src={picture}
                                                className="dropdown-toggle border border-light p-1 rounded-circle" data-bs-toggle="dropdown"
                                                style={{ height: '45px', cursor: 'pointer' }} alt="" />
                                            <ul className="dropdown-menu" style={{ transition: '0.5s ease', width: '350px' }}>
                                                <li>
                                                    <Link to={'personal'} className="text-decoration-none">
                                                        <div className="dropdown---header nav-hover">
                                                            <div className="dropdown-item nav-hover">
                                                                <img className="rounded-circle"
                                                                    src={picture} alt="Profile Picture" width="43" height="43" />
                                                                {name}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>
                                                {/* làm lại */}
                                                <li className='d-flex align-items-center mt-3 mx-2'>
                                                    <div className='dropdown-item rounded-1 mx-2 setting nav-hover p-2'>
                                                        <Link to={'/'} className="text-decoration-none text-black" onClick={handleRemoveSession}>
                                                            <FontAwesomeIcon icon={faSignOutAlt} /> &nbsp; Đăng xuất
                                                        </Link>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Link to={'/login'}>
                                            <button type="button" className="btn btn-light rounded-5 p-2 px-3">
                                                <FontAwesomeIcon icon={faUser} /> &nbsp; Đăng nhập
                                            </button>
                                        </Link>

                                    </>
                                )}

                            </div>

                        </div>
                    </div>
                </nav >
            </div >


            {/* mobile, small desktop, tablet version (smaller than 1024px)*/}
            <div div className="mobile-view position-fixed w-100" style={{ zIndex: '1100' }
            }>
                <div className={`container-fluid ${navbarBg} text-light pt-2 pb-2`}>
                    <div className="d-flex align-items-center position-relative">
                        <button className="btn btn-dark menu-toggle" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            {/* <i className="fas fa-bars"></i> */}
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                        <div className="navbar-brand mx-2">
                            <Link to={'/'} className='text-decoration-none'  >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src='/images/logo.png' height="40" alt="Logo" />
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '10px' }}>
                                        <span className='fw-medium text-light' style={{ fontSize: '17px' }}>My Cinema</span>
                                        <small className='text-info' style={{ fontSize: '10px' }}>Xem là nghiền</small>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        
                        <div className={`${searchInput} search-container`} style={{ width: '90%' }} ref={el => searchRef.current[1] = el}>
                            <form role="search" onSubmit={handleSearchSubmit}>
                                <input type="search" placeholder="Tìm kiếm phim..."
                                    className="form-control search-input p-2 px-3"
                                    aria-label="Search"
                                    value={searchKeyword}
                                    ref={searchInputRef}
                                    onChange={handleInputChange} />
                                <div className={`${display}`}>
                                    <SearchSuggest keywordFromURL={searchKeyword} />
                                </div>
                            </form>
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                            <button type='button' className='search-button' onClick={handleSearch}>
                                <FontAwesomeIcon icon={isSearchActive ? faTimes : faSearch} className={isSearchActive ? `text-danger` : `text-light`} />
                            </button>
                        </div>

                    </div>
                </div>
                <div className="collapse mt-1 mx-1" id="collapseExample">
                    <div className="card card-body border-1 border-light bg-dark text-light">

                        {picture && name ? (
                            <>
                                <Link to={'personal'} className="text-decoration-none">
                                    <div className="nav-item mb-3 p-2 rounded-5 nav-hover ">
                                        <div style={{ fontSize: '16px' }} className="d-flex align-items-center justify-content-center">
                                            <img className="rounded-circle mx-2"
                                                src={picture}
                                                alt="Profile Picture" width="30" height="30" />
                                            {name}
                                        </div>
                                    </div>
                                </Link>
                                <Link to={'/'} className='text-decoration-none' onClick={handleRemoveSession}>
                                    <div className="nav-item mb-4 p-2 rounded-5 nav-hover">
                                        <div style={{ fontSize: '16px' }} className="text-center">
                                            <FontAwesomeIcon icon={faSignOutAlt} className='mx-2' />
                                            Đăng xuất
                                        </div>
                                    </div>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to={'/login'}>
                                    <div className="nav-item mb-4">
                                        <button type="button" className="btn btn-light rounded-5 p-2 px-3 w-100">
                                            <FontAwesomeIcon icon={faUser} /> &nbsp; Đăng nhập
                                        </button>
                                    </div>
                                </Link>
                            </>
                        )}
                        <div className="nav-item nav-item-hover mb-2">
                            <Link to={`/danh-sach/phim-le`} className="nav-link">Phim lẻ</Link>
                        </div>
                        <div className="nav-item nav-item-hover mb-2">
                            <Link to={`/danh-sach/phim-bo`} className="nav-link">Phim bộ</Link>
                        </div>
                        <div className="nav-item nav-item-hover mb-2">
                            <Link to={`/danh-sach/phim-dang-chieu`} className="nav-link">Phim đang chiếu</Link>
                        </div>
                        <div className="nav-item dropdown mb-3" style={{ paddingLeft: '10px' }}>
                            <div className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Thể loại
                            </div>
                            <ul className="dropdown-menu dropdown-menu-hover bg-dark p-2 border-1 border-light" aria-labelledby="navbarDropdown">
                                <div className='row'>
                                    <div className='col-6'>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/chinh-kich'}>Phim chính
                                                kịch</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/hanh-dong'}>Phim hành
                                                động</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/phim-hai'}>Phim hài
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/lich-su'}>Phim lịch sử
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/bi-an'}>Phim bí ẩn</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/gay-can'}>Phim gay cấn
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/tinh-cam'}>Phim tình cảm
                                            </Link>
                                        </li>
                                    </div>
                                    <div className='col-6'>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/phieu-luu'}>Phim phiêu
                                                lưu</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/hinh-su'}>Phim hình sự
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/gia-dinh'}>Phim gia đình
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/kinh-di'}>Phim kinh dị
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/lang-man'}>Phim lãng mạn
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/chien-tranh'}>Phim chiến
                                                tranh</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/hoat-hinh'}>Phim hoạt
                                                hình</Link>
                                        </li>
                                    </div>
                                    <div className='col-6'>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/gia-tuong'}>Phim giả
                                                tưởng</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/tam-ly'}>Phim tâm lý
                                            </Link>
                                        </li>
                                    </div>
                                </div>
                            </ul>
                        </div>

                        <div className="nav-item dropdown mb-2" style={{ paddingLeft: '10px' }}>
                            <div className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Quốc gia
                            </div>
                            <ul className="dropdown-menu dropdown-menu-hover bg-dark p-2 border-1 border-light" aria-labelledby="navbarDropdown">
                                <div className='row'>
                                    <div className='col-6'>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/au-my'}>Âu Mỹ</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/anh'}>Anh</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/trung-quoc'}>Trung quốc
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/indonesia'}>Indonesia
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/viet-nam'}>Việt Nam</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/Phap'}>Pháp
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/hong-kong'}>Hồng Kông
                                            </Link>
                                        </li>
                                    </div>
                                    <div className='col-6'>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/han-quoc'}>Hàn Quốc</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/nhat-ban'}>Nhật bản
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/thai-lan'}>Thái Lan
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/dai-loan'}>Đài Loan
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/nga'}>Nga
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/ha-lan'}>Hà Lan</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/philippines'}>Philippines</Link>
                                        </li>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>

                </div>
            </div >
        </div >
    )
}

export default NewHeader




// import { faBars, faSearch, faUser, faTimes } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import React, { useEffect, useRef, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import '../assest/NewNavbar.css'
// function NewHeader() {
//     const [navbarBg, setNavbarBg] = useState('background-navbar pt-2 pb-2');
//     const [searchKeyword, setSearchKeyword] = useState('');
//     const [searchInput, setSearchInput] = useState('d-none');
//     const [isSearchActive, setIsSearchActive] = useState(false);
//     const searchInputRef = useRef(null);
//     const navigate = useNavigate();
//     const handleScroll = () => {
//         if (window.scrollY > 30) {
//             setNavbarBg('background-navbar-2 tran-nav');
//         } else {
//             setNavbarBg('background-navbar tran-nav pt-2 pb-2');
//         }
//     };

//     useEffect(() => {
//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);
//     const handleSearch = () => {
//         if (searchInput === 'd-none') {
//             setIsSearchActive(!isSearchActive);
//             setSearchInput('d-block');
//             if (!isSearchActive) {
//                 setTimeout(() => {
//                   searchInputRef.current.focus();
//                 }, 90);
//               }
//         } else {
//             setIsSearchActive(false);
//             setSearchInput('d-none');
//         }
//     }
//     const handleSearchChange = (e) => {
//         setSearchKeyword(e.target.value);
//     };

//     const handleSearchSubmit = (e) => {
//         e.preventDefault();
//         if (searchKeyword.trim()) {
//             navigate(`/tim-kiem?keyword=${searchKeyword}`);
//         }
//         setSearchKeyword('');
//     };
//     return (
//         <div>
//             {/* desktop navbar */}
//             <div className={`${navbarBg} text-light desktop-view position-fixed w-100`} style={{ zIndex: '1100' }}>
//                 <nav>
//                     <div className="container-fluid pt-2 pb-2">
//                         <div className="d-flex align-items-center">
//                             <div className="navbar-brand mx-2">
//                                 <Link to={'/'} className='text-decoration-none'  >
//                                     <div style={{ display: 'flex', alignItems: 'center' }}>
//                                         <img src='/images/logo.png' height="50" alt="Logo" />
//                                         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '10px' }}>
//                                             <span className='fw-medium text-light' style={{ fontSize: '18px' }}>My Cinema</span>
//                                             <small className='text-info' style={{ fontSize: '12px' }}>Xem là nghiền</small>
//                                         </div>
//                                     </div>
//                                 </Link>
//                             </div>
//                             <div className="position-relative mx-2">
//                                 <form role='search' onSubmit={handleSearchSubmit}>
//                                     <input type="text" placeholder="Tìm kiếm phim..." className="form-control search-input" size="45"
//                                         style={{ paddingLeft: '40px' }} value={searchKeyword} onChange={handleSearchChange} />
//                                     <button className='search-btn'>
//                                         <FontAwesomeIcon icon={faSearch} className="position-absolute " />
//                                     </button>
//                                 </form>
//                             </div>
//                             <div className="nav-item mx-2">
//                                 <Link to={`/danh-sach/phim-le`} className="nav-link">Phim lẻ</Link>
//                             </div>
//                             <div className="nav-item mx-2">
//                                 <Link to={`/danh-sach/phim-bo`} className="nav-link">Phim bộ</Link>
//                             </div>
//                             <div className="nav-item mx-2">
//                                 <Link to={`/danh-sach/phim-dang-chieu`} className="nav-link">Phim đang chiếu</Link>
//                             </div>
//                             <div className="nav-item dropdown mx-3">
//                                 <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
//                                     data-bs-toggle="dropdown" aria-expanded="false">
//                                     Thể loại
//                                 </div>
//                                 <ul className="dropdown-menu bg-dark p-2 border-1 border-light" style={{ width: '500px' }}
//                                     aria-labelledby="navbarDropdown">
//                                     <div className='row'>
//                                         <div className='col-4'>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/chinh-kich'}>Phim chính
//                                                     kịch</Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/hanh-dong'}>Phim hành
//                                                     động</Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/phim-hai'}>Phim hài
//                                                 </Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/lich-su'}>Phim lịch sử
//                                                 </Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/bi-an'}>Phim bí ẩn</Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/gay-can'}>Phim gay cấn
//                                                 </Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/tinh-cam'}>Phim tình cảm
//                                                 </Link>
//                                             </li>
//                                         </div>
//                                         <div className='col-4'>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/phieu-luu'}>Phim phiêu
//                                                     lưu</Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/hinh-su'}>Phim hình sự
//                                                 </Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/gia-dinh'}>Phim gia đình
//                                                 </Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/kinh-di'}>Phim kinh dị
//                                                 </Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/lang-man'}>Phim lãng mạn
//                                                 </Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/chien-tranh'}>Phim chiến
//                                                     tranh</Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/hoat-hinh'}>Phim hoạt
//                                                     hình</Link>
//                                             </li>
//                                         </div>
//                                         <div className='col-4'>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/gia-tuong'}>Phim giả
//                                                     tưởng</Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/tam-ly'}>Phim tâm lý
//                                                 </Link>
//                                             </li>
//                                         </div>
//                                     </div>
//                                 </ul>
//                             </div>
//                             <div className="nav-item dropdown mx-3">
//                                 <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
//                                     data-bs-toggle="dropdown" aria-expanded="false">
//                                     Quốc gia
//                                 </div>
//                                 <ul className="dropdown-menu bg-dark p-2 border-1 border-light" style={{ width: '300px' }}
//                                     aria-labelledby="navbarDropdown">
//                                     <div className='row'>
//                                         <div className='col-6'>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/au-my'}>Âu Mỹ</Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/anh'}>Anh</Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/trung-quoc'}>Trung quốc
//                                                 </Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/indonesia'}>Indonesia
//                                                 </Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/viet-nam'}>Việt Nam</Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/Phap'}>Pháp
//                                                 </Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/hong-kong'}>Hồng Kông
//                                                 </Link>
//                                             </li>
//                                         </div>
//                                         <div className='col-6'>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/han-quoc'}>Hàn Quốc</Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/nhat-ban'}>Nhật bản
//                                                 </Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/thai-lan'}>Thái Lan
//                                                 </Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/dai-loan'}>Đài Loan
//                                                 </Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/nga'}>Nga
//                                                 </Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/ha-lan'}>Hà Lan</Link>
//                                             </li>
//                                             <li>
//                                                 <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/philippines'}>Philippines</Link>
//                                             </li>
//                                         </div>
//                                     </div>
//                                 </ul>
//                             </div>
//                             <div style={{ marginLeft: 'auto' }}>
//                                 <button type="button" className="btn btn-light rounded-5 p-2 px-3">
//                                     <FontAwesomeIcon icon={faUser} /> &nbsp; Đăng nhập (Future)
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </nav>
//             </div>


//             {/* mobile, small desktop, tablet version (smaller than 1024px)*/}
//             <div className="mobile-view position-fixed w-100" style={{ zIndex: '1100' }}>
//                 <div className={`container-fluid ${navbarBg} text-light pt-2 pb-2`}>
//                     <div className="d-flex align-items-center position-relative">
//                         <button className="btn btn-dark menu-toggle" type="button" data-bs-toggle="collapse"
//                             data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
//                             {/* <i className="fas fa-bars"></i> */}
//                             <FontAwesomeIcon icon={faBars} />
//                         </button>
//                         <div className="navbar-brand mx-2">
//                             <Link to={'/'} className='text-decoration-none'  >
//                                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                                     <img src='/images/logo.png' height="40" alt="Logo" />
//                                     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '10px' }}>
//                                         <span className='fw-medium text-light' style={{ fontSize: '17px' }}>My Cinema</span>
//                                         <small className='text-info' style={{ fontSize: '10px' }}>Xem là nghiền</small>
//                                     </div>
//                                 </div>
//                             </Link>
//                         </div>
//                         <div className={`${searchInput} search-container`} style={{ width: '90%' }}>
//                             <form role="search" onSubmit={handleSearchSubmit}>
//                                 <input type="search" placeholder="Tìm kiếm phim..."
//                                     className="form-control search-input p-2 px-3"
//                                     aria-label="Search"
//                                     value={searchKeyword}
//                                     ref={searchInputRef}
//                                     onChange={handleSearchChange} />
//                             </form>
//                         </div>
//                         <div style={{ marginLeft: 'auto' }}>
//                             <button type='button' className='search-button' onClick={handleSearch}>
//                                 <FontAwesomeIcon icon={isSearchActive ? faTimes : faSearch} className={isSearchActive ? `text-danger` : `text-light`} />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="collapse mt-1 mx-1" id="collapseExample">
//                     <div className="card card-body border-1 border-light bg-dark text-light">
//                         <div className="nav-item mb-4">
//                             <button type="button" className="btn btn-light rounded-5 p-2 px-3 w-100">
//                                 <FontAwesomeIcon icon={faUser} /> &nbsp; Đăng nhập (Future)
//                             </button>
//                         </div>
//                         <div className="nav-item mb-2">
//                             <Link to={`/danh-sach/phim-le`} className="nav-link">Phim lẻ</Link>
//                         </div>
//                         <div className="nav-item mb-2">
//                             <Link to={`/danh-sach/phim-bo`} className="nav-link">Phim bộ</Link>
//                         </div>
//                         <div className="nav-item mb-2">
//                             <Link to={`/danh-sach/phim-dang-chieu`} className="nav-link">Phim đang chiếu</Link>
//                         </div>
//                         <div className="nav-item dropdown mb-3" style={{ paddingLeft: '10px' }}>
//                             <div className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
//                                 data-bs-toggle="dropdown" aria-expanded="false">
//                                 Thể loại
//                             </div>
//                             <ul className="dropdown-menu bg-dark p-2 border-1 border-light" aria-labelledby="navbarDropdown">
//                                 <div className='row'>
//                                     <div className='col-6'>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/chinh-kich'}>Phim chính
//                                                 kịch</Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/hanh-dong'}>Phim hành
//                                                 động</Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/phim-hai'}>Phim hài
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/lich-su'}>Phim lịch sử
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/bi-an'}>Phim bí ẩn</Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/gay-can'}>Phim gay cấn
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/tinh-cam'}>Phim tình cảm
//                                             </Link>
//                                         </li>
//                                     </div>
//                                     <div className='col-6'>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/phieu-luu'}>Phim phiêu
//                                                 lưu</Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/hinh-su'}>Phim hình sự
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/gia-dinh'}>Phim gia đình
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/kinh-di'}>Phim kinh dị
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/lang-man'}>Phim lãng mạn
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/chien-tranh'}>Phim chiến
//                                                 tranh</Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/hoat-hinh'}>Phim hoạt
//                                                 hình</Link>
//                                         </li>
//                                     </div>
//                                     <div className='col-6'>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/gia-tuong'}>Phim giả
//                                                 tưởng</Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/tam-ly'}>Phim tâm lý
//                                             </Link>
//                                         </li>
//                                     </div>
//                                 </div>
//                             </ul>
//                         </div>

//                         <div className="nav-item dropdown mb-2" style={{ paddingLeft: '10px' }}>
//                             <div className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
//                                 data-bs-toggle="dropdown" aria-expanded="false">
//                                 Quốc gia
//                             </div>
//                             <ul className="dropdown-menu bg-dark p-2 border-1 border-light" aria-labelledby="navbarDropdown">
//                                 <div className='row'>
//                                     <div className='col-6'>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/au-my'}>Âu Mỹ</Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/anh'}>Anh</Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/trung-quoc'}>Trung quốc
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/indonesia'}>Indonesia
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/viet-nam'}>Việt Nam</Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/Phap'}>Pháp
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/hong-kong'}>Hồng Kông
//                                             </Link>
//                                         </li>
//                                     </div>
//                                     <div className='col-6'>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/han-quoc'}>Hàn Quốc</Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/nhat-ban'}>Nhật bản
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/thai-lan'}>Thái Lan
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/dai-loan'}>Đài Loan
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/nga'}>Nga
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/ha-lan'}>Hà Lan</Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item text-light" to={'/danh-sach/quoc-gia/philippines'}>Philippines</Link>
//                                         </li>
//                                     </div>
//                                 </div>
//                             </ul>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default NewHeader