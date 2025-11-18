import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username,
      email,
      password,
    };
    try {
      const response = await axios.post(
        'http://3.108.221.59:5000/api/auth/register',
        userData
      );
      console.log('Registration successful:', response.data);
      setError(''); 
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err.response.data);
      if (err.response && err.response.data.message) {
        setError(err.response.data.message); 
      } else {
        setError('An unknown error occurred.');
      }
    }
  };
  return (
    <div className='container'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className='btn-primary' type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}
export default Register;