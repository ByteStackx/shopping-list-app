import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/">Home</Link>
      <Link to="/shopping-lists">Shopping Lists</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
}

export default Navbar;
