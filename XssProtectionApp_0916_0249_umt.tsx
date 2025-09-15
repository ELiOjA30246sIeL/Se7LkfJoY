// 代码生成时间: 2025-09-16 02:49:33
import React, { useState } from 'react';
import DOMPurify from 'dompurify';

interface XssProtectionAppProps {
  // Props interface (if needed)
}

const XssProtectionApp: React.FC<XssProtectionAppProps> = () => {
  const [userInput, setUserInput] = useState('');
  const [cleanInput, setCleanInput] = useState('');
  const [error, setError] = useState<null | string>(null);

  // Function to sanitize user input to prevent XSS attacks
  const sanitizeInput = () => {
    try {
      const cleanData = DOMPurify.sanitize(userInput);
      setCleanInput(cleanData);
      setError(null);
    } catch (error) {
      setError('Failed to sanitize input');
    }
  };

  return (
    <div>
      <h1>XSS Protection Demo</h1>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter some text..."
      />
      <button onClick={sanitizeInput}>Sanitize Input</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div dangerouslySetInnerHTML={{ __html: cleanInput }} />
    </div>
  );
};

export default XssProtectionApp;