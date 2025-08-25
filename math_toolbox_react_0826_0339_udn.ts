// 代码生成时间: 2025-08-26 03:39:05
import React, { useState } from 'react';

interface MathOperationProps {
  operation: 'add' | 'subtract' | 'multiply' | 'divide';
  number1: number;
  number2: number;
}

// Function to perform the math operation based on the provided operation type.
function performMathOperation({ operation, number1, number2 }: MathOperationProps): number | string {
  switch (operation) {
    case 'add':
      return number1 + number2;
    case 'subtract':
      return number1 - number2;
    case 'multiply':
      return number1 * number2;
    case 'divide':
      if (number2 === 0) {
        return 'Error: Division by zero';
      }
      return number1 / number2;
    default:
      return 'Error: Invalid operation';
  }
}

// The MathToolbox component that renders the UI and handles user input.
const MathToolbox: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [operation, setOperation] = useState<MathOperationProps['operation'] | ''>('');
  const [number1, setNumber1] = useState<number>(0);
  const [number2, setNumber2] = useState<number>(0);

  // Event handler for when the user inputs a number.
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      if (e.target.id === 'number1') {
        setNumber1(value);
      } else {
        setNumber2(value);
      }
    }
  };

  // Event handler for when the user selects an operation.
  const handleOperationSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOperation(e.target.value as MathOperationProps['operation']);
  };

  // Event handler for when the user clicks the calculate button.
  const handleCalculate = () => {
    const result = performMathOperation({ operation, number1, number2 });
    if (typeof result === 'string') {
      setResult(result);
    } else {
      setResult(result.toString());
    }
  };

  return (
    <div className='math-toolbox'>
      <input type='number' id='number1' value={number1} onChange={handleNumberInput} />
      <select onChange={handleOperationSelect} value={operation}>
        <option value=''>Choose an operation</option>
        <option value='add'>Add</option>
        <option value='subtract'>Subtract</option>
        <option value='multiply'>Multiply</option>
        <option value='divide'>Divide</option>
      </select>
      <input type='number' id='number2' value={number2} onChange={handleNumberInput} />
      <button onClick={handleCalculate}>Calculate</button>
      <div>Result: {result}</div>
    </div>
  );
};

export default MathToolbox;