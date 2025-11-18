// client/src/pages/CreatePoll.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';

function CreatePoll() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']); 
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext); // Get token to prove we are logged in
  const navigate = useNavigate();
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  const addOption = () => {
    setOptions([...options, '']);
  };
  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // for options which are empty
    const validOptions = options.filter(opt => opt.trim() !== '');
    if (validOptions.length < 2) {
      setError('You need at least 2 valid options!');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/polls', {
        question,
        options: validOptions
      });
      // back to home
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Failed to create poll. Make sure you are logged in.');
    }
  };

  return (
    <div>
      <h2>Create a New Poll for everyone!</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., What is your favorite color?"
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>

        <label>Options:</label>
        {options.map((option, index) => (
          <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              style={{ flexGrow: 1, padding: '8px', marginRight: '10px' }}
              required
            />
            {options.length > 2 && (
              <button type="button" onClick={() => removeOption(index)} style={{ background: 'red', color: 'white' }}>
                X
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addOption} style={{ marginRight: '10px' }}>
          + Add Option
        </button>

        <button type="submit" style={{ background: 'green', color: 'white' }}>
          Create Poll
        </button>
      </form>
    </div>
  );
}

export default CreatePoll;