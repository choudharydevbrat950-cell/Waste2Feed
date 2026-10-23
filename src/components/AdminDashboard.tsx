import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileCheck,
  Users,
  AlertTriangle,
  Download,
  Filter,
  Search,
  Building,
  Truck,
  Factory,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { donations, batches, orders, language, setShowSafetyModal } = useApp();

  const [activeTab, setActiveTab] = useState<'verification' | 'incidents' | 'rules' | 'audit'>('verification');

  // Verification partners list
  const [partners, setPartners] = useState([
    {
      id: 'p-1',
      name: 'EcoHaul Clean Fleet Logistics',
      type: 'Collector Partner',
      license: 'CPCB/FLEET/EV-2026-90',
      status: 'verified',
      region: 'Delhi NCR',
      fleetSize: '12 Electric Vans',
    },
    {
      id: 'p-2',
      name: 'NutriFeed BioTech Mills',
      type: 'Feed Processing Mill',
      license: 'FSSAI/FEED/100220260041',
      status: 'verified',
      region: 'Greater Noida, UP',
      capacity: '50 MT / Day',
    },
    {
      id: 'p-3',
      name: 'Apex BioLogistics Fleet',
      type: 'Collector Partner',
      license: 'CPCB/FLEET/TEMP-8812',
      status: 'pending',
      region: 'Gurugram & Manesar',
      fleetSize: '8 Trucks',
    },
    {
      id: 'p-4',
      name: 'Shree Krishna Feed Extrusions',
      type: 'Feed Processing Mill',
      license: 'FSSAI/APPL/2026/0991',
      status: 'pending',
      region: 'Panipat Industrial Zone',
      capacity: '20 MT / Day',
    },
  ]);

  // Eligibility rules state
  const [eligibilityRules, setEligibilityRules] = useState([
    { id: 'r1', category: 'Bakery & Bread Trimmings', allowed: true, species: 'All Ruminants & Poultry', reason: 'High energy, safe starch' },
    { id: 'r2', category: "Brewer's Spent Malt Mash", allowed: true, species: 'Dairy Cattle & Aqua', reason: 'High digestible protein (24%)' },
    { id: 'r3', category: 'Vegetable Wholesale Mandi Trims', allowed: true, species: 'Poultry, Cattle, Swine', reason: 'Vitamins & digestive fiber' },
    { id: 'r4', category: 'Fruit Pulp & Citrus Pomace', allowed: true, species: 'Cattle & Sheep', reason: 'Rumen-buffering citrus pectin' },
    { id: 'r5', category: 'Post-Consumer Plate Scrapings', allowed: false, species: 'None (Prohibited)', reason: 'FSSAI Biosecurity Exclusion Rule' },
    { id: 'r6', category: 'Meat & Catering Swill', allowed: false, species: 'None (Prohibited)', reason: 'Prion disease prevention standard' },
  ]);

  const handleToggleRule = (id: string) => {
    setEligibilityRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, allowed: !r.allowed } : r))
    );
  };

  const handleVerifyPartner = (id: string, newStatus: 'verified' | 'rejected') => {
    setPartners((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  const handleExportAudit = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'ID,Type,Facility,QuantityKg,Status,Timestamp\n' +
      donations
        .map(
          (d) =>
            `${d.id},${d.category},"${d.donorName}",${d.quantityKg},${d.status},${d.submittedAt}`
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `waste2feed_compliance_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-800 font-semibold">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              <span>REGULATORY COMPLIANCE & CENTRAL GOVERNANCE</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
              {language === 'en' ? 'Waste2Feed Platform Administration' : 'वेस्ट2फीड प्लेटफॉर्म नियंत्रण एवं अनुपालन'}
            </h1>
            <p className="text-xs text-neutral-500">
              {language === 'en'
                ? 'Manage FSSAI partner licensing, investigate contamination flags, and enforce circular feed safety rules.'
                : 'FSSAI लाइसेंस सत्यापन, संदूषण जांच व चक्रीय आहार सुरक्षा नियमों का प्रबंधन।'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleExportAudit}
              className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Regulatory Audit CSV</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100 rounded-xl text-xs font-medium">
          <button
            onClick={() => setActiveTab('verification')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'verification'
                ? 'bg-white text-neutral-900 font-bold shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Partner KYC & Licenses ({partners.filter((p) => p.status === 'pending').length} pending)
          </button>
          <button
            onClick={() => setActiveTab('incidents')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'incidents'
                ? 'bg-white text-neutral-900 font-bold shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Safety Flags & Contamination Audits
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'rules'
                ? 'bg-white text-neutral-900 font-bold shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Feed Eligibility Rules Engine
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'audit'
                ? 'bg-white text-neutral-900 font-bold shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            System Audit Log
          </button>
        </div>
      </div>

      {/* Verification Tab */}
      {activeTab === 'verification' && (
        <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-neutral-900">Collection Fleets & Processing Mill Approvals</h3>
              <p className="text-xs text-neutral-500">Verify government licenses prior to onboarding into supply chain</p>
            </div>
          </div>

          <div className="divide-y divide-neutral-200">
            {partners.map((p) => (
              <div key={p.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-900 text-sm">{p.name}</span>
                    <span className="text-neutral-500">· {p.type}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-neutral-500">
                    <span>License: <strong className="font-mono text-neutral-800">{p.license}</strong></span>
                    <span>Region: <strong className="text-neutral-800">{p.region}</strong></span>
                    <span>Capacity: <strong className="text-neutral-800">{p.fleetSize || p.capacity}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {p.status === 'verified' ? (
                    <span className="flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md font-semibold border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Authorized Active</span>
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleVerifyPartner(p.id, 'rejected')}
                        className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg font-semibold transition-colors cursor-pointer"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleVerifyPartner(p.id, 'verified')}
                        className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors cursor-pointer"
                      >
                        Approve License
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Incidents Tab */}
      {activeTab === 'incidents' && (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-red-950 text-sm">
                  Automatic FSSAI Swill Interception: DON-8497 Disqualified
                </h4>
                <p className="text-xs text-red-800 mt-1 leading-relaxed">
                  Metropolis Food Court attempted to register 120 kg of post-consumer buffet table leftovers containing napkins and mixed sauces. System automated safety filter flagged the submission as non-compliant with ruminant feed standards and automatically routed material to Municipal Aerobic Composting Facility #4.
                </p>
                <div className="mt-3 flex items-center gap-3 text-xs">
                  <span className="font-mono text-neutral-600">Incident Code: INC-SAFETY-0821</span>
                  <span className="text-red-700 font-bold">Status: Diverted away from feed chain</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rules Engine Tab */}
      {activeTab === 'rules' && (
        <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-neutral-200">
            <h3 className="text-sm font-bold text-neutral-900">Circular Feed Stream Eligibility Engine</h3>
            <p className="text-xs text-neutral-500">Configure permissible organic streams in accordance with FSSAI regulations</p>
          </div>

          <div className="divide-y divide-neutral-200">
            {eligibilityRules.map((r) => (
              <div key={r.id} className="p-4 flex items-center justify-between text-xs gap-4">
                <div className="space-y-1">
                  <div className="font-bold text-neutral-900 text-sm">{r.category}</div>
                  <div className="text-neutral-500">
                    Species: <strong className="text-neutral-700">{r.species}</strong> · Reason: {r.reason}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`px-2.5 py-1 rounded-md font-semibold ${
                      r.allowed
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {r.allowed ? 'Permitted' : 'Banned'}
                  </span>
                  <button
                    onClick={() => handleToggleRule(r.id)}
                    className="px-3 py-1.5 border border-neutral-300 hover:bg-neutral-50 rounded-lg text-neutral-700 font-medium cursor-pointer"
                  >
                    Toggle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit Tab */}
      {activeTab === 'audit' && (
        <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-neutral-200">
            <h3 className="text-sm font-bold text-neutral-900">Cryptographic System Audit Log</h3>
            <p className="text-xs text-neutral-500">Immutable ledger of platform actions and batch creations</p>
          </div>

          <div className="divide-y divide-neutral-200 max-h-96 overflow-y-auto">
            {donations.map((d) => (
              <div key={d.id} className="p-3.5 flex items-center justify-between text-xs hover:bg-neutral-50">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-emerald-800">{d.id}</span>
                    <span className="font-semibold text-neutral-800">{d.title}</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono">
                    Donor: {d.donorName} · {d.quantityKg} kg · Status: {d.status}
                  </div>
                </div>
                <div className="text-[11px] text-neutral-400 font-mono shrink-0">
                  {new Date(d.submittedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
