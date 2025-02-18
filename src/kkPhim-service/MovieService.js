import axios from "axios";

// Danh sách tài nguyên phim mới cập nhật: 
export const fetchNewMovies = async (page = 1) => {
    const response = await axios.get(`https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=${page}`);
    return response.data;
};
// Thông tin Phim & Danh sách tập phim:
export const fetchMovieDetails = async (slug) => {
    const response = await axios.get(`https://phimapi.com/phim/${slug}`);
    return response.data.movie;
}
// Thể loại phim:
export const fetchMovieCate = async (cate, page = 1) => {
    const response = await axios.get(`https://phimapi.com/v1/api/danh-sach/${cate}?page=${page}`);
    return response.data;
};
// Tìm kiếm phim
export const fetchSearchMovie = async (search, page = 1) => {
    const response = await axios.get(`https://phimapi.com/v1/api/tim-kiem?keyword=${search}&page=${page}`);
    return response.data;
}

// export const fetchMovieCountry = async (country, page = 1) => {
//     const response = await axios.get(`https://phim.nguonc.com/api/films/quoc-gia/${country}?page=${page}`);
//     return response.data;
// }

//kkPhim
