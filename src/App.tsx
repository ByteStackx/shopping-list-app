
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { useAppSelector } from './store';
import type { RootState } from './store';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import HomePage from './pages/HomePage';
import ShoppingListPage from './pages/ShoppingListPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

function App() {
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <>
      {/* Simple navigation for demonstration */}
      {isAuthenticated && (
        <nav style={{ display: 'flex', gap: '1em', position: 'fixed', top: 0, left: 0, right: 0, padding: '1em', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', zIndex: 1000, justifyContent: 'center', alignItems: 'center' }}>
          <Link to="/">Home</Link>
          <Link to="/shopping-lists">Shopping Lists</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      )}
      <main style={{ marginTop: '60px' }}>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <RegistrationPage />} />
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/shopping-lists" element={isAuthenticated ? <ShoppingListPage /> : <Navigate to="/login" />} />
      </Routes>
      </main>
    </>
  );
}

export default App;
