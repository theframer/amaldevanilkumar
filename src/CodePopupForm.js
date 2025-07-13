import React, { useState } from 'react';
import './CodePopupForm.css';

function CodePopupForm({ onClose }) {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(null); // true or false

  const handleSubmit = (e) => {
    e.preventDefault();
    const validCodes = ["welovezoho"];
    if (validCodes.includes(code)) {
      setMessage("Congratulations!");
      setSuccess(true);
    } else {
      setMessage("Sorry, invalid code.");
      setSuccess(false);
    }
  };

  return (
    <div className="code-popup-card">
      <button className="code-close-btn" onClick={onClose}></button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit" className="go-btn">Go</button>
      </form>
      {message && (
        <p
          style={{
            marginTop: '10px',
            color: success ? 'limegreen' : 'red',
            fontWeight: '500'
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default CodePopupForm;
