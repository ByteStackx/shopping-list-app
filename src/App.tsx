
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './store';
import type { RootState } from './store';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import HomePage from './pages/HomePage';
import ShoppingListPage from './pages/ShoppingListPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <>
      {isAuthenticated && <Navbar />}
      <main style={{ marginTop: isAuthenticated ? '60px' : 0 }}>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <RegistrationPage />} />
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/shopping-lists" element={<ProtectedRoute><ShoppingListPage /></ProtectedRoute>} />
      </Routes>
      </main>
    </>
  );
}

export default App;
