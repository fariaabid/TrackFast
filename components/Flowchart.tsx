import React from 'react';
import { TrackedEvent } from '../types';
import { CheckCircle, Circle } from 'lucide-react';

interface FlowchartProps {
  events: TrackedEvent[];
}

const steps = [
  { id: 'home', label: 'Homepage', triggers: ['page_view', 'hero_cta_click'] },
  { id: 'plp', label: 'Products', triggers: ['view_item_list'] },
  { id: 'pdp', label: 'PDP', triggers: ['view_item'] },
  { id: 'cart', label: 'Add to Cart', triggers: ['add_to_cart'] },
  { id: 'checkout', label: 'Checkout', triggers: ['begin_checkout'] },
  { id: 'shipping', label: 'Shipping', triggers: ['add_shipping_info'] },
  { id: 'purchase', label: 'Purchase', triggers: ['purchase'] }
];

const Flowchart: React.FC<FlowchartProps> = ({ events }) => {
  const firedEventNames = new Set(events.map(e => e.name));

  return (
    <div className="w-full overflow-x-auto py-6 mb-8 border-y border-gray-200 bg-white">
      <div className="flex justify-between items-center min-w-[768px] px-4">
        {steps.map((step, idx) => {
          const isCompleted = step.triggers.some(t => firedEventNames.has(t));
          const isNext = idx < steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-2 z-10">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-md ${
                    isCompleted ? 'bg-success text-white scale-110' : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle size={24} /> : <Circle size={24} />}
                </div>
                <span className={`text-xs font-semibold uppercase tracking-wide ${isCompleted ? 'text-success' : 'text-gray-400'}`}>
                  {step.label}
                </span>
              </div>
              
              {isNext && (
                <div className="flex-1 h-1 mx-4 bg-gray-200 rounded relative">
                   <div 
                    className="absolute top-0 left-0 h-full bg-success transition-all duration-500"
                    style={{ width: isCompleted ? '100%' : '0%' }} 
                   />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Flowchart;