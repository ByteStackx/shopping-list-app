import React, { useState } from 'react';
import styles from '../styles/RegistrationPage.module.css';
import CryptoJS from 'crypto-js';
import ErrorMessage from '../components/ErrorMessage.tsx';
import SuccessMessage from '../components/SuccessMessage.tsx';
import InputField from '../components/InputField.tsx';

const RegistrationPage: React.FC = () => {
  const [form, setForm] = useState({
    username: '',
    name: '',
    surname: '',
    cell: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Encrypt password
    const encryptedPassword = CryptoJS.AES.encrypt(form.password, 'secret-key').toString();
    const user = {
      username: form.username,
      name: form.name,
      surname: form.surname,
      cell: form.cell,
      email: form.email,
      password: encryptedPassword
    };
    try {
  const res = await fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      if (res.ok) {
        setMessage('Registration successful!');
  setForm({ username: '', name: '', surname: '', cell: '', email: '', password: '' });
      } else {
        setMessage('Registration failed.');
      }
    } catch (err) {
      setMessage('Error connecting to server.');
    }
  };

  return (
    <div className={styles['registration-page']}>
      <div className={styles['registration-card']}>
        <div className={styles['registration-header']}>
          <h2>Create Account</h2>
          <p className={styles['registration-subtitle']}>Join us to manage your shopping lists</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles['form-row']}>
            <InputField type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
          </div>
          <div className={styles['form-row']}>
            <InputField type="text" name="name" placeholder="First Name" value={form.name} onChange={handleChange} required />
            <InputField type="text" name="surname" placeholder="Last Name" value={form.surname} onChange={handleChange} required />
          </div>
          <div className={styles['form-row']}>
            <InputField type="tel" name="cell" placeholder="Phone Number" value={form.cell} onChange={handleChange} required />
          </div>
          <div className={styles['form-row']}>
            <InputField type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
          </div>
          <div className={styles['form-row']}>
            <InputField type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          </div>
          <button type="submit" className={styles['register-button']}>Create Account</button>
        </form>
        <div className={styles['registration-footer']}>
          <p>Already have an account? <a href="/login">Sign in</a></p>
        </div>
        {message && ((message.toLowerCase().includes('error') || message.toLowerCase().includes('failed')) ? (
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

export default RegistrationPage;
