// 代码生成时间: 2025-10-10 20:09:48
import React, { useState, useEffect } from 'react';

// Notification component that displays a message for a certain amount of time
const Notification = ({ message, variant }: { message: string; variant: 'success' | 'error' | 'info'; }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Hide the notification after 5 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => setIsVisible(false), 5000);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!isVisible) return null;

  const className = `notification ${variant}`;
  
  return (
    <div className={className}>
      {message}
    </div>
  );
};

// NotificationContext to handle notifications
const NotificationContext = React.createContext<NotificationContextType>({} as NotificationContextType);

interface NotificationContextType {
  addNotification: (message: string, variant: 'success' | 'error' | 'info') => void;
}

const NotificationProvider: React.FC = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Add a notification to the state
  const addNotification = (message: string, variant: 'success' | 'error' | 'info') => {
    setNotifications(prevNotifications => [...prevNotifications, { message, variant }]);
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      <div className='notifications-container'>
        {notifications.map((notification, index) => (
          <Notification key={index} message={notification.message} variant={notification.variant} />
        ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use NotificationContext
const useNotification = () => {
  const context = React.useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

// App component that wraps everything
const App: React.FC = () => {
  const { addNotification } = useNotification();

  return (
    <div className='app'>
      <button onClick={() => addNotification('This is a success message!', 'success')}>Success</button>
      <button onClick={() => addNotification('This is an error message!', 'error')}>Error</button>
      <button onClick={() => addNotification('This is an info message!', 'info')}>Info</button>
      <NotificationProvider>
        {/* The rest of your app */}
      </NotificationProvider>
    </div>
  );
};

export default App;
