import React, { useState } from 'react';
import { FaFlask } from 'react-icons/fa';
import MobileMenuButton from './MobileMenuButton';

function Sidebar({ onTestClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarItems = [
    { name: 'Test', icon: FaFlask, onClick: onTestClick },
  ];

  return (
    <>
      <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      <div
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } md:block fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-md transition-transform duration-300 ease-in-out`}
      >
        <nav className="mt-10">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full text-left px-4 py-2 flex items-center text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <item.icon className="mr-3" />
              {item.name}
            </button>
          ))}
        </nav>
      </div>
      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar;