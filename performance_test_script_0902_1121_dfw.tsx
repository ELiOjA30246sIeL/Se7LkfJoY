// 代码生成时间: 2025-09-02 11:21:49
 * It uses React and TypeScript to create a clean and maintainable codebase.
 */

import React, { useState, useEffect } from 'react';

// Interface for the Props to define what is expected to be passed down to the component.
interface PerformanceTestProps {
  testFunction: () => void;
  iterations: number;
  delay?: number;
}

// PerformanceTest component that takes a testFunction and runs it for a specified number of iterations,
// with optional delay between iterations.
const PerformanceTest: React.FC<PerformanceTestProps> = ({ testFunction, iterations, delay = 0 }) => {
  const [results, setResults] = useState<number[]>([]);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle the start of the performance test.
  const startTest = () => {
    setRunning(true);
    setResults([]);
    setError(null);

    try {
      for (let i = 0; i < iterations; i++) {
        // Record the start time.
        const startTime = performance.now();
        testFunction();
        // Record the end time and calculate the duration.
        const duration = performance.now() - startTime;
        results.push(duration);
        if (delay) setTimeout(() => {}, delay);
      }
      setRunning(false);
    } catch (e) {
      setError('An error occurred during testing: ' + e.message);
      setRunning(false);
    }
  };

  // Effect to handle the cleanup when the component unmounts.
  useEffect(() => {
    return () => {
      if (running) {
        console.warn('Performance test was interrupted.');
      }
    };
  }, [running]);

  // Render the component.
  return (
    <div>
      <button disabled={running} onClick={startTest}>
        Start Performance Test
      </button>
      {error && <p>Error: {error}</p>}
      {results.length > 0 && <p>Average Duration: {results.reduce((a, b) => a + b, 0) / results.length} ms</p>}
      {running && <p>Running...</p>}
    </div>
  );
};

export default PerformanceTest;