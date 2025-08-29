import React, { useRef, useCallback, ReactNode } from 'react';
import GameTextMessage from './GameTextMessage';

interface Message {
  id: number;
  message: string;
  theme?: 'success' | 'error' | 'warning' | 'default';
  icon?: ReactNode;
  x?: number;
  y?: number;
}

interface GameMessageContainerProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const GameMessageContainer: React.FC<GameMessageContainerProps> = ({ messages, setMessages }) => {
  const messageRefs = useRef<Record<number, HTMLElement | null>>({});

  const handleMessageFinish = useCallback((id: number) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
    delete messageRefs.current[id];
  }, [setMessages]);

  const bottomOffsets: Record<number, number> = {};
  const stackedMessages = messages.filter(msg => msg.x === undefined && msg.y === undefined);

  stackedMessages.forEach((msg, index) => {
    const reversedIndex = stackedMessages.length - 1 - index;
    bottomOffsets[msg.id] = reversedIndex * 50 + 20;
  });

  return (
    <>
      {/* Container for messages stacked from the bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
        {stackedMessages.map((msg) => (
          <GameTextMessage
            key={msg.id}
            id={msg.id}
            ref={(el) => {
              messageRefs.current[msg.id] = el;
            }}
            message={msg.message}
            theme={msg.theme}
            icon={msg.icon}
            bottomOffset={bottomOffsets[msg.id] || 0}
            onFinish={handleMessageFinish}
            moveDistance={50}
          />
        ))}
      </div>

      {/* Container for mouse-positioned messages */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        {messages.filter(msg => msg.x !== undefined && msg.y !== undefined).map((msg) => (
          <GameTextMessage
            key={msg.id}
            id={msg.id}
            ref={(el) => {
              messageRefs.current[msg.id] = el;
            }}
            message={msg.message}
            theme={msg.theme}
            icon={msg.icon}
            onFinish={handleMessageFinish}
            x={msg.x}
            y={msg.y}
          />
        ))}
      </div>
    </>
  );
};

export default GameMessageContainer;