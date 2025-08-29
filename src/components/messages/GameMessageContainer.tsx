import React, { useRef, useCallback, ReactNode } from 'react';
import GameTextMessage from './GameTextMessage';

interface Message {
  id: number;
  message: string;
  duration?: number;
  theme?: 'success' | 'danger' | 'warning' | 'info';
  icon?: ReactNode;
  x?: number;
  y?: number;
}

interface GameMessageContainerProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const PROXIMITY_THRESHOLD = 50; // Pixels to group messages

const GameMessageContainer: React.FC<GameMessageContainerProps> = ({ messages, setMessages }) => {
  const messageRefs = useRef<Record<number, HTMLElement | null>>({});
  const messageGroups = useRef<Map<string, number[]>>(new Map());

  const handleMessageFinish = useCallback((id: number) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
    delete messageRefs.current[id];
  }, [setMessages]);

  const stackedMessages = messages.filter(msg => msg.x === undefined && msg.y === undefined);
  const mouseMessages = messages.filter(msg => msg.x !== undefined && msg.y !== undefined);

  // Group mouse messages by proximity
  const groupedMessages: Record<string, Message[]> = {};
  mouseMessages.forEach(msg => {
    let assignedGroupKey = null;
    for (const key in groupedMessages) {
      const [groupX, groupY] = key.split('_').map(Number);
      if (Math.abs(groupX - (msg.x || 0)) < PROXIMITY_THRESHOLD && Math.abs(groupY - (msg.y || 0)) < PROXIMITY_THRESHOLD) {
        assignedGroupKey = key;
        break;
      }
    }
    if (assignedGroupKey) {
      groupedMessages[assignedGroupKey].push(msg);
    } else {
      const newKey = `${msg.x}_${msg.y}`;
      groupedMessages[newKey] = [msg];
    }
  });

  return (
    <>
      {/* Container for messages stacked from the bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
        {stackedMessages.map((msg, index) => (
          <GameTextMessage
            key={msg.id}
            id={msg.id}
            ref={(el) => {
              messageRefs.current[msg.id] = el;
            }}
            message={msg.message}
            theme={msg.theme}
            icon={msg.icon}
            bottomOffset={(stackedMessages.length - 1 - index) * 50 + 20}
            onFinish={handleMessageFinish}
            moveDistance={50}
          />
        ))}
      </div>

      {/* Container for grouped mouse-positioned messages */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        {Object.entries(groupedMessages).map(([key, group]) => {
          const [baseX, baseY] = key.split('_').map(Number);
          return group.map((msg, index) => (
            <GameTextMessage
              key={msg.id}
              id={msg.id}
              ref={(el) => {
                messageRefs.current[msg.id] = el;
              }}
              duration={msg.duration}
              message={msg.message}
              theme={msg.theme}
              icon={msg.icon}
              x={baseX}
              y={baseY - (index * 30)} // Stack messages upwards from the base position
              onFinish={handleMessageFinish}
              moveDistance={50}
            />
          ));
        })}
      </div>
    </>
  );
};

export default GameMessageContainer;