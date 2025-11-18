// client/src/components/Header.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

function Header() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">PollMaster</Link>
        
        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <span style={{ marginRight: '15px', fontSize: '0.9rem', color: '#94a3b8' }}>
                {user ? user.username : ''}
              </span>
              <Link to="/create">
                <button className="btn-primary"> + New </button>
              </Link>
              <button onClick={handleLogout} className="btn-secondary" style={{marginLeft: '10px'}}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn-secondary" style={{marginRight: '10px'}}>Login</button>
              </Link>
              <Link to="/register">
                <button className="btn-primary">Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;