import React from 'react';
import Modal from '../common/Modal';

/**
 * Product Modal Component (Add/Edit)
 * Props:
 * - isOpen: Boolean
 * - onClose: Function to close modal
 * - onSubmit: Function to handle form submission
 * - product: Product object (null for Add, object for Edit)
 */
function ProductModal({ isOpen, onClose, onSubmit, product = null }) {
  const isEdit = product !== null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const productData = {
      name: formData.get('name'),
      price: parseFloat(formData.get('price')),
      stock: parseInt(formData.get('stock')),
      category: formData.get('category'),
    };

    if (isEdit) {
      productData.id = product.id;
    }

    onSubmit(productData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Product' : 'Add New Product'}>
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              name="name"
              type="text"
              defaultValue={product?.name || ''}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              name="price"
              type="number"
              step="0.01"
              defaultValue={product?.price || ''}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input
              name="stock"
              type="number"
              defaultValue={product?.stock || ''}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              defaultValue={product?.category || ''}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 p-6 border-t border-gray-200">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
          >
            {isEdit ? 'Save Changes' : 'Add Product'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ProductModal;