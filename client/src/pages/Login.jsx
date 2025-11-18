import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const loginData = {email,password};
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        // the data we're sending
        loginData
      );
      console.log('Login successful:', response.data);
      login(response.data.token, response.data.user);
      navigate('/');

    } catch (err) {
      console.error('Login error:', err.response.data);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if(err.message){
        setError(err.message);
      } 
      else {
        setError('An unknown error occurred.');
      }
    }
  };
  return (
    <div className='container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button className= "btn-primary" type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;