// client/src/App.jsx
import React, { useContext, useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { AuthContext } from './context/authContext.jsx';

function App() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [polls, setPolls] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(''); 

  const fetchPolls = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/polls');
      setPolls(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching polls:', err);
      setError('Failed to load polls.');
    } finally {
      // stop loading, whether it worked or not
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPolls(); 
  }, []); 
  const handleDelete = async (pollId) => {
    if (!window.confirm('Are you sure you want to delete this poll?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/polls/${pollId}`);
      setPolls(polls.filter((poll) => poll._id !== pollId));
    } catch (err) {
      console.error('Error deleting poll:', err);
      alert(err.response?.data?.message || 'Failed to delete poll');
    }
  };
  const handleVote = async(pollId, optionIndex) =>{
    // optimistic UI, don't wait for response, update count in frontend
    const newPolls = polls.map((poll) => {
      if (poll._id === pollId) {
        // creating a deep copy of poll in frontend we voted on
        const updatedPoll = { ...poll };
        updatedPoll.options = [...poll.options];
        //in memory
        updatedPoll.options[optionIndex].votes += 1;
        return updatedPoll;
      }
      return poll; 
    });
    // Update the screen instantly!
    setPolls(newPolls);
    try{
      await axios.post(`http://localhost:5000/api/polls/${pollId}/vote`, {
        optionIndex,
      });
    }
    catch (err){
      console.error('Error votiing: ', err);
      if(err.response && err.response.data && err.response.data.message=='You have already voted on this poll'){
        alert('You have already voted')
      }
      else {
        alert('Vote failed, try logging in!');
      }
      fetchPolls();
    }
  };
return (
    <div className="container">
      {/* <header className="header">
        <div>
          <h1>PollMaster</h1>
          <p>Real-time, secure voting platform.</p>
        </div>
        
        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <span style={{alignSelf: 'center', marginRight: '10px'}}>Hi, <strong>{user ? user.username : 'User'}</strong></span>
              <Link to="/create">
                <button className="btn-primary">Create Poll</button>
              </Link>
              <button onClick={logout} className="btn-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login"><button className="btn-secondary">Login</button></Link>
              <Link to="/register"><button className="btn-primary">Register</button></Link>
            </>
          )}
        </div>
      </header> */}

      {/* <main> */}
        <h2>Latest Polls</h2>
        {loading && <p>Loading content...</p>}
        {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
        {!loading && !error && (
          <div className="polls-grid">
            {polls.length === 0 ? (
              <p>No polls yet. Be the first to create one!</p>
            ) : (
              polls.map(poll => (
              <div key={poll._id} className="poll-card">
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start', 
                  marginBottom: '1rem' 
                }}>
                  <div style={{ paddingRight: '1rem' }}> 
                    <h3 style={{ margin: '0 0 0.5rem 0', lineHeight: '1.3' }}>
                      {poll.question}
                    </h3>
                    <small className="poll-meta" style={{ margin: 0 }}>
                      Posted by {poll.user ? poll.user.username : 'Unknown'}
                    </small>
                  </div>
                  {user && (user.username === 'admin' || (poll.user && user.id === poll.user._id)) && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); 
                        handleDelete(poll._id);
                      }}
                      title="Delete Poll"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--danger)',   
                        padding: '4px',   
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        lineHeight: 0,    
                        alignSelf: 'flex-start' 
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = 'white'; 
                        e.currentTarget.style.transform = 'scale(1.1)'; // Slight zoom
                      }} 
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = 'var(--danger)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  )}
                </div>
                {/* ----------------------------- */} 

                <div className="options-list">
                  {poll.options.map((option, index) => (
                    <div 
                      key={option._id} 
                      className="vote-option"
                      onClick={() => handleVote(poll._id, index)}
                    >
                      <span>{option.text}</span>
                      <span className="vote-count">{option.votes}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
            )}
          </div>
        )}
    </div>
  );
}

export default App;