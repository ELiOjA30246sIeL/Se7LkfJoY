// 代码生成时间: 2025-08-18 18:32:57
 * It includes error handling and follows TypeScript best practices for maintainability and scalability.
 */

import React, { useState } from 'react';

interface RandomNumberGeneratorProps {
  min: number;
  max: number;
}

/**
 * RandomNumberGenerator component generates a random number within a specified range.
 * @param props - The props object containing the minimum and maximum values for the range.
 * @returns A React functional component.
 */
const RandomNumberGenerator: React.FC<RandomNumberGeneratorProps> = ({ min, max }) => {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Generates a random number within the specified range.
   * @returns A random number or null if the range is invalid.
   */
  const generateRandomNumber = (): number | null => {
    if (min > max) {
      setError('The minimum value cannot be greater than the maximum value.');
      return null;
    }
    setError(null);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  /**
   * Handles the click event to generate a new random number.
   */
  const handleGenerate = (): void => {
    const newRandomNumber = generateRandomNumber();
    if (newRandomNumber !== null) {
      setRandomNumber(newRandomNumber);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Random number between {min} and {max}:</p>
      <button onClick={handleGenerate}>Generate</button>
      {randomNumber !== null && <p>The random number is: {randomNumber}</p>}
    </div>
  );
};

export default RandomNumberGenerator;