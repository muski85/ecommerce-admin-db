import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

function ChartsSection({ products, orders }) {
  
  // 1. SALES TREND DATA (Mock data - replace with real order dates)
  const salesData = [
    { month: 'Jan', sales: 4500, revenue: 12000 },
    { month: 'Feb', sales: 3200, revenue: 8900 },
    { month: 'Mar', sales: 5800, revenue: 15600 },
    { month: 'Apr', sales: 4900, revenue: 13200 },
    { month: 'May', sales: 6200, revenue: 16800 },
    { month: 'Jun', sales: 7100, revenue: 19200 },
  ];

  // 2. CATEGORY DISTRIBUTION (From real products data)
  const categoryData = products.reduce((acc, product) => {
    const existing = acc.find(item => item.name === product.category);
    if (existing) {
      existing.value += 1;
      existing.totalValue += product.price * product.stock;
    } else {
      acc.push({
        name: product.category,
        value: 1,
        totalValue: product.price * product.stock
      });
    }
    return acc;
  }, []);

  // 3. TOP PRODUCTS BY STOCK VALUE
  const topProducts = [...products]
    .map(p => ({
      name: p.name.length > 15 ? p.name.substring(0, 15) + '...' : p.name,
      value: p.price * p.stock
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6); // Top 6 products

  // Colors for pie chart
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <div className="space-y-6">
      
      {/* SALES TREND - LINE CHART */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Sales & Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* TWO COLUMN CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CATEGORY DISTRIBUTION - PIE CHART */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Products by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Legend */}
          <div className="mt-4 space-y-2">
            {categoryData.map((category, index) => (
              <div key={category.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="font-medium text-gray-700">{category.name}</span>
                </div>
                <span className="text-gray-600">
                  {category.value} items • ${category.totalValue.toFixed(0)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* TOP PRODUCTS - BAR CHART */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Products by Value</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280"
                style={{ fontSize: '11px' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
                formatter={(value) => `$${value.toFixed(2)}`}
              />
              <Bar 
                dataKey="value" 
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ChartsSection;