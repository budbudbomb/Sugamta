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

const INITIAL_SECTOR_DATA = {
  'Sarangpur': {
    routes: [
      { label: 'Route 1', value: 'Route 1' },
      { label: 'Route 2', value: 'Route 2' }
    ],
    routeConfigs: {
      'Route 1': { name: 'RT-SAR-01', vehicle: 'Bus', checkpoints: ['Checkpost NH-12', 'Sarangpur Toll Naka'], guide: 'Shri Rameshwar Dayal (Sr. Guide)', departureTime: new Date(2026, 4, 27, 8, 30) },
      'Route 2': { name: 'RT-SAR-02', vehicle: 'Jeep', checkpoints: ['Pachore Crossing'], guide: 'Shri Mohan Lal (Sarangpur Local)', departureTime: new Date(2026, 4, 27, 8, 30) }
    },
    boothData: [
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
    ]
  },
  'Pachore': {
    routes: [
      { label: 'Route 1', value: 'Route 1' },
      { label: 'Route 2', value: 'Route 2' }
    ],
    routeConfigs: {
      'Route 1': { name: 'RT-PAC-01', vehicle: 'SUV', checkpoints: ['Pachore Toll Road'], guide: 'Shri Sunil Sharma (Local Guide)', departureTime: new Date(2026, 4, 27, 8, 30) },
      'Route 2': { name: 'RT-PAC-02', vehicle: 'Jeep', checkpoints: ['Sujalpur Junction'], guide: 'Shri G. P. Gupta (Sector Assistant)', departureTime: new Date(2026, 4, 27, 8, 30) }
    },
    boothData: [
      { id: 13, boothNumber: 201, villageName: 'Pachore Town Center', sthanBhawan: 'Govt. Boys High School', distanceFromVitranKendra: '4 km', numDistance: 4, x: 20, y: 20, routeAssignment: 'Route 1' },
      { id: 14, boothNumber: 202, villageName: 'Bhayana', sthanBhawan: 'Panchayat Hall', distanceFromVitranKendra: '10 km', numDistance: 10, x: 45, y: 30, routeAssignment: 'Route 2' },
      { id: 15, boothNumber: 203, villageName: 'Sujalpur Crossing', sthanBhawan: 'Govt. Middle School', distanceFromVitranKendra: '15 km', numDistance: 15, x: 60, y: 55, routeAssignment: 'Unassigned' },
      { id: 18, boothNumber: 204, villageName: 'Kankariya', sthanBhawan: 'Primary Health Center', distanceFromVitranKendra: '8 km', numDistance: 8, x: 35, y: 40, routeAssignment: 'Unassigned' },
      { id: 19, boothNumber: 205, villageName: 'Pipalya', sthanBhawan: 'Govt. Primary School', distanceFromVitranKendra: '12 km', numDistance: 12, x: 50, y: 65, routeAssignment: 'Unassigned' }
    ]
  },
  'Narsinghgarh': {
    routes: [
      { label: 'Route 1', value: 'Route 1' }
    ],
    routeConfigs: {
      'Route 1': { name: 'RT-NAR-01', vehicle: 'Minibus', checkpoints: ['Fort Entrance'], guide: 'Shri R. K. Vyas (Route Guide)', departureTime: new Date(2026, 4, 27, 8, 30) }
    },
    boothData: [
      { id: 16, boothNumber: 301, villageName: 'Narsinghgarh Kila', sthanBhawan: 'Govt. High School Near Fort', distanceFromVitranKendra: '6 km', numDistance: 6, x: 30, y: 40, routeAssignment: 'Route 1' },
      { id: 17, boothNumber: 302, villageName: 'Talab Chowk', sthanBhawan: 'Community Hall Room 2', distanceFromVitranKendra: '11 km', numDistance: 11, x: 50, y: 60, routeAssignment: 'Unassigned' },
      { id: 20, boothNumber: 303, villageName: 'Chhapra', sthanBhawan: 'Panchayat Bhawan', distanceFromVitranKendra: '9 km', numDistance: 9, x: 40, y: 35, routeAssignment: 'Unassigned' },
      { id: 21, boothNumber: 304, villageName: 'Kotra', sthanBhawan: 'Govt. Girls School', distanceFromVitranKendra: '14 km', numDistance: 14, x: 55, y: 70, routeAssignment: 'Unassigned' }
    ]
  }
};

