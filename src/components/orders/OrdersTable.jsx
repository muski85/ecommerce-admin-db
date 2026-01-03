import React from 'react';
import Badge from '../common/Badge';
import { formatDateShort } from '../../utils/dateFormatter';  // ← Import

/**
 * Orders Table Component
 * Props:
 * - orders: Array of order objects
 * - onUpdateStatus: Function to handle status updates
 */
function OrdersTable({ orders, onUpdateStatus }) {
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
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Update</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map(order => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-blue-600">#{order.id}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{order.customer}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{order.items}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">${order.total}</td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {formatDateShort(order.date)}
              </td>
              <td className="px-6 py-4">
                <Badge variant={getStatusVariant(order.status)}>
                  {order.status}
                </Badge>
              </td>
              <td className="px-6 py-4">
                <select
                  value={order.status}
                  onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersTable;