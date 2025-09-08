// src/components/SlidingPanel.jsx
import { Fragment } from 'react';
import { X } from 'lucide-react';

export default function SlidingPanel({ open, onClose, title, children }) {
  return (
    <Fragment>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 z-[1000] ${
          open
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sliding Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl transform transition-transform duration-300 flex flex-col z-[1100]
        ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 relative">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gradient-to-tr from-white via-gray-100 to-gray-200 hover:from-white hover:via-gray-100 hover:to-gray-200 shadow-md transition absolute top-2 right-2"
          >
            <X size={20} className="text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </Fragment>
  );
}
