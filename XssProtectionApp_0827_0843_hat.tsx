// 代码生成时间: 2025-08-27 08:43:49
import React, { useState } from 'react';
import DOMPurify from 'dompurify'; // We use DOMPurify to sanitize HTML content

interface XssProtectionAppProps {
  // Props interface, if any props are needed
}

// Simple React component to demonstrate XSS protection
const XssProtectionApp: React.FC<XssProtectionAppProps> = () => {
  const [userInput, setUserInput] = useState('');
  const [sanitizedInput, setSanitizedInput] = useState('');

  // Function to handle user input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  // Function to sanitize the user input and update the state
  const sanitizeInput = () => {
    try {
      // Sanitize the input to prevent XSS attacks
      const cleanInput = DOMPurify.sanitize(userInput);
      setSanitizedInput(cleanInput);
    } catch (error) {
      // Handle errors if sanitization fails
      console.error('Error sanitizing input:', error);
    }
  };

  return (
    <div>
      <h1>XSS Protection Demo</h1>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Enter HTML content..."
      />
      <button onClick={sanitizeInput}>Sanitize Input</button>
      <div dangerouslySetInnerHTML={{ __html: sanitizedInput }} />
      {sanitizedInput && <p>Sanitized HTML: {sanitizedInput}</p>}
    </div>
  );
};

export default XssProtectionApp;