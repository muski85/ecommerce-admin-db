import React from 'react';
import LowStockAlert from './LowStockAlert';
import CategoryBreakdown from './CategoryBreakdown';
import { useGetProductsQuery } from '../../features/api/apiSlice';

/**
 * Inventory View - Main inventory page
 * Displays low stock alerts and category breakdown
 */
function InventoryView() {
  const { data: products = [] } = useGetProductsQuery();
  
  // Filter low stock products (stock < 20)
  const lowStockProducts = products.filter(p => p.stock < 20);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">Inventory</h2>
        <p className="text-xs lg:text-sm text-gray-600 mt-1">Monitor stock levels and categories</p>
      </div>
      
      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Low Stock Alerts */}
        <LowStockAlert products={lowStockProducts} />

        {/* Category Breakdown */}
        <CategoryBreakdown products={products} />
        
      </div>
    </div>
  );
}

export default InventoryView;