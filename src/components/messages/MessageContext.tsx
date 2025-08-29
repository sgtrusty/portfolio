import React, { createContext, useContext, useState, useRef, useCallback, ReactNode, MouseEvent } from 'react';
import GameMessageContainer from './GameMessageContainer';

interface Message {
  id: number;
  message: string;
  theme?: 'success' | 'error' | 'warning' | 'default';
  icon?: ReactNode;
  x?: number; // New
  y?: number; // New
}

interface MessageContextType {
  addMessage: (message: string, theme?: Message['theme'], icon?: ReactNode, x?: number, y?: number) => void; // Updated
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const nextId = useRef(0);

  const addMessage = useCallback((
    message: string,
    theme?: Message['theme'],
    icon?: ReactNode,
    x?: number, // New
    y?: number // New
  ) => {
    const newId = nextId.current++;
    const newMessage: Message = { id: newId, message, theme, icon, x, y }; // Updated
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, []);

  const value = { addMessage };

  return (
    <MessageContext.Provider value={value}>
      {children}
      <GameMessageContainer messages={messages} setMessages={setMessages} />
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};