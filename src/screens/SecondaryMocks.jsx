import React, { useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import { Toast } from 'primereact/toast';

/* ----------------------------------------------------
   1. SECTOR OFFICER APPOINTMENT SCREEN
---------------------------------------------------- */
export function SectorOfficerAppointment({ onNext }) {
  const toast = useRef(null);
  const [electionType, setElectionType] = useState(null);
  const [block, setBlock] = useState(null);

  const electionTypes = [
    { label: 'Lok Sabha (General)', value: 'LokSabha' },
    { label: 'Vidhan Sabha (Assembly)', value: 'VidhanSabha' },
    { label: 'Panchayat (Local)', value: 'Panchayat' }
  ];

  const blocks = [
    { label: 'Block A - Sarangpur', value: 'Sarangpur' },
    { label: 'Block B - Pachore', value: 'Pachore' },
    { label: 'Block C - Narsinghgarh', value: 'Narsinghgarh' }
  ];

  const soData = [
    { name: 'Dr. Vivek Saxena', designation: 'Assistant Professor', phone: '9827012345', office: 'Govt. Degree College', sectorNo: 'Sector-01', booths: 'Booth 101, 102' },
    { name: 'Shri Manoj Agrawal', designation: 'Executive Engineer', phone: '9425098765', office: 'PWD Department Office', sectorNo: 'Sector-02', booths: 'Booth 201, 202' },
    { name: 'Smt. Anjali Sharma', designation: 'Lecturer', phone: '7000876543', office: 'Girls Higher Sec School', sectorNo: 'Sector-03', booths: 'Booth 301, 302, 303' }
  ];

  const handleSaveAndNext = () => {
    toast.current.show({ severity: 'success', summary: 'Officer Rosters Saved', detail: 'Sector Officers successfully assigned to respective booths.', life: 3000 });
    if (onNext) setTimeout(() => onNext('vehicle-acquisition'), 1500);
  };

  return (
    <div className="grid animate-fade-in">
      <Toast ref={toast} />
      <div className="col-12 flex align-items-center justify-content-between mb-2">
        <div>
          <h2 className="m-0 font-bold gradient-text text-3xl">Sector Officer Appointment</h2>
          <p className="text-slate-500 m-0 mt-1 text-sm font-medium">Assign administrative officers to coordinate poll operations across sectors.</p>
        </div>
      </div>

      <div className="col-12">
        <Card className="glass-panel mb-4" title={<span className="text-base font-bold text-slate-700"><i className="pi pi-filter mr-2 text-primary"></i>Appointment Filter Scope</span>}>
          <div className="p-fluid grid">
            <div className="field col-12 md:col-6">
              <label className="font-semibold text-sm text-slate-600 block mb-2">Election Type</label>
              <Dropdown value={electionType} options={electionTypes} onChange={(e) => setElectionType(e.value)} placeholder="Select Election Stage" />
            </div>
            <div className="field col-12 md:col-6">
              <label className="font-semibold text-sm text-slate-600 block mb-2">Administrative Block</label>
              <Dropdown value={block} options={blocks} onChange={(e) => setBlock(e.value)} placeholder="Select Block" />
            </div>
          </div>
        </Card>

        <Card className="glass-panel" title={<span className="text-base font-bold text-slate-700"><i className="pi pi-users mr-2 text-primary"></i>Sector Officer Placement Register</span>}>
          <DataTable value={soData} className="p-datatable-sm" responsiveLayout="scroll">
            <Column field="name" header="Officer Name" fontStyle="bold" style={{ fontWeight: '600' }}></Column>
            <Column field="designation" header="Designation"></Column>
            <Column field="phone" header="Phone / Mobile"></Column>
            <Column field="office" header="Parent Office"></Column>
            <Column field="sectorNo" header="Assigned Sector" body={(r) => <span className="font-bold text-indigo-600">{r.sectorNo}</span>}></Column>
            <Column field="booths" header="Allotted Booths" body={(r) => <span className="font-semibold text-green-700">{r.booths}</span>}></Column>
          </DataTable>

          <div className="flex justify-content-end mt-4">
            <Button label="Save & Proceed" icon="pi pi-arrow-right" onClick={handleSaveAndNext} className="px-4 py-2" />
          </div>
        </Card>
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
            <div className="col-12 field">
              <label className="font-semibold text-sm text-slate-600 block mb-2">Acquisition Type</label>
              <div className="flex gap-4 align-items-center mt-2">
                <div className="flex align-items-center">
                  <RadioButton inputId="typeInd" name="acqType" value="Individual" onChange={(e) => setAcqType(e.value)} checked={acqType === 'Individual'} />
                  <label htmlFor="typeInd" className="ml-2 font-medium">Private / Individual Requisition</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton inputId="typeDept" name="acqType" value="Department" onChange={(e) => setAcqType(e.value)} checked={acqType === 'Department'} />
                  <label htmlFor="typeDept" className="ml-2 font-medium">Government / Departmental Pool</label>
                </div>
              </div>
            </div>

            <div className="field col-12 md:col-6">
              <label className="font-semibold text-sm text-slate-600 block mb-2">Owner / In-Charge Name</label>
              <InputText value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="Full Name of Owner or Pool Supervisor" />
            </div>

            <div className="field col-12 md:col-6">
              <label className="font-semibold text-sm text-slate-600 block mb-2">Owner Mobile Number</label>
              <InputText value={ownerMobile} onChange={(e) => setOwnerMobile(e.target.value)} placeholder="+91 XXXXX XXXXX" />
            </div>

            <div className="field col-12 md:col-6">
              <label className="font-semibold text-sm text-slate-600 block mb-2">Vehicle Registered Number</label>
              <InputText value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} placeholder="MP04-XX-XXXX" />
            </div>
          </div>
        </Card>
      </div>

      <div className="col-12 md:col-4">
        <Card className="glass-panel h-full" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: '#f8fafc' }} title={<span className="text-base font-bold text-slate-200"><i className="pi pi-lock-open mr-2 text-indigo-400"></i>Pre-filled System Parameters</span>}>
          <div className="flex flex-column gap-3 text-sm text-slate-300">
            <div className="flex justify-content-between border-bottom-1 border-slate-700 pb-2" style={{ borderBottom: '1px solid #334155' }}>
              <span>Assigned Vehicle Type:</span>
              <span className="font-bold text-white">Innova Premium MUV</span>
            </div>
            <div className="flex justify-content-between border-bottom-1 border-slate-700 pb-2" style={{ borderBottom: '1px solid #334155' }}>
              <span>Allotted Date & Hour:</span>
              <span className="font-bold text-white">2026-05-27 11:20</span>
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
