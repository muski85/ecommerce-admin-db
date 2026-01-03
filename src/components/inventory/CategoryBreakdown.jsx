import React from 'react';
import { TrendingUp } from 'lucide-react';

/**
 * Category Breakdown Component
 * Props:
 * - products: Array of all products
 * - categories: Array of category names (default: ['Electronics', 'Accessories'])
 */
function CategoryBreakdown({ products, categories = ['Electronics', 'Accessories'] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
          <TrendingUp className="text-blue-600" size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Category Breakdown</h3>
          <p className="text-sm text-gray-500">Inventory by category</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {categories.map(category => {
          // Filter products by category
          const categoryProducts = products.filter(p => p.category === category);
          
          // Calculate total value (price × stock)
          const categoryValue = categoryProducts.reduce(
            (sum, p) => sum + (p.price * p.stock), 
            0
          );
          
          // Calculate percentage
          const percentage = products.length > 0 
            ? (categoryProducts.length / products.length) * 100 
            : 0;
          
          return (
            <div key={category}>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-900">{category}</span>
                <span className="text-sm text-gray-600">{categoryProducts.length} products</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              
              <p className="text-sm text-gray-600 mt-2">
                Total Value: ${categoryValue.toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryBreakdown;