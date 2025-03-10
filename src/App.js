import './App.css';
import { Provider } from 'react-redux';
import store from './component/MovieStore';
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import Footer from './component/Footer';
import { lazy, Suspense } from 'react';
import LoadingComponent from './component/LoadingComponent';
import Introduction from './component/Introduction';
import NewHeader from './component/NewHeader';
import ErrorPage from './component/ErrorPage';
const WatchMovie = lazy(() => import('./component/WatchMovie'));
const MovieList = lazy(() => import('./component/MovieList'));
const Cinema = lazy(() => import('./component/Cinema'));
const MovieCate = lazy(() => import('./component/MovieCate'));
const SearchMovie = lazy(() => import('./component/SearchMovie'));
const NewMovie = lazy(() => import('./component/MovieCate/NewMovie'));
const CountryMovie = lazy(() => import('./component/MovieCate/CountryMovie'));
function App() {
  return (
    <Suspense fallback={<LoadingComponent></LoadingComponent>}>
      <Provider store={store}>
        <BrowserRouter>
          
          <NewHeader/>
          <Routes>
            <Route path='*' element={<ErrorPage />} />
            <Route path='/' element={<MovieList />} />
            <Route path='/danh-sach/:cate' element={<MovieCate />} />
            <Route path='/danh-sach/phim-moi-cap-nhat' element={<NewMovie />} />
            <Route path='/danh-sach/quoc-gia/:country' element={<CountryMovie/>}/>
            <Route path='/tim-kiem' element={<SearchMovie />} /> 
            <Route path='/watch/:slug' element={<WatchMovie />} />
            <Route path='/watch/cinema/:slug' element={<Cinema />} />
            <Route path='/introduction' element={<Introduction />} />
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </Provider>
    </Suspense>
  );
}

export default App;
