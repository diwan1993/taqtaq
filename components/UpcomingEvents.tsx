

import React from 'react';
// FIX: Added .ts extension to the import path.
import type { UpcomingEvent } from '../types.ts';

interface UpcomingEventsProps {
  events: UpcomingEvent[];
}

const EventIcon: React.FC<{ type: UpcomingEvent['type'] }> = ({ type }) => {
  const baseClasses = "w-10 h-10 rounded-lg flex items-center justify-center text-white";
  let icon;
  let bgColor;

  switch (type) {
    case 'exam':
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      );
      bgColor = "bg-red-500";
      break;
    case 'event':
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      bgColor = "bg-purple-500";
      break;
    case 'class':
    default:
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" />
        </svg>
      );
      bgColor = "bg-blue-500";
      break;
  }
  return <div className={`${baseClasses} ${bgColor}`}>{icon}</div>;
};

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Schedule</h3>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-center space-x-4">
            <EventIcon type={event.type} />
            <div>
              <p className="font-semibold text-gray-800">{event.title}</p>
              <p className="text-sm text-gray-500">{event.time} &bull; {event.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;