export default function RoutePlanning() {
  const toast = useRef(null);

  // Global Config Parameters
  const [activeSector, setActiveSector] = useState('Sarangpur');
  const [sectorStates, setSectorStates] = useState(INITIAL_SECTOR_DATA);

  const [vitranKendra, setVitranKendra] = useState('Govt. Excellence College, Sarangpur');

  // Selected Booths (Table Checkbox selections state)
  const [selectedBooths, setSelectedBooths] = useState([]);

  // Active loaded states per selected sector
  const [routes, setRoutes] = useState(INITIAL_SECTOR_DATA['Sarangpur'].routes);
  const [routeConfigs, setRouteConfigs] = useState(INITIAL_SECTOR_DATA['Sarangpur'].routeConfigs);
  const [boothData, setBoothData] = useState(INITIAL_SECTOR_DATA['Sarangpur'].boothData);
  // Temporary checkpoint inputs state per Route Card
  const [checkpointInputs, setCheckpointInputs] = useState({
    'Route 1': '',
    'Route 2': '',
    'Route 3': '',
    'Route 4': '',
    'Route 5': ''
  });
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

  // Handle sector change cleanly by saving current data and loading target data
  const handleSectorChange = (newSector) => {
    if (newSector === activeSector) return;
    
    // 1. Save current state of active sector to sectorStates
    setSectorStates(prev => ({
      ...prev,
      [activeSector]: {
        routes,
        routeConfigs,
        boothData
      }
    }));

    // 2. Load target state
    const targetData = sectorStates[newSector];
    if (targetData) {
      setRoutes(targetData.routes);
      setRouteConfigs(targetData.routeConfigs);
      setBoothData(targetData.boothData);
    }
    
    // 3. Set active sector
    setActiveSector(newSector);
    
    // 4. Update Vitran Kendra dynamically based on sector
    if (newSector === 'Sarangpur') {
      setVitranKendra('Govt. Excellence College, Sarangpur');
    } else if (newSector === 'Pachore') {
      setVitranKendra('Model School Terminal, Pachore');
    } else if (newSector === 'Narsinghgarh') {
      setVitranKendra('District Admin Strongroom, Rajgarh');
    }

    toast.current.show({
      severity: 'info',
      summary: 'Sector Changed',
      detail: `Switched view to ${newSector} and loaded active checkpoints/routes.`,
      life: 1500
    });
  };

  // 2. Toolbar Dynamic Add / Remove Actions
  const handleAddRoute = () => {
    const nextIdx = routes.length + 1;
    const newRouteName = `Route ${nextIdx}`;

    const defaultGuides = [
      'Shri Rameshwar Dayal (Sr. Guide)',
      'Shri Mohan Lal (Sarangpur Local)',
      'Shri O. P. Choudhary (Senior Zonal Guide)',
      'Shri R. K. Vyas (Route Guide)',
      'Shri Sunil Sharma (Local Guide)'
    ];
    const newGuide = defaultGuides[(nextIdx - 1) % defaultGuides.length];

    setRoutes([...routes, { label: newRouteName, value: newRouteName }]);
    setRouteConfigs(prev => ({
      ...prev,
      [newRouteName]: {
        name: `RT-SAR-0${nextIdx}`,
        vehicle: 'Bus',
        checkpoints: [],
        guide: newGuide,
        departureTime: new Date(2026, 4, 27, 8, 30)
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
    // Overrides any previous assignment immediately. Clicking again toggles back to Unassigned
    const currentAssignment = boothData[index].routeAssignment;
    const newRoute = (currentAssignment === val) ? 'Unassigned' : (val || 'Unassigned');
    
    const updated = boothData.map((booth, idx) => 
      idx === index ? { ...booth, routeAssignment: newRoute } : booth
    );
    setBoothData(updated);
    
    toast.current.show({
      severity: 'success',
      summary: 'Quick Assign Applied',
      detail: `Booth ${boothData[index].boothNumber} updated to ${newRoute}.`,
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

  // Helper to dynamically calculate checkpoint route assignment and coordinate interpolation based on surrounding booths
  const getResolvedBoothData = () => {
    let currentRoute = 'Unassigned';
    return boothData.map((booth, idx) => {
      if (booth.isCheckpoint) {
        // Find nearest preceding non-checkpoint booth for route assignment
        let route = currentRoute;
        
        // Find nearest preceding non-checkpoint booth for coordinate interpolation
        let prevBooth = null;
        for (let i = idx - 1; i >= 0; i--) {
          if (!boothData[i].isCheckpoint) {
            prevBooth = boothData[i];
            break;
          }
        }
        
        // Find nearest succeeding non-checkpoint booth for coordinate interpolation
        let nextBooth = null;
        for (let i = idx + 1; i < boothData.length; i++) {
          if (!boothData[i].isCheckpoint) {
            nextBooth = boothData[i];
            break;
          }
        }
        
        const x1 = prevBooth ? prevBooth.x : 15; // default to Vitran Kendra x
        const y1 = prevBooth ? prevBooth.y : 15; // default to Vitran Kendra y
        const x2 = nextBooth ? nextBooth.x : (prevBooth ? prevBooth.x + 10 : 50);
        const y2 = nextBooth ? nextBooth.y : (prevBooth ? prevBooth.y + 10 : 50);
        
        return {
          ...booth,
          routeAssignment: route,
          x: Math.round((x1 + x2) / 2),
          y: Math.round((y1 + y2) / 2)
        };
      } else {
        currentRoute = booth.routeAssignment || 'Unassigned';
        return booth;
      }
    });
  };

  // Group booths based on active route assignments
  const getActiveRouteGroups = () => {
    const groups = {};
    const resolvedData = getResolvedBoothData();
    resolvedData.forEach((booth) => {
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



  // Force re-render of DataTable rows when active routes list changes (Add/Remove Route)
  useEffect(() => {
    setBoothData(prev => prev.map(b => ({ ...b })));
  }, [routes]);

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

  // Add a custom checkpoint row dynamically between booths in the grid
  const handleAddCheckpointBetween = (index) => {
    const uniqueId = `checkpoint-${Date.now()}`;
    const newCheckpointRow = {
      id: uniqueId,
      isCheckpoint: true,
      checkpointName: 'New Checkpoint',
      routeAssignment: 'Unassigned',
      boothNumber: 'CP',
      distanceFromVitranKendra: 'Waypoint'
    };
    
    const updated = [...boothData];
    updated.splice(index + 1, 0, newCheckpointRow);
    setBoothData(updated);

    toast.current.show({
      severity: 'success',
      summary: 'Checkpoint Row Created',
      detail: `Inserted checkpoint row in the grid.`,
      life: 2000
    });
  };

  // Update checkpoint name in the grid dynamically
  const handleUpdateCheckpointName = (name, index) => {
    const updated = boothData.map((booth, idx) => 
      idx === index ? { ...booth, checkpointName: name } : booth
    );
    setBoothData(updated);
  };

  // Delete checkpoint row from the grid
  const handleDeleteCheckpointRow = (index) => {
    const updated = boothData.filter((_, idx) => idx !== index);
    setBoothData(updated);
    toast.current.show({
      severity: 'info',
      summary: 'Waypoint Deleted',
      detail: `Removed checkpoint row from the grid.`,
      life: 1500
    });
  };

  // Add checkpoint to a specific route
  const handleAddCheckpoint = (routeName) => {
    const input = checkpointInputs[routeName] || '';
    if (input.trim() !== '') {
      const currentList = routeConfigs[routeName]?.checkpoints || [];
      handleConfigChange(routeName, 'checkpoints', [...currentList, input.trim()]);
      setCheckpointInputs(prev => ({ ...prev, [routeName]: '' }));
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
      
      activeRoutes[routeName].forEach((booth) => {
        paths.push({
          name: booth.isCheckpoint ? (booth.checkpointName || 'Checkpoint') : `${booth.villageName} (#${booth.boothNumber})`,
          isBooth: !booth.isCheckpoint,
          isCheckpoint: booth.isCheckpoint,
          boothNumber: booth.isCheckpoint ? 'CP' : booth.boothNumber,
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
    if (data.isCheckpoint) {
      return 'checkpoint-row';
    }
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

  // Dynamically calculate the Routes column width based on the number of active routes (each circle is 32px plus 8px gap)
  const routesColumnWidth = `${Math.max(6.5, routes.length * 3.0 + 1.5)}rem`;

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

      {/* Circular Sector Tabs Selection Panel */}
      <div className="col-12 mb-3 mt-2">
        <div className="bg-white p-3 border-round-xl shadow-sm border-1 border-slate-100 flex flex-column gap-3">
          
          {/* Top Row: Title on left, Universal Starting Point Dropdown on right */}
          <div className="flex justify-content-between align-items-center flex-wrap gap-3 pb-3 border-bottom-1 border-slate-100" style={{ borderBottom: '1px solid #f1f5f9' }}>
            <div className="flex align-items-center gap-2">
              <i className="pi pi-sliders-h text-indigo-500 font-bold text-lg"></i>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Active Sector Area Selection</span>
            </div>
            
            {/* Universal Starting Point (Vitran Kendra) Dropdown */}
            <div className="flex align-items-center gap-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block white-space-nowrap">Universal Starting Point (Vitran Kendra)</span>
              <Dropdown 
                value={vitranKendra} 
                options={vitranKendras} 
                onChange={(e) => setVitranKendra(e.value)} 
                placeholder="Select Vitran Kendra" 
                className="p-inputtext-sm font-semibold"
                style={{ width: '320px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              />
            </div>
          </div>

          {/* Bottom Row: Horizontally Scrollable Sector Badge Tabs */}
          <div className="flex align-items-center gap-3 w-full">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block white-space-nowrap">Sectors:</span>
            
            {/* Scrollable Container */}
            <div 
              className="flex gap-3 overflow-x-auto py-2 hide-scrollbar scroll-smooth w-full" 
              style={{ 
                flex: 1,
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {sectors.map((sec, idx) => {
                const isActive = activeSector === sec.value;
                const secRoutes = sectorStates[sec.value].routes.length;
                const secBoothsAssigned = sectorStates[sec.value].boothData.filter(b => b.routeAssignment !== 'Unassigned').length;
                
                return (
                  <div 
                    key={sec.value}
                    className={`flex align-items-center gap-3 p-2 pr-4 border-round-3xl cursor-pointer transition-all duration-300 flex-shrink-0`}
                    style={{ 
                      border: isActive ? '1px solid rgba(99,102,241,0.4)' : '1px solid #e2e8f0',
                      boxShadow: isActive ? '0 4px 6px -1px rgba(99, 102, 241, 0.08)' : 'none',
                      backgroundColor: isActive ? '#f5f3ff' : '#ffffff'
                    }}
                    onClick={() => handleSectorChange(sec.value)}
                  >
                    {/* Circular Avatar Badge */}
                    <div 
                      className={`flex align-items-center justify-content-center border-circle font-bold text-sm transition-all duration-300 ${isActive ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-500'}`}
                      style={{ width: '36px', height: '36px', minWidth: '36px', border: isActive ? '3px solid #818cf8' : '3px solid transparent' }}
                    >
                      S{idx + 1}
                    </div>
                    {/* Sector Info */}
                    <div className="white-space-nowrap">
                      <span className={`block font-bold text-xs ${isActive ? 'text-indigo-900' : 'text-slate-700'}`}>{sec.label.split(' - ')[1]}</span>
                      <span className="text-10px text-slate-400 font-semibold block uppercase">
                        {secRoutes} Routes • {secBoothsAssigned} Assigned
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
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
              key={routes.length}
              value={boothData}
              selection={selectedBooths}
              onSelectionChange={(e) => setSelectedBooths(e.value)}
              dataKey="id"
              reorderableRows
              isDataSelectable={(e) => !e.data.isCheckpoint}
              onRowReorder={(e) => {
                setBoothData(e.value);
                toast.current.show({ severity: 'info', summary: 'Sequence Updated', detail: 'Booth travel order updated.', life: 1000 });
              }}
              rowClassName={getRowClassName}
              responsiveLayout="scroll"
              scrollable
              scrollHeight="520px"
              className="p-datatable-sm"
            >
              {/* Drag handle column */}
              <Column rowReorder style={{ width: '3rem' }}></Column>
              
              {/* Checkbox Multiple Selection Column */}
              <Column selectionMode="multiple" style={{ width: '3rem' }}></Column>

              {/* Dynamic Sequence Number Column with Hover floating "+" button */}
              <Column 
                header="Seq" 
                body={(rowData, options) => {
                  let boothSeqNum = '';
                  if (!rowData.isCheckpoint) {
                    // Count only non-checkpoint rows up to the current index
                    let count = 0;
                    for (let i = 0; i <= options.rowIndex; i++) {
                      if (!boothData[i].isCheckpoint) {
                        count++;
                      }
                    }
                    boothSeqNum = count;
                  }

                  return (
                    <div className="relative-row-cell flex align-items-center justify-content-center h-full">
                      {boothSeqNum && <span className="font-bold text-slate-400">{boothSeqNum}</span>}
                      
                      {/* Floating Add Checkpoint button centered exactly on the bottom border of the row */}
                      {options.rowIndex < boothData.length - 1 && (
                        <div className="add-row-btn-container">
                          <Button 
                            icon="pi pi-plus" 
                            className="p-button-rounded p-button-success p-button-xs shadow-sm"
                            style={{ width: '22px', height: '22px', fontSize: '10px', padding: 0 }}
                            tooltip="add checkpoint"
                            tooltipOptions={{ position: 'top' }}
                            title="add checkpoint"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddCheckpointBetween(options.rowIndex);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                }}
                style={{ width: '4rem', textAlign: 'center' }}
              ></Column>

              {/* Booth No column - Shows "CHECKPOINT" for checkpoint rows */}
              <Column 
                field="boothNumber" 
                header="Booth No" 
                sortable 
                body={(r) => r.isCheckpoint ? (
                  <span className="checkpoint-badge-left bg-amber-100 text-amber-800 font-bold px-2.5 py-1 border-round text-xs tracking-wider uppercase border-1 border-amber-200 shadow-2xs">
                    CHECKPOINT
                  </span>
                ) : (
                  <div className="text-center w-full font-semibold text-slate-700">{r.boothNumber}</div>
                )}
                style={{ width: '12%', textAlign: 'center' }}
              ></Column>

              {/* Polling booth name column - Shows centered input text for checkpoints */}
              <Column 
                field="villageName" 
                header="Polling booth name" 
                sortable 
                body={(r, opt) => {
                  if (r.isCheckpoint) {
                    return (
                      <InputText 
                        value={r.checkpointName || ''} 
                        onChange={(e) => handleUpdateCheckpointName(e.target.value, opt.rowIndex)}
                        placeholder="Enter checkpoint name..."
                        className="checkpoint-input-center text-center font-bold p-inputtext-sm"
                        style={{ 
                          backgroundColor: '#ffffff', 
                          color: '#1e293b', 
                          border: '1.5px solid #cbd5e1', 
                          borderRadius: '8px',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.04)',
                          padding: '6px 12px'
                        }}
                      />
                    );
                  }
                  return <div className="text-center font-bold text-slate-700 w-full">{r.villageName}</div>;
                }}
                style={{ textAlign: 'center' }}
              ></Column>

              {/* Sthan Location column - Shows Transit label for checkpoints */}
              <Column 
                field="sthanBhawan" 
                header="Sthan / Bhawan Location" 
                body={(r) => r.isCheckpoint ? null : (
                  <span className="text-slate-600 text-xs font-semibold">{r.sthanBhawan}</span>
                )}
              ></Column>
              
              {/* Distance column - Shows Waypoint tag for checkpoints */}
              <Column 
                field="distanceFromVitranKendra" 
                header="Distance from Starting point" 
                body={(rowData) => rowData.isCheckpoint ? null : (
                  <div className="text-center w-full font-bold text-primary text-xs">{rowData.distanceFromVitranKendra}</div>
                )}
                style={{ width: '15%', textAlign: 'center' }}
              ></Column>

              {/* Routes Column - Shows dustbin icon for deleting checkpoint rows */}
              <Column 
                header="Routes" 
                body={(rowData, options) => {
                  if (rowData.isCheckpoint) {
                    return (
                      <Button 
                        icon="pi pi-trash" 
                        className="checkpoint-delete-right p-button-rounded p-button-danger p-button-text p-button-sm hover:bg-red-50"
                        style={{ color: '#ef4444', width: '32px', height: '32px' }}
                        tooltip="Delete Checkpoint"
                        tooltipOptions={{ position: 'top' }}
                        title="Delete Checkpoint"
                        onClick={() => handleDeleteCheckpointRow(options.rowIndex)}
                      />
                    );
                  }
                  return (
                    <div className="flex justify-content-center align-items-center w-full">
                      <SelectButton
                        value={rowData.routeAssignment}
                        options={inlineRouteOptions}
                        onChange={(e) => handleQuickAssign(e.value, options.rowIndex)}
                        className="p-button-sm font-semibold selectbutton-compact"
                      />
                    </div>
                  );
                }}
                style={{ width: routesColumnWidth, textAlign: 'center' }}
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
                      
                      {/* Grid for side-by-side compact Code and Vehicle inputs */}
                      <div className="grid col-12 p-0 m-0 gap-2">
                        <div className="field col p-0 m-0">
                          <label className="font-bold text-xs text-slate-500 block mb-1">Route name</label>
                          <InputText 
                            value={config?.name || ''} 
                            onChange={(e) => handleConfigChange(routeName, 'name', e.target.value)}
                            placeholder="E.g. RT-SAR-01"
                            className="p-inputtext-sm font-semibold"
                          />
                        </div>

                        <div className="field col p-0 m-0" style={{ minWidth: '150px', maxWidth: '170px' }}>
                          <label className="font-bold text-xs text-slate-500 block mb-1">Vehicle Category</label>
                          <Dropdown 
                            value={config?.vehicle || 'Bus'} 
                            options={vehicleTypes} 
                            onChange={(e) => handleConfigChange(routeName, 'vehicle', e.value)}
                            placeholder="Select Class"
                            className="p-inputtext-sm font-semibold"
                          />
                        </div>
                      </div>

                      {/* Full-width Guide input */}
                      <div className="field col-12 p-0 m-0">
                        <label className="font-bold text-xs text-slate-500 block mb-1">Route Guide Name</label>
                        <div className="p-input-icon-left w-full">
                          <i className="pi pi-user text-slate-400" style={{ left: '10px' }} />
                          <InputText 
                            value={config?.guide || ''} 
                            onChange={(e) => handleConfigChange(routeName, 'guide', e.target.value)}
                            placeholder="Enter Guide Name"
                            className="w-full p-inputtext-sm font-semibold"
                            style={{ paddingLeft: '2.2rem' }}
                          />
                        </div>
                      </div>

                      {/* Full-width Departure Date & Time input */}
                      <div className="field col-12 p-0 m-0">
                        <label className="font-bold text-xs text-slate-500 block mb-1">Departure Date & Time</label>
                        <Calendar 
                          value={config?.departureTime ? new Date(config.departureTime) : null} 
                          onChange={(e) => handleConfigChange(routeName, 'departureTime', e.value)}
                          showTime 
                          hourFormat="24" 
                          showIcon
                          className="w-full p-inputtext-sm font-semibold"
                          inputClassName="font-semibold"
                        />
                      </div>

                      {/* Premium Sequence Summary Timeline */}
                      <div className="flex flex-column gap-1.5 bg-slate-50 p-3 border-round-xl border-1 border-slate-100" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                        <span className="font-bold text-xs text-slate-600 mb-2 flex align-items-center border-bottom-1 border-slate-200 pb-1.5" style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <i className="pi pi-list text-indigo-500" style={{ marginRight: '8px' }}></i>Route Sequence Timeline
                        </span>
                        
                        <div className="flex flex-column gap-2.5 mt-1 relative pl-3" style={{ borderLeft: '2px solid #e2e8f0', marginLeft: '6px', paddingLeft: '14px' }}>
                          
                          {/* Starting Point (Vitran Kendra - Global) */}
                          <div className="relative text-xs font-bold text-slate-500">
                            <span className="absolute border-circle" style={{ left: '-19px', top: '4px', width: '8px', height: '8px', backgroundColor: '#ef4444', border: '2px solid #ffffff', boxShadow: '0 0 0 2px rgba(239, 68, 68, 0.2)' }}></span>
                            Start: {vitranKendra.split(',')[0]}
                          </div>

                          {/* Sequenced Booths and In-Grid Waypoints */}
                          {(() => {
                            let boothIdx = 0;
                            return booths.map((booth) => {
                              if (booth.isCheckpoint) {
                                return (
                                  <div key={booth.id} className="relative text-xs text-amber-700 font-bold bg-amber-50/50 p-1.5 border-round border-1 border-amber-100 flex align-items-center justify-content-between animate-fade-in">
                                    <span className="absolute border-circle" style={{ left: '-19px', top: '8px', width: '8px', height: '8px', backgroundColor: '#f59e0b', border: '2px solid #ffffff', boxShadow: '0 0 0 2px rgba(245, 158, 11, 0.2)' }}></span>
                                    <span className="flex align-items-center gap-1">
                                      <i className="pi pi-map-marker text-amber-500 text-10px"></i>
                                      CP: {booth.checkpointName || 'Checkpoint'}
                                    </span>
                                    <span className="text-amber-600 text-9px font-semibold uppercase tracking-wider bg-amber-100/60 px-1 py-0.2 border-round">
                                      Waypoint
                                    </span>
                                  </div>
                                );
                              }
                              boothIdx++;
                              return (
                                <div key={booth.id} className="relative text-xs text-slate-700 font-semibold flex align-items-center justify-content-between animate-fade-in py-0.5">
                                  <span className="absolute border-circle" style={{ left: '-19px', top: '8px', width: '8px', height: '8px', backgroundColor: rColor, border: '2px solid #ffffff', boxShadow: `0 0 0 2px ${rColor}33` }}></span>
                                  <span>
                                    {boothIdx}. {booth.villageName} (Booth {booth.boothNumber})
                                  </span>
                                  <span className="text-slate-400 text-10px font-normal">
                                    {booth.distanceFromVitranKendra}
                                  </span>
                                </div>
                              );
                            });
                          })()}
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
