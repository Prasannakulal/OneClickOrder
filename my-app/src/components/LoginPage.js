import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Ensure this path is correct
import './LoginPage.css'; // Import the custom CSS file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false); // New state to toggle register form
  const [forgotEmail, setForgotEmail] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        navigate('/home');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: registerName, email: registerEmail, password: registerPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registration successful! Please login.');
        setShowRegister(false); // Switch back to login after successful registration
        setRegisterEmail('');
        setRegisterPassword('');
        setRegisterName('');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Password reset link sent to your email.');
        setForgotEmail('');
        setShowForgotPassword(false);
      } else {
        setError(data.message || 'Failed to send password reset link');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        {showForgotPassword ? (
          <form className="form" onSubmit={handleForgotPassword}>
            <h2>Forgot Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              className="input"
              required
            />
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <button type="submit" className="btn">Send Reset Link</button>
            <button type="button" className="btn btn-secondary" onClick={() => setShowForgotPassword(false)}>Back to Login</button>
          </form>
        ) : showRegister ? (
          <form className="form" onSubmit={handleRegister}>
            <h2>Register</h2>
            <input
              type="text"
              placeholder="Name"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              className="input"
              required
            />
            <input
              type="email"
              placeholder="Email address"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              className="input"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              className="input"
              required
            />
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <button type="submit" className="btn">Register</button>
            <button type="button" className="btn btn-secondary" onClick={() => setShowRegister(false)}>Back to Login</button>
          </form>
        ) : (
          <form className="form" onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn">Login</button>
            <button type="button" className="btn btn-link" onClick={() => setShowForgotPassword(true)}>Forgot Password?</button>
            <button type="button" className="btn btn-link" onClick={() => setShowRegister(true)}>Register</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
