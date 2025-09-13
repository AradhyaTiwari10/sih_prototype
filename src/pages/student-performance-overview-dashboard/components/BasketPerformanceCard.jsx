import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const BasketPerformanceCard = ({ basket, data, peerComparison }) => {
  const getBasketColor = (basket) => {
    const colors = {
      'Academic': '#1E3A8A',
      'Clubs': '#7C3AED',
      'Competitions': '#EA580C',
      'Workshops': '#059669',
      'Community': '#DC2626'
    };
    return colors?.[basket] || '#64748B';
  };

  const getBasketIcon = (basket) => {
    const icons = {
      'Academic': 'BookOpen',
      'Clubs': 'Users',
      'Competitions': 'Trophy',
      'Workshops': 'Briefcase',
      'Community': 'Heart'
    };
    return icons?.[basket] || 'Star';
  };

  const chartData = [
    { name: 'Completed', value: data?.completed, color: getBasketColor(basket) },
    { name: 'Remaining', value: data?.total - data?.completed, color: '#E2E8F0' }
  ];

  const completionPercentage = Math.round((data?.completed / data?.total) * 100);
  const peerDifference = data?.completed - peerComparison?.average;
  const isAboveAverage = peerDifference > 0;

  return (
    <div className="academic-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: getBasketColor(basket) }}>
            <Icon name={getBasketIcon(basket)} size={20} color="white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{basket}</h3>
            <p className="text-xs text-muted-foreground">Performance Overview</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-foreground">{completionPercentage}%</p>
          <p className="text-xs text-muted-foreground">Complete</p>
        </div>
      </div>
      <div className="relative h-32 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              startAngle={90}
              endAngle={450}
              dataKey="value"
            >
              {chartData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">{data?.completed}</p>
            <p className="text-xs text-muted-foreground">of {data?.total}</p>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Current Points</span>
          <span className="text-xs font-medium text-foreground">{data?.points}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Peer Average</span>
          <div className="flex items-center space-x-1">
            <span className="text-xs font-medium text-foreground">{peerComparison?.average}</span>
            <Icon 
              name={isAboveAverage ? 'TrendingUp' : 'TrendingDown'} 
              size={12} 
              className={isAboveAverage ? 'text-success' : 'text-error'} 
            />
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">vs Peers</span>
            <span className={`text-xs font-medium ${isAboveAverage ? 'text-success' : 'text-error'}`}>
              {isAboveAverage ? '+' : ''}{peerDifference} points
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketPerformanceCard;