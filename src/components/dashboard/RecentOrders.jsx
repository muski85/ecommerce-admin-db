import React from 'react';
import Badge from '../common/Badge';

/**
 * Recent Orders Component
 * Props:
 * - orders: Array of order objects
 */
function RecentOrders({ orders }) {
  // Get badge variant based on status
  const getStatusVariant = (status) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'shipped': return 'info';
      case 'pending': return 'yellow';
      default: return 'default';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900">Recent Orders</h3>
      </div>
      <div className="p-4 lg:p-6">
        <div className="space-y-4">
          {orders.slice(0, 5).map(order => (
            <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 lg:p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-blue-700">#{order.id}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 text-sm lg:text-base truncate">{order.customer}</p>
                  <p className="text-xs lg:text-sm text-gray-500">{order.items} items • {order.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 lg:gap-4 sm:ml-auto">
                <p className="text-base lg:text-lg font-semibold text-gray-900">${order.total}</p>
                <Badge variant={getStatusVariant(order.status)}>
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentOrders;