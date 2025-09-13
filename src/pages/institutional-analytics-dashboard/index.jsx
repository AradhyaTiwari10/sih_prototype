import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import ExecutiveKPIStrip from './components/ExecutiveKPIStrip';
import GlobalControls from './components/GlobalControls';
import EnrollmentFunnelChart from './components/EnrollmentFunnelChart';
import BasketParticipationHeatmap from './components/BasketParticipationHeatmap';
import PerformanceCorrelationMatrix from './components/PerformanceCorrelationMatrix';
import RealTimeEngagementPanel from './components/RealTimeEngagementPanel';
import PredictiveAnalytics from './components/PredictiveAnalytics';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const InstitutionalAnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isExporting, setIsExporting] = useState(false);

  const tabOptions = [
    { key: 'overview', label: 'Overview', icon: 'BarChart3' },
    { key: 'enrollment', label: 'Enrollment Analysis', icon: 'Users' },
    { key: 'engagement', label: 'Student Engagement', icon: 'Activity' },
    { key: 'performance', label: 'Performance Analytics', icon: 'TrendingUp' },
    { key: 'predictive', label: 'Predictive Insights', icon: 'Brain' }
  ];

  const handleExportReport = async () => {
    setIsExporting(true);
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      console.log('Report exported successfully');
    }, 2000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <ExecutiveKPIStrip />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <EnrollmentFunnelChart />
              </div>
              <div className="xl:col-span-1">
                <RealTimeEngagementPanel />
              </div>
            </div>
          </div>
        );
      case 'enrollment':
        return (
          <div className="space-y-8">
            <EnrollmentFunnelChart />
            <BasketParticipationHeatmap />
          </div>
        );
      case 'engagement':
        return (
          <div className="space-y-8">
            <BasketParticipationHeatmap />
            <RealTimeEngagementPanel />
          </div>
        );
      case 'performance':
        return (
          <div className="space-y-8">
            <PerformanceCorrelationMatrix />
            <ExecutiveKPIStrip />
          </div>
        );
      case 'predictive':
        return (
          <div className="space-y-8">
            <PredictiveAnalytics />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Institutional Analytics Dashboard
              </h1>
              <p className="text-muted-foreground">
                Strategic insights into student engagement patterns and program effectiveness
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                loading={isExporting}
                onClick={handleExportReport}
              >
                {isExporting ? 'Exporting...' : 'Export Report'}
              </Button>
              <Button
                variant="default"
                iconName="Settings"
                iconPosition="left"
              >
                Configure Dashboard
              </Button>
            </div>
          </div>

          {/* Global Controls */}
          <GlobalControls />

          {/* Tab Navigation */}
          <div className="academic-card p-6 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              {tabOptions?.map((tab) => (
                <Button
                  key={tab?.key}
                  variant={activeTab === tab?.key ? 'default' : 'ghost'}
                  size="sm"
                  iconName={tab?.icon}
                  iconPosition="left"
                  onClick={() => setActiveTab(tab?.key)}
                  className="flex-shrink-0"
                >
                  {tab?.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {renderTabContent()}
          </div>

          {/* Quick Actions Footer */}
          <div className="mt-12 academic-card p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Need More Insights?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Access advanced analytics tools and custom report generation
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" iconName="FileText">
                  Custom Reports
                </Button>
                <Button variant="outline" iconName="Database">
                  Data Export
                </Button>
                <Button variant="default" iconName="Zap">
                  Advanced Analytics
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="GraduationCap" size={20} color="white" />
              </div>
              <div>
                <span className="text-sm font-semibold text-foreground">EduPassport Analytics</span>
                <p className="text-xs text-muted-foreground">Institutional Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>Last Updated: Dec 12, 2024</span>
              <span>•</span>
              <span>Data Refresh: Every 15 minutes</span>
              <span>•</span>
              <span>© {new Date()?.getFullYear()} EduPassport</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InstitutionalAnalyticsDashboard;