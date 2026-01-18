import React, { useState } from 'react';
import styles from '../styles/LoginPage.module.css';
import CryptoJS from 'crypto-js';
import { useAppDispatch } from '../store';
import { login } from '../authSlice';
import ErrorMessage from '../components/ErrorMessage.tsx';
import SuccessMessage from '../components/SuccessMessage.tsx';
import InputField from '../components/InputField.tsx';

const LoginPage: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
  const res = await fetch(`http://localhost:4000/users?email=${form.email}`);
      const users = await res.json();
      if (users.length === 0) {
        setMessage('User not found.');
        return;
      }
      const user = users[0];
      // Decrypt password
      const decrypted = CryptoJS.AES.decrypt(user.password, 'secret-key').toString(CryptoJS.enc.Utf8);
      if (decrypted === form.password) {
        setMessage('Login successful!');
        dispatch(login({
          name: user.name || '',
          surname: user.surname || '',
          cell: user.cell || '',
          email: user.email,
          username: user.username || '',
          id: user.id
        }));
      } else {
        setMessage('Incorrect password.');
      }
    } catch (err) {
      setMessage('Error connecting to server.');
    }
  };

  return (
    <div className={styles['login-page']}>
      <div className={styles['login-card']}>
        <div className={styles['login-header']}>
          <h2>Welcome Back</h2>
          <p className={styles['login-subtitle']}>Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles['form-row']}>
            <InputField type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
          </div>
          <div className={styles['form-row']}>
            <InputField type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          </div>
          <button type="submit" className={styles['login-button']}>Sign In</button>
        </form>
        <div className={styles['login-footer']}>
          <p>Don't have an account? <a href="/register">Create account</a></p>
        </div>
        {message && (message.toLowerCase().includes('error') || message.toLowerCase().includes('not found') || message.toLowerCase().includes('incorrect') ? (
          <ErrorMessage message={message} />
        ) : message.toLowerCase().includes('success') ? (
          <SuccessMessage message={message} />
        ) : (
          <p>{message}</p>
        ))}
      </div>
    </div>
  );
};

export default LoginPage;
