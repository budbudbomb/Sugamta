import React, { useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import { Toast } from 'primereact/toast';
import { InputTextarea } from 'primereact/inputtextarea';
import { TabView, TabPanel } from 'primereact/tabview';
import { SelectButton } from 'primereact/selectbutton';
import { Calendar } from 'primereact/calendar';

/* ----------------------------------------------------
   1. SECTOR OFFICER APPOINTMENT SCREEN
---------------------------------------------------- */
export function SectorOfficerAppointment({ onNext }) {
  const toast = useRef(null);
  const [electionType, setElectionType] = useState('Panchayat');
  const [block, setBlock] = useState('Sarangpur');
  const [activeTab, setActiveTab] = useState(0);

  // Edit/View toggling dictionary state per sector (by default, editable forms are shown)
  const [editingSectors, setEditingSectors] = useState({
    'Sector 1': true,
    'Sector 2': true,
    'Sector 3': true,
    'Sector 4': true
  });

  const blocks = [
    { label: 'Janpad Panchayat Sarangpur', value: 'Sarangpur' },
    { label: 'Janpad Panchayat Pachore', value: 'Pachore' },
    { label: 'Janpad Panchayat Rajgarh', value: 'Rajgarh' }
  ];

  // Dynamic Sector State Mock Data
  const [sectorsData, setSectorsData] = useState({
    'Sector 1': {
      officer: { name: 'Dr. Vivek Saxena', designation: 'Assistant Professor', mobile: '9827012345', address: 'Govt. Degree College, Sarangpur' },
      booths: [
        { id: 1, boothNumber: '101', boothName: 'Barkhera', sthanBhawan: 'Govt. Primary School Room 1' },
        { id: 2, boothNumber: '102', boothName: 'Khajuri', sthanBhawan: 'Anganwadi Kendra Center' }
      ]
    },
    'Sector 2': {
      officer: { name: 'Shri Manoj Agrawal', designation: 'Executive Engineer', mobile: '9425098765', address: 'PWD Department Office, Rajgarh' },
      booths: [
        { id: 3, boothNumber: '201', boothName: 'Pachore Town Center', sthanBhawan: 'Govt. Boys High School' },
        { id: 4, boothNumber: '202', boothName: 'Bhayana', sthanBhawan: 'Panchayat Hall' }
      ]
    },
    'Sector 3': {
      officer: { name: 'Smt. Anjali Sharma', designation: 'Lecturer', mobile: '7000876543', address: 'Girls Higher Sec School, Narsinghgarh' },
      booths: [
        { id: 5, boothNumber: '301', boothName: 'Narsinghgarh Kila', sthanBhawan: 'Govt. High School Near Fort' },
        { id: 6, boothNumber: '302', boothName: 'Talab Chowk', sthanBhawan: 'Community Hall Room 2' }
      ]
    },
    'Sector 4': {
      officer: { name: 'Shri R. C. Patel', designation: 'Sub-Auditor', mobile: '8817923456', address: 'Cooperative Society Block Building, Biaora' },
      booths: [
        { id: 7, boothNumber: '401', boothName: 'Ghatia', sthanBhawan: 'Govt. Primary School Ghatia' },
        { id: 8, boothNumber: '402', boothName: 'Biaora Crossing', sthanBhawan: 'Janpad Panchayat Hall' }
      ]
    }
  });

  const handleInputChange = (sectorKey, field, value) => {
    setSectorsData(prev => ({
      ...prev,
      [sectorKey]: {
        ...prev[sectorKey],
        officer: {
          ...prev[sectorKey].officer,
          [field]: value
        }
      }
    }));
  };

  const handleToggleEdit = (sectorKey) => {
    setEditingSectors(prev => ({
      ...prev,
      [sectorKey]: !prev[sectorKey]
    }));
  };

  const handleSaveOfficerDetails = (sectorKey, index) => {
    // Save details and disable editing mode
    setEditingSectors(prev => ({
      ...prev,
      [sectorKey]: false
    }));

    toast.current.show({
      severity: 'success',
      summary: 'Officer Details Saved',
      detail: `Administrative credentials for ${sectorKey} updated successfully.`,
      life: 2000
    });

    const sectorKeys = Object.keys(sectorsData);
    if (index < sectorKeys.length - 1) {
      // Automatically move to the next sector tab
      setTimeout(() => {
        setActiveTab(index + 1);
      }, 600);
    } else {
      // Last sector! Save and automatically proceed to next screen
      setTimeout(() => {
        handleSaveAndNext();
      }, 600);
    }
  };

  const handleNextProgress = (sectorKey, index) => {
    const sectorKeys = Object.keys(sectorsData);
    if (index < sectorKeys.length - 1) {
      setActiveTab(index + 1);
    } else {
      handleSaveAndNext();
    }
  };

  const handleSaveAndNext = () => {
    toast.current.show({ 
      severity: 'success', 
      summary: 'Officer Rosters Saved', 
      detail: 'Sector Officers successfully assigned to respective booths. Proceeding to Vehicle Requisition...', 
      life: 3000 
    });
    if (onNext) setTimeout(() => onNext('vehicle-acquisition'), 1000);
  };

  return (
    <div className="grid animate-fade-in">
      <Toast ref={toast} />

      {/* Top Header Panel */}
      <div className="col-12 flex align-items-center justify-content-between mb-2">
        <div>
          <h2 className="m-0 font-bold gradient-text text-3xl">Sector Officer Appointment</h2>
          <p className="text-slate-500 m-0 mt-1 text-sm font-medium">Assign administrative officers to coordinate poll operations across sectors.</p>
        </div>
      </div>

      {/* 1. Top Filters Section (Card) */}
      <div className="col-12 mb-3">
        <Card className="glass-panel" title={<span className="text-lg font-bold text-slate-700 flex align-items-center"><i className="pi pi-filter mr-2 text-primary text-xl"></i>Appointment Filter Scope</span>}>
          <div className="p-fluid grid align-items-center">
            
            {/* Election Type (RadioButton Selection) */}
            <div className="field col-12 md:col-6">
              <label className="font-semibold text-sm text-slate-600 block mb-2">Election Type</label>
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex align-items-center">
                  <RadioButton 
                    inputId="elecPanchayat" 
                    name="electionType" 
                    value="Panchayat" 
                    onChange={(e) => setElectionType(e.value)} 
                    checked={electionType === 'Panchayat'} 
                  />
                  <label htmlFor="elecPanchayat" className="ml-2 font-semibold text-slate-700 cursor-pointer">Panchayat</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton 
                    inputId="elecNagariya" 
                    name="electionType" 
                    value="NagariyaNikaya" 
                    onChange={(e) => setElectionType(e.value)} 
                    checked={electionType === 'NagariyaNikaya'} 
                  />
                  <label htmlFor="elecNagariya" className="ml-2 font-semibold text-slate-700 cursor-pointer">Nagariya Nikaya</label>
                </div>
              </div>
            </div>

            {/* Conditional Block Selection dropdown */}
            {electionType === 'Panchayat' && (
              <div className="field col-12 md:col-6 animate-fade-in">
                <label className="font-semibold text-sm text-slate-600 block mb-2">Block (Janpad Panchayat)</label>
                <Dropdown 
                  value={block} 
                  options={blocks} 
                  onChange={(e) => setBlock(e.value)} 
                  placeholder="Select Block" 
                  className="font-semibold"
                />
              </div>
            )}

          </div>
        </Card>
      </div>

      {/* 2. Main Content Area (Dynamic Tabs) */}
      <div className="col-12">
        <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)} className="shadow-2xs border-round-xl overflow-hidden bg-white p-3 border-1 border-slate-200">
          {Object.keys(sectorsData).map((sectorKey, index) => {
            const sector = sectorsData[sectorKey];
            const isLastSector = index === Object.keys(sectorsData).length - 1;
            const isEditing = editingSectors[sectorKey];
            
            return (
              <TabPanel 
                key={sectorKey} 
                header={
                  <span className="flex align-items-center gap-2 font-bold py-1">
                    <i className="pi pi-users text-sm"></i>
                    {sectorKey}
                  </span>
                }
              >
                {/* 3. Tab Content - Dynamic Two Column Split Layout */}
                <div className="grid mt-2">
                  
                  {/* Left Column - Sector Officer Details (Form or View Mode) */}
                  <div className="col-12 md:col-5 lg:col-4">
                    {isEditing ? (
                      /* Editable Input Form Mode */
                      <Card 
                        className="glass-panel border-top-3 border-indigo-500" 
                        title={
                          <div className="flex align-items-center justify-content-between pb-1" style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <span className="text-base font-bold text-slate-700 flex align-items-center">
                              <i className="pi pi-user-edit text-primary mr-2 text-lg"></i>Edit Details
                            </span>
                            <Button 
                              icon="pi pi-times" 
                              className="p-button-rounded p-button-text p-button-sm text-red-500 hover:bg-red-50"
                              style={{ width: '32px', height: '32px' }}
                              tooltip="Cancel Edit"
                              tooltipOptions={{ position: 'top' }}
                              onClick={() => handleToggleEdit(sectorKey)}
                            />
                          </div>
                        }
                      >
                        <div className="p-fluid flex flex-column gap-3 mt-2">
                          <div className="field">
                            <label className="font-bold text-xs text-slate-500 block mb-1">Officer Name</label>
                            <InputText 
                              value={sector.officer.name} 
                              onChange={(e) => handleInputChange(sectorKey, 'name', e.target.value)} 
                              placeholder="Enter full name" 
                              className="p-inputtext-sm font-semibold"
                            />
                          </div>

                          <div className="field">
                            <label className="font-bold text-xs text-slate-500 block mb-1">Designation</label>
                            <InputText 
                              value={sector.officer.designation} 
                              onChange={(e) => handleInputChange(sectorKey, 'designation', e.target.value)} 
                              placeholder="E.g. Executive Engineer" 
                              className="p-inputtext-sm font-semibold"
                            />
                          </div>

                          <div className="field">
                            <label className="font-bold text-xs text-slate-500 block mb-1">Mobile No.</label>
                            <InputText 
                              value={sector.officer.mobile} 
                              onChange={(e) => handleInputChange(sectorKey, 'mobile', e.target.value)} 
                              placeholder="E.g. +91 98270XXXXX" 
                              className="p-inputtext-sm font-semibold"
                            />
                          </div>

                          <div className="field">
                            <label className="font-bold text-xs text-slate-500 block mb-1">Office Address</label>
                            <InputTextarea 
                              value={sector.officer.address} 
                              onChange={(e) => handleInputChange(sectorKey, 'address', e.target.value)} 
                              placeholder="Enter complete office address" 
                              rows={3} 
                              className="p-inputtext-sm font-semibold"
                              style={{ resize: 'none' }}
                            />
                          </div>

                          <Button 
                            label={isLastSector ? "Save & Proceed" : "Save Officer Details"} 
                            icon={isLastSector ? "pi pi-arrow-right" : "pi pi-check"} 
                            onClick={() => handleSaveOfficerDetails(sectorKey, index)} 
                            className={`p-button-sm mt-2 ${isLastSector ? 'p-button-success' : 'p-button-indigo'}`} 
                          />
                        </div>
                      </Card>
                    ) : (
                      /* Dossier / Read-Only Profile View Mode */
                      <Card 
                        className="glass-panel border-top-3 border-indigo-500" 
                        title={
                          <div className="flex align-items-center justify-content-between pb-1" style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <span className="text-base font-bold text-slate-700 flex align-items-center">
                              <i className="pi pi-user text-indigo-500 mr-2 text-lg"></i>Assigned Officer
                            </span>
                            <Button 
                              icon="pi pi-pencil" 
                              className="p-button-rounded p-button-text p-button-sm text-indigo-600 hover:bg-indigo-50"
                              style={{ width: '32px', height: '32px' }}
                              tooltip="Edit Officer Details"
                              tooltipOptions={{ position: 'top' }}
                              onClick={() => handleToggleEdit(sectorKey)}
                            />
                          </div>
                        }
                      >
                        <div className="flex flex-column align-items-center text-center p-2 gap-3 mt-1">
                          
                          {/* Circular Letter-based Profile Avatar */}
                          <div 
                            className="flex align-items-center justify-content-center border-circle bg-indigo-50 text-indigo-600 font-bold" 
                            style={{ width: '64px', height: '64px', fontSize: '22px', border: '2px dashed #818cf8' }}
                          >
                            {sector.officer.name ? sector.officer.name.charAt(0) : 'U'}
                          </div>
                          
                          {/* Text Profile Header */}
                          <div>
                            <h3 className="m-0 font-bold text-slate-800 text-lg">{sector.officer.name || 'Unassigned'}</h3>
                            <span className="text-11px font-bold text-indigo-600 uppercase tracking-wider block mt-1 bg-indigo-50 border-1 border-indigo-100 px-2.5 py-0.5 border-round inline-block">
                              {sector.officer.designation || 'No Designation'}
                            </span>
                          </div>

                          {/* Detail fields in vertical layout with clean icons */}
                          <div className="w-full border-top-1 border-slate-100 pt-3 flex flex-column gap-2 text-left" style={{ borderTop: '1px solid #f1f5f9' }}>
                            <div className="flex align-items-center gap-3 text-slate-600 text-sm">
                              <i className="pi pi-phone text-indigo-400" />
                              <span className="font-semibold">{sector.officer.mobile || 'No Mobile Registered'}</span>
                            </div>
                            <div className="flex align-items-start gap-3 text-slate-600 text-sm mt-1">
                              <i className="pi pi-map-marker text-indigo-400 mt-1" />
                              <span className="font-semibold leading-relaxed text-slate-500">{sector.officer.address || 'No Address Listed'}</span>
                            </div>
                          </div>

                          {/* Quick Navigation / Lock Progress Button */}
                          <Button 
                            label={isLastSector ? "Save & Proceed" : "Next Sector"} 
                            icon={isLastSector ? "pi pi-arrow-right" : "pi pi-chevron-right"} 
                            onClick={() => handleNextProgress(sectorKey, index)} 
                            className={`p-button-sm w-full mt-2 ${isLastSector ? 'p-button-success' : 'p-button-outlined'}`} 
                          />

                        </div>
                      </Card>
                    )}
                  </div>

                  {/* Right Column - Polling Booths Grid */}
                  <div className="col-12 md:col-7 lg:col-8">
                    <Card 
                      className="glass-panel h-full" 
                      title={
                        <div className="flex align-items-center justify-content-between">
                          <span className="text-base font-bold text-slate-700 flex align-items-center">
                            <i className="pi pi-building text-primary mr-2 text-lg"></i>Polling Booths in this Sector
                          </span>
                          <span className="text-xs font-semibold text-slate-400">Purely Read-Only context</span>
                        </div>
                      }
                    >
                      <DataTable 
                        value={sector.booths} 
                        className="p-datatable-sm mt-1" 
                        responsiveLayout="scroll"
                        emptyMessage="No booths assigned to this sector."
                      >
                        <Column 
                          field="boothNumber" 
                          header="Polling Booth No" 
                          sortable 
                          className="text-center font-bold text-indigo-600" 
                          headerClassName="text-center"
                          style={{ width: '25%' }}
                        ></Column>
                        
                        <Column 
                          field="boothName" 
                          header="Polling Booth Name" 
                          sortable 
                          className="font-bold text-slate-700 text-center w-full"
                          headerClassName="text-center"
                        ></Column>
                        
                        <Column 
                          field="sthanBhawan" 
                          header="Sthan / Bhawan Location" 
                          className="text-xs text-slate-600 font-semibold"
                        ></Column>
                      </DataTable>
                    </Card>
                  </div>

                </div>
              </TabPanel>
            );
          })}
        </TabView>
      </div>

    </div>
  );
}

