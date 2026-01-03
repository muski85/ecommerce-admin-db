import React from 'react';

function StatCard({ title, value, icon: Icon, iconBgColor, iconColor, valueColor = 'text-gray-900' }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
          <Icon className={iconColor} size={24} />
        </div>
        <span className="text-xs font-semibold text-green-600">↗ +5.2%</span>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-2 font-medium">{title}</p>
        <p className={`text-4xl font-bold ${valueColor}`}>{value}</p>
      </div>
    </div>
  );
}

export default StatCard;