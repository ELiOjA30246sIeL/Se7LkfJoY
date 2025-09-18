// 代码生成时间: 2025-09-18 22:21:10
// random_number_generator.tsx

import React, { useState } from 'react';


/**
 * RandomNumberGenerator component generates a random number
 * within a specified range.
 */

interface RandomNumberGeneratorProps {
  min: number;
  max: number;
}

const RandomNumberGenerator: React.FC<RandomNumberGeneratorProps> = ({ min, max }) => {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  // Function to generate a random number within the range
  const generateRandomNumber = (): void => {
    try {
      if (min >= max) {
        throw new Error('The minimum value must be less than the maximum value.');
      }
      const number = Math.floor(Math.random() * (max - min + 1)) + min;
      setRandomNumber(number);
    } catch (error) {
      console.error('Error generating random number:', error);
      // Handle error (e.g., by setting an error state or displaying an error message)
    }
  };

  return (
    <div>
      <h1>Random Number Generator</h1>
      <p>
        <button type='button' onClick={generateRandomNumber}>Generate Random Number</button>
      </p>
      {randomNumber !== null && <p>The generated random number is: {randomNumber}</p>}
    </div>
  );
};

export default RandomNumberGenerator;
