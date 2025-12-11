import React from 'react';
import { TrackedEvent } from '../types';
import { X, BarChart2 } from 'lucide-react';

interface EventLogPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  events: TrackedEvent[];
  onEventClick: (event: TrackedEvent) => void;
}

const EventLogPanel: React.FC<EventLogPanelProps> = ({ isOpen, onClose, onOpen, events, onEventClick }) => {
  if (!isOpen) {
    return (
      <div 
        onClick={onOpen}
        className="fixed top-20 right-5 bg-primary text-white p-3 rounded-lg cursor-pointer font-bold shadow-lg flex items-center gap-2 z-50 hover:bg-primary-hover transition-colors"
      >
        <BarChart2 size={18} />
        Event Log
        <span className="bg-warning text-white text-xs px-2 py-0.5 rounded-full">{events.length}</span>
      </div>
    );
  }

  return (
    <div className="fixed top-24 right-5 w-80 max-h-[80vh] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden animate-in slide-in-from-right-10 duration-200">
      <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
        <h4 className="font-bold text-gray-800 flex items-center gap-2">
          <BarChart2 size={18} className="text-primary" />
          Analytics Log
        </h4>
        <button onClick={onClose} className="text-gray-500 hover:text-warning transition-colors">
          <X size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {events.length === 0 && (
          <div className="text-center text-gray-400 py-8 text-sm italic">
            No events fired yet. <br/> Interact with the app!
          </div>
        )}
        {[...events].reverse().map((event, idx) => (
          <div 
            key={idx}
            onClick={() => onEventClick(event)}
            className="p-3 bg-white hover:bg-blue-50 border border-gray-100 rounded-lg cursor-pointer transition-colors group"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-primary text-sm group-hover:text-primary-hover">{event.name}</span>
              <span className="text-xs text-gray-400 font-mono">
                {event.timestamp.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventLogPanel;