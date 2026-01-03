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
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {orders.slice(0, 5).map(order => (
            <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-700">#{order.id}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{order.customer}</p>
                  <p className="text-sm text-gray-500">{order.items} items • {order.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-lg font-semibold text-gray-900">${order.total}</p>
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