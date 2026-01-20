import React, { useState } from 'react';
import styles from '../styles/ProfilePage.module.css';
import { useAppSelector, useAppDispatch } from '../store';
import { login } from '../authSlice';
import CryptoJS from 'crypto-js';
import ErrorMessage from '../components/ErrorMessage.tsx';
import SuccessMessage from '../components/SuccessMessage.tsx';
import InputField from '../components/InputField.tsx';

const ProfilePage: React.FC = () => {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    name: user?.name || '',
    surname: user?.surname || '',
    cell: user?.cell || '',
    email: user?.email || '',
    password: ''
  });
  const [message, setMessage] = useState('');

  if (!user) {
    return (
      <div className={styles['profile-page']}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Profile</h1>
          </div>
          <p style={{ textAlign: 'center', color: '#64748b' }}>No user data found.</p>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    // Encrypt password if updated
    const encryptedPassword = form.password
      ? CryptoJS.AES.encrypt(form.password, 'secret-key').toString()
      : undefined;
    const updatedUser = {
      name: form.name,
      surname: form.surname,
      cell: form.cell,
      email: form.email,
      password: encryptedPassword || undefined
    };
    try {
      const res = await fetch(`http://localhost:4000/users?email=${user.email}`);
      const users = await res.json();
      if (users.length === 0) {
        setMessage('User not found.');
        return;
      }
      const userId = users[0].id;
      const patchRes = await fetch(`http://localhost:4000/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      });
      if (patchRes.ok) {
        dispatch(login({
          name: form.name,
          surname: form.surname,
          cell: form.cell,
          email: form.email,
          username: user.username,
          id: user.id
        }));
        setMessage('Profile updated!');
        setForm({ ...form, password: '' });
      } else {
        setMessage('Update failed.');
      }
    } catch (err) {
      setMessage('Error connecting to server.');
    }
  };

  return (
    <div className={styles['profile-page']}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Profile</h1>
          <p className={styles.subtitle}>Update your account information</p>
        </div>

        <div className={styles['profile-card']}>
          <form onSubmit={handleUpdate} className={styles.form}>
            <div className={styles['form-group']}>
              <label className={styles.field} htmlFor="name">
                <span className={styles.label}>Name</span>
                <InputField 
                  id="name"
                  type="text" 
                  name="name" 
                  placeholder="Name" 
                  value={form.name} 
                  onChange={handleChange} 
                  required 
                />
              </label>
              <label className={styles.field} htmlFor="surname">
                <span className={styles.label}>Surname</span>
                <InputField 
                  id="surname"
                  type="text" 
                  name="surname" 
                  placeholder="Surname" 
                  value={form.surname} 
                  onChange={handleChange} 
                  required 
                />
              </label>
            </div>

            <div className={styles['form-group']}>
              <label className={styles.field} htmlFor="cell">
                <span className={styles.label}>Cell Number</span>
                <InputField 
                  id="cell"
                  type="tel" 
                  name="cell" 
                  placeholder="Cell Number" 
                  value={form.cell} 
                  onChange={handleChange} 
                  required 
                />
              </label>
              <label className={styles.field} htmlFor="email">
                <span className={styles.label}>Email</span>
                <InputField 
                  id="email"
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  value={form.email} 
                  onChange={handleChange} 
                  required 
                />
              </label>
            </div>

            <label className={`${styles.field} ${styles['form-group']} ${styles['form-group-full']}`} htmlFor="password">
              <span className={styles.label}>New Password</span>
              <InputField 
                id="password"
                type="password" 
                name="password" 
                placeholder="Leave blank to keep current password" 
                value={form.password} 
                onChange={handleChange} 
              />
            </label>

            <button type="submit" className={styles.button}>Update Profile</button>
          </form>

          {message && (
            <div className={styles['message-container']}>
              {(message.toLowerCase().includes('error') || message.toLowerCase().includes('failed') || message.toLowerCase().includes('not found')) ? (
                <ErrorMessage message={message} />
              ) : message.toLowerCase().includes('updated') ? (
                <SuccessMessage message={message} />
              ) : (
                <p style={{ textAlign: 'center', color: '#64748b' }}>{message}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
