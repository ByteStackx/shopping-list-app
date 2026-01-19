import { useAppDispatch } from '../store';
import { logout } from '../authSlice';
import { useNavigate } from 'react-router-dom';
import styles from './LogoutButton.module.css';

function LogoutButton() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className={styles.logoutButton}>
      Logout
    </button>
  );
}

export default LogoutButton;
