
import './App.css';
import { Provider } from 'react-redux';
import store from './component/MovieStore';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import { lazy, Suspense } from 'react';
import LoadingComponent from './component/LoadingComponent';
import Introduction from './component/Introduction';
import ErrorBoundary from './component/ErrorBoundary';
import ErrorPage from './component/ErrorPage';
import NewHeader from './component/NewHeader';
import Input from './component/Test/Input';
import { HelmetProvider } from 'react-helmet-async';

// import ErrorPage from './component/ErrorPage';

const WatchMovie = lazy(() => import('./component/WatchMovie'));
const MovieList = lazy(() => import('./component/MovieList'));
const Cinema = lazy(() => import('./component/Cinema'));
const MovieCate = lazy(() => import('./component/MovieCate'));
const SearchMovie = lazy(() => import('./component/SearchMovie'));
const NewMovie = lazy(() => import('./component/MovieCate/NewMovie'));
const CountryMovie = lazy(() => import('./component/MovieCate/CountryMovie'));
// thử nghiệm login
const Login = lazy(() => import('./component/Auth-function/Login'));
const SignIn = lazy(() => import('./component/Auth-function/SignIn'));
const Forget = lazy(() => import('./component/Auth-function/Forget'));
const ResetPass = lazy(() => import('./component/Auth-function/ResetPass'));
const LoginGoogle = lazy(() => import('./component/Auth-function/LoginGoogle'));
// thử nghiệm trang cá nhân
const PersonalPage = lazy(() => import('./component/Personal Page/PersonalPage'));

function App() {
  return (
    <HelmetProvider>
      <Suspense fallback={<LoadingComponent />}>
        <Provider store={store}>
          <BrowserRouter>
            {/* <Header /> */}
            <NewHeader />
            <ErrorBoundary>
              <Routes>
                <Route path='/' element={<MovieList />} />
                <Route path='/danh-sach/:cate' element={<MovieCate />} />
                <Route path='/danh-sach/phim-moi-cap-nhat' element={<NewMovie />} />
                <Route path='/danh-sach/quoc-gia/:country' element={<CountryMovie />} />
                <Route path='/tim-kiem' element={<SearchMovie />} />
                <Route path='/watch/:slug' element={<WatchMovie />} />
                <Route path='/watch/cinema/:slug' element={<Cinema />} />
                <Route path='/introduction' element={<Introduction />} />
                <Route path='/error' element={<ErrorPage />} />
                {/* thử nghiệm login */}
                <Route path='/login' element={<Login />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/forget' element={<Forget />} />
                <Route path='/resetpass' element={<ResetPass />} />
                <Route path='/loginGoogle' element={<LoginGoogle />} />
                {/* thử nghiệm personal page */}
                <Route path='/personal' element={<PersonalPage />} />
                {/* thử nghiệm gợi ý search */}
                <Route path='test' element={<Input />} />
              </Routes>
            </ErrorBoundary>
            <Footer />
          </BrowserRouter>
        </Provider>
      </Suspense>
    </HelmetProvider>
  );
}

export default App;

// import './App.css';
// import { Provider } from 'react-redux';
// import store from './component/MovieStore';
// import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
// import Header from './component/Header';
// import Footer from './component/Footer';
// import { lazy, Suspense } from 'react';
// import LoadingComponent from './component/LoadingComponent';
// import Introduction from './component/Introduction';
// const WatchMovie = lazy(() => import('./component/WatchMovie'));
// const MovieList = lazy(() => import('./component/MovieList'));
// const Cinema = lazy(() => import('./component/Cinema'));
// const MovieCate = lazy(() => import('./component/MovieCate'));
// const SearchMovie = lazy(() => import('./component/SearchMovie'));
// const NewMovie = lazy(() => import('./component/MovieCate/NewMovie'));
// const CountryMovie = lazy(() => import('./component/MovieCate/CountryMovie'));
// function App() {
//   return (
//     <Suspense fallback={<LoadingComponent></LoadingComponent>}>
//       <Provider store={store}>
//         <BrowserRouter>
//           <Header></Header>
//           <Routes>
//             <Route path='/' element={<MovieList />} />
//             <Route path='/danh-sach/:cate' element={<MovieCate />} />
//             <Route path='/danh-sach/phim-moi-cap-nhat' element={<NewMovie />} />
//             <Route path='/danh-sach/quoc-gia/:country' element={<CountryMovie/>}/>
//             <Route path='/tim-kiem' element={<SearchMovie />} /> 
//             <Route path='/watch/:slug' element={<WatchMovie />} />
//             <Route path='/watch/cinema/:slug' element={<Cinema />} />
//             <Route path='/introduction' element={<Introduction />} />
//           </Routes>
//           <Footer></Footer>
//         </BrowserRouter>
//       </Provider>
//     </Suspense>
//   );
// }

// export default App;

//kk phim
// import './App.css';
// import { Provider } from 'react-redux';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Header from './kkPhim-component/Header';
// import Footer from './kkPhim-component/Footer';
// import { lazy, Suspense } from 'react';
// import LoadingComponent from './kkPhim-component/LoadingComponent';
// import Introduction from './kkPhim-component/Introduction';
// import ErrorBoundary from './kkPhim-component/ErrorBoundary';
// import ErrorPage from './kkPhim-component/ErrorPage';
// import store from './kkPhim-component/MovieStore';
// // import ErrorPage from './kkPhim-component/ErrorPage';

// const WatchMovie = lazy(() => import('./kkPhim-component/WatchMovie'));
// const MovieList = lazy(() => import('./kkPhim-component/MovieList'));
// const Cinema = lazy(() => import('./kkPhim-component/Cinema'));
// const MovieCate = lazy(() => import('./kkPhim-component/MovieCate'));
// const SearchMovie = lazy(() => import('./kkPhim-component/SearchMovie'));
// const NewMovie = lazy(() => import('./kkPhim-component/MovieCate/NewMovie'));
// const CountryMovie = lazy(() => import('./kkPhim-component/MovieCate/CountryMovie'));

// function App() {
//   return (
//     <Suspense fallback={<LoadingComponent />}>
//       <Provider store={store}>
//         <BrowserRouter>
//           <Header />
//           <ErrorBoundary>
//             <Routes>
//               <Route path='/' element={<MovieList />} />
//               <Route path='/danh-sach/:cate' element={<MovieCate />} />
//               <Route path='/danh-sach/phim-moi-cap-nhat' element={<NewMovie />} />
//               <Route path='/danh-sach/quoc-gia/:country' element={<CountryMovie />} />
//               <Route path='/tim-kiem' element={<SearchMovie />} />
//               <Route path='/watch/:slug' element={<WatchMovie />} />
//               <Route path='/watch/cinema/:slug' element={<Cinema />} />
//               <Route path='/introduction' element={<Introduction />} />
//               <Route path='/error' element={<ErrorPage />} />
//             </Routes>
//           </ErrorBoundary>
//           <Footer />
//         </BrowserRouter>
//       </Provider>
//     </Suspense>
//   );
// }

// export default App;