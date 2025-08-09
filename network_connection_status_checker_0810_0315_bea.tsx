// 代码生成时间: 2025-08-10 03:15:45
import React, { useState, useEffect } from 'react';

interface NetworkStatus {
  isConnected: boolean;
  timestamp: Date;
}

const NetworkConnectionStatusChecker: React.FC = () => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({ isConnected: true, timestamp: new Date() });

  useEffect(() => {
    const checkNetworkStatus = () => {
      // This function simulates checking the network connection status.
      // In a real application, you would use a more reliable method to check the connection.
      const isConnected = navigator.onLine;
      setNetworkStatus({ isConnected, timestamp: new Date() });
    };

    // Check the network status on component mount
    checkNetworkStatus();

    // Set up an interval to check the network status every 5 seconds
    const intervalId = setInterval(checkNetworkStatus, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <p>
        <strong>Network Status: </strong>
        {networkStatus.isConnected ? 'Connected' : 'Disconnected'}
      </p>
      <p>Last Checked: {networkStatus.timestamp.toLocaleString()}</p>
    </div>
  );
};

export default NetworkConnectionStatusChecker;
