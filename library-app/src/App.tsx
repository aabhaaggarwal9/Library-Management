import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { BookCheckoutPage } from './Layouts/BookCheckoutPage/BookCheckoutPage';
import { HomePage } from './Layouts/HomePage/HomePage';
import { Footer } from './Layouts/NavbarAndFooter/Footer';
import { Navbar } from './Layouts/NavbarAndFooter/Navbar';
import { SearchBooksPage } from './Layouts/SearchBooksPage/SearchBooksPage';
import { LoginPage } from './Layouts/RegisterAndLogin/LoginPage';
import { RegisterPage } from './Layouts/RegisterAndLogin/RegisterPage';
import { AuthProvider } from './Layouts/Utils/AuthContext';
import { ReviewListPage } from './Layouts/BookCheckoutPage/components/ReviewListPage';
import { ShelfPage } from './Layouts/ShelfPage.tsx/ShelfPage';
import { ProtectedRoutes } from './Layouts/Utils/ProtectedRoutes';
import { ProtectedRoutesAdmin } from './Layouts/Utils/ProtectedRoutesAdmin';
import { AdminPage } from './Layouts/AdminPage/AdminPage';

export const App = () => {

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className='d-flex flex-column min-vh-100'>
          <Navbar />
          <div className='flex-grow-1'>
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/search" element={<SearchBooksPage />} />
              <Route path="/checkout/:bookId" element={<BookCheckoutPage />} />
              <Route path="/reviewlist/:bookId" element={<ReviewListPage />} />
              <Route path="/" element={<HomePage />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/shelf" element={<ShelfPage/>}/>
                <Route element={<ProtectedRoutesAdmin/>}>
                <Route path="/admin" element={<AdminPage/>}/>
                </Route>
            </Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

