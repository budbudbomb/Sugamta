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
  const [acqType, setAcqType] = useState('Individual');
  const [ownerName, setOwnerName] = useState('');
  const [ownerMobile, setOwnerMobile] = useState('');
  const [vehicleNo, setVehicleNo] = useState('MP04-');

  // Dynamic state selectors
  const [vehicleType, setVehicleType] = useState('Bus');
  const [vehicleSelection, setVehicleSelection] = useState('Tata Starbus');
  const [arrivalDateTime, setArrivalDateTime] = useState(new Date(2026, 4, 27, 8, 30));
  const [authorizedOfficer, setAuthorizedOfficer] = useState('');

  const vehicleTypeOptions = [
    { label: 'Bus', value: 'Bus' },
    { label: 'Loading van', value: 'Loading van' },
    { label: 'Car', value: 'Car' }
  ];

  const vehiclesMap = {
    'Bus': [
      { label: 'Tata Starbus 40-Seater', value: 'Tata Starbus' },
      { label: 'Eicher Skyline 50-Seater', value: 'Eicher Skyline' },
      { label: 'Mahindra Cruz 32-Seater', value: 'Mahindra Cruz' }
    ],
    'Loading van': [
      { label: 'Tata Ace (Chota Hathi)', value: 'Tata Ace' },
      { label: 'Mahindra Bolero Maxi Truck', value: 'Mahindra Bolero Maxi' },
      { label: 'Ashok Leyland Dost', value: 'Ashok Leyland Dost' }
    ],
    'Car': [
      { label: 'Maruti Suzuki Ertiga (7-Seater)', value: 'Maruti Ertiga' },
      { label: 'Toyota Innova Crysta MUV', value: 'Toyota Innova' },
      { label: 'Mahindra Bolero SUV', value: 'Mahindra Bolero' }
    ]
  };

  const departments = [
    { label: 'Public Works Department (PWD)', value: 'PWD' },
    { label: 'Water Resources Department (WRD)', value: 'WRD' },
    { label: 'Forest Department Rajgarh', value: 'ForestDept' },
    { label: 'Education Department Pool', value: 'EducationDept' },
    { label: 'Municipal Corporation Sarangpur', value: 'MunicipalCorp' }
  ];

  const handleVehicleTypeChange = (value) => {
    setVehicleType(value);
    const defaults = {
      'Bus': 'Tata Starbus',
      'Loading van': 'Tata Ace',
      'Car': 'Maruti Ertiga'
    };
    setVehicleSelection(defaults[value]);
  };

  const handleDownload = () => {
    toast.current.show({ severity: 'info', summary: 'Downloading Report', detail: 'Compiling administrative acquisition warrant logs (PDF)...', life: 3000 });
  };

  return (
    <div className="grid animate-fade-in">
      <Toast ref={toast} />
      <div className="col-12 flex align-items-center justify-content-between mb-2">
        <div>
          <h2 className="m-0 font-bold gradient-text text-3xl">Vehicle Acquisition Portal</h2>
          <p className="text-slate-500 m-0 mt-1 text-sm font-medium">Register and authorize municipal, departmental, or private requisitioned vehicles.</p>
        </div>
        <Button label="Download Report" icon="pi pi-download" className="p-button-outlined" onClick={handleDownload} />
      </div>

      <div className="col-12 md:col-8">
        <Card className="glass-panel h-full" title={<span className="text-base font-bold text-slate-700"><i className="pi pi-file mr-2 text-primary"></i>Requisition Agreement Form</span>}>
          <div className="p-fluid grid">
            
            {/* Acquisition Type */}
            <div className="col-12 field mb-3">
              <label className="font-semibold text-sm text-slate-600 block mb-2">Acquisition Type</label>
              <div className="flex gap-4 align-items-center mt-2 flex-wrap">
                <div className="flex align-items-center">
                  <RadioButton inputId="typeInd" name="acqType" value="Individual" onChange={(e) => { setAcqType(e.value); setOwnerName(''); }} checked={acqType === 'Individual'} />
                  <label htmlFor="typeInd" className="ml-2 font-bold text-slate-700 cursor-pointer">Private / Individual Requisition</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton inputId="typeDept" name="acqType" value="Department" onChange={(e) => { setAcqType(e.value); setOwnerName('PWD'); }} checked={acqType === 'Department'} />
                  <label htmlFor="typeDept" className="ml-2 font-bold text-slate-700 cursor-pointer">Government / Departmental Pool</label>
                </div>
              </div>
            </div>

            {/* Owner Name or Department Dropdown */}
            <div className="field col-12 md:col-6 mb-3">
              {acqType === 'Individual' ? (
                <>
                  <label className="font-semibold text-sm text-slate-600 block mb-2">Owner / In-Charge Name</label>
                  <InputText value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="Full Name of Owner or Pool Supervisor" className="font-semibold" />
                </>
              ) : (
                <>
                  <label className="font-semibold text-sm text-slate-600 block mb-2">Government Department / Agency</label>
                  <Dropdown value={ownerName} options={departments} onChange={(e) => setOwnerName(e.value)} placeholder="Select Department" className="font-semibold" />
                </>
              )}
            </div>

            {/* Coordinator / Owner Mobile */}
            <div className="field col-12 md:col-6 mb-3">
              <label className="font-semibold text-sm text-slate-600 block mb-2">
                {acqType === 'Individual' ? "Owner Mobile Number" : "Coordinator Mobile Number"}
              </label>
              <InputText value={ownerMobile} onChange={(e) => setOwnerMobile(e.target.value)} placeholder="+91 XXXXX XXXXX" className="font-semibold" />
            </div>

            {/* Vehicle Type (Buttons) */}
            <div className="field col-12 md:col-6 mb-3">
              <label className="font-semibold text-sm text-slate-600 block mb-2">Vehicle Type</label>
              <SelectButton value={vehicleType} options={vehicleTypeOptions} onChange={(e) => e.value && handleVehicleTypeChange(e.value)} className="font-semibold" />
            </div>

            {/* Specific Vehicle Selection (Dropdown based on Type) */}
            <div className="field col-12 md:col-6 mb-3">
              <label className="font-semibold text-sm text-slate-600 block mb-2">Select Vehicle Model</label>
              <Dropdown value={vehicleSelection} options={vehiclesMap[vehicleType]} onChange={(e) => setVehicleSelection(e.value)} placeholder="Select Vehicle" className="font-semibold" />
            </div>

            {/* Add Arrival Date & Time Picker */}
            <div className="field col-12 md:col-6 mb-3">
              <label className="font-semibold text-sm text-slate-600 block mb-2">Add Arrival Date & Time</label>
              <Calendar value={arrivalDateTime} onChange={(e) => setArrivalDateTime(e.value)} showTime hourFormat="24" showIcon placeholder="Select Date & Time" className="font-semibold" />
            </div>

            {/* Authorized Officer */}
            <div className="field col-12 md:col-6 mb-3">
              <label className="font-semibold text-sm text-slate-600 block mb-2">Authorized Officer Name</label>
              <InputText value={authorizedOfficer} onChange={(e) => setAuthorizedOfficer(e.target.value)} placeholder="Name of Verifying Officer" className="font-semibold" />
            </div>

            {/* Vehicle Registered Number */}
            <div className="field col-12 md:col-6 mb-3">
              <label className="font-semibold text-sm text-slate-600 block mb-2">Vehicle Registered Number</label>
              <InputText value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} placeholder="MP04-XX-XXXX" className="font-semibold" />
            </div>

          </div>
        </Card>
      </div>

      {/* Pre-filled System Parameters (Right-Hand Panel) */}
      <div className="col-12 md:col-4">
        <Card className="glass-panel h-full" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: '#f8fafc' }} title={<span className="text-base font-bold text-slate-200"><i className="pi pi-lock-open mr-2 text-indigo-400"></i>Pre-filled System Parameters</span>}>
          <div className="flex flex-column gap-3 text-sm text-slate-300">
            <div className="flex justify-content-between border-bottom-1 border-slate-700 pb-2" style={{ borderBottom: '1px solid #334155' }}>
              <span>Assigned Vehicle:</span>
              <span className="font-bold text-white">
                {(() => {
                  const items = vehiclesMap[vehicleType] || [];
                  const found = items.find(i => i.value === vehicleSelection);
                  return found ? found.label.split(' (')[0] : (vehicleSelection || 'None');
                })()}
              </span>
            </div>
            <div className="flex justify-content-between border-bottom-1 border-slate-700 pb-2" style={{ borderBottom: '1px solid #334155' }}>
              <span>Category Assigned:</span>
              <span className="font-bold text-indigo-300 uppercase tracking-wider text-xs bg-indigo-900/60 px-2 py-0.5 border-round">
                {vehicleType}
              </span>
            </div>
            <div className="flex justify-content-between border-bottom-1 border-slate-700 pb-2" style={{ borderBottom: '1px solid #334155' }}>
              <span>Arrival Date & Hour:</span>
              <span className="font-bold text-white">
                {arrivalDateTime ? arrivalDateTime.toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }) : 'Not Set'}
              </span>
            </div>
            <div className="flex justify-content-between border-bottom-1 border-slate-700 pb-2" style={{ borderBottom: '1px solid #334155' }}>
              <span>Origin Station:</span>
              <span className="font-bold text-white">District HQ Office</span>
            </div>
            <div className="flex justify-content-between" style={{ color: '#818cf8' }}>
              <span>Allotting Authority:</span>
              <span className="font-bold">Returning Officer (RO)</span>
            </div>
          </div>
          <div className="mt-4">
            <Button label="Proceed to Allocation" icon="pi pi-arrow-right" className="w-full mt-2" onClick={() => onNext('vehicle-allocation')} />
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   3. VEHICLE ALLOCATION SCREEN
---------------------------------------------------- */
export function VehicleAllocation({ onNext }) {
  const toast = useRef(null);
  
  const [allocations, setAllocations] = useState([
    { id: 1, name: 'Dr. Vivek Saxena', sector: 'Sector-01', booths: 'Booth 101, 102', vehicleNo: '' },
    { id: 2, name: 'Shri Manoj Agrawal', sector: 'Sector-02', booths: 'Booth 201, 202', vehicleNo: '' },
    { id: 3, name: 'Smt. Anjali Sharma', sector: 'Sector-03', booths: 'Booth 301, 302, 303', vehicleNo: '' }
  ]);

  const registrationNumbers = [
    { label: 'MP04-CE-1102 (Jeep)', value: 'MP04-CE-1102' },
    { label: 'MP04-HA-8874 (Bus)', value: 'MP04-HA-8874' },
    { label: 'MP04-MA-0089 (Innova)', value: 'MP04-MA-0089' },
    { label: 'MP04-PK-9821 (Bolero)', value: 'MP04-PK-9821' }
  ];

  const handleSelectVehicle = (value, rowId) => {
    setAllocations(allocations.map(a => a.id === rowId ? { ...a, vehicleNo: value } : a));
    toast.current.show({ severity: 'success', summary: 'Vehicle Assigned', detail: `Vehicle ${value} matched successfully.`, life: 2000 });
  };

  return (
    <div className="grid animate-fade-in">
      <Toast ref={toast} />
      <div className="col-12 flex align-items-center justify-content-between mb-2">
        <div>
          <h2 className="m-0 font-bold gradient-text text-3xl">Vehicle Route Allocation</h2>
          <p className="text-slate-500 m-0 mt-1 text-sm font-medium">Link specific registered vehicles and driver log tags to designated Sector Officer routes.</p>
        </div>
      </div>

      <div className="col-12">
        <Card className="glass-panel" title={<span className="text-base font-bold text-slate-700"><i className="pi pi-clone mr-2 text-primary"></i>Allocation Grid</span>}>
          <DataTable value={allocations} className="p-datatable-sm" responsiveLayout="scroll">
            <Column field="name" header="Sector Officer" style={{ fontWeight: '600' }}></Column>
            <Column field="sector" header="Assigned Sector" body={(r) => <span className="font-bold text-slate-600">{r.sector}</span>}></Column>
            <Column field="booths" header="Covered Polling Booths" body={(r) => <span className="font-semibold text-green-700">{r.booths}</span>}></Column>
            <Column 
              header="Assign Vehicle Registered ID" 
              body={(rowData) => (
                <Dropdown
                  value={rowData.vehicleNo}
                  options={registrationNumbers}
                  onChange={(e) => handleSelectVehicle(e.value, rowData.id)}
                  placeholder="Choose Registered Tag"
                  className="w-full text-sm"
                />
              )}
              style={{ width: '35%' }}
            ></Column>
          </DataTable>

          <div className="flex justify-content-end mt-4">
            <Button label="Save Allocations & Proceed" icon="pi pi-arrow-right" className="px-4 py-2" onClick={() => onNext('transit-log')} />
          </div>
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
