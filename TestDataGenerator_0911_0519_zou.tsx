// 代码生成时间: 2025-09-11 05:19:23
import React, { useState } from 'react';

// TypeScript interface to define the shape of our test data
interface TestData {
  id: number;
  name: string;
  age: number;
}

// Component that generates test data
const TestDataGenerator: React.FC = () => {
  const [data, setData] = useState<TestData[]>([]);

  // Function to generate a single piece of test data
  const generateData = (): TestData => {
    const randomId = Math.floor(Math.random() * 10000);
    const randomName = `Person ${randomId}`;
    const randomAge = Math.floor(Math.random() * 50) + 18; // Age between 18 and 68
    return { id: randomId, name: randomName, age: randomAge };
  };

  // Function to add new test data to the state
  const addData = () => {
    try {
      const newData = generateData();
      setData(prevData => [...prevData, newData]);
    } catch (error) {
      console.error('Error generating test data:', error);
    }
  };

  // Function to remove all test data
  const clearData = () => {
    setData([]);
  };

  return (
    <div>
      <h1>Test Data Generator</h1>
      <button onClick={addData}>Add Test Data</button>
      <button onClick={clearData}>Clear All Data</button>
      <div>
        <h2>Generated Data:</h2>
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              ID: {item.id}, Name: {item.name}, Age: {item.age}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TestDataGenerator;
