import React, { useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterControls = ({ 
  selectedSemester, 
  onSemesterChange, 
  selectedBaskets, 
  onBasketToggle, 
  dateRange, 
  onDateRangeChange,
  onExport 
}) => {
  const semesterOptions = [
    { value: 'all', label: 'All Semesters' },
    { value: 'current', label: 'Current Semester' },
    { value: 'sem8', label: 'Semester 8' },
    { value: 'sem7', label: 'Semester 7' },
    { value: 'sem6', label: 'Semester 6' },
    { value: 'sem5', label: 'Semester 5' },
    { value: 'sem4', label: 'Semester 4' },
    { value: 'sem3', label: 'Semester 3' },
    { value: 'sem2', label: 'Semester 2' },
    { value: 'sem1', label: 'Semester 1' }
  ];

  const dateRangeOptions = [
    { value: 'current', label: 'Current Academic Year' },
    { value: 'last6months', label: 'Last 6 Months' },
    { value: 'lastyear', label: 'Last Academic Year' },
    { value: 'all', label: 'All Time' }
  ];

  const baskets = [
    { id: 'Academic', label: 'Academic', color: 'bg-primary', icon: 'BookOpen' },
    { id: 'Clubs', label: 'Clubs & Fests', color: 'bg-accent', icon: 'Users' },
    { id: 'Competitions', label: 'Competitions', color: 'bg-warning', icon: 'Trophy' },
    { id: 'Workshops', label: 'Workshops', color: 'bg-success', icon: 'Briefcase' },
    { id: 'Community', label: 'Community Service', color: 'bg-error', icon: 'Heart' }
  ];

  // Initialize default values on component mount
  useEffect(() => {
    if (!selectedSemester) {
      onSemesterChange?.('sem8');
    }
    if (!dateRange) {
      onDateRangeChange?.('last6months');
    }
  }, [selectedSemester, dateRange, onSemesterChange, onDateRangeChange]);

  const handleExportClick = (type, event) => {
    event?.preventDefault();
    event?.stopPropagation();
    
    try {
      // Mock export functionality with better feedback
      const exportData = {
        type: type,
        timestamp: new Date()?.toISOString(),
        student: "Aabir Sarkar",
        filters: {
          semester: selectedSemester,
          dateRange: dateRange,
          baskets: selectedBaskets
        }
      };
      
      console.log(`Exporting ${type}:`, exportData);
      
      // Simulate export process
      const fileName = `${type === 'pdf' ? 'performance_report' : 'academic_transcript'}_${new Date()?.toISOString()?.split('T')?.[0]}.${type === 'pdf' ? 'pdf' : 'xlsx'}`;
      alert(`${type?.toUpperCase()} export started! File: ${fileName}`);
      
      // Call the parent handler
      onExport?.(type);
    } catch (error) {
      console.error('Export error:', error);
      alert('Export failed. Please try again.');
    }
  };

  const handleBasketClick = (basketId, event) => {
    event?.preventDefault();
    event?.stopPropagation();
    onBasketToggle?.(basketId);
  };

  const handleClearAll = (event) => {
    event?.preventDefault();
    event?.stopPropagation();
    onBasketToggle?.([]);
  };

  return (
    <div className="academic-card p-6 mb-6" style={{ position: 'relative', zIndex: 1 }}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="w-full sm:w-48" style={{ zIndex: 100 }}>
            <Select
              label="Semester"
              options={semesterOptions}
              value={selectedSemester || 'sem8'}
              onChange={onSemesterChange}
              className="text-sm"
              placeholder="Select Semester"
            />
          </div>
          
          <div className="w-full sm:w-48" style={{ zIndex: 99 }}>
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={dateRange || 'last6months'}
              onChange={onDateRangeChange}
              className="text-sm"
              placeholder="Select Date Range"
            />
          </div>
        </div>

        {/* Right Section - Export */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={(e) => handleExportClick('pdf', e)}
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Export PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="FileText"
            iconPosition="left"
            onClick={(e) => handleExportClick('transcript', e)}
            className="hover:bg-secondary hover:text-secondary-foreground transition-colors"
          >
            Transcript
          </Button>
        </div>
      </div>
      
      {/* Basket Filters */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-foreground">Activity Baskets</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="text-xs hover:bg-muted transition-colors"
          >
            Clear All
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {baskets?.map((basket) => {
            const isSelected = selectedBaskets?.includes(basket?.id);
            return (
              <button
                key={basket?.id}
                onClick={(e) => handleBasketClick(basket?.id, e)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  isSelected
                    ? `${basket?.color} text-white shadow-md border-transparent`
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 border-border hover:border-primary/50'
                }`}
                type="button"
              >
                <Icon name={basket?.icon} size={14} />
                <span>{basket?.label}</span>
                {isSelected && (
                  <Icon name="Check" size={12} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterControls;