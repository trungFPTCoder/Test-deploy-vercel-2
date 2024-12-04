import './App.css';
import { Provider } from 'react-redux';
// import MovieList from './component/MovieList';
import store from './component/MovieStore';
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
// import WatchMovie from './component/WatchMovie';
// import Cinema from './component/Cinema';
import Header from './component/Header';
import Footer from './component/Footer';
// import MovieCate from './component/MovieCate';
import { lazy, Suspense } from 'react';
import LoadingComponent from './component/LoadingComponent';
const WatchMovie = lazy(() => import('./component/WatchMovie'));
const MovieList = lazy(() => import('./component/MovieList'));
const Cinema = lazy(() => import('./component/Cinema'));
const MovieCate = lazy(() => import('./component/MovieCate'));
const SearchMovie = lazy(() => import('./component/SearchMovie'));
function App() {
  return (
    <Suspense fallback={<LoadingComponent></LoadingComponent>}>
      <Provider store={store}>
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path='/' element={<MovieList />} />
            <Route path='/danh-sach/:cate' element={<MovieCate />} />
            <Route path='/tim-kiem' element={<SearchMovie />} /> 
            <Route path='/watch/:slug' element={<WatchMovie />} />
            <Route path='/watch/cinema/:slug' element={<Cinema />} />
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </Provider>
    </Suspense>
  );
}

export default App;
