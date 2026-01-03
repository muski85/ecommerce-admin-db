import React from 'react';
import OrdersTable from './OrdersTable';
import { useGetOrdersQuery, useUpdateOrderStatusMutation } from '../../features/api/apiSlice';
import toast from 'react-hot-toast'; 

/**
 * Orders View - Main orders page
 * Manages all order-related state and operations
 */
function OrdersView() {
  const { data: orders = [] } = useGetOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    const loadingToast = toast.loading('Updating order status...');
    toast.success(`Order #${orderId} marked as ${newStatus}! ✅`, { id: loadingToast });

    try {
      await updateOrderStatus({ id: orderId, status: newStatus }).unwrap();
    
    } catch (error) {
      console.error('Failed to update order:', error);
      toast.error('Failed to update order status.', { id: loadingToast });

    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">Orders</h2>
        <p className="text-xs lg:text-sm text-gray-600 mt-1">Manage customer orders</p>
      </div>
      
      {/* Orders Table */}
      <OrdersTable 
        orders={orders} 
        onUpdateStatus={handleUpdateOrderStatus}
      />
    </div>
  );
}

export default OrdersView;