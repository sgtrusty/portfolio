import React from 'react';
import { MessageProvider, useMessages } from './MessageContext';
import { RocketIcon } from '@radix-ui/react-icons';

// A sample component to demonstrate adding messages
const MyGameComponent: React.FC = () => {
  const { addMessage } = useMessages();

  const handleLevelUp = () => {
    addMessage('You leveled up!', 'success');
  };

  const handleGameOver = () => {
    addMessage('Game Over! You lost.', 'error');
  };

  // Updated to pass mouse coordinates
  const handlePowerUp = (e: React.MouseEvent) => {
    addMessage('Power-up acquired!', 'default', <RocketIcon />, e.clientX, e.clientY);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Game UI</h1>
      <p className="mb-6">Click the buttons below to trigger game events and see the messages appear!</p>
      <div className="flex space-x-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          onClick={handleLevelUp}
        >
          Level Up
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          onClick={handleGameOver}
        >
          Game Over
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          onClick={handlePowerUp}
        >
          Get Power-Up
        </button>
      </div>
    </div>
  );
};

// The main App component
const App: React.FC = () => {
  return (
    <MessageProvider>
      <MyGameComponent />
    </MessageProvider>
  );
};

export default App;