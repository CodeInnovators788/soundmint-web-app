// src/components/DropdownMenu.jsx
import { useState, useRef, useEffect } from 'react';

export default function DropdownMenu({ label, items }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Dropdown Button */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 px-4 py-2 rounded-lg font-semibold text-gray-700 cursor-pointer select-none 
             hover:bg-gray-100 transition border border-gray-200"
      >
        <span>{label}</span>
        <svg
          className={`w-4 h-4 text-gray-700 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Dropdown Items */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-64 sm:w-56 md:w-64 rounded-2xl shadow-xl overflow-hidden z-50 animate-dropdown
                     bg-white border border-gray-200 backdrop-blur-sm
                     sm:right-0 sm:mt-2
                     xs:left-0 xs:mt-1 xs:w-full xs:rounded-none xs:shadow-md"
        >
          <div className="flex flex-col p-2 gap-1">
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={item.onClick}
                className="block px-4 py-2 text-gray-800 font-medium text-sm rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Animation */}
      <style>
        {`
          @keyframes dropdown {
            0% { transform: translateY(-5px) scale(0.95); opacity: 0; }
            100% { transform: translateY(0) scale(1); opacity: 1; }
          }
          .animate-dropdown { animation: dropdown 150ms ease-out forwards; }
        `}
      </style>
    </div>
  );
}
