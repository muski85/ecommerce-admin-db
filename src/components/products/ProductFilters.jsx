import React from 'react';
import { Search, Filter } from 'lucide-react';

/**
 * Product Filters Component
 * Props:
 * - searchTerm, setSearchTerm
 * - categoryFilter, setCategoryFilter
 * - statusFilter, setStatusFilter
 * - onClearFilters
 */
function ProductFilters({ 
  searchTerm, 
  setSearchTerm, 
  categoryFilter, 
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  onClearFilters 
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="low-stock">Low Stock</option>
        </select>
        <button
          onClick={onClearFilters}
          className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default ProductFilters;