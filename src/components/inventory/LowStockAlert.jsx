import React from 'react';
import { AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRestockProductMutation } from '../../features/api/apiSlice';


/**
 * Low Stock Alert Component
 * Props:
 * - products: Array of low stock products (stock < 20)
 */
function LowStockAlert({ products }) {
  const [restockProduct] = useRestockProductMutation(); //used the hook
  
    const handleRestock = async (productId, productName) => {
      const loadingToast = toast.loading(`Restocking ${productName}...`);
      try {
        await restockProduct({ 
          id: productId,
          quantity: 50 // Restock by 50 units
        }).unwrap();
        toast.success(`${productName} restocked with 50 units! `,{
            id: loadingToast,
            duration: 4000
          });
      } catch(error) {
        console.error('Failed to restock product:', error);
        toast.error(`Failed to restock ${productName}`,{
            id: loadingToast,
          });
      }
    }
    

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
          <AlertCircle className="text-orange-600" size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Low Stock Alert</h3>
          <p className="text-sm text-gray-500">Items requiring attention</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-gray-500">All products are well stocked! 🎉</p>
          </div>
        ) : (
          products.map(product => (
            <div key={product.id} className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-orange-600 font-medium">
                    Only {product.stock} units left
                  </p>
                </div>
                <button 
                  onClick={() => handleRestock(product.id, product.name)}
                  className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  Restock (+50)
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LowStockAlert;