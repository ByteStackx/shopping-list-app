import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/HomePage.module.css';
import shoppingBagIcon from '../assets/shopping-bag.png';
import profileIcon from '../assets/profile.png';

const HomePage: React.FC = () => {
  return (
    <div className={styles['home-page']}>
      <div className={styles['home-container']}>
        <div className={styles.hero}>
          <h1>
            Welcome to <span className={styles['hero-gradient']}>ShopList</span>
          </h1>
          <p>Your smart shopping companion. Create, organize, and manage your shopping lists with ease.</p>
        </div>

        <div className={styles['quick-actions']}>
          <Link to="/shopping-lists" className={styles['action-card']}>
            <img src={shoppingBagIcon} alt="Shopping Lists" className={styles['card-icon']} />
            <h3 className={styles['card-title']}>Shopping Lists</h3>
            <p className={styles['card-description']}>Create and manage your shopping lists</p>
          </Link>

          <Link to="/profile" className={styles['action-card']}>
            <img src={profileIcon} alt="Profile" className={styles['card-icon']} />
            <h3 className={styles['card-title']}>My Profile</h3>
            <p className={styles['card-description']}>Update your personal information</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
