// 代码生成时间: 2025-09-16 14:33:20
 * Features:
 * - Addition
 * - Subtraction
 * - Multiplication
 * - Division
 *
 * This component can be easily extended with more mathematical operations.
 */

import React, { useState } from 'react';

// Define PropTypes for input validation (optional)
import PropTypes from 'prop-types';

// Interface for component's props
interface MathToolboxProps {
  // No props needed for this simple example
}
type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

// Interface for component's state
interface MathToolboxState {
  num1: number;
  num2: number;
  result: number;
  operation: Operation;
  error: string | null;
}

// MathToolbox component
const MathToolbox: React.FC<MathToolboxProps> = (props) => {
  // State to store numbers, operation, and result
  const [state, setState] = useState<MathToolboxState>({
    num1: 0,
    num2: 0,
    result: 0,
    operation: 'add',
    error: null,
  });

  // Handler for operation changes
  const handleOperationChange = (operation: Operation) => {
    setState(prevState => ({ ...prevState, operation }));
  };

  // Handler for number input changes
  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: parseFloat(value) || 0,
    }));
  };

  // Handler for calculate button click
  const handleCalculate = () => {
    try {
      switch (state.operation) {
        case 'add':
          setState(prevState => ({ ...prevState, result: state.num1 + state.num2 }));
          break;
        case 'subtract':
          setState(prevState => ({ ...prevState, result: state.num1 - state.num2 }));
          break;
        case 'multiply':
          setState(prevState => ({ ...prevState, result: state.num1 * state.num2 }));
          break;
        case 'divide':
          if (state.num2 === 0) {
            throw new Error('Cannot divide by zero.');
          }
          setState(prevState => ({ ...prevState, result: state.num1 / state.num2 }));
          break;
        default:
          throw new Error('Unknown operation.');
      }
    } catch (error) {
      setState(prevState => ({ ...prevState, error: error instanceof Error ? error.message : 'An unexpected error occurred.' }));
    }
  };

  // Render the component
  return (
    <div>
      <h1>Math Toolbox</h1>
      <div>
        <label>Number 1:
          <input
            type="number"
            name="num1"
            value={state.num1}
            onChange={handleNumberChange}
          />
        </label>
        <label>Number 2:
          <input
            type="number"
            name="num2"
            value={state.num2}
            onChange={handleNumberChange}
          />
        </label>
      </div>
      <div>
        <button onClick={() => handleOperationChange('add')}>Add</button>
        <button onClick={() => handleOperationChange('subtract')}>Subtract</button>
        <button onClick={() => handleOperationChange('multiply')}>Multiply</button>
        <button onClick={() => handleOperationChange('divide')}>Divide</button>
      </div>
      <button onClick={handleCalculate}>Calculate</button>
      {state.error && <div>Error: {state.error}</div>}
      {state.result !== 0 && <div>Result: {state.result}</div>}
    </div>
  );
};

// PropTypes (optional)
MathToolbox.propTypes = {
  // Define validation rules for props if needed
};

export default MathToolbox;
