import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components';

const Home = lazy(() => import('./pages/Home'));
const SearchCountry = lazy(() => import('./pages/SearchCountry'));
const Country = lazy(() => import('./pages/Country'));

export const App = () => {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country" element={<SearchCountry />} />
          <Route path="/country/:countryId" element={<Country />} />
          <Route path="*" element={<Navigate to={'/'} />} />
        </Routes>
      </Suspense>
    </>
  );
};
