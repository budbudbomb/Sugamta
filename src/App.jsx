import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import RoutePlanning from './screens/RoutePlanning';
import {
  SectorOfficerAppointment,
  VehicleAcquisition,
  VehicleAllocation,
  TransitLog,
  VehicleRelease,
  FuelStationAssignment,
  FuelBillingPortal
} from './screens/SecondaryMocks';

function App() {
  const [activeScreen, setActiveScreen] = useState('route-planning');

  // Renders the specific screen based on active selection
  const renderContent = () => {
    switch (activeScreen) {
      case 'route-planning':
        return <RoutePlanning />;
      case 'sector-officer':
        return <SectorOfficerAppointment onNext={(nextScreen) => setActiveScreen(nextScreen)} />;
      case 'vehicle-acquisition':
        return <VehicleAcquisition onNext={(nextScreen) => setActiveScreen(nextScreen)} />;
      case 'vehicle-allocation':
        return <VehicleAllocation onNext={(nextScreen) => setActiveScreen(nextScreen)} />;
      case 'transit-log':
        return <TransitLog onNext={(nextScreen) => setActiveScreen(nextScreen)} />;
      case 'vehicle-release':
        return <VehicleRelease />;
      case 'fuel-station':
        return <FuelStationAssignment onNext={(nextScreen) => setActiveScreen(nextScreen)} />;
      case 'fuel-billing':
        return <FuelBillingPortal />;
      default:
        return <RoutePlanning />;
    }
  };

  return (
    <div className="grid m-0 p-0 min-h-screen">
      {/* 1. Left Sidebar Panel */}
      <Sidebar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />

      {/* 2. Right Main Dashboard Viewport */}
      <div className="col-12 md:col-9 lg:col-10 p-4 flex flex-column justify-content-between min-h-screen">
        <div>
          {/* Dashboard Premium Top Header Banner */}
          <div className="flex justify-content-between align-items-center mb-4 p-3 border-round-xl glass-panel shadow-sm">
            <div className="flex align-items-center gap-3">
              <span className="p-3 bg-indigo-50 text-indigo-600 border-circle flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                <i className="pi pi-home text-xl"></i>
              </span>
              <div>
                <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Madhya Pradesh State Elections 2026</span>
                <span className="text-lg font-bold text-slate-800">District Rajgarh • Block Sarangpur Portal</span>
              </div>
            </div>

            <div className="flex align-items-center gap-4">
              {/* Real-time Indicator Clock */}
              <div className="hidden lg:flex flex-column align-items-end">
                <span className="text-xs font-semibold text-slate-400">System Time Logged</span>
                <span className="text-sm font-bold text-slate-700">2026-05-27 11:20:25</span>
              </div>

              {/* Status Badge */}
              <div className="flex align-items-center gap-2 px-3 py-2 border-round bg-green-50 text-green-700 border-1 border-green-200">
                <span className="w-2 h-2 border-circle bg-green-500 inline-block animate-pulse" style={{ width: '8px', height: '8px' }}></span>
                <span className="text-xs font-bold uppercase">Online • Active Roll</span>
              </div>
            </div>
          </div>

          {/* 3. Render Routed Dashboard Viewport Screen */}
          <div className="mt-2">
            {renderContent()}
          </div>
        </div>

        {/* Global Footer Notes */}
        <div className="text-center text-xs text-slate-400 border-top-1 border-slate-200 pt-4 mt-5" style={{ borderTop: '1px solid #e2e8f0' }}>
          Election Commission Transport Management Node • Authorized RO & DEO Administrative Workspace Console. Unauthorized access is highly prohibited under IPC Act.
        </div>
      </div>
    </div>
  );
}

export default App;
