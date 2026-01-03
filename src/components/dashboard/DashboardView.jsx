import React from 'react';
import { Package, DollarSign, AlertCircle, ShoppingCart, ArrowRight } from 'lucide-react';
import StatCard from './StatCard';
import RecentOrders from './RecentOrders';
import ChartsSection from './ChartsSection';
import { useGetProductsQuery, useGetOrdersQuery, useGetStatsQuery } from '../../features/api/apiSlice';

function DashboardView() {
  const { data: products = [] } = useGetProductsQuery();
  const { data: orders = [] } = useGetOrdersQuery();
  const { data: stats } = useGetStatsQuery();
  
  const totalProducts = stats?.total_products || products.length;
  const totalInventoryValue = parseFloat(stats?.total_inventory_value || 0);
  const lowStockItems = parseInt(stats?.low_stock_items || 0);
  const pendingOrders = parseInt(stats?.pending_orders || 0);

  return (
    /* Changed from space-y-12 (48px) to space-y-8 (32px) for better spacing */
    <div className="space-y-2 pb-12">
      
      {/* 1. HEADER */}
      <div>
        <h1 className="text-3xl font-black text-slate-900">Dashboard</h1>
        <p className="text-slate-500 font-medium mt-1">Overview of your store performance</p>
      </div>
      
      {/* 2. STATS SECTION */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Products"
            value={totalProducts}
            icon={Package}
            iconBgColor="bg-indigo-50"
            iconColor="text-indigo-600"
          />
          <StatCard
            title="Inventory Value"
            value={`$${totalInventoryValue.toLocaleString(undefined, {minimumFractionDigits: 2})}`}
            icon={DollarSign}
            iconBgColor="bg-emerald-50"
            iconColor="text-emerald-600"
          />
          <StatCard
            title="Low Stock Items"
            value={lowStockItems}
            icon={AlertCircle}
            iconBgColor="bg-rose-50"
            iconColor="text-rose-600"
            valueColor="text-rose-600"
          />
          <StatCard
            title="Pending Orders"
            value={pendingOrders}
            icon={ShoppingCart}
            iconBgColor="bg-amber-50"
            iconColor="text-amber-600"
            valueColor="text-amber-600"
          />
        </div>
      </section>
      {/* 3. CHARTS SECTION*/}
      <section>
        <ChartsSection products={products} orders={orders} />
      </section>

      {/* 4. RECENT ORDERS SECTION - Also 32px gap from stats */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Recent Orders</h2>
          <button className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
            See all activity <ArrowRight size={16} />
          </button>
        </div>
        
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <RecentOrders orders={orders} />
        </div>
      </section>
    </div>
  );
}

export default DashboardView;