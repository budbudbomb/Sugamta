import React from 'react';

export default function Sidebar({ activeScreen, setActiveScreen }) {
  const menuItems = [
    {
      id: 'route-planning',
      title: '1. Route Planning',
      icon: 'pi pi-map',
      description: 'Done by RO, Approved by DEO',
      badge: 'Active'
    },
    {
      id: 'sector-officer',
      title: '2. Sector Officer Appt.',
      icon: 'pi pi-user-edit',
      description: 'Assign blocks & booths',
      badge: 'Draft'
    },
    {
      id: 'vehicle-acquisition',
      title: '3. Vehicle Acquisition',
      icon: 'pi pi-car',
      description: 'Departmental & private logs',
      badge: 'Pending'
    },
    {
      id: 'vehicle-allocation',
      title: '4. Vehicle Allocation',
      icon: 'pi pi-directions',
      description: 'Match vehicles to route'
    },
    {
      id: 'transit-log',
      title: '5. Transit Log',
      icon: 'pi pi-history',
      description: 'Trip sheet & milometer logs'
    },
    {
      id: 'vehicle-release',
      title: '6. Vehicle Release',
      icon: 'pi pi-verified',
      description: 'Final fuel & DSC release'
    },
    {
      id: 'fuel-station',
      title: '7. Fuel Station Appt.',
      icon: 'pi pi-map-marker',
      description: 'Assign fuel stations block wise',
      badge: 'DEO'
    },
    {
      id: 'fuel-billing',
      title: '8. Fuel Billing & Logs',
      icon: 'pi pi-wallet',
      description: 'Log fillings & amount due',
      badge: 'Billing'
    }
  ];

  return (
    <div className="col-12 md:col-3 lg:col-2 sidebar-glass min-h-screen p-4 flex flex-column justify-content-between">
      <div>
        {/* Brand / Logo Section */}
        <div className="flex align-items-center gap-3 mb-5 mt-2">
          <div 
            className="flex align-items-center justify-content-center border-circle" 
            style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', boxShadow: '0 4px 10px rgba(99,102,241,0.4)' }}
          >
            <i className="pi pi-truck text-white text-xl"></i>
          </div>
          <div>
            <h4 className="m-0 text-white font-bold tracking-tight" style={{ fontSize: '1.1rem' }}>E-Transport</h4>
            <span className="text-xs text-slate-400 font-medium text-indigo-200">Election Comm. System</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex flex-column gap-2 mt-4">
          {menuItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <div
                key={item.id}
                className={`menu-item-hover p-3 flex align-items-start gap-3 ${isActive ? 'active-menu-item text-white' : 'text-slate-300'}`}
                onClick={() => setActiveScreen(item.id)}
                style={{ cursor: 'pointer' }}
              >
                <i className={`${item.icon} text-lg mt-1`} style={{ color: isActive ? '#818cf8' : '#94a3b8' }}></i>
                <div className="flex-1">
                  <div className="flex align-items-center justify-content-between">
                    <span className="font-semibold text-sm">{item.title}</span>
                    {item.badge && (
                      <span 
                        className="text-xs px-2 py-0.5 border-round-md font-semibold"
                        style={{
                          background: item.badge === 'Active' ? 'rgba(34, 197, 94, 0.2)' : item.badge === 'DEO' ? 'rgba(249, 115, 22, 0.2)' : item.badge === 'Billing' ? 'rgba(20, 184, 166, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                          color: item.badge === 'Active' ? '#4ade80' : item.badge === 'DEO' ? '#f97316' : item.badge === 'Billing' ? '#14b8a6' : '#facc15',
                          fontSize: '10px'
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs block text-slate-400 font-normal mt-1" style={{ color: '#94a3b8', fontSize: '11px' }}>
                    {item.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* User Information Profile block at the bottom */}
      <div className="border-t-1 border-slate-700 pt-4 mt-5" style={{ borderTop: '1px solid #334155' }}>
        <div className="flex align-items-center gap-3">
          <div 
            className="flex align-items-center justify-content-center border-circle bg-indigo-900 border-1 border-indigo-700" 
            style={{ width: '40px', height: '40px', background: '#312e81' }}
          >
            <span className="font-bold text-sm text-indigo-200">RO</span>
          </div>
          <div>
            <h5 className="m-0 text-white text-sm font-semibold">Returning Officer</h5>
            <span className="text-xs font-semibold px-2 py-0.5 border-round bg-green-900 text-green-300 mt-1 inline-block" style={{ fontSize: '10px', background: 'rgba(20,83,45,0.4)', color: '#86efac' }}>
              Sector Phase-I
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
