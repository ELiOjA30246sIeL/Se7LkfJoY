// 代码生成时间: 2025-08-23 04:04:44
import React, { useState } from 'react';

interface MathOperationProps {
  // Define the props for the math operation component.
  operation: 'add' | 'subtract' | 'multiply' | 'divide';
  num1: number;
  num2: number;
}

const MathOperation: React.FC<MathOperationProps> = ({ operation, num1, num2 }) => {
  let result;
  try {
    switch (operation) {
      case 'add':
        result = num1 + num2;
        break;
      case 'subtract':
        result = num1 - num2;
        break;
      case 'multiply':
        result = num1 * num2;
        break;
      case 'divide':
        if (num2 === 0) throw new Error('Cannot divide by zero.');
        result = num1 / num2;
        break;
      default:
        throw new Error('Invalid operation.');
    }
  } catch (error) {
    // Handle errors, such as division by zero or invalid operation.
    return <p>Error: {error.message}</p>;
  }

  return (
    <p>
      {num1} {operation} {num2} = {result}
    </p>
  );
};

interface MathCalculatorProps {
  // Define the props for the main calculator component.
}

const MathCalculator: React.FC<MathCalculatorProps> = () => {
  // Use state to manage the input values and the operation type.
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('add');

  // Handlers for input change.
  const handleNum1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNum1(Number(event.target.value));
  };

  const handleNum2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNum2(Number(event.target.value));
  };

  const handleOperationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOperation(event.target.value as 'add' | 'subtract' | 'multiply' | 'divide');
  };

  return (
    <div>
      <h1>Math Calculator Toolkit</h1>
      <input type="number" value={num1} onChange={handleNum1Change} />
      <input type="number" value={num2} onChange={handleNum2Change} />
      <select value={operation} onChange={handleOperationChange}>
        <option value="add">Add</option>
        <option value="subtract">Subtract</option>
        <option value="multiply">Multiply</option>
        <option value="divide">Divide</option>
      </select>
      <MathOperation operation={operation} num1={num1} num2={num2} />
    </div>
  );
};

export default MathCalculator;