import React from 'react';
import { TrackedEvent } from '../types';
import { X, Code, Lightbulb, AlertTriangle } from 'lucide-react';

interface EventPopupProps {
  event: TrackedEvent | null;
  onClose: () => void;
}

const EventPopup: React.FC<EventPopupProps> = ({ event, onClose }) => {
  if (!event) return null;

  const def = event.def;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[100] p-4 animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform scale-100 transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
            <h3 className="text-2xl font-bold text-primary">{event.name}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-warning">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <section>
              <h4 className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                <Code size={18} className="text-primary" />
                Event Payload (Data Sent)
              </h4>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm overflow-x-auto text-gray-800">
                <pre>{JSON.stringify(event.payload, null, 2)}</pre>
              </div>
            </section>

            {def && (
              <>
                <section>
                  <h4 className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                    <Lightbulb size={18} className="text-primary" />
                    Why This Event Matters
                  </h4>
                  <p className="text-gray-600 leading-relaxed bg-blue-50 p-4 rounded-lg border border-blue-100">
                    {def.why_it_matters}
                  </p>
                </section>

                <section>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="flex items-center gap-2 font-bold text-warning mb-2">
                      <AlertTriangle size={18} />
                      Risk: If This Event Is Not Tracked
                    </h4>
                    <p className="text-red-800 text-sm font-medium">
                      {def.loss_if_missing}
                    </p>
                  </div>
                </section>
              </>
            )}
            
            {!def && (
              <p className="text-sm text-gray-400 italic">No definition found for this event in constants.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;