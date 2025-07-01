import React, { useState } from 'react';
import './ProfilePage.css';

function ProfilePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage('❌ Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('✅ Profile saved successfully!');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      } else {
        setMessage(`❌ ${data.message || 'Failed to save profile.'}`);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setMessage('❌ Server error');
    }
  };

  return (
    <div className="profile-page">
      <h2>User Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password:
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Confirm Password:
          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Save Profile</button>
        {message && <p className="profile-message">{message}</p>}
      </form>
    </div>
  );
}

export default ProfilePage;
