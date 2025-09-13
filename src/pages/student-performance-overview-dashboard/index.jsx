import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import KPICard from './components/KPICard';
import TimelineChart from './components/TimelineChart';
import AchievementFeed from './components/AchievementFeed';
import BasketPerformanceCard from './components/BasketPerformanceCard';
import FilterControls from './components/FilterControls';
import GoalProgressTracker from './components/GoalProgressTracker';

const StudentPerformanceOverviewDashboard = () => {
  const [selectedSemester, setSelectedSemester] = useState('current');
  const [selectedBaskets, setSelectedBaskets] = useState([]);
  const [dateRange, setDateRange] = useState('current');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock student data
  const studentInfo = {
    name: "Aabir Sarkar",
    studentId: "CS2021001",
    program: "Computer Science Engineering",
    currentSemester: 8,
    admissionYear: 2021
  };

  // Mock KPI data
  const kpiData = [
    {
      title: "Current CGPA",
      value: "8.42",
      trend: "up",
      trendValue: "+0.15",
      icon: "GraduationCap",
      color: "bg-primary",
      description: "Above department average of 7.8"
    },
    {
      title: "Activity Points",
      value: "2,847",
      trend: "up",
      trendValue: "+127",
      icon: "Star",
      color: "bg-accent",
      description: "Ranking 12th in batch"
    },
    {
      title: "Achievements",
      value: "34",
      trend: "up",
      trendValue: "+3",
      icon: "Award",
      color: "bg-success",
      description: "New certifications earned"
    },
    {
      title: "Performance Score",
      value: "92.5",
      trend: "up",
      trendValue: "+2.1",
      icon: "TrendingUp",
      color: "bg-warning",
      description: "Excellent overall performance"
    }
  ];

  // Mock timeline data
  const timelineData = [
    { semester: "Sem 1", cgpa: 7.8, activityPoints: 120, basket: "Academic", milestone: "Dean\'s List" },
    { semester: "Sem 2", cgpa: 8.1, activityPoints: 245, basket: "Clubs", milestone: "Club Secretary" },
    { semester: "Sem 3", cgpa: 8.0, activityPoints: 380, basket: "Academic" },
    { semester: "Sem 4", cgpa: 8.3, activityPoints: 520, basket: "Competitions", milestone: "Hackathon Winner" },
    { semester: "Sem 5", cgpa: 8.2, activityPoints: 680, basket: "Workshops" },
    { semester: "Sem 6", cgpa: 8.4, activityPoints: 890, basket: "Community", milestone: "Volunteer Award" },
    { semester: "Sem 7", cgpa: 8.3, activityPoints: 1120, basket: "Academic", milestone: "Research Paper" },
    { semester: "Sem 8", cgpa: 8.42, activityPoints: 1350, basket: "Competitions", milestone: "National Competition" }
  ];

  // Mock achievements data
  const achievementsData = [
    {
      id: 1,
      title: "Research Paper Published",
      description: "Co-authored paper on Machine Learning applications in Healthcare published in IEEE conference",
      basket: "Academic",
      points: 150,
      date: new Date(Date.now() - 86400000 * 2)
    },
    {
      id: 2,
      title: "Hackathon Winner",
      description: "First place in National Level Hackathon on Sustainable Technology Solutions",
      basket: "Competitions",
      points: 200,
      date: new Date(Date.now() - 86400000 * 5)
    },
    {
      id: 3,
      title: "Workshop Certification",
      description: "Completed Advanced Cloud Computing certification from AWS with distinction",
      basket: "Workshops",
      points: 75,
      date: new Date(Date.now() - 86400000 * 7)
    },
    {
      id: 4,
      title: "Community Service Award",
      description: "Recognized for 100+ hours of community service in rural education initiative",
      basket: "Community",
      points: 100,
      date: new Date(Date.now() - 86400000 * 10)
    },
    {
      id: 5,
      title: "Club Leadership",
      description: "Elected as President of Computer Science Student Association",
      basket: "Clubs",
      points: 120,
      date: new Date(Date.now() - 86400000 * 14)
    }
  ];

  // Mock basket performance data
  const basketPerformanceData = [
    {
      basket: "Academic",
      data: { completed: 28, total: 32, points: 1250 },
      peerComparison: { average: 24 }
    },
    {
      basket: "Clubs",
      data: { completed: 12, total: 15, points: 480 },
      peerComparison: { average: 8 }
    },
    {
      basket: "Competitions",
      data: { completed: 8, total: 10, points: 720 },
      peerComparison: { average: 5 }
    },
    {
      basket: "Workshops",
      data: { completed: 15, total: 18, points: 375 },
      peerComparison: { average: 12 }
    },
    {
      basket: "Community",
      data: { completed: 6, total: 8, points: 300 },
      peerComparison: { average: 4 }
    }
  ];

  // Mock goals data
  const goalsData = [
    {
      id: 1,
      title: "Maintain CGPA above 8.5",
      category: "Academic",
      progress: 95,
      current: 8.42,
      target: 8.5,
      status: "in-progress",
      deadline: "2025-05-15"
    },
    {
      id: 2,
      title: "Complete 3000 Activity Points",
      category: "Overall",
      progress: 85,
      current: 2847,
      target: 3000,
      status: "in-progress",
      deadline: "2025-04-30"
    },
    {
      id: 3,
      title: "Publish 2 Research Papers",
      category: "Research",
      progress: 50,
      current: 1,
      target: 2,
      status: "in-progress",
      deadline: "2025-03-31"
    },
    {
      id: 4,
      title: "Complete Industry Internship",
      category: "Professional",
      progress: 100,
      current: 1,
      target: 1,
      status: "completed",
      deadline: "2024-12-31"
    }
  ];

  // Auto-refresh data every 15 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleBasketToggle = (basketId) => {
    if (Array.isArray(basketId)) {
      setSelectedBaskets(basketId);
    } else {
      setSelectedBaskets(prev => 
        prev?.includes(basketId) 
          ? prev?.filter(id => id !== basketId)
          : [...prev, basketId]
      );
    }
  };

  const handleExport = (type) => {
    // Mock export functionality
    const exportData = {
      student: studentInfo,
      kpis: kpiData,
      timeline: timelineData,
      achievements: achievementsData,
      basketPerformance: basketPerformanceData,
      goals: goalsData,
      exportDate: new Date()?.toISOString(),
      exportType: type
    };
    
    console.log(`Exporting ${type}:`, exportData);
    alert(`${type?.toUpperCase()} export initiated. Download will begin shortly.`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Student Performance Overview - EduPassport Analytics</title>
        <meta name="description" content="Comprehensive student academic journey visualization through passport-style interface supporting self-assessment and advisor interventions" />
      </Helmet>
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Student Info Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome back, {studentInfo?.name}
                </h1>
                <p className="text-muted-foreground">
                  {studentInfo?.program} • Semester {studentInfo?.currentSemester} • ID: {studentInfo?.studentId}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 text-right">
                <p className="text-sm text-muted-foreground">
                  Last updated: {lastUpdated?.toLocaleTimeString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  Auto-refresh every 15 minutes
                </p>
              </div>
            </div>
          </div>

          {/* KPI Cards - Now positioned before Filter Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData?.map((kpi, index) => (
              <KPICard key={index} {...kpi} />
            ))}
          </div>

          {/* Filter Controls - Now positioned after KPI Cards */}
          <FilterControls
            selectedSemester={selectedSemester}
            onSemesterChange={setSelectedSemester}
            selectedBaskets={selectedBaskets}
            onBasketToggle={handleBasketToggle}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            onExport={handleExport}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Timeline Chart */}
            <div className="lg:col-span-8">
              <TimelineChart 
                data={timelineData} 
                selectedBaskets={selectedBaskets}
              />
            </div>

            {/* Achievement Feed */}
            <div className="lg:col-span-4">
              <AchievementFeed achievements={achievementsData} />
            </div>
          </div>

          {/* Basket Performance Grid */}
          <div className="mb-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Basket Performance Comparison
              </h2>
              <p className="text-muted-foreground">
                Your performance across different activity categories with peer benchmarking
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {basketPerformanceData?.map((basket, index) => (
                <BasketPerformanceCard key={index} {...basket} />
              ))}
            </div>
          </div>

          {/* Goal Progress Tracker */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GoalProgressTracker goals={goalsData} />
            
            {/* Quick Actions */}
            <div className="academic-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
                  <p className="text-sm text-muted-foreground">Frequently used features</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-left">
                  <div className="text-sm font-medium text-foreground mb-1">Update Activities</div>
                  <div className="text-xs text-muted-foreground">Log new achievements</div>
                </button>
                
                <button className="p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-left">
                  <div className="text-sm font-medium text-foreground mb-1">View Transcript</div>
                  <div className="text-xs text-muted-foreground">Academic records</div>
                </button>
                
                <button className="p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-left">
                  <div className="text-sm font-medium text-foreground mb-1">Schedule 1:1</div>
                  <div className="text-xs text-muted-foreground">Book Faculty meeting</div>
                </button>
                
                <button className="p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-left">
                  <div className="text-sm font-medium text-foreground mb-1">Portfolio Export</div>
                  <div className="text-xs text-muted-foreground">Download PDF</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentPerformanceOverviewDashboard;