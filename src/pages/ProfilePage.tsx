import React, { useState } from 'react';
import '../styles/ProfilePage.css';
import { useAppSelector, useAppDispatch } from '../store';
import { login } from '../authSlice';
import CryptoJS from 'crypto-js';

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
    return <div className="profile-page"><h2>Profile</h2><p>No user data found.</p></div>;
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
  <div className="profile-page">
      <h2>Profile</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input type="text" name="surname" placeholder="Surname" value={form.surname} onChange={handleChange} required />
        <input type="tel" name="cell" placeholder="Cell Number" value={form.cell} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="New Password (leave blank to keep current)" value={form.password} onChange={handleChange} />
        <button type="submit">Update Profile</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProfilePage;
