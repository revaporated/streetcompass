import React from 'react';
import { FaBars } from 'react-icons/fa';

function MobileMenuButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden fixed top-4 left-4 p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
    >
      <FaBars className="h-6 w-6" />
    </button>
  );
}

export default MobileMenuButton;