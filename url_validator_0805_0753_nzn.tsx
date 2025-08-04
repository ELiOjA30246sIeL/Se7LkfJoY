// 代码生成时间: 2025-08-05 07:53:27
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// URLValidator Component
const URLValidator = ({ onValidURL }: { onValidURL: (url: string) => void }) => {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');

  // Function to validate URL format
  const validateURL = (inputUrl: string) => {
    const urlPattern = new RegExp('^(https?:\/\/)?'+
      '((([a-zA-Z\d]([a-zA-Z\d-]*[a-zA-Z\d])*)\.)+[a-zA-Z]{2,}|'+
      '((\d{1,3}\.){3}\d{1,3}))'+
      '(\:\d+)?(\/[^\s]*)?$', 'i');
    return urlPattern.test(inputUrl);
  };

  // Function to check URL link validity
  const checkURLValidity = async () => {
    setError('');
    setIsValid(false);
    if (validateURL(url)) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          setIsValid(true);
          onValidURL(url);
        } else {
          setError('The URL is not reachable.');
        }
      } catch (error) {
        setError('Failed to reach the URL.');
      }
    } else {
      setError('Invalid URL format.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL..."
      />
      <button onClick={checkURLValidity}>Validate URL</button>
      {isValid && <p>URL is valid and reachable.</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

// PropTypes for URLValidator Component
URLValidator.propTypes = {
  onValidURL: PropTypes.func.isRequired,
};

export default URLValidator;
