import React from 'react';

function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-orange-100 text-orange-700',
    info: 'bg-blue-100 text-blue-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    purple: 'bg-purple-100 text-purple-700',
  };

  return (
    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md ${variants[variant]}`}>
      {children}
    </span>
  );
}

export default Badge;
