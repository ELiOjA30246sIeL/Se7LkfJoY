// 代码生成时间: 2025-10-07 03:23:24
import React, { useState } from 'react';

// Interface to define the state shape for the calculator
interface ProbabilityCalculatorState {
  numerator: number;
  denominator: number;
  probability: number | null;
  error: string | null;
}

// Main component for probability distribution calculator
const ProbabilityCalculator: React.FC = () => {
  const [state, setState] = useState<ProbabilityCalculatorState>({
    numerator: 0,
    denominator: 0,
    probability: null,
    error: null,
  });

  // Handle input change for numerator
  const handleNumeratorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (isNaN(value)) {
      setState(prevState => ({ ...prevState, error: 'Please enter a valid number for the numerator.' }));
    } else {
      setState(prevState => ({ ...prevState, numerator: value, error: null }));
    }
  };

  // Handle input change for denominator
  const handleDenominatorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (isNaN(value) || value <= 0) {
      setState(prevState => ({ ...prevState, error: 'Please enter a positive number for the denominator.' }));
    } else {
      setState(prevState => ({ ...prevState, denominator: value, error: null }));
    }
  };

  // Calculate the probability
  const calculateProbability = () => {
    try {
      const { numerator, denominator } = state;
      if (numerator <= 0 || denominator <= 0) {
        throw new Error('Numerator and denominator must be positive numbers.');
      }
      const probability = numerator / denominator;
      setState(prevState => ({ ...prevState, probability, error: null }));
    } catch (error) {
      setState(prevState => ({ ...prevState, error: error instanceof Error ? error.message : 'Unknown error.' }));
    }
  };

  return (
    <div>
      <h1>Probability Distribution Calculator</h1>
      {state.error && <p className='error'>{state.error}</p>}
      <div>
        <label htmlFor='numerator'>Numerator: </label>
        <input
          type='number'
          id='numerator'
          value={state.numerator}
          onChange={handleNumeratorChange}
        />
      </div>
      <div>
        <label htmlFor='denominator'>Denominator: </label>
        <input
          type='number'
          id='denominator'
          value={state.denominator}
          onChange={handleDenominatorChange}
        />
      </div>
      <button onClick={calculateProbability}>Calculate</button>
      {state.probability !== null && <p>Probability: {state.probability.toFixed(2)}</p>}
    </div>
  );
};

export default ProbabilityCalculator;