import React from 'react';
import { EVENT_DEFS } from '../constants';
import EventPill from '../components/EventPill';
import { FolderOpen, AlertTriangle, Lightbulb, Code } from 'lucide-react';

interface DocumentationProps {
  onTrack: (name: string) => void;
}

const Documentation: React.FC<DocumentationProps> = ({ onTrack }) => {
  // Group events
  const groupedEvents: Record<string, any[]> = {};
  Object.entries(EVENT_DEFS).forEach(([key, def]) => {
    if (!groupedEvents[def.group]) groupedEvents[def.group] = [];
    groupedEvents[def.group].push({ name: key, ...def });
  });

  const formatJSON = (str: string) => {
    try {
      return JSON.stringify(JSON.parse(str), null, 2);
    } catch (e) {
      return str;
    }
  };

  return (
    <div className="animate-in fade-in duration-300 pb-20">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-10">
        <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-gray-900">Tracking Documentation</h1>
            <EventPill eventName="page_view" onClick={() => onTrack('page_view')} />
        </div>
        <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
            The complete reference guide for all TrackFast e-commerce events. 
            Developers and analysts can use this resource to understand the 
            <span className="font-semibold text-primary"> business value</span>, 
            <span className="font-semibold text-primary"> data structure</span>, and 
            <span className="font-semibold text-warning"> risks of missing data</span> for each event.
            <br/><br/>
            <span className="text-sm bg-blue-50 text-primary px-3 py-1 rounded-full font-medium">
                Tip: Click the event pills to fire a live test event!
            </span>
        </p>
      </div>

      <div className="space-y-16">
        {Object.entries(groupedEvents).map(([group, events]) => (
            <div key={group} className="scroll-mt-24" id={group.toLowerCase().replace(/\s+/g, '-')}>
                <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-4 mb-8 flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg text-primary">
                        <FolderOpen size={24} />
                    </div>
                    {group}
                </h2>
                
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {events.map((ev) => (
                        <div key={ev.name} className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden group">
                            
                            {/* Card Header */}
                            <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-xl text-gray-900 mb-1 group-hover:text-primary transition-colors font-mono">{ev.name}</h3>
                                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Event Name</div>
                                </div>
                                <EventPill eventName={ev.name} onClick={() => onTrack(ev.name)} />
                            </div>

                            <div className="p-6 space-y-6 flex-1 flex flex-col">
                                {/* Why it matters */}
                                <div>
                                    <h4 className="flex items-center gap-2 font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">
                                        <Lightbulb size={16} className="text-primary" />
                                        Business Value
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {ev.why_it_matters}
                                    </p>
                                </div>

                                {/* Risk */}
                                <div>
                                    <h4 className="flex items-center gap-2 font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">
                                        <AlertTriangle size={16} className="text-warning" />
                                        Risk if Missing
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {ev.loss_if_missing}
                                    </p>
                                </div>

                                {/* Payload */}
                                <div className="mt-auto pt-4">
                                     <h4 className="flex items-center gap-2 font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">
                                        <Code size={16} className="text-gray-400" />
                                        Example Payload
                                    </h4>
                                    <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-blue-300 overflow-x-auto shadow-inner">
                                        <pre>{formatJSON(ev.example_payload)}</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Documentation;