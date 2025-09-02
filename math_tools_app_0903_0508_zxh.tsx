// 代码生成时间: 2025-09-03 05:08:50
import React, { useState } from 'react';

// Interface to define the shape of the mathematical operations
interface MathOperation {
  operation: string;
  operandA: number;
  operandB: number;
}

// Interface to define the shape of the result from a mathematical operation
interface OperationResult {
  error: string | null;
  result: number | null;
}

// Function to perform basic arithmetic operations
const performMathOperation = ({ operation, operandA, operandB }: MathOperation): OperationResult => {
  let result: number | null = null;
  let error: string | null = null;

  switch (operation) {
    case 'add':
      result = operandA + operandB;
      break;
    case 'subtract':
      result = operandA - operandB;
      break;
    case 'multiply':
      result = operandA * operandB;
      break;
    case 'divide':
      if (operandB === 0) {
        error = 'Division by zero is not allowed.';
      } else {
        result = operandA / operandB;
      }
      break;
    default:
      error = 'Invalid operation selected.';
  }

  return { error, result };
};

// Main component of the Math Tools App
const MathToolsApp: React.FC = () => {
  // State to store the operation type, operands, and result
  const [operation, setOperation] = useState<string>('');
  const [operandA, setOperandA] = useState<number>(0);
  const [operandB, setOperandB] = useState<number>(0);
  const [result, setResult] = useState<OperationResult>({ error: null, result: null });

  // Handle input change for the operation type
  const handleOperationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOperation(event.target.value);
  };

  // Handle input change for operand A
  const handleOperandAChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOperandA(Number(event.target.value) || 0);
  };

  // Handle input change for operand B
  const handleOperandBChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOperandB(Number(event.target.value) || 0);
  };

  // Handle the execution of the mathematical operation
  const handleCalculate = () => {
    const operationData: MathOperation = {
      operation,
      operandA,
      operandB,
    };
    setResult(performMathOperation(operationData));
  };

  return (
    <div>
      <h1>Math Tools App</h1>
      <label htmlFor='operation'>Operation:</label>
      <select id='operation' value={operation} onChange={handleOperationChange}>
        <option value=''>Select an operation</option>
        <option value='add'>Add</option>
        <option value='subtract'>Subtract</option>
        <option value='multiply'>Multiply</option>
        <option value='divide'>Divide</option>
      </select>
      <br />
      <br />
      <label htmlFor='operandA'>Operand A:</label>
      <input
        type='number'
        id='operandA'
        value={operandA}
        onChange={handleOperandAChange}
      />
      <br />
      <br />
      <label htmlFor='operandB'>Operand B:</label>
      <input
        type='number'
        id='operandB'
        value={operandB}
        onChange={handleOperandBChange}
      />
      <br />
      <br />
      <button onClick={handleCalculate}>Calculate</button>
      <br />
      <br />
      {result.error && <p>Error: {result.error}</p>}
      {result.result !== null && <p>Result: {result.result}</p>}
    </div>
  );
};

export default MathToolsApp;