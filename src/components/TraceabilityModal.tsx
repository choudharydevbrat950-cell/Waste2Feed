import React from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  FileText,
  ShieldCheck,
  QrCode,
  Download,
  X,
  Factory,
  Truck,
  Store,
  FlaskConical,
  Flame,
  Wheat,
} from 'lucide-react';

export const TraceabilityModal: React.FC = () => {
  const {
    selectedTraceabilityId,
    setSelectedTraceabilityId,
    donations,
    inspections,
    batches,
    products,
    language,
    t,
  } = useApp();

  if (!selectedTraceabilityId) return null;

  // Find related items
  let targetDonation = donations.find((d) => d.id === selectedTraceabilityId);
  let targetBatch = batches.find((b) => b.id === selectedTraceabilityId || b.productSkuId === selectedTraceabilityId);
  let targetProduct = products.find((p) => p.id === selectedTraceabilityId || p.batchId === selectedTraceabilityId);

  if (!targetDonation && targetBatch) {
    targetDonation = donations.find((d) => targetBatch?.inputDonationIds.includes(d.id));
  }
  if (!targetBatch && targetDonation?.batchId) {
    targetBatch = batches.find((b) => b.id === targetDonation?.batchId);
  }
  if (!targetProduct && targetBatch) {
    targetProduct = products.find((p) => p.batchId === targetBatch?.id);
  }

  const inspection = inspections.find(
    (i) => i.donationId === targetDonation?.id || i.id === targetDonation?.inspectionId
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Certificate Header */}
        <div className="bg-emerald-900 text-white p-6 relative">
          <button
            onClick={() => setSelectedTraceabilityId(null)}
            className="absolute top-5 right-5 p-1 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>CIRCULAR FEED TRACEABILITY & SAFETY PASSPORT</span>
              </div>
              <h2 className="text-xl font-bold mt-1 text-white">
                {targetProduct ? targetProduct.title : targetDonation?.title || 'Batch Provenance Dossier'}
              </h2>
              <div className="flex items-center gap-2 text-xs text-emerald-200 mt-1">
                <span>Unique Batch ID:</span>
                <span className="font-mono font-semibold text-white">
                  {targetBatch?.id || targetDonation?.batchId || targetDonation?.id}
                </span>
                <span aria-hidden="true">·</span>
                <span>ISO 22000 / FSSAI Feed Safety Protocol</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handlePrint}
                className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-emerald-700"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Certificate</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-8 max-h-[75vh] overflow-y-auto">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs">
            <div>
              <span className="text-neutral-500 block">Source Material</span>
              <span className="font-semibold text-neutral-900">
                {targetDonation ? t.categories[targetDonation.category] : 'Multi-source Grain Residuals'}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block">Thermal Sanitization</span>
              <span className="font-mono font-bold text-emerald-700">
                {targetBatch?.thermalProcessingTempCelsius || 118}°C (Pathogen Free)
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block">Crude Protein (Verified)</span>
              <span className="font-mono font-bold text-neutral-900">
                {targetBatch?.proteinContentPercentage || targetProduct?.crudeProtein || 22.5}%
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block">Target Species</span>
              <span className="font-semibold text-emerald-800 capitalize">
                {targetBatch ? t.species[targetBatch.targetSpecies] : 'Dairy Cattle'}
              </span>
            </div>
          </div>

          {/* Timeline Provenance Chain */}
          <div>
            <h3 className="text-sm font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>Full Chain of Custody & Traceability Timeline</span>
            </h3>

            <div className="relative border-l-2 border-emerald-200 ml-4 pl-6 space-y-6">
              {/* Step 1: Donor Generation */}
              <div className="relative">
                <div className="absolute -left-[33px] top-0 w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs">
                  <Store className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white p-4 rounded-xl border border-neutral-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-800 font-semibold">
                      STEP 1: FOOD DONOR ORIGIN
                    </span>
                    <span className="text-[11px] text-neutral-500 font-mono">
                      {targetDonation?.submittedAt ? new Date(targetDonation.submittedAt).toLocaleDateString() : 'Verified'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 mt-1">
                    {targetDonation?.donorName || 'Greenfield Artisan Bakery & Breads'}
                  </h4>
                  <p className="text-xs text-neutral-600 mt-1">
                    {targetDonation?.description || 'Clean day-old whole wheat & grain trimmings.'}
                  </p>
                  <div className="mt-2 text-xs text-neutral-500 flex flex-wrap gap-x-4 gap-y-1">
                    <span>Quantity: <strong className="text-neutral-800 font-mono">{targetDonation?.quantityKg || 350} kg</strong></span>
                    <span>Storage: <strong className="text-neutral-800 capitalize">{targetDonation?.storageCondition || 'dry_covered'}</strong></span>
                    <span>Facility: <strong className="text-neutral-800">{targetDonation?.location.city || 'Delhi NCR'}</strong></span>
                  </div>
                </div>
              </div>

              {/* Step 2: Collector Pickup */}
              <div className="relative">
                <div className="absolute -left-[33px] top-0 w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs">
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white p-4 rounded-xl border border-neutral-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-800 font-semibold">
                      STEP 2: CERTIFIED COLLECTION & LOGISTICS
                    </span>
                    <span className="text-[11px] text-neutral-500 font-mono">Verified Transit</span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 mt-1">
                    {targetDonation?.assignedCollectorName || 'EcoHaul Clean Fleet #12'}
                  </h4>
                  <div className="mt-2 text-xs text-neutral-600 space-y-1">
                    <div>Tare / Gross Scale Ticket: <strong className="text-neutral-900 font-mono">348 kg net verified</strong></div>
                    <div>Transit Safety: Sealed food-grade bins, ambient covered transport</div>
                  </div>
                </div>
              </div>

              {/* Step 3: QC Inspection */}
              <div className="relative">
                <div className="absolute -left-[33px] top-0 w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs">
                  <FlaskConical className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white p-4 rounded-xl border border-neutral-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-800 font-semibold">
                      STEP 3: LABORATORY QC & MICROBIOLOGICAL AUDIT
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      QC Score: {inspection?.qcScore || 98}/100 PASSED
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 mt-1">
                    {inspection?.inspectorName || 'Dr. Ramesh Sharma (Feed Technologist, FSSAI Certified)'}
                  </h4>
                  <p className="text-xs text-neutral-600 mt-1">
                    {inspection?.notes || 'Clean bakery batch. Water activity < 0.65. Starch purity verified. Free of mycotoxins & foreign matter.'}
                  </p>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
                    <div>Moisture: <strong className="font-mono">{inspection?.moisturePercentage || 11.4}%</strong></div>
                    <div>Mold Screen: <strong className="text-emerald-700">Negative</strong></div>
                    <div>Foreign Body: <strong className="text-emerald-700">None detected</strong></div>
                    <div>FSSAI Compliance: <strong className="text-emerald-700">Approved</strong></div>
                  </div>
                </div>
              </div>

              {/* Step 4: Extrusion & Thermal Processing */}
              <div className="relative">
                <div className="absolute -left-[33px] top-0 w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs">
                  <Flame className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white p-4 rounded-xl border border-neutral-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-800 font-semibold">
                      STEP 4: THERMAL EXTRUSION & NUTRIENT FORTIFICATION
                    </span>
                    <span className="text-[11px] text-neutral-500 font-mono">
                      Batch {targetBatch?.id || 'BATCH-2026-081'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 mt-1">
                    {targetBatch?.facilityName || 'NutriFeed BioTech Hub #1 (Greater Noida)'}
                  </h4>
                  <div className="mt-2 text-xs text-neutral-600 space-y-1">
                    <div>Extrusion Chamber: <strong className="text-neutral-900 font-mono">118°C continuous thermal dwell</strong> (complete elimination of Salmonella & E. coli)</div>
                    <div>Starch Gelatinization: <strong className="text-neutral-900 font-mono">92% digestibility index</strong></div>
                    <div>Formulation: Blended with essential mineral premix, amino acid balancer, calcium carbonate</div>
                  </div>
                </div>
              </div>

              {/* Step 5: Finished Feed & Farmer Availability */}
              <div className="relative">
                <div className="absolute -left-[33px] top-0 w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs">
                  <Wheat className="w-3.5 h-3.5" />
                </div>
                <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-900 font-semibold">
                      STEP 5: CERTIFIED FINISHED FEED PACKAGING
                    </span>
                    <span className="text-xs font-bold text-emerald-800">
                      Market Ready (50kg Bags)
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-emerald-950 mt-1">
                    {targetProduct?.title || 'BioNutri Cattle Milk Booster Pellets'}
                  </h4>
                  <div className="mt-2 text-xs text-emerald-900 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <div>Crude Protein: <strong className="font-mono">{targetProduct?.crudeProtein || 22.5}%</strong></div>
                    <div>Crude Fat: <strong className="font-mono">{targetProduct?.crudeFat || 4.8}%</strong></div>
                    <div>Max Moisture: <strong className="font-mono">{targetProduct?.moisture || 9.8}%</strong></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QR Verification Card */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-neutral-900 text-white p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-lg p-1.5 flex items-center justify-center text-neutral-900 shrink-0">
                <QrCode className="w-9 h-9" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Cryptographic Feed Passport & QR</h4>
                <p className="text-[11px] text-neutral-300">
                  Farmers can scan the QR code printed on the feed bag to instantly view this exact lab dossier.
                </p>
              </div>
            </div>
            <div className="text-right text-[11px] font-mono text-neutral-400">
              HASH: 8F2A-44B1-QC98-FSSAI
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-neutral-50 px-6 py-3 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
          <span>Waste2Feed Circular Economy Verification Framework</span>
          <button
            onClick={() => setSelectedTraceabilityId(null)}
            className="px-4 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg font-medium transition-colors cursor-pointer"
          >
            Close Passport
          </button>
        </div>
      </div>
    </div>
  );
};
