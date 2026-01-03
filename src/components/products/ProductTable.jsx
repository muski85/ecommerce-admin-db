import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import Badge from '../common/Badge';

function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map(product => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <p className="text-sm font-medium text-gray-900">{product.name}</p>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">${product.price}</td>
              <td className="px-6 py-4">
                <span className={`text-sm font-medium ${product.stock < 20 ? 'text-orange-600' : 'text-gray-900'}`}>
                  {product.stock}
                </span>
              </td>
              <td className="px-6 py-4">
                <Badge variant={product.status === 'active' ? 'success' : 'warning'}>
                  {product.status}
                </Badge>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
