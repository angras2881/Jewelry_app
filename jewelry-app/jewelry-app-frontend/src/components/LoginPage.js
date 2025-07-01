import React, { useState } from 'react';
import './ProfilePage.css'; // reuse styling

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('✅ Login successful!');
        onLogin(data.user); // callback to update user state
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('❌ Server error');
    }
  };

  return (
    <div className="profile-page">
      <h2>Login</h2>
      <form className="profile-form" onSubmit={handleLogin}>
        <label>Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Login</button>
        {message && <p className="profile-message">{message}</p>}
      </form>
    </div>
  );
}

export default LoginPage;