/* ----------------------------------------------------
   2. VEHICLE ACQUISITION SCREEN
---------------------------------------------------- */
export function VehicleAcquisition({ onNext }) {
  const toast = useRef(null);

  // Dhar District's 13 Blocks
  const blocks = [
    'Dhar', 'Badnawar', 'Sardarpur', 'Kukshi', 'Gandhwani', 
    'Manawar', 'Dharampuri', 'Nisarpur', 'Nalchha', 'Tirla', 
    'Dahi', 'Umarban', 'Bagh'
  ];

  // Selected Block Tab State (defaults to first block, 'Dhar')
  const [selectedBlock, setSelectedBlock] = useState('Dhar');

  // Status Filter Pill State
  const [statusFilter, setStatusFilter] = useState('All');

  // Dynamic realistic data generator for all 13 blocks of Dhar District
  const generateMockRequirements = () => {
    const data = {};
    const officers = ['Dr. Vivek Saxena', 'Shri Manoj Agrawal', 'Smt. Sharda Solanki', 'Shri R. C. Patel', 'Dr. Anil Mehta', 'Smt. Anjali Sharma', 'Shri Rajesh Kumar'];
    const vehicles = [
      { type: 'Bus', model: 'Tata Starbus 40-Seater' },
      { type: 'Car', model: 'Toyota Innova Crysta MUV' },
      { type: 'Loading van', model: 'Tata Ace (Chota Hathi)' },
      { type: 'Car', model: 'Mahindra Bolero SUV' },
      { type: 'Bus', model: 'Eicher Skyline 50-Seater' }
    ];

    blocks.forEach((block, bIdx) => {
      // 2 to 4 sectors per block depending on block index
      const numSectors = 2 + (bIdx % 3); 
      const blockReqs = [];
      
      for (let s = 1; s <= numSectors; s++) {
        const sectorName = `Sector 0${s}`;
        const officerName = officers[(bIdx + s) % officers.length];
        
        // 1 to 2 routes per sector
        const numRoutes = 1 + ((bIdx + s) % 2); 
        for (let r = 1; r <= numRoutes; r++) {
          const v = vehicles[(bIdx + s + r) % vehicles.length];
          // Prefill some routes as already secured to demonstrate glowing segments
          const isSecured = (bIdx + s + r) % 3 === 0;
          
          blockReqs.push({
            id: `req-${block.toLowerCase().slice(0,3)}-s${s}-${r}`,
            sectorName,
            officerName: isSecured ? officerName : '',
            routeName: `Route ${r}`,
            vehicleType: v.type,
            recommendedModel: v.model,
            dateTime: new Date(2026, 4, 27, 8 + (s % 3), (r * 15) % 60),
            status: isSecured ? 'Secured' : 'Pending',
            acqType: isSecured && r === 1 ? 'Department' : 'Individual',
            ownerName: isSecured ? (r === 1 ? 'PWD' : 'Rakesh Sharma') : '',
            ownerMobile: isSecured ? '+91 94250 12345' : '',
            vehicleNo: isSecured ? `MP04-CE-${1000 + bIdx * 20 + s * 5 + r}` : 'MP04-',
            authorizedOfficer: isSecured ? officerName : '',
            bankAccNo: isSecured ? `309810100${100 + s * 10 + r}` : '',
            ifscCode: isSecured ? 'SBIN0003021' : ''
          });
        }
      }
      data[block] = blockReqs;
    });
    return data;
  };

  // State to hold all blocks requisitions
  const [requirements, setRequirements] = useState(generateMockRequirements());

  // Collapsible Sectors State (defaults to true for visibility)
  const [expandedSectors, setExpandedSectors] = useState({
    'Sector 01': true,
    'Sector 02': true,
    'Sector 03': true,
    'Sector 04': true
  });

  const toggleSector = (secName) => {
    setExpandedSectors(prev => ({
      ...prev,
      [secName]: !prev[secName]
    }));
  };

  const departments = [
    { label: 'Public Works Department (PWD)', value: 'PWD' },
    { label: 'Water Resources Department (WRD)', value: 'WRD' },
    { label: 'Forest Department Rajgarh', value: 'ForestDept' },
    { label: 'Education Department Pool', value: 'EducationDept' },
    { label: 'Municipal Corporation Sarangpur', value: 'MunicipalCorp' }
  ];

  // Derive active block specifications
  const blockReqs = requirements[selectedBlock] || [];
  const totalReqs = blockReqs.length;
  const securedReqs = blockReqs.filter(r => r.status === 'Secured').length;
  const progressPercentage = Math.round((securedReqs / totalReqs) * 100) || 0;

  // Get unique sectors in this block
  const blockSectors = Array.from(new Set(blockReqs.map(r => r.sectorName))).sort();

  // Check if a sector has all of its routes secured
  const checkSectorSecured = (secName) => {
    const routes = blockReqs.filter(r => r.sectorName === secName);
    if (routes.length === 0) return false;
    return routes.every(r => r.status === 'Secured');
  };

  // Get unique sectors for any block dynamically
  const getBlockSectorsList = (blockName) => {
    const reqs = requirements[blockName] || [];
    return Array.from(new Set(reqs.map(r => r.sectorName))).sort();
  };

  // Check if a sector has all of its routes secured in a specific block
  const isSectorSecuredInBlock = (blockName, sectorName) => {
    const reqs = requirements[blockName] || [];
    const routes = reqs.filter(r => r.sectorName === sectorName);
    if (routes.length === 0) return false;
    return routes.every(r => r.status === 'Secured');
  };

  // Filter requirements by tab filter
  const filteredReqs = blockReqs.filter(r => {
    if (statusFilter === 'All') return true;
    if (statusFilter === 'Pending') return r.status === 'Pending';
    if (statusFilter === 'Secured') return r.status === 'Secured';
    return true;
  });

  // Group requirements by Sector
  const getGroupedSectors = () => {
    const grouped = {};
    filteredReqs.forEach(r => {
      if (!grouped[r.sectorName]) {
        grouped[r.sectorName] = {
          sectorName: r.sectorName,
          officerName: r.officerName || 'Unassigned',
          routes: []
        };
      }
      grouped[r.sectorName].routes.push(r);
    });
    return Object.values(grouped).sort((a, b) => a.sectorName.localeCompare(b.sectorName));
  };

  const sectorsList = getGroupedSectors();

  // Metrics by vehicle type counts
  const getVehicleTypeCounts = () => {
    const counts = { Bus: { total: 0, secured: 0 }, Car: { total: 0, secured: 0 }, 'Loading van': { total: 0, secured: 0 } };
    blockReqs.forEach(r => {
      if (counts[r.vehicleType]) {
        counts[r.vehicleType].total++;
        if (r.status === 'Secured') {
          counts[r.vehicleType].secured++;
        }
      }
    });
    return counts;
  };

  const typeCounts = getVehicleTypeCounts();

  // Inline updater for fields on individual routes
  const updateRouteField = (routeId, fieldName, value) => {
    const updatedBlockReqs = blockReqs.map(r => {
      if (r.id === routeId) {
        return {
          ...r,
          [fieldName]: value
        };
      }
      return r;
    });
    setRequirements({
      ...requirements,
      [selectedBlock]: updatedBlockReqs
    });
  };

  // Save/Confirm individual route acquisition details
  const handleConfirmRoute = (route) => {
    if (!route.ownerName || route.ownerName.trim() === '') {
      toast.current.show({
        severity: 'error',
        summary: 'Validation Failed',
        detail: route.acqType === 'Individual' ? 'Please enter Owner Name.' : 'Please select Department.',
        life: 3000
      });
      return;
    }
    if (!route.vehicleNo || route.vehicleNo.trim() === '' || route.vehicleNo === 'MP04-') {
      toast.current.show({
        severity: 'error',
        summary: 'Validation Failed',
        detail: 'Please enter a valid Vehicle Registered Number.',
        life: 3000
      });
      return;
    }
    if (!route.officerName || route.officerName.trim() === '') {
      toast.current.show({
        severity: 'error',
        summary: 'Validation Failed',
        detail: 'Please enter Officer Name.',
        life: 3000
      });
      return;
    }
    if (!route.bankAccNo || route.bankAccNo.trim() === '') {
      toast.current.show({
        severity: 'error',
        summary: 'Validation Failed',
        detail: 'Please enter Bank Account Number.',
        life: 3000
      });
      return;
    }
    if (!route.ifscCode || route.ifscCode.trim() === '') {
      toast.current.show({
        severity: 'error',
        summary: 'Validation Failed',
        detail: 'Please enter Bank IFSC Code.',
        life: 3000
      });
      return;
    }

    // Set status to Secured
    updateRouteField(route.id, 'status', 'Secured');

    toast.current.show({
      severity: 'success',
      summary: 'Requisition Secured',
      detail: `Successfully registered ${route.vehicleType} (${route.vehicleNo}) for ${route.officerName}.`,
      life: 3000
    });
  };

  // Re-enable editing for confirmed route details
  const handleUnlockRoute = (route) => {
    updateRouteField(route.id, 'status', 'Pending');
    toast.current.show({
      severity: 'info',
      summary: 'Form Unlocked',
      detail: `Details can now be edited. Click Confirm once updated.`,
      life: 2000
    });
  };

  const handleDownload = () => {
    toast.current.show({ 
      severity: 'info', 
      summary: 'Downloading Report', 
      detail: `Compiling warrants for ${selectedBlock} block (${securedReqs}/${totalReqs} secured)...`, 
      life: 3000 
    });
  };

  // Helper icons for vehicle type (enlarged icons)
  const getVehicleIcon = (type) => {
    switch (type) {
      case 'Bus': return 'pi pi-truck';
      case 'Car': return 'pi pi-car';
      case 'Loading van': return 'pi pi-shopping-bag';
      default: return 'pi pi-car';
    }
  };

  // Helper styling for vehicle type pills
  const getVehiclePillClass = (type) => {
    switch (type) {
      case 'Bus': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'Car': return 'bg-teal-50 text-teal-700 border-teal-100';
      case 'Loading van': return 'bg-orange-50 text-orange-700 border-orange-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="grid animate-fade-in">
      <Toast ref={toast} />

      {/* Top Header Panel */}
      <div className="col-12 flex align-items-center justify-content-between mb-2">
        <div>
          <h2 className="m-0 font-bold gradient-text text-3xl">Vehicle Acquisition Portal</h2>
          <p className="text-slate-500 m-0 mt-1 text-sm font-medium">Dhar District RTO Portal • Register and authorize municipal, departmental, or private requisitioned vehicles.</p>
        </div>
        <Button label="Download District Report" icon="pi pi-download" className="p-button-outlined" onClick={handleDownload} />
      </div>

      {/* Left Main Control & Ledger Area - Now expanded to full 12 columns */}
      <div className="col-12 flex flex-column gap-3">
        
        {/* Dhar District 13 Blocks Horizontal Tab Strip - Redesigned to premium light-theme command-center */}
        <div 
          className="p-4 border-round-xl shadow-xs flex flex-column gap-3 bg-white border-1 border-slate-200"
          style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.015)' }}
        >
          <div className="flex align-items-center justify-content-between">
            <div className="flex align-items-center gap-2">
              <span className="w-2.5 h-2.5 border-circle bg-indigo-500 inline-block animate-pulse" style={{ width: '8px', height: '8px', background: '#6366f1' }}></span>
              <span className="font-extrabold text-xs uppercase tracking-widest text-slate-700" style={{ color: '#475569' }}>Dhar District Control Node</span>
            </div>
            <span 
              className="text-10px font-extrabold border-round-pill px-3 py-1 border-1 border-indigo-100 bg-indigo-50 text-indigo-700 animate-fade-in"
              style={{ background: '#f5f3ff', color: '#4f46e5', borderColor: '#ddd6fe', border: '1px solid #ddd6fe' }}
            >
              13 Administrative Blocks Mapped
            </span>
          </div>
          
          <div 
            className="flex gap-2 overflow-x-auto pb-2 px-1 hide-scrollbar" 
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              borderBottom: '1px solid #f1f5f9'
            }}
          >
            {blocks.map((block) => {
              const isActive = selectedBlock === block;
              const blockSectors = getBlockSectorsList(block);
              
              return (
                <button
                  key={block}
                  className="p-3 border-none cursor-pointer border-round-xl transition-all flex-shrink-0 flex flex-column justify-content-between text-left"
                  onClick={() => { setSelectedBlock(block); }}
                  style={{ 
                    outline: 'none',
                    width: '160px',
                    height: '80px',
                    background: isActive ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' : '#f8fafc',
                    boxShadow: isActive ? '0 8px 20px rgba(99, 102, 241, 0.2)' : 'none',
                    border: isActive ? '1px solid #6366f1' : '1px solid #e2e8f0',
                    transform: isActive ? 'translateY(-1px)' : 'none',
                    color: isActive ? '#ffffff' : '#334155'
                  }}
                >
                  <div className="flex flex-column gap-0.5 w-full">
                    <span className="font-extrabold text-xs flex align-items-center gap-2" style={{ color: isActive ? '#ffffff' : '#334155' }}>
                      <i className={`pi ${isActive ? 'pi-map-marker text-white animate-bounce' : 'pi-map text-slate-400'} text-xs`} style={{ marginRight: '6px' }}></i>
                      {block} Block
                    </span>
                    <span className="text-10px font-semibold" style={{ color: isActive ? '#c7d2fe' : '#64748b' }}>
                      {blockSectors.length} Sectors
                    </span>
                  </div>

                  {/* Segmented sector track built directly into the tab button */}
                  <div className="flex gap-1.5 w-full mt-0.5" style={{ height: '5px' }}>
                    {blockSectors.map((secName) => {
                      const isSecured = isSectorSecuredInBlock(block, secName);
                      return (
                        <div
                          key={secName}
                          className="flex-1 border-round-sm"
                          style={{
                            height: '100%',
                            background: isSecured 
                              ? '#10b981' 
                              : isActive ? 'rgba(255, 255, 255, 0.25)' : '#cbd5e1',
                            boxShadow: isSecured ? '0 0 6px rgba(16, 185, 129, 0.5)' : 'none',
                            transition: 'all 0.3s ease'
                          }}
                          title={`${secName}: ${isSecured ? 'Secured' : 'Pending'}`}
                        />
                      );
                    })}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ledger Header and Status Tab Pills */}
        <div className="flex flex-column gap-2 mt-2">
          
          <div className="flex justify-content-between align-items-center flex-wrap gap-2 mb-1">
            <div className="flex align-items-center gap-2">
              <i className="pi pi-list text-indigo-600 text-xl"></i>
              <h3 className="m-0 font-bold text-slate-800 text-lg">Administrative Vehicle Requirements ledger</h3>
            </div>
            <span className="bg-indigo-100 text-indigo-700 px-2.5 py-1 border-round-xl text-xs font-bold shadow-2xs">
              {filteredReqs.length} Mapped
            </span>
          </div>

          {/* Dynamic Filter Pills */}
          <div className="flex gap-2 bg-slate-100/60 p-1.5 border-round-xl border-1 border-slate-200" style={{ width: 'fit-content' }}>
            <span
              className={`px-3 py-1.5 border-round-lg text-xs font-bold cursor-pointer transition-all ${statusFilter === 'All' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              onClick={() => { setStatusFilter('All'); }}
            >
              All Routes ({blockReqs.length})
            </span>
            <span
              className={`px-3 py-1.5 border-round-lg text-xs font-bold cursor-pointer transition-all ${statusFilter === 'Pending' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              onClick={() => { setStatusFilter('Pending'); }}
            >
              Awaiting Requisition ({blockReqs.filter(r => r.status === 'Pending').length})
            </span>
            <span
              className={`px-3 py-1.5 border-round-lg text-xs font-bold cursor-pointer transition-all ${statusFilter === 'Secured' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              onClick={() => { setStatusFilter('Secured'); }}
            >
              Secured ({blockReqs.filter(r => r.status === 'Secured').length})
            </span>
          </div>

        </div>

        {/* Collapsible Sectors & Compact Rows Accordion */}
        <div className="flex flex-column gap-3 mt-1">
          {sectorsList.length === 0 ? (
            <div className="p-5 text-center border-round-xl border-1 border-slate-200 bg-white shadow-sm" style={{ borderStyle: 'dashed' }}>
              <i className="pi pi-info-circle text-indigo-500 text-2xl mb-2"></i>
              <h4 className="m-0 text-slate-700 font-bold">No Mapped Requirements Found</h4>
              <p className="text-slate-400 text-xs m-0 mt-1">There are no vehicle requirements matching the "{statusFilter}" status filter under this block.</p>
            </div>
          ) : (
            sectorsList.map((sec) => {
              const isExpanded = expandedSectors[sec.sectorName] !== false;
              const secTotal = sec.routes.length;
              const secSecured = sec.routes.filter(r => r.status === 'Secured').length;
              const isFullySecured = secTotal === secSecured;

              return (
                <div key={sec.sectorName} className="flex flex-column gap-2 animate-fade-in">
                  
                  {/* Sector Accordion Header Panel - Redesigned to match Visual Segment dashboard */}
                  <div
                    className="glass-panel p-3 flex justify-content-between align-items-center cursor-pointer hover:bg-slate-50 transition-colors shadow-2xs border-1 border-slate-200 bg-white border-round-xl"
                    onClick={() => toggleSector(sec.sectorName)}
                    style={{
                      borderLeft: isFullySecured ? '5px solid #10b981' : '5px solid #f59e0b'
                    }}
                  >
                    
                    {/* Left: Sector & Info */}
                    <div className="flex align-items-center gap-3">
                      
                      {/* Round Avatar Icon representing Sector - Styled with explicit hex values */}
                      <div 
                        className="flex align-items-center justify-content-center border-circle font-bold text-xs" 
                        style={{ 
                          width: '36px', 
                          height: '36px',
                          background: isFullySecured ? '#ecfdf5' : '#fffbeb',
                          color: isFullySecured ? '#047857' : '#b45309',
                          border: isFullySecured ? '1px solid #a7f3d0' : '1px solid #fde68a'
                        }}
                      >
                        {sec.sectorName.replace('Sector ', 'S')}
                      </div>

                      <div className="flex flex-column gap-0.5">
                        <span className="font-extrabold text-slate-800 text-sm">{sec.sectorName}</span>
                        <span className="text-11px font-medium" style={{ color: '#64748b' }}>
                          Assigned Officer: <span className="font-bold" style={{ color: '#475569' }}>{sec.officerName}</span>
                        </span>
                      </div>

                    </div>

                    {/* Right: Completion Pill + Arrow indicator */}
                    <div className="flex align-items-center gap-3">
                      {isFullySecured ? (
                        <span 
                          className="text-10px px-2.5 py-1 border-round-pill font-bold flex align-items-center gap-1"
                          style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0' }}
                        >
                          <i className="pi pi-verified text-10px"></i>
                          100% Secured
                        </span>
                      ) : (
                        <span 
                          className="text-10px px-2.5 py-1 border-round-pill font-bold flex align-items-center gap-1"
                          style={{ background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a' }}
                        >
                          <i className="pi pi-clock text-10px animate-pulse"></i>
                          {secSecured} of {secTotal} Secured
                        </span>
                      )}
                      <i className={`pi pi-chevron-down text-slate-400 text-sm transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`} style={{ transform: isExpanded ? 'rotate(180deg)' : 'none' }}></i>
                    </div>

                  </div>

                  {/* Expanded Route Ledger Rows Container */}
                  {isExpanded && (
                    <div className="pl-3 flex flex-column gap-3 animate-fade-in mt-1">
                      {sec.routes.map((route) => {
                        const isPending = route.status === 'Pending';

                        return (
                          <div
                            key={route.id}
                            className="p-4 border-round-xl flex flex-column lg:flex-row align-items-center justify-content-between border-1 route-card-premium relative mb-2 bg-white border-slate-200 shadow-2xs"
                            style={{
                              borderLeft: isPending ? '6px solid #ef4444' : '6px solid #10b981'
                            }}
                          >
                            
                            {/* Left Side: Enlarged Vehicle type icon and vehicle type label */}
                            <div className="flex align-items-center gap-3 pr-4 lg:border-right-1 lg:border-slate-200" style={{ minWidth: '220px' }}>
                              <div className="flex align-items-center justify-content-center border-circle bg-slate-50 text-slate-700 font-bold" 
                                   style={{ 
                                     width: '64px', 
                                     height: '64px', 
                                     minWidth: '64px',
                                     border: '2px solid #e2e8f0',
                                     background: isPending ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' : 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                                     color: isPending ? '#4f46e5' : '#10b981'
                                   }}>
                                <i className={`${getVehicleIcon(route.vehicleType)} text-2xl`}></i>
                              </div>
                              <div className="flex flex-column gap-1.5">
                                <span 
                                  className="text-10px font-extrabold px-2 py-0.5 border-round inline-block uppercase tracking-wider w-fit"
                                  style={{ background: '#e0e7ff', color: '#4338ca', border: '1px solid #c7d2fe', padding: '2px 8px', borderRadius: '4px' }}
                                >
                                  {route.vehicleType}
                                </span>
                                <div className="flex flex-column gap-0.5 mt-0.5" style={{ color: '#475569', fontSize: '11px', fontWeight: '700', lineHeight: '1.3' }}>
                                  <span style={{ fontSize: '9px', color: '#94a3b8', textTransform: 'uppercase', trackingWidth: '0.05em' }}>Reporting Time</span>
                                  <span className="flex align-items-center gap-1">
                                    <i className="pi pi-calendar-times text-xs text-indigo-400"></i>
                                    {route.dateTime.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }) + ', ' + route.dateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase()}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Rest of the Card: Embedded Inline Acquisition Form Fields - Structured grid without wraps */}
                            <div className="inline-acquisition-form flex-1 ml-2 lg:ml-4 w-full mt-4 lg:mt-0">
                              
                              {/* 1. Requisition Type Radio Buttons */}
                              <div className="flex flex-column gap-2">
                                <label className="text-10px font-bold uppercase tracking-wider" style={{ color: '#64748b', whiteSpace: 'nowrap' }}>Requisition Type</label>
                                <div className="flex gap-3 align-items-center" style={{ height: '40px' }}>
                                  <div className="flex align-items-center">
                                    <RadioButton 
                                      inputId={`acqTypeInd-${route.id}`} 
                                      name={`acqType-${route.id}`} 
                                      value="Individual" 
                                      disabled={route.status === 'Secured'}
                                      onChange={(e) => updateRouteField(route.id, 'acqType', e.value)} 
                                      checked={route.acqType === 'Individual'} 
                                    />
                                    <label htmlFor={`acqTypeInd-${route.id}`} className="ml-1.5 text-xs font-bold cursor-pointer" style={{ color: '#475569' }}>Private</label>
                                  </div>
                                  <div className="flex align-items-center">
                                    <RadioButton 
                                      inputId={`acqTypeDept-${route.id}`} 
                                      name={`acqType-${route.id}`} 
                                      value="Department" 
                                      disabled={route.status === 'Secured'}
                                      onChange={(e) => updateRouteField(route.id, 'acqType', e.value)} 
                                      checked={route.acqType === 'Department'} 
                                    />
                                    <label htmlFor={`acqTypeDept-${route.id}`} className="ml-1.5 text-xs font-bold cursor-pointer" style={{ color: '#475569' }}>Department</label>
                                  </div>
                                </div>
                              </div>

                              {/* 2. Owner / Department Name Input or Dropdown */}
                              <div className="flex flex-column gap-2">
                                <label className="text-10px font-bold uppercase tracking-wider" style={{ color: '#64748b', whiteSpace: 'nowrap' }}>Owner / Department</label>
                                {route.acqType === 'Individual' ? (
                                  <InputText 
                                    value={route.ownerName || ''} 
                                    disabled={route.status === 'Secured'}
                                    onChange={(e) => updateRouteField(route.id, 'ownerName', e.target.value)} 
                                    placeholder="Owner / In-charge name" 
                                    className="p-inputtext-sm font-semibold w-full" 
                                    style={{ height: '40px', borderRadius: '8px' }}
                                  />
                                ) : (
                                  <Dropdown 
                                    value={route.ownerName || 'PWD'} 
                                    options={departments} 
                                    disabled={route.status === 'Secured'}
                                    onChange={(e) => updateRouteField(route.id, 'ownerName', e.value)} 
                                    placeholder="Select Agency" 
                                    className="p-inputtext-sm font-semibold w-full align-items-center" 
                                    style={{ height: '40px', borderRadius: '8px' }}
                                  />
                                )}
                              </div>

                              {/* 3. Vehicle Plate Registration Number */}
                              <div className="flex flex-column gap-2">
                                <label className="text-10px font-bold uppercase tracking-wider" style={{ color: '#64748b', whiteSpace: 'nowrap' }}>Registered Plate No</label>
                                <InputText 
                                  value={route.vehicleNo || ''} 
                                  disabled={route.status === 'Secured'}
                                  onChange={(e) => updateRouteField(route.id, 'vehicleNo', e.target.value)} 
                                  placeholder="MP04-XX-XXXX" 
                                  className="p-inputtext-sm font-semibold w-full" 
                                  style={{ height: '40px', borderRadius: '8px' }}
                                />
                              </div>

                              {/* 4. Officer Name */}
                              <div className="flex flex-column gap-2">
                                <label className="text-10px font-bold uppercase tracking-wider" style={{ color: '#64748b', whiteSpace: 'nowrap' }}>Officer Name</label>
                                <InputText 
                                  value={route.officerName || ''} 
                                  disabled={route.status === 'Secured'}
                                  onChange={(e) => updateRouteField(route.id, 'officerName', e.target.value)} 
                                  placeholder="Assigned Officer Name" 
                                  className="p-inputtext-sm font-semibold w-full" 
                                  style={{ height: '40px', borderRadius: '8px' }}
                                />
                              </div>

                              {/* 5. Bank Account Number */}
                              <div className="flex flex-column gap-2" style={{ gridColumn: 'span 2' }}>
                                <label className="text-10px font-bold uppercase tracking-wider" style={{ color: '#64748b', whiteSpace: 'nowrap' }}>Bank Account No</label>
                                <InputText 
                                  value={route.bankAccNo || ''} 
                                  disabled={route.status === 'Secured'}
                                  onChange={(e) => updateRouteField(route.id, 'bankAccNo', e.target.value)} 
                                  placeholder="Enter Bank Account Number" 
                                  className="p-inputtext-sm font-semibold w-full" 
                                  style={{ height: '40px', borderRadius: '8px' }}
                                />
                              </div>

                              {/* 6. Bank IFSC Code */}
                              <div className="flex flex-column gap-2">
                                <label className="text-10px font-bold uppercase tracking-wider" style={{ color: '#64748b', whiteSpace: 'nowrap' }}>Bank IFSC Code</label>
                                <InputText 
                                  value={route.ifscCode || ''} 
                                  disabled={route.status === 'Secured'}
                                  onChange={(e) => updateRouteField(route.id, 'ifscCode', e.target.value)} 
                                  placeholder="SBIN0XXXXXX" 
                                  className="p-inputtext-sm font-semibold w-full" 
                                  style={{ height: '40px', borderRadius: '8px' }}
                                />
                              </div>

                              {/* 7. Confirm or Edit Details Button */}
                              <div className="flex flex-column gap-2 justify-content-end h-full">
                                <span className="text-10px font-bold uppercase tracking-wider" style={{ visibility: 'hidden', color: '#64748b' }}>Action</span>
                                {isPending ? (
                                  <Button 
                                    label="Confirm" 
                                    icon="pi pi-check" 
                                    className="p-button-sm p-button-success w-full font-bold"
                                    style={{ 
                                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
                                      border: 'none',
                                      height: '40px',
                                      borderRadius: '8px',
                                      boxShadow: '0 4px 10px rgba(16, 185, 129, 0.2)'
                                    }}
                                    onClick={() => handleConfirmRoute(route)} 
                                  />
                                ) : (
                                  <Button 
                                    label="Edit Details" 
                                    icon="pi pi-pencil" 
                                    className="p-button-sm p-button-outlined p-button-secondary w-full font-bold text-slate-600 hover:bg-slate-50"
                                    style={{ 
                                      height: '40px',
                                      borderRadius: '8px',
                                      borderColor: '#cbd5e1'
                                    }}
                                    onClick={() => handleUnlockRoute(route)} 
                                  />
                                )}
                              </div>

                            </div>

                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>



      </div>

    </div>
  );
}

/* ----------------------------------------------------
   3. VEHICLE ALLOCATION SCREEN
---------------------------------------------------- */
export function VehicleAllocation({ onNext }) {
  const toast = useRef(null);

  // Sector Data with routes, booths, checkpoints and pre-allocated/assigned vehicle type
  const [sectors, setSectors] = useState([
    {
      id: 'sec-01',
      name: 'Sector-01',
      officer: 'Dr. Vivek Saxena',
      routes: [
        {
          id: 'route-sar-01-r1',
          name: 'Route 1',
          pathName: 'Betul to Sawli',
          vehicleType: 'Loading van',
          vehicleNo: 'MP04-CE-1025',
          checkpoints: ['Checkpost NH-12', 'Sarangpur Toll Naka'],
          booths: [
            { boothNumber: '101', villageName: 'Barkhera', sthanBhawan: 'Govt. Primary School Room 1' },
            { boothNumber: '102', villageName: 'Khajuri', sthanBhawan: 'Anganwadi Kendra Center' },
            { boothNumber: '105', villageName: 'Misrod', sthanBhawan: 'Community Center East Wing' },
            { boothNumber: '108', villageName: 'Habibganj', sthanBhawan: 'Railway Colony School' },
            { boothNumber: '111', villageName: 'Gandhinagar', sthanBhawan: 'Primary Health Subcenter' }
          ]
        },
        {
          id: 'route-sar-01-r2',
          name: 'Route 2',
          pathName: 'Multai to Amla',
          vehicleType: 'Car',
          vehicleNo: '',
          checkpoints: ['Phanda Railway Crossing'],
          booths: [
            { boothNumber: '103', villageName: 'Phanda', sthanBhawan: 'Panchayat Bhawan Main Hall' },
            { boothNumber: '104', villageName: 'Ratibad', sthanBhawan: 'Govt. Middle School Room 2' },
            { boothNumber: '106', villageName: 'Govindpura', sthanBhawan: 'Govt. High School Hall' },
            { boothNumber: '107', villageName: 'Kolar', sthanBhawan: 'Municipal Office Room 3' },
            { boothNumber: '109', villageName: 'Bairagarh', sthanBhawan: 'Civil Hospital Main Lounge' },
            { boothNumber: '110', villageName: 'Awadhpuri', sthanBhawan: 'Panchayat Office Lounge' }
          ]
        },
        {
          id: 'route-sar-01-r3',
          name: 'Route 3',
          pathName: 'Sarangpur to Khajuri',
          vehicleType: 'Bus',
          vehicleNo: '',
          checkpoints: ['Karond Bypass Gate'],
          booths: [
            { boothNumber: '112', villageName: 'Karond', sthanBhawan: 'Govt. Boys School Room 1' },
            { boothNumber: '113', villageName: 'Nishatpura', sthanBhawan: 'Railway Community Hall' },
            { boothNumber: '114', villageName: 'Jahangirabad', sthanBhawan: 'Govt. Girls Higher Sec School' }
          ]
        },
        {
          id: 'route-sar-01-r4',
          name: 'Route 4',
          pathName: 'Vitran HQ to Phanda',
          vehicleType: 'Car',
          vehicleNo: '',
          checkpoints: ['Primary Health Center Checkpoint'],
          booths: [
            { boothNumber: '115', villageName: 'Chola', sthanBhawan: 'Primary Health Center Annex' },
            { boothNumber: '116', villageName: 'Ayodhya Bypass', sthanBhawan: 'Panchayat Hall Room 1' }
          ]
        }
      ]
    },
    {
      id: 'sec-02',
      name: 'Sector-02',
      officer: 'Shri Manoj Agrawal',
      routes: [
        {
          id: 'route-sar-02-r1',
          name: 'Route 1',
          vehicleType: 'Car',
          vehicleNo: 'MP04-CE-1007',
          checkpoints: ['Pachore Town Barrier'],
          booths: [
            { boothNumber: '201', villageName: 'Pachore Town Center', sthanBhawan: 'Govt. Boys High School' },
            { boothNumber: '203', villageName: 'Sujalpur Crossing', sthanBhawan: 'Govt. Middle School' },
            { boothNumber: '204', villageName: 'Kankariya', sthanBhawan: 'Primary Health Center' }
          ]
        },
        {
          id: 'route-sar-02-r2',
          name: 'Route 2',
          vehicleType: 'Bus',
          vehicleNo: '',
          checkpoints: ['Bhayana Road Bridge'],
          booths: [
            { boothNumber: '202', villageName: 'Bhayana', sthanBhawan: 'Panchayat Hall' },
            { boothNumber: '205', villageName: 'Pipalya', sthanBhawan: 'Govt. Primary School' }
          ]
        }
      ]
    },
    {
      id: 'sec-03',
      name: 'Sector-03',
      officer: 'Smt. Anjali Sharma',
      routes: [
        {
          id: 'route-sar-03-r1',
          name: 'Route 1',
          vehicleType: 'Bus',
          vehicleNo: '',
          checkpoints: ['Fort Entrance Post'],
          booths: [
            { boothNumber: '301', villageName: 'Narsinghgarh Kila', sthanBhawan: 'Govt. High School Near Fort' },
            { boothNumber: '302', villageName: 'Talab Chowk', sthanBhawan: 'Community Hall Room 2' },
            { boothNumber: '303', villageName: 'Chhapra', sthanBhawan: 'Panchayat Bhawan' }
          ]
        }
      ]
    },
    {
      id: 'sec-04',
      name: 'Sector-04',
      officer: 'Shri R. C. Patel',
      routes: [
        {
          id: 'route-sar-04-r1',
          name: 'Route 1',
          vehicleType: 'Car',
          vehicleNo: '',
          checkpoints: ['Ghatia Village Outpost'],
          booths: [
            { boothNumber: '401', villageName: 'Ghatia', sthanBhawan: 'Govt. Primary School Ghatia' }
          ]
        }
      ]
    }
  ]);

  // Dynamic helper to intermix booths and checkpoints in chronological sequence
  const getIntermixedTimeline = (route) => {
    const timeline = [];
    const booths = route.booths || [];
    const cps = route.checkpoints || [];
    
    booths.forEach((booth, idx) => {
      timeline.push({
        type: 'booth',
        id: booth.boothNumber,
        label: `Booth ${booth.boothNumber} • ${booth.villageName}`,
        sublabel: booth.sthanBhawan
      });
      
      // Inject checkpoints chronologically in-between booths
      if (cps.length === 1 && idx === 1) {
        timeline.push({
          type: 'checkpoint',
          id: `cp-${idx}`,
          label: cps[0],
          sublabel: 'Transit Checkpost'
        });
      } else if (cps.length > 1) {
        if (idx === 0) {
          timeline.push({
            type: 'checkpoint',
            id: `cp-0`,
            label: cps[0],
            sublabel: 'Transit Checkpost'
          });
        } else if (idx === 2 && cps[1]) {
          timeline.push({
            type: 'checkpoint',
            id: `cp-1`,
            label: cps[1],
            sublabel: 'Transit Checkpost'
          });
        }
      }
    });
    return timeline;
  };

  // Expanded routes dictionary state (routeId -> boolean)
  const [expandedRoutes, setExpandedRoutes] = useState({
    'route-sar-01-r1': true // Expand first route by default
  });

  const toggleRouteExpand = (routeId) => {
    setExpandedRoutes(prev => ({
      ...prev,
      [routeId]: !prev[routeId]
    }));
  };

  // List of Acquired Vehicles from RTO acquisition portal (with Owner Name and Mobile details)
  const acquiredVehicles = [
    { label: 'MP04-CE-1007 (SUV Innova - Rakesh Sharma)', value: 'MP04-CE-1007', type: 'Car', ownerName: 'Rakesh Sharma', ownerMobile: '+91 94250 12345' },
    { label: 'MP04-CE-1025 (Tata Ace - PWD Dept)', value: 'MP04-CE-1025', type: 'Loading van', ownerName: 'PWD (Public Works Dept)', ownerMobile: '+91 75527 68212' },
    { label: 'MP04-CE-1033 (Eicher Bus - Anand Travels)', value: 'MP04-CE-1033', type: 'Bus', ownerName: 'Anand Travels Ltd.', ownerMobile: '+91 98260 55431' },
    { label: 'MP04-CE-1045 (Bolero SUV - Municipal Pool)', value: 'MP04-CE-1045', type: 'Car', ownerName: 'Municipal Corporation Pool', ownerMobile: '+91 75525 50011' },
    { label: 'MP04-CE-1052 (Tata Bus - Rajgarh Transports)', value: 'MP04-CE-1052', type: 'Bus', ownerName: 'Rajgarh Transports Co.', ownerMobile: '+91 88179 43210' }
  ];

  // Selector functions to handle drop-down vehicle matches
  const handleAssignVehicle = (sectorId, routeId, vehicleNo) => {
    const updatedSectors = sectors.map(sec => {
      if (sec.id === sectorId) {
        return {
          ...sec,
          routes: sec.routes.map(r => r.id === routeId ? { ...r, vehicleNo } : r)
        };
      }
      return sec;
    });
    setSectors(updatedSectors);

    if (vehicleNo) {
      const v = acquiredVehicles.find(av => av.value === vehicleNo);
      toast.current.show({
        severity: 'success',
        summary: 'Vehicle Linked',
        detail: `Linked ${vehicleNo} (${v ? v.ownerName : 'Unknown'}) successfully.`,
        life: 3000
      });
    } else {
      toast.current.show({
        severity: 'info',
        summary: 'Vehicle Unlinked',
        detail: `Cleared vehicle allocation.`,
        life: 2000
      });
    }
  };

  // Helper icons for vehicle types
  const getVehicleIcon = (type) => {
    switch (type) {
      case 'Bus': return 'pi pi-truck';
      case 'Car': return 'pi pi-car';
      case 'Loading van': return 'pi pi-shopping-bag';
      default: return 'pi pi-car';
    }
  };

  // Check if a route is fully assigned
  const getSectorProgress = (sec) => {
    const total = sec.routes.length;
    const completed = sec.routes.filter(r => r.vehicleNo).length;
    return { total, completed, percent: Math.round((completed / total) * 100) };
  };

  // Target Sector Progress metrics (Sector Officer manages Sector-01)
  const targetSector = sectors[0];
  const { completed: allocatedRoutes, total: totalRoutes, percent: globalProgress } = getSectorProgress(targetSector);

  const handleSaveAllocations = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Allocations Saved',
      detail: `Successfully verified all ${allocatedRoutes}/${totalRoutes} routes. Proceeding to active logs...`,
      life: 3000
    });
    setTimeout(() => {
      onNext('transit-log');
    }, 1000);
  };

  return (
    <div className="grid animate-fade-in">
      <Toast ref={toast} />

      {/* Top Header Panel */}
      <div className="col-12 flex align-items-center justify-content-between mb-2">
        <div>
          <h2 className="m-0 font-bold gradient-text text-3xl">Vehicle Route Allocation</h2>
          <p className="text-slate-500 m-0 mt-1 text-sm font-medium">Link specific registered vehicles and driver log tags to designated Sector Officer routes.</p>
        </div>
        
        {/* Global Progress Pill */}
        <div className="flex align-items-center gap-3 bg-white px-3.5 py-2 border-round-xl border-1 border-slate-200 shadow-2xs">
          <div className="flex flex-column align-items-end gap-0.5">
            <span className="text-10px font-extrabold text-slate-400 uppercase tracking-wider">Overall Allocation</span>
            <span className="text-xs font-extrabold text-slate-700">{allocatedRoutes} of {totalRoutes} Routes Bound</span>
          </div>
          <div className="border-circle bg-indigo-50 flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', border: '1.5px solid #c7d2fe' }}>
            <span className="text-indigo-700 text-xs font-bold">{globalProgress}%</span>
          </div>
        </div>
      </div>

      {/* Sector Officer Banner */}
      <div className="col-12 mb-3 mt-2">
        <div className="bg-white p-3 border-round-xl shadow-2xs border-1 border-slate-200 flex align-items-center justify-content-between">
          <div className="flex align-items-center gap-3">
            {/* Round Avatar Icon representing Sector */}
            <div 
              className="flex align-items-center justify-content-center border-circle font-bold text-xs" 
              style={{ 
                width: '38px', 
                height: '38px',
                background: globalProgress === 100 ? '#ecfdf5' : '#fef2f2',
                color: globalProgress === 100 ? '#047857' : '#991b1b',
                border: globalProgress === 100 ? '1px solid #a7f3d0' : '1px solid #fca5a5'
              }}
            >
              S01
            </div>
            <div className="flex flex-column gap-0.5">
              <span className="font-extrabold text-slate-800 text-sm">Sector-01 Allocation Control</span>
              <span className="text-11px font-medium text-slate-500">
                Assigned Officer: <span className="font-bold text-slate-700">Dr. Vivek Saxena</span>
              </span>
            </div>
          </div>
          <div className="flex align-items-center gap-2">
            <span 
              className="text-10px px-2.5 py-1 border-round-pill font-bold flex align-items-center gap-1"
              style={{ 
                background: globalProgress === 100 ? '#ecfdf5' : '#fef2f2', 
                color: globalProgress === 100 ? '#047857' : '#991b1b', 
                border: globalProgress === 100 ? '1px solid #a7f3d0' : '1px solid #fca5a5' 
              }}
            >
              {globalProgress === 100 ? (
                <>
                  <i className="pi pi-verified text-10px"></i>
                  100% Bound
                </>
              ) : (
                <>
                  <i className="pi pi-clock text-10px animate-pulse"></i>
                  {allocatedRoutes} of {totalRoutes} Bound
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Route Cards Container */}
      <div className="col-12 flex flex-column gap-3">
        <div 
          className="flex gap-4 overflow-x-auto pb-4 pt-1 hide-scrollbar scroll-smooth w-full p-fluid"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            flexFlow: 'row nowrap'
          }}
        >
          {targetSector.routes.map((route) => {
            const isAssigned = !!route.vehicleNo;
            const matchedVehicle = isAssigned ? acquiredVehicles.find(v => v.value === route.vehicleNo) : null;
            const isExpandedRoute = !!expandedRoutes[route.id];

            return (
              <div 
                key={route.id} 
                className="animate-fade-in flex-shrink-0"
                style={{ width: '380px' }}
              >
                <Card 
                  className="glass-panel" 
                  style={{ 
                    borderTop: isAssigned ? '6px solid #10b981' : '6px solid #ef4444',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  title={
                    <div className="flex flex-column pb-2 border-bottom-1 border-slate-100" style={{ borderBottom: '1px solid #f1f5f9', gap: '6px' }}>
                      <div className="flex justify-content-between align-items-center">
                        <span className="text-base font-bold text-slate-800 flex align-items-center">
                          <div 
                            className="flex align-items-center justify-content-center border-circle flex-shrink-0 font-bold"
                            style={{
                              width: '32px',
                              height: '32px',
                              backgroundColor: isAssigned ? '#ecfdf5' : '#fff5f5',
                              color: isAssigned ? '#10b981' : '#ef4444',
                              border: isAssigned ? '1.5px solid #a7f3d0' : '1.5px solid #fca5a5',
                              fontSize: '11px',
                              marginRight: '10px'
                            }}
                          >
                            {route.name.replace('Route ', 'R')}
                          </div>
                          {route.name}: {route.pathName}
                        </span>
                        <span 
                          className="text-10px font-extrabold py-1 border-round uppercase tracking-wider text-center flex align-items-center"
                          style={{ 
                            backgroundColor: '#e0e7ff', 
                            color: '#4338ca', 
                            border: '1px solid #c7d2fe', 
                            borderRadius: '4px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            paddingLeft: '10px',
                            paddingRight: '10px',
                            width: 'fit-content'
                          }}
                        >
                          <i className={getVehicleIcon(route.vehicleType)} style={{ fontSize: '11px' }}></i>
                          {route.vehicleType}
                        </span>
                      </div>
                    </div>
                  }
                >
                  <div className="flex flex-column gap-3 mt-1">
                    
                    {/* Registered Plate No Dropdown */}
                    <div 
                      className="field col-12 p-0 m-0 flex flex-column gap-2 mb-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <label className="text-10px font-extrabold uppercase tracking-wider text-slate-400" style={{ whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>Registered Plate No</label>
                      <Dropdown 
                        value={route.vehicleNo} 
                        options={acquiredVehicles} 
                        onChange={(e) => handleAssignVehicle(targetSector.id, route.id, e.value)} 
                        placeholder="Choose Acquired ID Tag" 
                        showClear={isAssigned}
                        className="p-inputtext-sm font-semibold w-full"
                        style={{ height: '40px', borderRadius: '8px' }}
                      />
                    </div>

                    {/* Vehicle Owner Details */}
                    <div className="field col-12 p-0 m-0 flex flex-column gap-2 mb-2">
                      <label className="text-10px font-extrabold uppercase tracking-wider text-slate-400" style={{ whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>Vehicle Owner Name</label>
                      {isAssigned && matchedVehicle ? (
                        <div 
                          className="flex align-items-center px-3 bg-white border-round-lg border-1 border-slate-200 animate-fade-in"
                          style={{ 
                            height: '40px', 
                            borderColor: '#10b981',
                            backgroundColor: '#ffffff',
                            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
                            gap: '8px'
                          }}
                        >
                          <i className="pi pi-user text-green-600 text-sm"></i>
                          <span className="text-xs font-bold text-slate-700 truncate" title={matchedVehicle.ownerName}>
                            {matchedVehicle.ownerName}
                          </span>
                        </div>
                      ) : (
                        <div 
                          className="flex align-items-center px-3 border-round-lg border-1 border-dashed border-slate-300 bg-slate-50/50"
                          style={{ 
                            height: '40px', 
                            color: '#94a3b8',
                            gap: '8px'
                          }}
                        >
                          <i className="pi pi-user-minus text-slate-400 text-sm"></i>
                          <span className="text-xs font-medium italic">Allocation Pending</span>
                        </div>
                      )}
                    </div>

                    {/* Premium horizontal Divider and trigger */}
                    <div className="flex justify-content-between align-items-center py-2 border-top-1 mt-1" style={{ borderTop: '1px solid #f1f5f9' }}>
                      <span className="text-xs font-bold text-slate-500 flex align-items-center" style={{ gap: '6px', whiteSpace: 'nowrap' }}>
                        <i className="pi pi-compass text-indigo-500 text-sm"></i>Route Details
                      </span>
                      <Button 
                        label={isExpandedRoute ? "Hide Details" : "Show Details"}
                        icon={isExpandedRoute ? "pi pi-chevron-up" : "pi pi-chevron-down"} 
                        className="p-button-text p-button-sm font-bold text-indigo-600 hover:bg-indigo-50"
                        style={{ padding: '4px 10px', fontSize: '12px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRouteExpand(route.id);
                        }}
                      />
                    </div>

                    {/* Collapsible drawer content area inside card */}
                    {isExpandedRoute && (
                      <div className="flex flex-column gap-3 mt-1 animate-fade-in p-3 border-round-xl border-1" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                        
                        {/* Dynamic Chronological Route Sequence Timeline */}
                        <div className="flex flex-column gap-2">
                          <span className="text-10px font-extrabold uppercase tracking-wider text-slate-400 flex align-items-center gap-2 mb-3 pb-2 border-bottom-1" style={{ borderBottom: '1px solid #e2e8f0', letterSpacing: '0.05em' }}>
                            <i className="pi pi-list text-indigo-500"></i>Chronological Route Timeline ({getIntermixedTimeline(route).length})
                          </span>
                          
                          <div 
                            className="flex flex-column overflow-y-auto pr-1 hide-scrollbar scroll-smooth relative pl-3" 
                            style={{ 
                              maxHeight: '220px', 
                              borderLeft: '1px dashed #cbd5e1', 
                              marginLeft: '6px', 
                              paddingLeft: '14px',
                              scrollbarWidth: 'none'
                            }}
                          >
                            {getIntermixedTimeline(route).map((item, itemIdx) => {
                              const isBooth = item.type === 'booth';
                              
                              return (
                                <div key={item.id} className="relative flex flex-column gap-1 pl-3 mb-4 animate-fade-in text-xs text-slate-700">
                                  {/* Custom bullet styling */}
                                  <span 
                                    className="absolute border-circle"
                                    style={{ 
                                      left: '-17px', 
                                      top: isBooth ? '5px' : '8px', 
                                      width: '6px', 
                                      height: '6px', 
                                      backgroundColor: isBooth ? (isAssigned ? '#10b981' : '#6366f1') : '#f97316'
                                    }}
                                  ></span>
                                  
                                  {/* Text details */}
                                  {isBooth ? (
                                    <div className="flex flex-column gap-0.5">
                                      <span className="font-extrabold text-slate-800 text-11px leading-normal">
                                        {item.label}
                                      </span>
                                      <span className="text-slate-500 font-medium text-9px block mt-0.5">
                                        {item.sublabel}
                                      </span>
                                    </div>
                                  ) : (
                                    <div className="flex flex-column">
                                      <span 
                                        className="font-bold text-10px flex align-items-center gap-1.5 w-fit" 
                                        style={{ 
                                          background: '#fff7ed', 
                                          color: '#c2410c', 
                                          border: '1px solid #ffedd5', 
                                          padding: '3px 8px', 
                                          borderRadius: '6px' 
                                        }}
                                      >
                                        <i className="pi pi-flag text-10px text-orange-500"></i>
                                        {item.label}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                      </div>
                    )}

                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>


      {/* Proceed actions */}
      <div className="col-12 mt-4 p-0">
        <Card className="glass-panel flex align-items-center justify-content-between p-2 shadow-sm">
          <div className="flex flex-column gap-1">
            <span className="text-xs text-slate-500 font-medium">Verify that each sector route has been matched to an active RTO tag before releasing keys.</span>
            <span className="text-xs text-green-600 font-bold"><i className="pi pi-lock-open mr-1"></i>Security State: Forward Dispatch Roster Ready</span>
          </div>
          <Button
            label="Save Allocations & Proceed to Logs"
            icon="pi pi-arrow-right"
            className="p-button-primary p-button-lg px-4 py-3"
            onClick={handleSaveAllocations}
            style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)', border: 'none' }}
          />
        </Card>
      </div>

    </div>
  );
}

/* ----------------------------------------------------
   4. TRANSIT LOG SCREEN
---------------------------------------------------- */
export function TransitLog({ onNext }) {
  const toast = useRef(null);
  const [driverName, setDriverName] = useState('Kamlesh Solanki');
  const [driverLicense, setDriverLicense] = useState('DL-04-2021008892');
  const [peethaseenName, setPeethaseenName] = useState('Shri S. K. Dwivedi (PO-1)');

  const logRecords = [
    { date: '2026-05-27', time: '08:00', start: 'RO HQ Office', lastBooth: 'Starting HQ', milometer: '12,450 km', reason: 'Initial Deployment Rollout' },
    { date: '2026-05-27', time: '09:30', start: 'Sarangpur Village', lastBooth: 'Booth 101', milometer: '12,455 km', reason: 'EVM Machine Safe Verification' },
    { date: '2026-05-27', time: '11:00', start: 'Khilchipur Village', lastBooth: 'Booth 102', milometer: '12,463 km', reason: 'Mock Poll Verification Audit' }
  ];

  const handleDscSign = () => {
    toast.current.show({ severity: 'success', summary: 'DSC Signed Successfully', detail: 'Returning Officer (RO) digital certificate verified and sealed. Log Locked.', life: 4000 });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid animate-fade-in">
      <Toast ref={toast} />
      <div className="col-12 flex align-items-center justify-content-between mb-2">
        <div>
          <h2 className="m-0 font-bold gradient-text text-3xl">Active Transit Log (Trip Sheet)</h2>
          <p className="text-slate-500 m-0 mt-1 text-sm font-medium">Real-time logbook tracking EVM distribution transits, milometer readings, and sector checkpoints.</p>
        </div>
        <div className="flex gap-2">
          <Button label="Print Trip Log" icon="pi pi-print" className="p-button-outlined" onClick={handlePrint} />
          <Button label="Sign with DSC" icon="pi pi-key" className="p-button-success" onClick={handleDscSign} />
        </div>
      </div>

      <div className="col-12">
        <Card className="glass-panel mb-4" title={<span className="text-base font-bold text-slate-700"><i className="pi pi-id-card mr-2 text-primary"></i>Transit Personnel Credentials</span>}>
          <div className="p-fluid grid">
            <div className="field col-12 md:col-4">
              <label className="font-semibold text-sm text-slate-600 block mb-2">Driver Name</label>
              <InputText value={driverName} onChange={(e) => setDriverName(e.target.value)} />
            </div>
            <div className="field col-12 md:col-4">
              <label className="font-semibold text-sm text-slate-600 block mb-2">Driver License ID</label>
              <InputText value={driverLicense} onChange={(e) => setDriverLicense(e.target.value)} />
            </div>
            <div className="field col-12 md:col-4">
              <label className="font-semibold text-sm text-slate-600 block mb-2">Peethaseen Adhikari (Presiding Officer)</label>
              <InputText value={peethaseenName} onChange={(e) => setPeethaseenName(e.target.value)} />
            </div>
          </div>
        </Card>

        <Card className="glass-panel" title={<span className="text-base font-bold text-slate-700"><i className="pi pi-map mr-2 text-primary"></i>Chronological GPS Checkpoint Logbook</span>}>
          <DataTable value={logRecords} className="p-datatable-sm" responsiveLayout="scroll">
            <Column field="date" header="Date"></Column>
            <Column field="time" header="Hour / Time"></Column>
            <Column field="start" header="Current Station Location"></Column>
            <Column field="lastBooth" header="Last Visited Booth" body={(r) => <span className="font-bold text-indigo-600">{r.lastBooth}</span>}></Column>
            <Column field="milometer" header="Milometer Reading" body={(r) => <span className="font-semibold text-slate-700">{r.milometer}</span>}></Column>
            <Column field="reason" header="Operational Travel Reason"></Column>
          </DataTable>

          <div className="flex justify-content-end mt-4">
            <Button label="Proceed to Release Verification" icon="pi pi-arrow-right" className="px-4 py-2" onClick={() => onNext('vehicle-release')} />
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   5. VEHICLE RELEASE SCREEN
---------------------------------------------------- */
export function VehicleRelease() {
  const toast = useRef(null);
  const [endMilometer, setEndMilometer] = useState('12510');
  const [fuelLevel, setFuelLevel] = useState('Quarter Tank');

  const handleDscRelease = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Vehicle Release Signed',
      detail: 'Final release certificate cryptographically sealed by RO (DSC). Vehicle dispatched back to pool.',
      life: 5000
    });
  };

  return (
    <div className="grid animate-fade-in">
      <Toast ref={toast} />
      <div className="col-12 flex align-items-center justify-content-between mb-2">
        <div>
          <h2 className="m-0 font-bold gradient-text text-3xl">Vehicle Release Summary</h2>
          <p className="text-slate-500 m-0 mt-1 text-sm font-medium">Verify final milometer mileage, validate remaining diesel levels, and issue the DSC release voucher.</p>
        </div>
      </div>

      <div className="col-12 md:col-6">
        <Card className="glass-panel h-full" title={<span className="text-base font-bold text-slate-700"><i className="pi pi-calculator mr-2 text-primary"></i>Final Return Log Measurements</span>}>
          <div className="p-fluid grid">
            <div className="field col-12">
              <label className="font-semibold text-sm text-slate-600 block mb-2">Final Milometer Reading (km)</label>
              <InputText value={endMilometer} onChange={(e) => setEndMilometer(e.target.value)} placeholder="Enter reading on vehicle key return" />
            </div>
            <div className="field col-12">
              <label className="font-semibold text-sm text-slate-600 block mb-2">Remaining Fuel Level Status</label>
              <Dropdown
                value={fuelLevel}
                options={[
                  { label: 'Full Tank', value: 'Full Tank' },
                  { label: 'Half Tank', value: 'Half Tank' },
                  { label: 'Quarter Tank', value: 'Quarter Tank' },
                  { label: 'Reserve / Empty', value: 'Reserve' }
                ]}
                onChange={(e) => setFuelLevel(e.value)}
              />
            </div>
          </div>
        </Card>
      </div>

      <div className="col-12 md:col-6">
        <Card className="glass-panel h-full flex flex-column justify-content-between" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #311042 100%)', color: '#f8fafc' }} title={<span className="text-base font-bold text-slate-200"><i className="pi pi-key mr-2 text-indigo-400"></i>Digital Release Authorization</span>}>
          <div>
            <h4 className="text-indigo-200 font-bold text-lg m-0 mb-3"><i className="pi pi-verified mr-2"></i>RO Release Validation Certificate</h4>
            <p className="text-xs text-indigo-300 leading-relaxed m-0 mb-4">
              Upon submitting, the Return Officer registers that all EVM materials have been securely placed in the administrative strongroom. 
              The system calculates a net travel range of <span className="font-bold text-white">60 km</span>. The vehicle is released from national poll duty immediately.
            </p>
          </div>
          <div className="pt-3">
            <Button
              label="Sign with DSC & Release Vehicle"
              icon="pi pi-check-circle"
              className="p-button-success w-full py-3"
              onClick={handleDscRelease}
              style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none' }}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   6. FUEL STATION ASSIGNMENT SCREEN
---------------------------------------------------- */
export function FuelStationAssignment({ onNext }) {
  const toast = useRef(null);
  
  const blocks = [
    'Dhar', 'Badnawar', 'Sardarpur', 'Kukshi', 'Gandhwani', 
    'Manawar', 'Dharampuri', 'Nisarpur', 'Nalchha', 'Tirla', 
    'Dahi', 'Umarban', 'Bagh'
  ];

  const [selectedBlock, setSelectedBlock] = useState('Dhar');
  const [stationName, setStationName] = useState('');
  const [stationAddress, setStationAddress] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAccNo, setBankAccNo] = useState('');
  const [ifscCode, setIfscCode] = useState('');

  // Initial mock stations per block to demonstrate the system working immediately
  const [fuelStations, setFuelStations] = useState({
    'Dhar': [
      { id: 'fs-dhar-1', name: 'Bharat Petroleum - Dhar Central', address: 'Indore-Ahmedabad Highway, Dhar', bankName: 'State Bank of India', bankAccNo: '30981012345', ifscCode: 'SBIN0003021', contactNo: '+91 94250 12345', status: 'Authorized' },
      { id: 'fs-dhar-2', name: 'Indian Oil - Mandu Crossing', address: 'Mandu Road, Dhar Rural', bankName: 'Bank of Baroda', bankAccNo: '085401000213', ifscCode: 'BARB0DHARXX', contactNo: '+91 98930 67890', status: 'Authorized' }
    ],
    'Badnawar': [
      { id: 'fs-bad-1', name: 'HP Fuel Oasis - Badnawar Town', address: 'Main Bazar, Badnawar', bankName: 'Punjab National Bank', bankAccNo: '401200150004', ifscCode: 'PUNB0401200', contactNo: '+91 73120 45678', status: 'Authorized' }
    ],
    'Sardarpur': [
      { id: 'fs-sar-1', name: 'Balaji Fuels - Sardarpur', address: 'Rajgarh Road, Sardarpur', bankName: 'State Bank of India', bankAccNo: '30554012901', ifscCode: 'SBIN0001254', contactNo: '+91 94254 99112', status: 'Authorized' }
    ],
    'Kukshi': [
      { id: 'fs-kuk-1', name: 'Narmada Fuel Depot', address: 'Kukshi Bypass Road, Kukshi', bankName: 'HDFC Bank', bankAccNo: '5010022340561', ifscCode: 'HDFC0001824', contactNo: '+91 98260 11223', status: 'Authorized' }
    ]
  });

  const blockStations = fuelStations[selectedBlock] || [];

  const handleAddStation = () => {
    if (!stationName.trim()) {
      toast.current.show({ severity: 'error', summary: 'Validation Failed', detail: 'Please enter Fuel Station Name.', life: 3000 });
      return;
    }
    if (!stationAddress.trim()) {
      toast.current.show({ severity: 'error', summary: 'Validation Failed', detail: 'Please enter Fuel Station Address.', life: 3000 });
      return;
    }
    if (!contactNo.trim()) {
      toast.current.show({ severity: 'error', summary: 'Validation Failed', detail: 'Please enter Fuel Station Contact Number.', life: 3000 });
      return;
    }
    if (!bankName.trim()) {
      toast.current.show({ severity: 'error', summary: 'Validation Failed', detail: 'Please enter Bank Name.', life: 3000 });
      return;
    }
    if (!bankAccNo.trim()) {
      toast.current.show({ severity: 'error', summary: 'Validation Failed', detail: 'Please enter Bank Account Number.', life: 3000 });
      return;
    }
    if (!ifscCode.trim()) {
      toast.current.show({ severity: 'error', summary: 'Validation Failed', detail: 'Please enter Bank IFSC Code.', life: 3000 });
      return;
    }

    const newStation = {
      id: `fs-${selectedBlock.toLowerCase().slice(0, 3)}-${Date.now()}`,
      name: stationName,
      address: stationAddress,
      contactNo: contactNo,
      bankName: bankName,
      bankAccNo: bankAccNo,
      ifscCode: ifscCode,
      status: 'Authorized'
    };

    setFuelStations(prev => ({
      ...prev,
      [selectedBlock]: [...(prev[selectedBlock] || []), newStation]
    }));

    // Reset Form Fields
    setStationName('');
    setStationAddress('');
    setContactNo('');
    setBankName('');
    setBankAccNo('');
    setIfscCode('');

    toast.current.show({
      severity: 'success',
      summary: 'Fuel Station Registered',
      detail: `Successfully assigned ${stationName} to ${selectedBlock} Block.`,
      life: 3000
    });
  };

  const handleDeleteStation = (stationId) => {
    setFuelStations(prev => ({
      ...prev,
      [selectedBlock]: (prev[selectedBlock] || []).filter(s => s.id !== stationId)
    }));

    toast.current.show({
      severity: 'info',
      summary: 'Station De-allocated',
      detail: 'Fuel station successfully removed from this block.',
      life: 2000
    });
  };

  const handleSaveAll = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Quota Broadcast Dispatched',
      detail: 'Authorized vehicle quotas and plate numbers successfully sent to all fuel station owners.',
      life: 4000
    });
    if (onNext) {
      setTimeout(() => onNext('route-planning'), 1500);
    }
  };

  return (
    <div className="grid animate-fade-in">
      <Toast ref={toast} />

      {/* Top Header Panel */}
      <div className="col-12 flex align-items-center justify-content-between mb-2">
        <div>
          <h2 className="m-0 font-bold gradient-text text-3xl">Fuel Station Assignment Portal</h2>
          <p className="text-slate-500 m-0 mt-1 text-sm font-medium">DEO Administrative Node • Assign block-wise authorized retail outlets and register reimbursement accounts.</p>
        </div>
      </div>

      {/* Block selection Tab Strip */}
      <div className="col-12 mb-3">
        <div 
          className="p-4 border-round-xl shadow-xs flex flex-column gap-3 bg-white border-1 border-slate-200"
          style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.015)' }}
        >
          <div className="flex align-items-center justify-content-between">
            <div className="flex align-items-center gap-2">
              <span className="w-2.5 h-2.5 border-circle bg-orange-500 inline-block animate-pulse" style={{ width: '8px', height: '8px', background: '#f97316' }}></span>
              <span className="font-extrabold text-xs uppercase tracking-widest text-slate-700" style={{ color: '#475569' }}>DEO Block Selector</span>
            </div>
            <span 
              className="text-10px font-extrabold border-round-pill px-3 py-1 border-1 border-slate-300 bg-slate-50 text-slate-700 animate-fade-in"
              style={{ border: '1px solid #cbd5e1' }}
            >
              {blocks.length} Blocks Available
            </span>
          </div>
          
          <div 
            className="flex gap-2 overflow-x-auto pb-2 px-1 hide-scrollbar" 
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              borderBottom: '1px solid #f1f5f9'
            }}
          >
            {blocks.map((block) => {
              const isActive = selectedBlock === block;
              const stationsCount = (fuelStations[block] || []).length;
              
              return (
                <button
                  key={block}
                  className="p-3 border-none cursor-pointer border-round-xl transition-all flex-shrink-0 flex flex-column justify-content-center text-left relative"
                  onClick={() => { setSelectedBlock(block); }}
                  style={{ 
                    position: 'relative',
                    outline: 'none',
                    width: '160px',
                    height: '72px',
                    background: isActive ? 'linear-gradient(135deg, #f97316 0%, #d97706 100%)' : '#f8fafc',
                    boxShadow: isActive ? '0 8px 20px rgba(249, 115, 22, 0.2)' : 'none',
                    border: isActive ? '1px solid #f97316' : '1px solid #e2e8f0',
                    transform: isActive ? 'translateY(-1px)' : 'none',
                    color: isActive ? '#ffffff' : '#334155'
                  }}
                >
                  {/* Numeric Circular Badge */}
                  {stationsCount > 0 && (
                    <span 
                      className="absolute flex align-items-center justify-content-center border-circle font-extrabold text-10px animate-fade-in"
                      style={{
                        top: '8px',
                        right: '8px',
                        width: '18px',
                        height: '18px',
                        background: isActive ? '#ffffff' : '#f97316',
                        color: isActive ? '#f97316' : '#ffffff',
                        border: isActive ? 'none' : '1px solid #ffedd5',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.08)'
                      }}
                    >
                      {stationsCount}
                    </span>
                  )}

                  <div className="flex flex-column gap-0.5 w-full">
                    <span className="font-extrabold text-xs flex align-items-center gap-2" style={{ color: isActive ? '#ffffff' : '#334155' }}>
                      <i className={`pi ${isActive ? 'pi-map-marker text-white animate-bounce' : 'pi-map text-slate-400'} text-xs`} style={{ marginRight: '6px' }}></i>
                      {block} Block
                    </span>
                    <span className="text-10px font-semibold" style={{ color: isActive ? '#fef3c7' : '#64748b' }}>
                      {stationsCount} Active Stations
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Two Column Split Layout */}
      <div className="col-12 lg:col-4 mb-4">
        {/* Left Side: Register New Outlet Card */}
        <Card 
          className="glass-panel border-top-3" 
          style={{ borderTop: '3px solid #f97316' }}
          title={
            <div className="flex align-items-center pb-2 border-bottom-1 border-slate-100" style={{ borderBottom: '1px solid #f1f5f9' }}>
              <i className="pi pi-plus-circle text-orange-500 mr-2.5 text-lg"></i>
              <span className="text-base font-bold text-slate-800">Register Fuel Station</span>
            </div>
          }
        >
          <div className="p-fluid flex flex-column gap-3 mt-2">
            <div className="field flex flex-column gap-1.5">
              <label className="text-xs font-bold text-slate-500">Fuel Station Name</label>
              <InputText 
                value={stationName} 
                onChange={(e) => setStationName(e.target.value)} 
                placeholder="E.g. Balaji Fuels" 
                className="p-inputtext-sm font-semibold"
                style={{ height: '40px', borderRadius: '8px' }}
              />
            </div>

            <div className="field flex flex-column gap-1.5">
              <label className="text-xs font-bold text-slate-500">Address / Location</label>
              <InputText 
                value={stationAddress} 
                onChange={(e) => setStationAddress(e.target.value)} 
                placeholder="E.g. Indore Highway, Dhar" 
                className="p-inputtext-sm font-semibold"
                style={{ height: '40px', borderRadius: '8px' }}
              />
            </div>

            <div className="field flex flex-column gap-1.5">
              <label className="text-xs font-bold text-slate-500">Contact Number</label>
              <InputText 
                value={contactNo} 
                onChange={(e) => setContactNo(e.target.value)} 
                placeholder="E.g. +91 94250 XXXXX" 
                className="p-inputtext-sm font-semibold"
                style={{ height: '40px', borderRadius: '8px' }}
              />
            </div>

            <div className="field flex flex-column gap-1.5">
              <label className="text-xs font-bold text-slate-500">Bank Name</label>
              <InputText 
                value={bankName} 
                onChange={(e) => setBankName(e.target.value)} 
                placeholder="E.g. State Bank of India" 
                className="p-inputtext-sm font-semibold"
                style={{ height: '40px', borderRadius: '8px' }}
              />
            </div>

            <div className="field flex flex-column gap-1.5">
              <label className="text-xs font-bold text-slate-500">Bank Account No</label>
              <InputText 
                value={bankAccNo} 
                onChange={(e) => setBankAccNo(e.target.value)} 
                placeholder="Enter Account Number" 
                className="p-inputtext-sm font-semibold"
                style={{ height: '40px', borderRadius: '8px' }}
              />
            </div>

            <div className="field flex flex-column gap-1.5">
              <label className="text-xs font-bold text-slate-500">Bank IFSC Code</label>
              <InputText 
                value={ifscCode} 
                onChange={(e) => setIfscCode(e.target.value)} 
                placeholder="Enter 11-digit IFSC" 
                className="p-inputtext-sm font-semibold"
                style={{ height: '40px', borderRadius: '8px' }}
              />
            </div>

            <Button 
              label="Assign to Block" 
              icon="pi pi-check-circle" 
              className="p-button-sm p-button-warning mt-2 py-3"
              style={{ background: 'linear-gradient(135deg, #f97316 0%, #d97706 100%)', border: 'none', borderRadius: '8px', color: '#ffffff' }}
              onClick={handleAddStation}
            />
          </div>
        </Card>
      </div>

      {/* Right Side: Block Station List */}
      <div className="col-12 lg:col-8 mb-4 animate-fade-in">
        <Card 
          className="glass-panel"
          title={
            <div className="flex align-items-center justify-content-between pb-2 border-bottom-1 border-slate-100" style={{ borderBottom: '1px solid #f1f5f9' }}>
              <div className="flex align-items-center">
                <i className="pi pi-building text-orange-500 mr-2.5 text-lg"></i>
                <span className="text-base font-bold text-slate-800">Assigned Outlets ({blockStations.length})</span>
              </div>
              <span className="text-10px font-extrabold border-round-pill px-2.5 py-1 uppercase bg-orange-50 text-orange-700 border-1" style={{ borderColor: '#fed7aa' }}>
                Active in {selectedBlock}
              </span>
            </div>
          }
        >
          {blockStations.length === 0 ? (
            <div className="flex flex-column align-items-center justify-content-center py-6 text-center animate-fade-in">
              <span className="p-4 bg-slate-50 text-slate-400 border-circle mb-3 flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                <i className="pi pi-map-marker text-3xl"></i>
              </span>
              <h4 className="text-slate-700 m-0 font-bold">No Stations Assigned</h4>
              <p className="text-slate-400 text-xs mt-1.5 max-w-15rem">Register an authorized retail outlet in the left panel to allow vehicles to claim fuel within this block.</p>
            </div>
          ) : (
            <div className="flex flex-column mt-2 overflow-y-auto pr-1" style={{ gap: '14px', maxHeight: '460px' }}>
              {blockStations.map((station) => (
                <div 
                  key={station.id} 
                  className="p-3 border-round-xl border-1 border-slate-200 bg-white flex flex-column md:flex-row justify-content-between align-items-start md:align-items-center gap-3 animate-fade-in hover:bg-slate-50/50 transition-all duration-200"
                  style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.01)' }}
                >
                  <div className="flex align-items-center gap-3">
                    <span className="p-2.5 bg-orange-50 text-orange-600 border-circle flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', border: '1px solid #ffedd5' }}>
                      <i className="pi pi-map text-sm"></i>
                    </span>
                    <div className="flex flex-column gap-1">
                      <span className="font-bold text-slate-800 text-sm">{station.name}</span>
                      <div className="flex flex-wrap gap-2.5 align-items-center text-xs text-slate-500 font-medium">
                        <span className="flex align-items-center gap-1.5">
                          <i className="pi pi-compass text-slate-400 text-xs"></i>
                          {station.address}
                        </span>
                        {station.contactNo && (
                          <span className="flex align-items-center gap-1.5 border-left-1 pl-2.5 border-slate-200">
                            <i className="pi pi-phone text-slate-400 text-xs"></i>
                            {station.contactNo}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-column md:align-items-end gap-2.5 w-full md:w-auto">
                    <div 
                      className="flex align-items-center gap-3 px-3 py-1.5 border-round-lg border-1 bg-slate-50"
                      style={{ borderColor: '#e2e8f0', minWidth: '220px' }}
                    >
                      <i className="pi pi-credit-card text-slate-400 text-sm"></i>
                      <div className="flex flex-column text-10px text-slate-500 font-medium leading-tight">
                        <span className="font-bold text-slate-700">{station.bankName}</span>
                        <span>A/c: {station.bankAccNo} • IFSC: {station.ifscCode}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex align-items-center gap-2 justify-content-end w-full md:w-auto border-top-1 md:border-none pt-2.5 md:pt-0" style={{ borderTop: '1px solid #f1f5f9' }}>
                    <span 
                      className="text-10px font-extrabold border-round px-2 py-0.5 uppercase bg-green-50 text-green-700 border-1 flex align-items-center gap-1"
                      style={{ borderColor: '#bbf7d0', borderRadius: '4px' }}
                    >
                      <i className="pi pi-verified text-10px"></i>
                      {station.status}
                    </span>
                    <Button 
                      icon="pi pi-trash" 
                      className="p-button-rounded p-button-text p-button-sm text-red-500 hover:bg-red-50"
                      style={{ width: '32px', height: '32px' }}
                      onClick={() => handleDeleteStation(station.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Broadcast Action Banner */}
      <div className="col-12 mt-2">
        <Card className="glass-panel flex align-items-center justify-content-between p-2 shadow-sm">
          <div className="flex flex-column gap-1">
            <span className="text-xs text-slate-500 font-medium">Transmit quota listings to all station owners. Automatically maps vehicle plate registrations to their fuel allotments.</span>
            <span className="text-xs text-orange-600 font-bold"><i className="pi pi-volume-up mr-1"></i>Broadcast Channel Status: Active & Connected</span>
          </div>
          <Button
            label="Broadcast Vehicle Quotas & Lock Mappings"
            icon="pi pi-send"
            className="p-button-warning p-button-lg px-4 py-3"
            onClick={handleSaveAll}
            style={{ background: 'linear-gradient(135deg, #f97316 0%, #d97706 100%)', border: 'none', color: '#ffffff' }}
          />
        </Card>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   7. FUEL BILLING & RECONCILIATION PORTAL
---------------------------------------------------- */
export function FuelBillingPortal() {
  const toast = useRef(null);

  const getVehicleTypeIcon = (type) => {
    const t = (type || 'Car').toLowerCase();
    if (t.includes('van') || t.includes('loading') || t.includes('truck')) {
      return 'pi-truck';
    } else if (t.includes('bus')) {
      return 'pi-truck';
    }
    return 'pi-car';
  };

  const getVehicleTypeTag = (type) => {
    const t = (type || 'Car').toLowerCase();
    let bg = 'rgba(100, 116, 139, 0.1)';
    let color = '#64748b';
    let border = '1px solid rgba(100, 116, 139, 0.2)';
    
    if (t.includes('van') || t.includes('loading')) {
      bg = 'rgba(99, 102, 241, 0.1)';
      color = '#6366f1';
      border = '1px solid rgba(99, 102, 241, 0.2)';
    } else if (t.includes('bus')) {
      bg = 'rgba(139, 92, 246, 0.1)';
      color = '#8b5cf6';
      border = '1px solid rgba(139, 92, 246, 0.2)';
    } else if (t.includes('car') || t.includes('bolero') || t.includes('suv')) {
      bg = 'rgba(59, 130, 246, 0.1)';
      color = '#3b82f6';
      border = '1px solid rgba(59, 130, 246, 0.2)';
    }

    return (
      <span 
        className="text-10px font-bold px-2 py-0.5 border-round"
        style={{ background: bg, color: color, border: border, borderRadius: '4px', display: 'inline-flex', alignItems: 'center' }}
      >
        {type}
      </span>
    );
  };

  // Available fuel stations for selection
  const fuelStationsList = [
    { label: 'Bharat Petroleum - Dhar Central', value: 'fs-dhar-1', address: 'Indore-Ahmedabad Highway, Dhar' },
    { label: 'Indian Oil - Mandu Crossing', value: 'fs-dhar-2', address: 'Mandu Road, Dhar Rural' },
    { label: 'HP Fuel Oasis - Badnawar Town', value: 'fs-bad-1', address: 'Main Bazar, Badnawar' },
    { label: 'Balaji Fuels - Sardarpur', value: 'fs-sar-1', address: 'Rajgarh Road, Sardarpur' },
    { label: 'Narmada Fuel Depot', value: 'fs-kuk-1', address: 'Kukshi Bypass Road, Kukshi' }
  ];

  // Acquired vehicles available to pick for logging
  const mockVehicles = [
    { label: 'MP04-CE-1025 ( Tata Ace - Private )', value: 'MP04-CE-1025', type: 'Loading van' },
    { label: 'MP04-CE-1026 ( Mahindra Bolero - PWD )', value: 'MP04-CE-1026', type: 'Car' },
    { label: 'MP04-CE-1028 ( Tata Starbus - Municipal Corp )', value: 'MP04-CE-1028', type: 'Bus' },
    { label: 'MP04-CE-1030 ( Eicher Skyline - Department )', value: 'MP04-CE-1030', type: 'Bus' }
  ];

  const [selectedStation, setSelectedStation] = useState('fs-dhar-1');
  const [selectedVehicle, setSelectedVehicle] = useState('MP04-CE-1025');
  const [litres, setLitres] = useState('40');
  const [rate, setRate] = useState('96.50');
  const [amountPaid, setAmountPaid] = useState('2000');

  // Logs database
  const [billingLogs, setBillingLogs] = useState({
    'fs-dhar-1': [
      { id: 'log-1', date: '27/05/2026 10:15 am', stationName: 'Bharat Petroleum - Dhar Central', vehicleNo: 'MP04-CE-1025', vehicleType: 'Loading van', quantity: 45, rate: 96.50, total: 4342.50, paid: 4342.50, due: 0.00, status: 'Settled' },
      { id: 'log-2', date: '27/05/2026 02:30 pm', stationName: 'Bharat Petroleum - Dhar Central', vehicleNo: 'MP04-CE-1028', vehicleType: 'Bus', quantity: 120, rate: 96.50, total: 11580.00, paid: 8000.00, due: 3580.00, status: 'Pending' }
    ],
    'fs-dhar-2': [
      { id: 'log-3', date: '27/05/2026 11:45 am', stationName: 'Indian Oil - Mandu Crossing', vehicleNo: 'MP04-CE-1026', vehicleType: 'Car', quantity: 35, rate: 96.50, total: 3377.50, paid: 0.00, due: 3377.50, status: 'Pending' }
    ],
    'fs-bad-1': [
      { id: 'log-4', date: '27/05/2026 09:00 am', stationName: 'HP Fuel Oasis - Badnawar Town', vehicleNo: 'MP04-CE-1030', vehicleType: 'Bus', quantity: 80, rate: 96.50, total: 7720.00, paid: 7720.00, due: 0.00, status: 'Settled' }
    ],
    'fs-sar-1': [],
    'fs-kuk-1': []
  });

  const activeLogs = billingLogs[selectedStation] || [];

  // Calculate totals
  const totalLitres = activeLogs.reduce((acc, log) => acc + log.quantity, 0);
  const totalCost = activeLogs.reduce((acc, log) => acc + log.total, 0);
  const totalPaid = activeLogs.reduce((acc, log) => acc + log.paid, 0);
  const totalDue = activeLogs.reduce((acc, log) => acc + log.due, 0);
  const uniqueVehiclesCount = new Set(activeLogs.map(log => log.vehicleNo)).size;

  const handleAddLog = () => {
    const qtyNum = parseFloat(litres);
    const rateNum = parseFloat(rate);
    const paidNum = parseFloat(amountPaid) || 0;

    if (!selectedVehicle) {
      toast.current.show({ severity: 'error', summary: 'Input Required', detail: 'Please select a vehicle.', life: 3000 });
      return;
    }
    if (isNaN(qtyNum) || qtyNum <= 0) {
      toast.current.show({ severity: 'error', summary: 'Invalid Quantity', detail: 'Please enter a valid quantity of litres.', life: 3000 });
      return;
    }
    if (isNaN(rateNum) || rateNum <= 0) {
      toast.current.show({ severity: 'error', summary: 'Invalid Rate', detail: 'Please enter a valid rate per litre.', life: 3000 });
      return;
    }
    if (isNaN(paidNum) || paidNum < 0) {
      toast.current.show({ severity: 'error', summary: 'Invalid Payment', detail: 'Please enter a valid paid amount.', life: 3000 });
      return;
    }

    const totalCalculated = qtyNum * rateNum;
    const dueCalculated = Math.max(0, totalCalculated - paidNum);
    const matchedVeh = mockVehicles.find(v => v.value === selectedVehicle);
    const matchedStation = fuelStationsList.find(s => s.value === selectedStation);

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();

    const newLog = {
      id: `log-${Date.now()}`,
      date: formattedDate,
      stationName: matchedStation ? matchedStation.label : 'Unknown Station',
      vehicleNo: selectedVehicle,
      vehicleType: matchedVeh ? matchedVeh.type : 'Car',
      quantity: qtyNum,
      rate: rateNum,
      total: totalCalculated,
      paid: paidNum,
      due: dueCalculated,
      status: dueCalculated === 0 ? 'Settled' : 'Pending'
    };

    setBillingLogs(prev => ({
      ...prev,
      [selectedStation]: [newLog, ...(prev[selectedStation] || [])]
    }));

    // Reset Inputs
    setLitres('');
    setAmountPaid('');

    toast.current.show({
      severity: 'success',
      summary: 'Filling Logged',
      detail: `Successfully recorded filling of ${qtyNum}L for ${selectedVehicle}.`,
      life: 3000
    });
  };

  const handleClearAllLogs = () => {
    setBillingLogs(prev => ({
      ...prev,
      [selectedStation]: []
    }));
    toast.current.show({ severity: 'info', summary: 'Logs Cleared', detail: 'All billing logs for this station have been reset.', life: 2000 });
  };

  const handleSettleLog = (logId) => {
    setBillingLogs(prev => {
      const stationLogs = prev[selectedStation] || [];
      const updatedLogs = stationLogs.map(log => {
        if (log.id === logId) {
          return {
            ...log,
            paid: log.total,
            due: 0.00,
            status: 'Settled'
          };
        }
        return log;
      });
      return {
        ...prev,
        [selectedStation]: updatedLogs
      };
    });

    toast.current.show({
      severity: 'success',
      summary: 'Payment Settled',
      detail: 'Successfully settled outstanding due amount.',
      life: 2500
    });
  };

  const currentStationObj = fuelStationsList.find(s => s.value === selectedStation);

  return (
    <div className="grid animate-fade-in">
      <Toast ref={toast} />

      {/* Top Header Panel */}
      <div className="col-12 flex align-items-center justify-content-between mb-2">
        <div>
          <h2 className="m-0 font-bold gradient-text text-3xl">Fuel Billing & Settlement Portal</h2>
          <p className="text-slate-500 m-0 mt-1 text-sm font-medium">Reconciliation Node • Record vehicle fuel refills, track billing, and settle outstanding due amounts with station owners.</p>
        </div>
      </div>

      {/* Left Side: Record Fuel Filling Card */}
      <div className="col-12 lg:col-4 mb-4 animate-fade-in">
        <Card 
          className="glass-panel border-top-3" 
          style={{ borderTop: '3px solid #14b8a6' }}
          title={
            <div className="flex align-items-center pb-2 border-bottom-1 border-slate-100" style={{ borderBottom: '1px solid #f1f5f9' }}>
              <i className="pi pi-plus-circle text-teal-500 text-lg" style={{ marginRight: '10px' }}></i>
              <span className="text-base font-bold text-slate-800">Record Fuel Filling</span>
            </div>
          }
        >
          <div className="p-fluid flex flex-column gap-3 mt-2">
            
            {/* Fuel Station Selector Inside Form */}
            <div className="field flex flex-column gap-1.5 animate-fade-in">
              <label className="text-xs font-bold text-slate-500">Fuel Station Outlet</label>
              <Dropdown 
                value={selectedStation} 
                options={fuelStationsList} 
                onChange={(e) => setSelectedStation(e.value)} 
                placeholder="Select Outlet" 
                className="font-semibold"
              />
            </div>

            <div className="field flex flex-column gap-1.5">
              <label className="text-xs font-bold text-slate-500">Authorized Vehicle</label>
              <Dropdown 
                value={selectedVehicle} 
                options={mockVehicles} 
                onChange={(e) => setSelectedVehicle(e.value)} 
                placeholder="Choose active plate number" 
                className="font-semibold"
              />
            </div>

            <div className="field flex flex-column gap-1.5">
              <label className="text-xs font-bold text-slate-500">Fuel Quantity (Litres)</label>
              <InputText 
                value={litres} 
                onChange={(e) => setLitres(e.target.value)} 
                placeholder="E.g. 45" 
                className="p-inputtext-sm font-semibold"
                style={{ height: '40px', borderRadius: '8px' }}
              />
            </div>



            <div className="field flex flex-column gap-1.5">
              <label className="text-xs font-bold text-slate-500">Amount Paid (₹)</label>
              <InputText 
                value={amountPaid} 
                onChange={(e) => setAmountPaid(e.target.value)} 
                placeholder="E.g. 2500" 
                className="p-inputtext-sm font-semibold"
                style={{ height: '40px', borderRadius: '8px' }}
              />
            </div>

            {/* Live refilling math display */}
            {parseFloat(litres) > 0 && parseFloat(rate) > 0 && (
              <div className="bg-teal-50/50 p-3 border-round-lg border-1 border-teal-100 flex justify-content-between text-xs font-bold text-teal-800 animate-fade-in mt-1">
                <div className="flex flex-column gap-1">
                  <span className="font-semibold text-slate-400">Total Bill</span>
                  <span className="text-base text-teal-900">₹{(parseFloat(litres) * parseFloat(rate)).toFixed(2)}</span>
                </div>
                <div className="flex flex-column gap-1 text-right">
                  <span className="font-semibold text-slate-400">Amount Due</span>
                  <span className="text-base text-red-600">₹{Math.max(0, (parseFloat(litres) * parseFloat(rate)) - (parseFloat(amountPaid) || 0)).toFixed(2)}</span>
                </div>
              </div>
            )}

            <Button 
              label="Record Fuel Filling" 
              icon="pi pi-check-circle" 
              className="p-button-sm p-button-teal mt-2 py-3"
              style={{ background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)', border: 'none', borderRadius: '8px', color: '#ffffff' }}
              onClick={handleAddLog}
            />
          </div>
        </Card>
      </div>

      {/* Right Side: Billing Ledger & Metrics */}
      <div className="col-12 lg:col-8 mb-4 animate-fade-in">
        <div className="flex flex-column w-full" style={{ gap: '16px' }}>
          
          {/* Quick Metrics Cards */}
          <div className="flex flex-column md:flex-row gap-3 w-full justify-content-between">
            <div className="flex-1 flex align-items-center gap-3 p-3 bg-white border-1 border-slate-200 border-round-xl shadow-2xs">
              <span className="p-2.5 bg-indigo-50 text-indigo-600 border-circle flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', border: '1px solid #c7d2fe' }}><i className="pi pi-car text-sm"></i></span>
              <div className="flex flex-column">
                <span className="text-10px font-extrabold text-slate-400 uppercase tracking-wider">Number of Vehicles</span>
                <span className="text-base font-bold text-slate-700">{uniqueVehiclesCount}</span>
              </div>
            </div>

            <div className="flex-1 flex align-items-center gap-3 p-3 bg-white border-1 border-slate-200 border-round-xl shadow-2xs animate-fade-in">
              <span className="p-2.5 bg-orange-50 text-orange-600 border-circle flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', border: '1px solid #fed7aa' }}><i className="pi pi-map-marker text-sm"></i></span>
              <div className="flex flex-column">
                <span className="text-10px font-extrabold text-slate-400 uppercase tracking-wider">No of Fuel Stations</span>
                <span className="text-base font-bold text-slate-700">{fuelStationsList.length}</span>
              </div>
            </div>

            <div className="flex-1 flex align-items-center gap-3 p-3 bg-white border-1 border-slate-200 border-round-xl shadow-2xs">
              <span className="p-2.5 bg-teal-50 text-teal-600 border-circle flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', border: '1px solid #b2f5ea' }}><i className="pi pi-filter text-sm"></i></span>
              <div className="flex flex-column">
                <span className="text-10px font-extrabold text-slate-400 uppercase tracking-wider">Dispensed</span>
                <span className="text-base font-bold text-slate-700">{totalLitres.toFixed(1)} Litres</span>
              </div>
            </div>

            <div className="flex-1 flex align-items-center gap-3 p-3 bg-white border-1 border-slate-200 border-round-xl shadow-2xs">
              <span className="p-2.5 bg-red-50 text-red-600 border-circle flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', border: '1px solid #fecaca' }}><i className="pi pi-exclamation-circle text-sm"></i></span>
              <div className="flex flex-column">
                <span className="text-10px font-extrabold text-slate-400 uppercase tracking-wider">Amount Due</span>
                <span className="text-base font-bold text-red-600">₹{totalDue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Logbook List Card */}
          <Card 
            className="glass-panel"
            title={
              <div className="flex align-items-center justify-content-between pb-2 border-bottom-1 border-slate-100" style={{ borderBottom: '1px solid #f1f5f9' }}>
                <div className="flex align-items-center">
                  <i className="pi pi-history text-teal-600 mr-2.5 text-lg"></i>
                  <span className="text-base font-bold text-slate-800">Logbook</span>
                </div>
                {activeLogs.length > 0 && (
                  <Button 
                    label="Reset Logs" 
                    icon="pi pi-trash" 
                    className="p-button-text p-button-sm text-red-500 font-bold p-0" 
                    onClick={handleClearAllLogs}
                  />
                )}
              </div>
            }
          >
            {activeLogs.length === 0 ? (
              <div className="flex flex-column align-items-center justify-content-center py-6 text-center animate-fade-in">
                <span className="p-4 bg-slate-50 text-slate-400 border-circle mb-3 flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                  <i className="pi pi-history text-3xl"></i>
                </span>
                <h4 className="text-slate-700 m-0 font-bold">No Fillings Logged</h4>
                <p className="text-slate-400 text-xs mt-1.5 max-w-15rem">Enter details on the left form to capture fuel filling records and track payment settlement claims.</p>
              </div>
            ) : (
              <div className="flex flex-column mt-2 overflow-y-auto pr-1" style={{ gap: '14px', maxHeight: '380px' }}>
                {activeLogs.map((log) => {
                  const isSettled = log.status === 'Settled';
                  return (
                    <div 
                      key={log.id}
                      className="p-3 border-round-xl border-1 border-slate-200 bg-white flex flex-column md:flex-row justify-content-between align-items-start md:align-items-center gap-3 animate-fade-in hover:bg-slate-50/50 transition-all duration-200"
                      style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.01)' }}
                    >
                      <div className="flex align-items-center gap-3">
                        <span 
                          className="p-2.5 border-circle flex align-items-center justify-content-center animate-fade-in"
                          style={{ 
                            width: '40px', 
                            height: '40px', 
                            background: isSettled ? '#ecfdf5' : '#fff5f5', 
                            color: isSettled ? '#10b981' : '#ef4444',
                            border: isSettled ? '1px solid #a7f3d0' : '1px solid #fca5a5'
                          }}
                        >
                          <i className={`pi ${getVehicleTypeIcon(log.vehicleType)} text-sm`}></i>
                        </span>
                        <div className="flex flex-column gap-0.5">
                          <span className="font-bold text-slate-800 text-sm">{log.vehicleNo}</span>
                          <div className="flex flex-wrap gap-3 align-items-center text-xs text-slate-500 font-medium">
                            {log.stationName && (
                              <span className="flex align-items-center gap-1.5 text-slate-600 font-semibold">
                                <i className="pi pi-map-marker text-orange-500 text-xs"></i>
                                {log.stationName}
                              </span>
                            )}
                            <span>
                              {getVehicleTypeTag(log.vehicleType)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Extreme Right: Quantity Filled & Amount Due / Settled Action */}
                      <div className="flex align-items-center justify-content-end w-full md:w-auto pt-2.5 md:pt-0" style={{ gap: '16px', minWidth: '280px' }}>
                        <div className="flex flex-column text-right" style={{ marginRight: '8px' }}>
                          <span className="text-slate-800 font-extrabold text-sm" style={{ letterSpacing: '-0.01em' }}>{log.quantity}L Filled</span>
                          <span className="text-10px text-slate-400 font-medium mt-1">{log.date}</span>
                        </div>

                        <div className="flex align-items-center gap-2">
                          {isSettled ? (
                            <span 
                              className="text-10px font-extrabold border-round px-2.5 py-1.5 uppercase bg-green-50 text-green-700 border-1 flex align-items-center gap-1"
                              style={{ borderColor: '#bbf7d0', borderRadius: '4px' }}
                            >
                              <i className="pi pi-check text-10px"></i>
                              Settled
                            </span>
                          ) : (
                            <div className="flex align-items-center gap-2 animate-fade-in">
                              <span 
                                className="text-10px font-extrabold border-round px-2.5 py-1.5 uppercase bg-amber-50 text-amber-700 border-1 flex align-items-center gap-1"
                                style={{ borderColor: '#fde68a', borderRadius: '4px' }}
                              >
                                <i className="pi pi-clock text-10px animate-pulse"></i>
                                ₹{log.due.toFixed(2)} Due
                              </span>
                              <Button 
                                label="Settled ?" 
                                icon="pi pi-check" 
                                className="p-button-outlined p-button-success p-button-xs py-1.5 px-2.5 text-xs font-semibold"
                                style={{ 
                                  borderRadius: '4px', 
                                  fontSize: '9px', 
                                  height: '24px', 
                                  background: 'transparent',
                                  borderColor: '#22c55e',
                                  color: '#22c55e',
                                  borderWidth: '1px'
                                }}
                                onClick={() => handleSettleLog(log.id)}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
