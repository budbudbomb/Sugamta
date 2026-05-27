import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { SelectButton } from 'primereact/selectbutton';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Scatter,
  XAxis,
  YAxis,
  ZAxis
} from 'recharts';

export default function RoutePlanning() {
  const toast = useRef(null);

  // Global Config Parameters
  const [selectedSector, setSelectedSector] = useState('Sarangpur');
  const [vitranKendra, setVitranKendra] = useState('Govt. Excellence College, Sarangpur');
  const [departureDateTime, setDepartureDateTime] = useState(new Date(2026, 4, 27, 8, 30));
  const [guideName, setGuideName] = useState('Shri Rameshwar Dayal (Sr. Guide)');

  // Selected Booths (Table Checkbox selections state)
  const [selectedBooths, setSelectedBooths] = useState([]);

  // 1. Global Route State - Dynamically managed active routes list (defaults to 2 routes)
  const [routes, setRoutes] = useState([
    { label: 'Route 1', value: 'Route 1' },
    { label: 'Route 2', value: 'Route 2' }
  ]);

  // Specialized Route Configuration State per route
  const [routeConfigs, setRouteConfigs] = useState({
    'Route 1': { name: 'RT-SAR-01', vehicle: 'Bus', checkpoints: ['Checkpost NH-12', 'Sarangpur Toll Naka'] },
    'Route 2': { name: 'RT-SAR-02', vehicle: 'Jeep', checkpoints: ['Pachore Crossing'] }
  });

  // Temporary checkpoint inputs state per Route Card
  const [checkpointInputs, setCheckpointInputs] = useState({
    'Route 1': '',
    'Route 2': ''
  });

  // Mock Array of 12 Madhya Pradesh Polling Booths with prefilled Route Assignments
  const [boothData, setBoothData] = useState([
    { id: 1, boothNumber: 101, villageName: 'Barkhera', sthanBhawan: 'Govt. Primary School Room 1', distanceFromVitranKendra: '5 km', numDistance: 5, x: 25, y: 30, routeAssignment: 'Route 1' },
    { id: 2, boothNumber: 102, villageName: 'Khajuri', sthanBhawan: 'Anganwadi Kendra Center', distanceFromVitranKendra: '8 km', numDistance: 8, x: 38, y: 45, routeAssignment: 'Route 1' },
    { id: 3, boothNumber: 103, villageName: 'Phanda', sthanBhawan: 'Panchayat Bhawan Main Hall', distanceFromVitranKendra: '12 km', numDistance: 12, x: 50, y: 35, routeAssignment: 'Route 2' },
    { id: 4, boothNumber: 104, villageName: 'Ratibad', sthanBhawan: 'Govt. Middle School Room 2', distanceFromVitranKendra: '15 km', numDistance: 15, x: 62, y: 55, routeAssignment: 'Route 2' },
    { id: 5, boothNumber: 105, villageName: 'Misrod', sthanBhawan: 'Community Center East Wing', distanceFromVitranKendra: '7 km', numDistance: 7, x: 30, y: 60, routeAssignment: 'Unassigned' },
    { id: 6, boothNumber: 106, villageName: 'Govindpura', sthanBhawan: 'Govt. High School Hall', distanceFromVitranKendra: '11 km', numDistance: 11, x: 45, y: 70, routeAssignment: 'Unassigned' },
    { id: 7, boothNumber: 107, villageName: 'Kolar', sthanBhawan: 'Municipal Office Room 3', distanceFromVitranKendra: '14 km', numDistance: 14, x: 58, y: 65, routeAssignment: 'Unassigned' },
    { id: 8, boothNumber: 108, villageName: 'Habibganj', sthanBhawan: 'Railway Colony School', distanceFromVitranKendra: '9 km', numDistance: 9, x: 35, y: 20, routeAssignment: 'Unassigned' },
    { id: 9, boothNumber: 109, villageName: 'Bairagarh', sthanBhawan: 'Civil Hospital Main Lounge', distanceFromVitranKendra: '16 km', numDistance: 16, x: 70, y: 80, routeAssignment: 'Unassigned' },
    { id: 10, boothNumber: 110, villageName: 'Awadhpuri', sthanBhawan: 'Panchayat Office Lounge', distanceFromVitranKendra: '13 km', numDistance: 13, x: 52, y: 85, routeAssignment: 'Unassigned' },
    { id: 11, boothNumber: 111, villageName: 'Gandhinagar', sthanBhawan: 'Primary Health Subcenter', distanceFromVitranKendra: '18 km', numDistance: 18, x: 80, y: 50, routeAssignment: 'Unassigned' },
    { id: 12, boothNumber: 112, villageName: 'Karond', sthanBhawan: 'Govt. Boys School Room 1', distanceFromVitranKendra: '20 km', numDistance: 20, x: 90, y: 75, routeAssignment: 'Unassigned' }
  ]);

  // Color Roster Array used to cyclically highlight rows & render lines
  const routeColors = [
    '#6366f1', // Indigo (Route 1)
    '#10b981', // Green (Route 2)
    '#ec4899', // Pink (Route 3)
    '#a855f7', // Purple (Route 4)
    '#14b8a6', // Teal (Route 5)
    '#f97316', // Orange (Route 6)
    '#06b6d4'  // Cyan (Route 7)
  ];

  // Helper to extract index and map route colors dynamically
  const getRouteColor = (routeName) => {
    if (!routeName || routeName === 'Unassigned') return '#94a3b8';
    const match = routeName.match(/\d+/);
    const num = match ? parseInt(match[0]) : 1;
    return routeColors[(num - 1) % routeColors.length];
  };

  // Dropdowns lists
  const sectors = [
    { label: 'Sector 01 - Sarangpur', value: 'Sarangpur' },
    { label: 'Sector 02 - Pachore', value: 'Pachore' },
    { label: 'Sector 03 - Narsinghgarh', value: 'Narsinghgarh' }
  ];

  const vitranKendras = [
    { label: 'Govt. Excellence College, Sarangpur', value: 'Govt. Excellence College, Sarangpur' },
    { label: 'Model School Terminal, Pachore', value: 'Model School Terminal, Pachore' },
    { label: 'District Admin Strongroom, Rajgarh', value: 'District Admin Strongroom, Rajgarh' }
  ];

  const vehicleTypes = [
    { label: 'Bus (Heavy Capacity)', value: 'Bus' },
    { label: 'Minibus (Medium Capacity)', value: 'Minibus' },
    { label: 'SUV (Tough Terrain)', value: 'SUV' },
    { label: 'Jeep (Standard Carrier)', value: 'Jeep' }
  ];

  // 2. Toolbar Dynamic Add / Remove Actions
  const handleAddRoute = () => {
    const nextIdx = routes.length + 1;
    const newRouteName = `Route ${nextIdx}`;

    setRoutes([...routes, { label: newRouteName, value: newRouteName }]);
    setRouteConfigs(prev => ({
      ...prev,
      [newRouteName]: {
        name: `RT-SAR-0${nextIdx}`,
        vehicle: 'Bus',
        checkpoints: []
      }
    }));
    setCheckpointInputs(prev => ({
      ...prev,
      [newRouteName]: ''
    }));

    toast.current.show({
      severity: 'success',
      summary: 'Route Added',
      detail: `Successfully created operational ${newRouteName}.`,
      life: 2000
    });
  };

  const handleRemoveRoute = () => {
    if (routes.length <= 1) {
      toast.current.show({
        severity: 'warn',
        summary: 'Action Terminated',
        detail: 'At least one active route configuration must exist in the sector.',
        life: 2500
      });
      return;
    }

    const lastRouteName = routes[routes.length - 1].value;
    // Database integrity safeguard check: make sure no booths are assigned to the route
    const assignedCount = boothData.filter(b => b.routeAssignment === lastRouteName).length;

    if (assignedCount > 0) {
      toast.current.show({
        severity: 'error',
        summary: 'Deletion Blocked',
        detail: `${lastRouteName} has ${assignedCount} assigned polling booths. Reallocate them first.`,
        life: 4000
      });
      return;
    }

    // Safe to delete
    setRoutes(routes.slice(0, -1));
    setRouteConfigs(prev => {
      const copy = { ...prev };
      delete copy[lastRouteName];
      return copy;
    });

    toast.current.show({
      severity: 'info',
      summary: 'Route Removed',
      detail: `Successfully deleted empty ${lastRouteName}.`,
      life: 2000
    });
  };

  // Handler for Inline Quick Assignment (SelectButton row levels)
  const handleQuickAssign = (val, index) => {
    const updated = [...boothData];
    // Overrides any previous assignment immediately. Clicking again toggles back to Unassigned
    const newRoute = (updated[index].routeAssignment === val) ? 'Unassigned' : (val || 'Unassigned');
    updated[index].routeAssignment = newRoute;
    setBoothData(updated);
    
    toast.current.show({
      severity: 'success',
      summary: 'Quick Assign Applied',
      detail: `Booth ${updated[index].boothNumber} updated to ${newRoute}.`,
      life: 1500
    });
  };

  // Handler for Bulk Route Assignment (Toolbar level)
  const handleBulkAssign = (targetRoute) => {
    if (!targetRoute) return;
    if (selectedBooths.length === 0) {
      toast.current.show({ severity: 'warn', summary: 'No Selection', detail: 'Check booths inside the grid first.', life: 2500 });
      return;
    }

    const updated = boothData.map((booth) => {
      const isSelected = selectedBooths.some(sb => sb.id === booth.id);
      return isSelected ? { ...booth, routeAssignment: targetRoute } : booth;
    });

    setBoothData(updated);
    setSelectedBooths([]); // Reset checked checkboxes

    toast.current.show({
      severity: 'success',
      summary: 'Bulk Assign Complete',
      detail: `Assigned ${selectedBooths.length} booths to ${targetRoute}.`,
      life: 3000
    });
  };

  // Group booths based on active route assignments
  const getActiveRouteGroups = () => {
    const groups = {};
    boothData.forEach((booth) => {
      const assignment = booth.routeAssignment;
      if (assignment && assignment !== 'Unassigned') {
        if (!groups[assignment]) {
          groups[assignment] = [];
        }
        groups[assignment].push(booth);
      }
    });
    return groups;
  };

  const activeRoutes = getActiveRouteGroups();

  // Dynamic guide allocation formula based on overall routing distances
  useEffect(() => {
    const assignedBooths = boothData.filter(b => b.routeAssignment !== 'Unassigned');
    if (assignedBooths.length === 0) {
      setGuideName('No Guide Assigned (Assign Routes)');
    } else {
      const maxDist = Math.max(...assignedBooths.map(b => b.numDistance));
      if (maxDist > 15) {
        setGuideName('Shri O. P. Choudhary (Senior Zonal Guide)');
      } else if (maxDist > 10) {
        setGuideName('Shri Rameshwar Dayal (Sr. Guide)');
      } else {
        setGuideName('Shri Mohan Lal (Sarangpur Local)');
      }
    }
  }, [boothData]);

  // Route specific config changes handlers
  const handleConfigChange = (routeName, key, val) => {
    setRouteConfigs(prev => ({
      ...prev,
      [routeName]: {
        ...prev[routeName],
        [key]: val
      }
    }));
  };

  // Add checkpoint to a specific route
  const handleAddCheckpoint = (routeName) => {
    const input = checkpointInputs[routeName] || '';
    if (input.trim() !== '') {
      const currentList = routeConfigs[routeName]?.checkpoints || [];
      handleConfigChange(routeName, 'checkpoints', [...currentList, input.trim()]);
      setCheckpointInputs({ ...checkpointInputs, [routeName]: '' });
      toast.current.show({ severity: 'success', summary: 'Checkpoint Added', detail: `Added checkpoint to ${routeName}.`, life: 1500 });
    }
  };

  // Remove checkpoint from a specific route
  const handleRemoveCheckpoint = (routeName, checkpointIndex) => {
    const currentList = routeConfigs[routeName]?.checkpoints || [];
    const updatedList = currentList.filter((_, i) => i !== checkpointIndex);
    handleConfigChange(routeName, 'checkpoints', updatedList);
    toast.current.show({ severity: 'info', summary: 'Checkpoint Removed', detail: `Removed checkpoint from ${routeName}.`, life: 1500 });
  };

  // Compile coordinate logs for Recharts plotting
  const getChartRouteData = () => {
    const routesPaths = {};
    Object.keys(activeRoutes).forEach((routeName) => {
      const paths = [{ name: vitranKendra, isStart: true, x: 15, y: 15, route: routeName }];
      
      const routeCheckpoints = routeConfigs[routeName]?.checkpoints || [];
      routeCheckpoints.forEach((cp, idx) => {
        paths.push({
          name: cp,
          isCheckpoint: true,
          x: 20 + (idx * 16),
          y: 28 + (idx * 6) + (idx % 2 === 0 ? 3 : -3),
          route: routeName
        });
      });

      activeRoutes[routeName].forEach((booth) => {
        paths.push({
          name: `${booth.villageName} (#${booth.boothNumber})`,
          isBooth: true,
          boothNumber: booth.boothNumber,
          x: booth.x,
          y: booth.y,
          route: routeName
        });
      });
      routesPaths[routeName] = paths;
    });
    return routesPaths;
  };

  const routeChartPaths = getChartRouteData();

  // Save official routes
  const handleSaveAllRoutes = () => {
    const activeRouteKeys = Object.keys(activeRoutes);
    if (activeRouteKeys.length === 0) {
      toast.current.show({ severity: 'error', summary: 'Save Denied', detail: 'Please assign polling booths to active routes first.', life: 4000 });
      return;
    }
    toast.current.show({
      severity: 'success',
      summary: 'Routes Registered',
      detail: `Saved ${activeRouteKeys.length} active routes under Vitran Kendra: ${vitranKendra.split(',')[0]}.`,
      life: 6000
    });
  };

  // 4. Modulo Loop Visual highlights class compiler
  const getRowClassName = (data) => {
    const route = data.routeAssignment;
    if (!route || route === 'Unassigned') return '';

    // Extract numerical index from 'Route X'
    const match = route.match(/\d+/);
    const num = match ? parseInt(match[0]) : 1;

    const classes = [
      'bg-indigo-50 border-left-3 border-indigo-500', // Route 1
      'bg-green-50 border-left-3 border-green-500',   // Route 2
      'bg-pink-50 border-left-3 border-pink-500',     // Route 3
      'bg-purple-50 border-left-3 border-purple-500', // Route 4
      'bg-teal-50 border-left-3 border-teal-500',     // Route 5
      'bg-orange-50 border-left-3 border-orange-500', // Route 6
      'bg-cyan-50 border-left-3 border-cyan-500'      // Route 7
    ];

    return classes[(num - 1) % classes.length] + ' transition-colors duration-200';
  };

  // Derive compact labels R1, R2, R3 dynamically from global routes state
  const inlineRouteOptions = routes.map(r => ({
    label: r.label.replace('Route ', 'R'),
    value: r.value
  }));

  return (
    <div className="grid animate-fade-in">
      <Toast ref={toast} position="top-right" />

      {/* Top Header Panel */}
      <div className="col-12 flex align-items-center justify-content-between mb-2">
        <div>
          <h2 className="m-0 font-bold gradient-text text-3xl">Route Planning & Mapping</h2>
          <p className="text-slate-500 m-0 mt-1 text-sm font-medium">Design official dispatch sequences, reorder polling stations, and allocate vehicles.</p>
        </div>
        <div className="flex align-items-center gap-2">
          <span className="gradient-header-badge">
            <i className="pi pi-shield mr-2"></i>RO Command Panel
          </span>
          <span className="bg-indigo-100 text-indigo-700 px-3 py-2 border-round font-semibold text-xs border-1 border-indigo-200">
            Sector Stage: Active Sequence
          </span>
        </div>
      </div>

      {/* 1. Global Route Configuration Inputs (Top Section Card) */}
      <div className="col-12">
        <Card className="glass-panel" title={<span className="text-lg font-bold text-slate-700 flex align-items-center"><i className="pi pi-file mr-2 text-primary mr-2 text-xl"></i>Universal Sector Parameters</span>}>
          <div className="p-fluid grid">
            <div className="field col-12 md:col-6 lg:col-3">
              <label className="font-semibold text-sm text-slate-600 block mb-2">Election Sector</label>
              <Dropdown value={selectedSector} options={sectors} onChange={(e) => setSelectedSector(e.value)} placeholder="Select Sector" />
            </div>

            <div className="field col-12 md:col-6 lg:col-3">
              <label className="font-semibold text-sm text-slate-600 block mb-2">Universal Starting Point (Vitran Kendra)</label>
              <Dropdown value={vitranKendra} options={vitranKendras} onChange={(e) => setVitranKendra(e.value)} placeholder="Select Vitran Kendra" />
            </div>

            <div className="field col-12 md:col-6 lg:col-3">
              <label className="font-semibold text-sm text-slate-600 block mb-2">Sector Departure Date & Time</label>
              <Calendar value={departureDateTime} onChange={(e) => setDepartureDateTime(e.value)} showTime hourFormat="24" showIcon />
            </div>

            <div className="field col-12 md:col-6 lg:col-3">
              <label className="font-semibold text-sm text-slate-600 block mb-2">Sector Guide Name (Auto-Allocated)</label>
              <div className="p-input-icon-left w-full">
                <i className="pi pi-user text-slate-400" />
                <InputText value={guideName} readOnly className="w-full pl-5 bg-slate-50 text-slate-500 font-bold" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 2. Sector Booths Mapping Grid & Bulk Toolbar (Bottom Left Card) */}
      <div className="col-12 lg:col-8">
        <Card className="glass-panel h-full" title={
          <div className="flex align-items-center justify-content-between">
            <span className="text-lg font-bold text-slate-700 flex align-items-center">
              <i className="pi pi-sort-alt text-primary mr-2 text-xl"></i>Sector Booths Mapping Grid
            </span>
            <span className="text-xs font-semibold text-slate-400">Drag handles to re-sequence; Inline click to assign routes</span>
          </div>
        }>
          
          {/* Refactored: Dynamic Bulk Assignment Toolbar with Add/Remove Route actions */}
          <Toolbar 
            className="mb-3 p-2 border-round-xl" 
            style={{ background: '#f8fafc', border: '1px dashed #cbd5e1' }}
            left={
              <div className="flex align-items-center flex-wrap gap-3">
                <span className="text-sm font-bold text-slate-600">
                  <i className="pi pi-check-square text-indigo-500 mr-2"></i>Assign Selected ({selectedBooths.length}) To:
                </span>
                
                {/* Dynamically loads options from routes state */}
                <SelectButton 
                  options={routes} 
                  onChange={(e) => handleBulkAssign(e.value)} 
                  placeholder="Select Route"
                  disabled={selectedBooths.length === 0}
                  className="p-button-sm font-semibold mr-2"
                />

                {/* Add & Remove Route Buttons */}
                <div className="flex gap-2">
                  <Button 
                    label="Add Route" 
                    icon="pi pi-plus" 
                    onClick={handleAddRoute} 
                    className="p-button-outlined p-button-sm p-button-success" 
                  />
                  <Button 
                    label="Remove Route" 
                    icon="pi pi-minus" 
                    onClick={handleRemoveRoute} 
                    className="p-button-outlined p-button-sm p-button-danger" 
                  />
                </div>
              </div>
            }
          />

          <div className="p-fluid">
            <DataTable
              value={boothData}
              selection={selectedBooths}
              onSelectionChange={(e) => setSelectedBooths(e.value)}
              dataKey="id"
              reorderableRows
              onRowReorder={(e) => {
                setBoothData(e.value);
                toast.current.show({ severity: 'info', summary: 'Sequence Updated', detail: 'Booth travel order updated.', life: 1000 });
              }}
              rowClassName={getRowClassName}
              responsiveLayout="scroll"
              className="p-datatable-sm"
            >
              {/* Drag handle column */}
              <Column rowReorder style={{ width: '3rem' }}></Column>
              
              {/* Checkbox Multiple Selection Column */}
              <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>

              {/* Dynamic Sequence Number Column */}
              <Column 
                header="Seq" 
                body={(rowData, options) => <span className="font-bold text-slate-400">{options.rowIndex + 1}</span>}
                headerStyle={{ width: '4rem' }}
              ></Column>

              <Column field="boothNumber" header="Booth No" sortable headerStyle={{ width: '12%' }}></Column>
              <Column field="villageName" header="Polling booth name" sortable body={(r) => <span className="font-bold text-slate-700">{r.villageName}</span>}></Column>
              <Column field="sthanBhawan" header="Sthan / Bhawan Location" body={(r) => <span className="text-slate-600 text-xs font-semibold">{r.sthanBhawan}</span>}></Column>
              
              <Column 
                field="distanceFromVitranKendra" 
                header="Distance" 
                body={(rowData) => <span className="font-bold text-primary text-xs">{rowData.distanceFromVitranKendra}</span>}
                headerStyle={{ width: '10%' }}
              ></Column>

              {/* Refactored: Dynamic Compact Inline Quick Assignment */}
              <Column 
                header="Quick Assign" 
                body={(rowData, options) => (
                  <SelectButton
                    value={rowData.routeAssignment}
                    options={inlineRouteOptions}
                    onChange={(e) => handleQuickAssign(e.value, options.rowIndex)}
                    className="p-button-sm font-semibold selectbutton-compact"
                  />
                )}
                headerStyle={{ width: '18rem' }}
              ></Column>
            </DataTable>
          </div>
        </Card>
      </div>

      {/* 3. Route Map Visualization (Bottom Right Card) */}
      <div className="col-12 lg:col-4">
        <Card className="glass-panel text-white h-full map-card-bg flex flex-column justify-content-between" style={{ minHeight: '440px' }}>
          <div className="mb-2">
            <div className="flex align-items-center justify-content-between">
              <span className="text-base font-bold text-slate-200 flex align-items-center">
                <i className="pi pi-map text-indigo-400 mr-2 text-lg"></i>Active Route Visualization
              </span>
              <span className="text-xs px-2 py-0.5 border-round bg-indigo-900 text-indigo-300 font-bold">GPS Map</span>
            </div>
            <p className="text-xs text-slate-400 m-0">Connecting starting point, dynamic checkpoints, and active booths.</p>
          </div>

          {/* Map canvas */}
          <div className="flex-1 w-full flex align-items-center justify-content-center" style={{ minHeight: '190px' }}>
            {Object.keys(activeRoutes).length === 0 ? (
              <div className="text-center p-4">
                <i className="pi pi-compass text-slate-500 text-3xl mb-2 animate-spin" style={{ animationDuration: '6s' }}></i>
                <p className="text-xs text-slate-400 m-0">No active path. Assign routes in the mapping grid to plot tracks.</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <ComposedChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                  <XAxis type="number" dataKey="x" hide domain={[0, 100]} />
                  <YAxis type="number" dataKey="y" hide domain={[0, 100]} />
                  <ZAxis type="number" range={[100, 150]} />
                  
                  {/* Overlay path lines */}
                  {Object.keys(routeChartPaths).map((routeName) => (
                    <Line 
                      key={routeName}
                      data={routeChartPaths[routeName]}
                      type="monotone" 
                      dataKey="y" 
                      stroke={getRouteColor(routeName)} 
                      strokeWidth={3} 
                      dot={false} 
                      activeDot={false}
                      animationDuration={300}
                    />
                  ))}
                  
                  {/* Scatter points */}
                  {Object.keys(routeChartPaths).map((routeName) => (
                    <Scatter 
                      key={`scatter-${routeName}`}
                      data={routeChartPaths[routeName]}
                      dataKey="y" 
                      shape={(props) => {
                        const { cx, cy, payload } = props;
                        let dotColor = getRouteColor(routeName);
                        let dotRadius = 7;
                        let label = `#${payload.boothNumber || 'CP'}`;

                        if (payload.isStart) {
                          dotColor = '#ef4444'; // Start HQ Red
                          dotRadius = 10;
                          label = 'HUB';
                        } else if (payload.isCheckpoint) {
                          dotColor = '#f59e0b'; // CP Yellow
                          dotRadius = 8;
                          label = 'CP';
                        }

                        return (
                          <g>
                            <circle cx={cx} cy={cy} r={dotRadius} fill={dotColor} stroke="#ffffff" strokeWidth={2} />
                            {payload.isStart && <circle cx={cx} cy={cy} r={18} fill="none" stroke="#ef4444" strokeWidth={1} className="animate-ping" style={{ transformOrigin: `${cx}px ${cy}px` }} />}
                            <text x={cx + 9} y={cy - 9} fill="#ffffff" fontSize="9px" fontWeight="bold" style={{ pointerEvents: 'none', filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))' }}>{label}</text>
                          </g>
                        );
                      }}
                    />
                  ))}
                </ComposedChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Mapped legend */}
          {Object.keys(activeRoutes).length > 0 && (
            <div className="mt-2 text-xs border-top-1 border-slate-700 pt-2 flex justify-content-between align-items-center" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="text-slate-400">Routes Legend:</span>
              <div className="flex flex-wrap gap-2">
                {Object.keys(activeRoutes).map((name) => (
                  <span key={name} className="font-bold flex align-items-center gap-1" style={{ color: getRouteColor(name) }}>
                    <span className="w-2 h-2 border-circle inline-block" style={{ width: '8px', height: '8px', backgroundColor: getRouteColor(name) }}></span>
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* 3. Refined "Route Configurations" Cards Section */}
      <div className="col-12 mt-4">
        <div className="flex align-items-center gap-2 mb-3 mt-1">
          <i className="pi pi-cog text-indigo-600 text-2xl"></i>
          <h3 className="m-0 font-bold text-slate-800 text-xl">Active Route Configurations</h3>
          <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 border-round text-xs font-bold">
            {Object.keys(activeRoutes).length} Routes Loaded
          </span>
        </div>

        {Object.keys(activeRoutes).length === 0 ? (
          <div className="col-12 p-5 text-center border-round-xl border-1 border-slate-200 bg-white shadow-sm" style={{ borderStyle: 'dashed' }}>
            <i className="pi pi-info-circle text-indigo-500 text-3xl mb-2"></i>
            <h4 className="m-0 text-slate-700 font-bold">No Active Routes Assigned</h4>
            <p className="text-slate-400 text-xs m-0 mt-1 max-w-25rem mx-auto">Please assign one or more polling booths to a Route in the mapping grid to configure their customized travel checkpoints and vehicles.</p>
          </div>
        ) : (
          <div className="p-fluid grid">
            {Object.keys(activeRoutes).map((routeName) => {
              const booths = activeRoutes[routeName];
              const config = routeConfigs[routeName];
              const checkpointInputVal = checkpointInputs[routeName] || '';
              const rColor = getRouteColor(routeName);

              return (
                <div key={routeName} className="col-12 md:col-6 lg:col-4 animate-fade-in">
                  <Card 
                    className="glass-panel" 
                    style={{ borderTop: `6px solid ${rColor}` }}
                    title={
                      <div className="flex flex-column gap-1.5 pb-2 border-bottom-1 border-slate-100" style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <div className="flex justify-content-between align-items-center">
                          <span className="text-base font-bold text-slate-800 flex align-items-center">
                            <i className="pi pi-compass text-indigo-500 mr-2"></i>Configuration for {routeName}
                          </span>
                        </div>
                        <div className="flex justify-content-between align-items-center mt-1 bg-slate-50 p-2 border-round border-1 border-slate-100" style={{ backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                          <span className="text-xs font-semibold text-slate-500 text-overflow-ellipsis overflow-hidden white-space-nowrap max-w-10rem" title={vitranKendra}>
                            <i className="pi pi-map-marker text-red-500 mr-1 text-10px"></i>Starting: {vitranKendra.split(',')[0]}
                          </span>
                          <span className="text-xs font-bold px-2 py-0.5 border-round text-green-700 bg-green-50" style={{ fontSize: '10px' }}>
                            Assigned Booths: {booths.length}
                          </span>
                        </div>
                      </div>
                    }
                  >
                    <div className="flex flex-column gap-3 mt-2">
                      
                      {/* Core Configuration Inputs - Route Name */}
                      <div className="field m-0">
                        <label className="font-semibold text-xs text-slate-500 block mb-1">Route Name / Code</label>
                        <InputText 
                          value={config?.name || ''} 
                          onChange={(e) => handleConfigChange(routeName, 'name', e.target.value)}
                          placeholder="E.g. RT-SAR-ALPHA-1"
                        />
                      </div>

                      {/* Core Configuration Inputs - Vehicle Dropdown */}
                      <div className="field m-0">
                        <label className="font-semibold text-xs text-slate-500 block mb-1">Route Vehicle Category</label>
                        <Dropdown 
                          value={config?.vehicle || 'Bus'} 
                          options={vehicleTypes} 
                          onChange={(e) => handleConfigChange(routeName, 'vehicle', e.value)}
                          placeholder="Select Vehicle Class"
                        />
                      </div>

                      {/* Dynamic Checkpoints Section inside each card */}
                      <div className="field m-0 bg-slate-50 p-3 border-round-xl" style={{ backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                        <label className="font-bold text-xs text-slate-600 block mb-1.5 flex align-items-center gap-1.5">
                          <i className="pi pi-directions text-indigo-500"></i>Add Checkpoints (Route-Specific)
                        </label>
                        <div className="flex gap-2 mb-2">
                          <InputText 
                            value={checkpointInputVal} 
                            onChange={(e) => setCheckpointInputs({ ...checkpointInputs, [routeName]: e.target.value })}
                            placeholder="Add checkpoint..."
                            className="p-inputtext-sm"
                            onKeyDown={(e) => e.key === 'Enter' && handleAddCheckpoint(routeName)}
                          />
                          <Button 
                            icon="pi pi-plus" 
                            className="p-button-primary p-button-sm px-2.5" 
                            onClick={() => handleAddCheckpoint(routeName)} 
                          />
                        </div>

                        {/* Renders checkpoints list below input with trash icon */}
                        <div className="flex flex-column gap-1.5 overflow-y-auto" style={{ maxHeight: '80px' }}>
                          {(config?.checkpoints || []).length === 0 ? (
                            <span className="text-10px text-slate-400 italic block pl-1">No checkpoints for this route.</span>
                          ) : (
                            config.checkpoints.map((cp, cpIdx) => (
                              <div key={cpIdx} className="flex align-items-center justify-content-between p-2 border-round bg-indigo-50 border-1 border-indigo-100 animate-fade-in">
                                <span className="text-xs font-semibold text-indigo-700 max-w-10rem overflow-hidden text-overflow-ellipsis white-space-nowrap">
                                  {cpIdx + 1}. {cp}
                                </span>
                                <i 
                                  className="pi pi-trash text-xs text-indigo-400 hover:text-red-500 cursor-pointer" 
                                  onClick={() => handleRemoveCheckpoint(routeName, cpIdx)} 
                                />
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Sequence Summary Timeline */}
                      <div className="flex flex-column gap-1.5 bg-slate-50 p-3 border-round-xl" style={{ backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                        <span className="font-bold text-xs text-slate-600 mb-1.5 flex align-items-center gap-1.5">
                          <i className="pi pi-list text-primary"></i>Route Sequence Timeline
                        </span>
                        
                        <div className="flex flex-column gap-2 mt-1 relative pl-3" style={{ borderLeft: '2px dashed #cbd5e1' }}>
                          
                          {/* Starting Point (Vitran Kendra - Global) */}
                          <div className="relative text-xs font-semibold text-slate-400">
                            <span className="absolute border-circle" style={{ left: '-18px', top: '3px', width: '8px', height: '8px', backgroundColor: '#ef4444' }}></span>
                            Start: {vitranKendra.split(',')[0]}
                          </div>

                          {/* Checkpoints in line */}
                          {(config?.checkpoints || []).map((cp, idx) => (
                            <div key={`cp-${idx}`} className="relative text-xs text-amber-600 font-bold flex align-items-center">
                              <span className="absolute border-circle" style={{ left: '-18px', top: '4px', width: '8px', height: '8px', backgroundColor: '#f59e0b' }}></span>
                              Checkpoint: {cp}
                            </div>
                          ))}

                          {/* Sequenced Booths */}
                          {booths.map((booth, idx) => (
                            <div key={booth.id} className="relative text-xs text-slate-700 font-bold flex align-items-center justify-content-between">
                              <span className="absolute border-circle" style={{ left: '-18px', top: '4px', width: '8px', height: '8px', backgroundColor: rColor }}></span>
                              <span>
                                {idx + 1}. {booth.villageName} (Booth {booth.boothNumber})
                              </span>
                              <span className="text-slate-400 text-10px font-normal">
                                {booth.distanceFromVitranKendra}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Global save actions */}
      <div className="col-12 mt-4">
        <Card className="glass-panel flex align-items-center justify-content-between p-2 shadow-sm">
          <div className="flex flex-column gap-1">
            <span className="text-xs text-slate-500 font-medium">Verify all configurations before locking sequence parameters.</span>
            <span className="text-xs text-green-600 font-bold"><i className="pi pi-lock mr-1"></i>Security State: Administrative Forward Enabled</span>
          </div>
          <Button
            label="Save All Mapped Routes & Proceed"
            icon="pi pi-check-square"
            className="p-button-primary p-button-lg px-4 py-3"
            onClick={handleSaveAllRoutes}
            style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)', border: 'none' }}
          />
        </Card>
      </div>

    </div>
  );
}
