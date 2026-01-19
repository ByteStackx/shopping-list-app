import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import LogoutButton from './LogoutButton.tsx';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}> 
        <span className={styles.logo}></span>
        <span className={styles.title}>ShopList</span>
      </div>
      <div className={styles.links}>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/shopping-lists"
        >
          Shopping Lists
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/profile"
        >
          Profile
        </NavLink>
      </div>
      <div className={styles.actions}>
        <LogoutButton />
      </div>
    </nav>
  );
}

export default Navbar;
