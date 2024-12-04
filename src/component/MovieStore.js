import { configureStore, createSlice } from '@reduxjs/toolkit';
const newMovieSlice = createSlice({
    name: 'newMovies',
    initialState: [],
    reducers: {
        setNewMovies(state, action) {
            return action.payload;
        }
    }
});
const movieDetailsSlice = createSlice({
    name: 'movieDetails',
    initialState: {},
    reducers: {
        setMovieDetails(state, action) {
            return action.payload;
        }
    }
});
const categoryMoviesSlice = createSlice({
    name: 'categoryMovies',
    initialState: {},
    reducers: {
        setCategoryMovies(state, action) {
            return action.payload;
        }
    }
});
const searchMovieSlide = createSlice({
    name: 'SearchMovies',
    initialState: {},
    reducers: {
        setSearchMovies(state, action) {
            return action.payload;
        }
    }
});
export const { setNewMovies } = newMovieSlice.actions;
export const { setMovieDetails } = movieDetailsSlice.actions;
export const { setCategoryMovies } = categoryMoviesSlice.actions;
export const { setSearchMovies } = searchMovieSlide.actions;
const store = configureStore({
    reducer: {
        newMovies: newMovieSlice.reducer,
        movieDetails: movieDetailsSlice.reducer,
        categoryMovies: categoryMoviesSlice.reducer,
        searchMovies: searchMovieSlide.reducer
    }
});

export default store;