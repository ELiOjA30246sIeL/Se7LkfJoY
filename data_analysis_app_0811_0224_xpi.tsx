// 代码生成时间: 2025-08-11 02:24:10
import React, { useState } from 'react';

// Interface for the statistical data
interface IStats {
  sum: number;
  average: number;
  min: number;
  max: number;
}

// Interface for the data to be analyzed
interface IData {
  id: string;
  value: number;
}

// The DataAnalysis component calculates statistical data
const DataAnalysis: React.FC = () => {
  const [data, setData] = useState<IData[]>([]);
  const [stats, setStats] = useState<IStats>({ sum: 0, average: 0, min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER });

  // Function to compute statistics
  const computeStats = (data: IData[]): IStats => {
    const sum = data.reduce((acc, item) => acc + item.value, 0);
    const average = sum / data.length;
    const min = Math.min(...data.map(item => item.value));
    const max = Math.max(...data.map(item => item.value));
    return { sum, average, min, max };
  };

  // Handler for when new data is added
  const handleAddData = (id: string, value: number) => {
    setData(prevData => [
      ...prevData,
      { id: id, value: value }
    ]);
    setStats(computeStats([...data, { id: id, value: value }]));
  };

  // Handler for when data is removed
  const handleRemoveData = (id: string) => {
    setData(prevData => prevData.filter(item => item.id !== id));
    setStats(computeStats(prevData.filter(item => item.id !== id)));
  };

  return (
    <div>
      <h1>Data Analysis Tool</h1>
      {
        // Display the statistical data
        data.length > 0 && <div>
          <p>Total Sum: {stats.sum}</p>
          <p>Average Value: {stats.average.toFixed(2)}</p>
          <p>Minimum Value: {stats.min}</p>
          <p>Maximum Value: {stats.max}</p>
        </div>
      }
      <button onClick={() => handleAddData('1', 10)}>Add Data (10)</button>
      <button onClick={() => handleAddData('2', 20)}>Add Data (20)</button>
      <button onClick={() => handleAddData('3', 30)}>Add Data (30)</button>
      <button onClick={() => handleRemoveData('1')} disabled={!data.find(d => d.id === '1')}>Remove Data (10)</button>
      <button onClick={() => handleRemoveData('2')} disabled={!data.find(d => d.id === '2')}>Remove Data (20)</button>
      <button onClick={() => handleRemoveData('3')} disabled={!data.find(d => d.id === '3')}>Remove Data (30)</button>
    </div>
  );
};

export default DataAnalysis;