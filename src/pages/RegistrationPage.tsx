import React, { useState } from 'react';
import '../styles/RegistrationPage.css';
import CryptoJS from 'crypto-js';
import ErrorMessage from '../components/ErrorMessage.tsx';
import SuccessMessage from '../components/SuccessMessage.tsx';

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
  <div className="registration-page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input type="text" name="surname" placeholder="Surname" value={form.surname} onChange={handleChange} required />
        <input type="tel" name="cell" placeholder="Cell Number" value={form.cell} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
      {message && ((message.toLowerCase().includes('error') || message.toLowerCase().includes('failed')) ? (
        <ErrorMessage message={message} />
      ) : message.toLowerCase().includes('success') ? (
        <SuccessMessage message={message} />
      ) : (
        <p>{message}</p>
      ))}
    </div>
  );
};

export default RegistrationPage;
