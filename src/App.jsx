import React, { useState } from 'react';
import { AlertCircle, Loader2, Menu, X } from 'lucide-react';
import Sidebar from './components/layout/Sidebar';
import DashboardView from './components/dashboard/DashboardView';
import ProductsView from './components/products/ProductsView';
import OrdersView from './components/orders/OrdersView';
import InventoryView from './components/inventory/InventoryView';
import { useGetProductsQuery } from './features/api/apiSlice';
import Container from './components/layout/Container';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <AlertCircle className="text-rose-500 mx-auto mb-4" size={40} />
          <p className="font-bold">Database Connection Failed</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* Mobile Menu Button - Only visible on small screens */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar - Hidden on mobile by default, shown when menu opens */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 transform transition-transform duration-300
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar
          activeView={activeView}
          onViewChange={(view) => {
            setActiveView(view);
            setMobileMenuOpen(false); // Close menu after selection on mobile
          }}
        />
      </div>

      {/* Overlay - Darkens background when mobile menu is open */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Container className="pt-16 lg:pt-6 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="animate-in fade-in duration-500">
              {activeView === 'dashboard' && <DashboardView />}
              {activeView === 'products' && <ProductsView />}
              {activeView === 'orders' && <OrdersView />}
              {activeView === 'inventory' && <InventoryView />}
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}

export default App;
