import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast'; 
import ProductFilters from './ProductFilters';
import ProductTable from './ProductTable';
import ProductModal from './ProductModal';
import { 
  useGetProductsQuery, 
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation 
} from '../../features/api/apiSlice';

/**
 * Products View - Main products page
 * Manages all product-related state and operations
 */
function ProductsView() {
  const { data: products = [] } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  const handleAddProduct = async (productData) => {
     const loadingToast = toast.loading('Adding product...'); 
    try {
      await addProduct(productData).unwrap();
      toast.success('Product added successfully! 🎉', { id: loadingToast });  // ← Success

      setShowAddModal(false);
    } catch (error) {
      console.error('Failed to add product:', error);
      toast.error('Failed to add product. Please try again.', { id: loadingToast });  // ← Error
    }
  };
  
  const handleEditProduct = async (productData) => {
    const loadingToast = toast.loading('Updating product...');

    try {
      await updateProduct(productData).unwrap();
      toast.success('Product updated successfully! ✅', { id: loadingToast });

      setEditingProduct(null);
    } catch (error) {
      console.error('Failed to update product:', error);
      toast.error('Failed to update product. Please try again.', { id: loadingToast });
    }
  };
  
  const handleDeleteProduct = async (id) => {
  toast((t) => (
      <div>
        <p className="font-semibold mb-3">Delete this product?</p>
        <p className="text-sm text-gray-600 mb-4">This action cannot be undone.</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              performDelete(id);
            }}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,  // Don't auto-dismiss
      style: { maxWidth: '400px' }
    });
  };
  
  const performDelete = async (id) => {
    const loadingToast = toast.loading('Deleting product...');
    
    try {
      await deleteProduct(id).unwrap();
      toast.success('Product deleted successfully! 🗑️', { id: loadingToast });
    } catch (error) {
      console.error('Failed to delete product:', error);
      toast.error('Failed to delete product. Please try again.', { id: loadingToast });
    }
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setStatusFilter('all');
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Products</h2>
          <p className="text-sm text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <ProductFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onClearFilters={clearFilters}
      />

      {/* Table */}
      <ProductTable
        products={filteredProducts}
        onEdit={setEditingProduct}
        onDelete={handleDeleteProduct}
      />

      {/* Add Modal */}
      <ProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddProduct}
      />

      {/* Edit Modal */}
      <ProductModal
        isOpen={editingProduct !== null}
        onClose={() => setEditingProduct(null)}
        onSubmit={handleEditProduct}
        product={editingProduct}
      />
    </div>
  );
}

export default ProductsView;