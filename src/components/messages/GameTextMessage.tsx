import React, { useEffect, forwardRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  CheckIcon,
  Cross2Icon,
  ExclamationTriangleIcon,
  InfoCircledIcon
} from '@radix-ui/react-icons';

export type MessageTheme = 'success' | 'danger' | 'warning' | 'info';

const themes: Record<MessageTheme, string> = {
  success: 'bg-green-600/80 text-white',
  danger: 'bg-red-600/80 text-white',
  warning: 'bg-yellow-500/80 text-black',
  info: 'bg-black/70 text-white dark:bg-white/80 dark:text-black',
};

const defaultIcons: Record<string, ReactNode> = {
  success: <CheckIcon />,
  danger: <Cross2Icon />,
  warning: <ExclamationTriangleIcon />,
  info: <InfoCircledIcon />,
};

interface GameTextMessageProps {
  id: number;
  message?: string;
  duration?: number;
  fadeDuration?: number;
  moveDistance?: number;
  staticWidth?: number;
  wrap?: boolean;
  theme?: MessageTheme;
  bottomOffset?: number;
  onFinish?: (id: number) => void;
  className?: string;
  icon?: ReactNode;
  x?: number;
  y?: number;
}

const GameTextMessage = forwardRef<HTMLDivElement, GameTextMessageProps>(({
  id,
  message,
  duration = 3000,
  fadeDuration = 1000,
  moveDistance = 50,
  staticWidth,
  wrap = true,
  theme = 'info',
  bottomOffset = 0,
  onFinish,
  className,
  icon,
  x,
  y,
}, ref) => {
  useEffect(() => {
    const unmountTimeout = setTimeout(() => {
      if (onFinish) {
        onFinish(id);
      }
    }, duration);

    return () => {
      clearTimeout(unmountTimeout);
    };
  }, [id, duration, onFinish]);

  const animationName = 'move-and-fade-anim';

  const isMousePositioned = x !== undefined && y !== undefined;

  const animationStyle: React.CSSProperties = {
    transition: 'bottom 0.3s ease-out',
    animationName: animationName,
    animationDuration: `${duration}ms`,
    animationFillMode: 'forwards',
  };

  const dynamicClasses = twMerge(
    'transform text-sm',
    isMousePositioned ? 'fixed' : 'absolute left-1/2',
    isMousePositioned ? '' : '-translate-x-1/2',
    wrap ? 'whitespace-normal' : 'whitespace-nowrap',
    staticWidth ? `w-[${staticWidth}px]` : '',
    className,
  );

  const innerWrapperClasses = twMerge(
    'px-2 py-1 rounded-sm flex items-center gap-2',
    themes[theme] || themes.info,
  );

  const iconToRender = icon !== undefined ? icon : defaultIcons[theme];

  return (
    <div
      ref={ref}
      className={dynamicClasses}
      style={{
        ...animationStyle,
        bottom: isMousePositioned ? `calc(100vh - ${y}px)` : `${bottomOffset}px`,
        left: isMousePositioned ? `${x}px` : '50%',
        transform: isMousePositioned ? 'translate(-50%, 0)' : 'translate(-50%, 0)', // Adjusted transform
        opacity: 1
      }}
    >
      <style>
        {`
        @keyframes move-and-fade-anim {
          0% {
            opacity: 1;
            transform: translate(-50%, 0);
          }
          ${((duration - fadeDuration) / duration) * 100}% {
            opacity: 1;
            transform: translate(-50%, 0);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, calc(-1 * ${moveDistance}px));
          }
        }
        @keyframes fade-only-anim {
          0% {
            opacity: 1;
            transform: translate(-50%, 0);
          }
          ${((duration - fadeDuration) / duration) * 100}% {
            opacity: 1;
            transform: translate(-50%, 0);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, 0);
          }
        }
        `}
      </style>
      <div className={innerWrapperClasses}>
        {iconToRender && <span>{iconToRender}</span>}
        {message}
      </div>
    </div>
  );
});

export default GameTextMessage;