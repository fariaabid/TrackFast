import React from 'react';
import { MouseEvent } from 'react';

interface EventPillProps {
  eventName: string;
  onClick: () => void;
  className?: string;
}

const EventPill: React.FC<EventPillProps> = ({ eventName, onClick, className = '' }) => {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <span 
      onClick={handleClick}
      className={`inline-block ml-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full cursor-pointer hover:bg-primary-hover hover:scale-105 transition-all shadow-sm opacity-90 hover:opacity-100 align-middle ${className}`}
      title="Click to fire this event"
    >
      {eventName}
    </span>
  );
};

export default EventPill;