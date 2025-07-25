import React, { useState } from 'react';
import confetti from 'canvas-confetti'; // 🎉 Import confetti lib
import './CodePopupForm.css';

function CodePopupForm({ onClose }) {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validCodes = ['welovezoho'];
    const isValid = validCodes.includes(code.toLowerCase().trim());

    if (isValid) {
      setMessage('🎉 Congratulations!');
      setSuccess(true);

      // 🎊 Trigger bottom-corner confetti
      launchConfetti();
    }
  };

  const launchConfetti = () => {
    const duration = 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 1 },
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <div className="code-popup-card">
      <button className="code-close-btn" onClick={onClose}>×</button>
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
            marginTop: '12px',
            color: success ? 'limegreen' : 'red',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default CodePopupForm;
