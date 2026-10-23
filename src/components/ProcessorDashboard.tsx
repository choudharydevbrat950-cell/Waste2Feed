import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DonationItem, AnimalSpecies, QualityInspection, ProcessingBatch } from '../types';
import {
  Factory,
  FlaskConical,
  Flame,
  CheckCircle2,
  XCircle,
  FileCheck,
  Scale,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldAlert,
  Wheat,
  Thermometer,
} from 'lucide-react';

export const ProcessorDashboard: React.FC = () => {
  const {
    donations,
    inspections,
    addInspection,
    batches,
    createBatch,
    t,
    language,
    setSelectedTraceabilityId,
    setShowSafetyModal,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'intake' | 'qc' | 'batching' | 'batches'>('intake');

  // QC Form State
  const [selectedDonationForQC, setSelectedDonationForQC] = useState<DonationItem | null>(null);
  const [inspectorName, setInspectorName] = useState('Dr. Ramesh Sharma (Feed Technologist, FSSAI Certified)');
  const [moisture, setMoisture] = useState<number>(12.5);
  const [temperature, setTemperature] = useState<number>(23.0);
  const [visualMold, setVisualMold] = useState<boolean>(false);
  const [foreignMatter, setForeignMatter] = useState<boolean>(false);
  const [foulOdor, setFoulOdor] = useState<boolean>(false);
  const [selectedSpecies, setSelectedSpecies] = useState<AnimalSpecies[]>(['dairy_cattle', 'poultry']);
  const [qcNotes, setQcNotes] = useState('Clean starch purity verified. High digestible fiber, free of toxic mycotoxins.');

  // Batch Form State
  const [batchName, setBatchName] = useState('BioNutri Pro Cattle Meal Pellets');
  const [targetSpecies, setTargetSpecies] = useState<AnimalSpecies>('dairy_cattle');
  const [thermalTemp, setThermalTemp] = useState<number>(118);
  const [proteinContent, setProteinContent] = useState<number>(22.5);
  const [crudeFiber, setCrudeFiber] = useState<number>(12.0);
  const [selectedInputIds, setSelectedInputIds] = useState<string[]>([]);

  // Delivered donations awaiting QC
  const deliveredAwaitingQC = donations.filter(
    (d) => d.status === 'delivered_to_facility' || d.status === 'collected'
  );

  // Accepted donations ready for batching (not yet in a batch)
  const acceptedForBatching = donations.filter(
    (d) => d.status === 'accepted_for_feed' && !d.batchId
  );

  const handleStartQC = (donation: DonationItem) => {
    setSelectedDonationForQC(donation);
    // set realistic defaults based on category
    if (donation.category === 'brewers_grain') {
      setMoisture(68.0);
      setQcNotes('High moisture brewer grain. Pre-drying and screw press required before 118°C drum dehydration.');
    } else if (donation.category === 'bakery_grains') {
      setMoisture(11.4);
      setQcNotes('Dry bakery residuals. Starch gelatinization test normal. Water activity < 0.65.');
    } else {
      setMoisture(25.0);
      setQcNotes('Fresh vegetable surplus. High carotene and mineral value. Approved.');
    }
    setActiveTab('qc');
  };

  const handleSubmitQC = (e: React.FormEvent, approved: boolean) => {
    e.preventDefault();
    if (!selectedDonationForQC) return;

    const qcScore = approved && !visualMold && !foreignMatter && !foulOdor ? 96 : 42;

    addInspection({
      donationId: selectedDonationForQC.id,
      facilityId: 'fac-1',
      inspectorName,
      moisturePercentage: moisture,
      temperatureCelsius: temperature,
      visualMoldPresent: visualMold,
      foreignMatterPresent: foreignMatter,
      foulOdorDetected: foulOdor,
      feedSafetyCompliance: approved && !visualMold && !foreignMatter && !foulOdor,
      eligibleSpecies: selectedSpecies,
      status: approved && !visualMold && !foreignMatter && !foulOdor
        ? 'passed_for_processing'
        : 'rejected_diverted_to_compost',
      qcScore,
      notes: qcNotes,
    });

    setSelectedDonationForQC(null);
    setActiveTab('intake');
  };

  const toggleInputDonation = (id: string) => {
    setSelectedInputIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedInputIds.length === 0) {
      alert('Please select at least one accepted donation material for the batch.');
      return;
    }

    const totalInputWeight = donations
      .filter((d) => selectedInputIds.includes(d.id))
      .reduce((sum, d) => sum + (d.actualCollectedKg || d.quantityKg), 0);

    // Yield ~42% after thermal moisture dehydration and mineral pre-mix
    const outputFeedWeightKg = Math.round(totalInputWeight * 0.42);

    createBatch({
      facilityId: 'fac-1',
      facilityName: 'NutriFeed BioTech Hub #1 (Greater Noida)',
      status: 'packaged_ready',
      inputDonationIds: selectedInputIds,
      totalInputWeightKg: totalInputWeight,
      outputFeedWeightKg,
      conversionYieldPercentage: 42.0,
      thermalProcessingTempCelsius: thermalTemp,
      targetSpecies,
      proteinContentPercentage: proteinContent,
      moisturePercentage: 9.8,
      crudeFiberPercentage: crudeFiber,
      productSkuId: `FEED-BIO-${targetSpecies.toUpperCase()}-${Math.floor(proteinContent)}`,
      productName: batchName,
      labCertificateNumber: `CERT-FSSAI-FEED-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    });

    setSelectedInputIds([]);
    setActiveTab('batches');
  };

  return (
    <div className="space-y-6">
      {/* Mill Header */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 font-semibold">
              <Factory className="w-4 h-4 text-emerald-700" />
              <span>LICENSED BIO-PROCESSING FACILITY & FEED MILL</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
              {language === 'en'
                ? 'NutriFeed BioTech Hub #1 — Quality & Processing'
                : 'न्यूट्रीफीड बायो-हब #1 — गुणवत्ता एवं प्रसंस्करण'}
            </h1>
            <p className="text-xs text-neutral-500">
              {language === 'en'
                ? 'Thermal extrusion sterilization (118°C), mycotoxin screening, and batch formulation.'
                : '118°C पर थर्मल विसंक्रमण, गुणवत्ता परीक्षण व प्रमाणित पशु आहार निर्माण।'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSafetyModal(true)}
              className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium rounded-xl border border-neutral-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileCheck className="w-4 h-4 text-emerald-700" />
              <span>Safety Rules & Specs</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100 rounded-xl text-xs font-medium">
          <button
            onClick={() => setActiveTab('intake')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'intake'
                ? 'bg-white text-emerald-950 font-bold shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Intake Queue ({deliveredAwaitingQC.length})
          </button>
          <button
            onClick={() => setActiveTab('batching')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'batching'
                ? 'bg-white text-emerald-950 font-bold shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Formulate Extrusion Batch ({acceptedForBatching.length} ready)
          </button>
          <button
            onClick={() => setActiveTab('batches')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'batches'
                ? 'bg-white text-emerald-950 font-bold shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Production Batches ({batches.length})
          </button>
        </div>
      </div>

      {/* Intake Queue Tab */}
      {activeTab === 'intake' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
            <span>Delivered materials ready for laboratory microbiological & moisture test</span>
            <span className="font-mono">{deliveredAwaitingQC.length} awaiting QC</span>
          </div>

          {deliveredAwaitingQC.length === 0 ? (
            <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center text-neutral-500">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2 opacity-60" />
              <p className="text-sm font-semibold">No materials waiting for QC testing</p>
              <p className="text-xs text-neutral-400 mt-1">All delivered shipments have been verified.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {deliveredAwaitingQC.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono font-bold text-emerald-800">{item.id}</span>
                      <span aria-hidden="true" className="text-neutral-300">·</span>
                      <span className="text-neutral-600">{t.categories[item.category]}</span>
                      <span aria-hidden="true" className="text-neutral-300">·</span>
                      <span className="font-mono font-semibold text-neutral-900">
                        {item.actualCollectedKg || item.quantityKg} kg delivered
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-neutral-900">{item.title}</h4>
                    <p className="text-xs text-neutral-600">{item.description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 pt-1">
                      <span>Source: <strong className="text-neutral-800">{item.donorName}</strong></span>
                      <span>Delivered by: <strong className="text-neutral-800">{item.assignedCollectorName || 'EcoHaul Clean Fleet #12'}</strong></span>
                      <span>Storage: <strong className="text-neutral-800 capitalize">{item.storageCondition}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => setSelectedTraceabilityId(item.id)}
                      className="px-3.5 py-2 border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-medium rounded-xl transition-colors cursor-pointer"
                    >
                      Audit Source
                    </button>
                    <button
                      onClick={() => handleStartQC(item)}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                    >
                      <FlaskConical className="w-3.5 h-3.5" />
                      <span>{t.actions.performQC}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* QC Form Tab / Modal */}
      {activeTab === 'qc' && selectedDonationForQC && (
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 font-semibold">
                <FlaskConical className="w-4 h-4 text-emerald-700" />
                <span>LABORATORY QC & FEED SAFETY INSPECTION</span>
              </div>
              <h2 className="text-base font-bold text-neutral-900 mt-1">
                Material Inspection: {selectedDonationForQC.id} — {selectedDonationForQC.title}
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('intake')}
              className="text-xs text-neutral-500 hover:text-neutral-800 font-semibold"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Lead Feed Technologist / Inspector *
              </label>
              <input
                type="text"
                required
                value={inspectorName}
                onChange={(e) => setInspectorName(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Moisture Content Analyzer (%) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  required
                  value={moisture}
                  onChange={(e) => setMoisture(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-emerald-600 font-mono"
                />
                <span className="absolute right-3 top-2 text-xs text-neutral-400 font-bold">%</span>
              </div>
              <span className="text-[10px] text-neutral-400 mt-0.5 block">Target finished feed moisture &lt; 10%</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Receipt Temperature (°C) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  required
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-emerald-600 font-mono"
                />
                <span className="absolute right-3 top-2 text-xs text-neutral-400 font-bold">°C</span>
              </div>
            </div>
          </div>

          {/* Critical Pass / Fail Safety Toggles */}
          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-3">
            <span className="text-xs font-bold text-neutral-900 block">
              Biosecurity & Contamination Screening (Zero-Tolerance Checklist)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <label className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-neutral-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={visualMold}
                  onChange={(e) => setVisualMold(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <span className={visualMold ? 'text-red-700 font-bold' : 'text-neutral-700'}>
                  Visual Mold / Mycotoxin Presence
                </span>
              </label>

              <label className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-neutral-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={foreignMatter}
                  onChange={(e) => setForeignMatter(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <span className={foreignMatter ? 'text-red-700 font-bold' : 'text-neutral-700'}>
                  Foreign Matter (Plastic / Metal)
                </span>
              </label>

              <label className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-neutral-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={foulOdor}
                  onChange={(e) => setFoulOdor(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <span className={foulOdor ? 'text-red-700 font-bold' : 'text-neutral-700'}>
                  Putrid / Bacterial Foul Odor
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Inspection Findings & Formulator Instructions
            </label>
            <textarea
              rows={2}
              value={qcNotes}
              onChange={(e) => setQcNotes(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-emerald-600"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-100">
            <button
              type="button"
              onClick={(e) => handleSubmitQC(e, false)}
              className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <XCircle className="w-4 h-4 text-red-600" />
              <span>Reject & Divert to Municipal Compost</span>
            </button>

            <button
              type="button"
              onClick={(e) => handleSubmitQC(e, true)}
              className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Approve & Certify for Feed Extrusion</span>
            </button>
          </div>
        </div>
      )}

      {/* Batching Tab */}
      {activeTab === 'batching' && (
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="border-b border-neutral-100 pb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 font-semibold">
              <Flame className="w-4 h-4 text-emerald-700" />
              <span>THERMAL EXTRUSION BATCH COMPILATION</span>
            </div>
            <h2 className="text-base font-bold text-neutral-900 mt-1">
              Combine QC-Approved Materials into Certified Feed Batch
            </h2>
            <p className="text-xs text-neutral-500">
              Select verified source materials. Each input will be cryptographically linked to the batch ID.
            </p>
          </div>

          {/* Selectable approved materials */}
          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-2">
              Select Approved Material Inputs ({acceptedForBatching.length} available):
            </label>

            {acceptedForBatching.length === 0 ? (
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-500 text-center">
                No unbatched materials available right now. Perform QC on delivered donations first.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {acceptedForBatching.map((item) => {
                  const isChecked = selectedInputIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleInputDonation(item.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-emerald-50 border-emerald-500 shadow-xs'
                          : 'bg-white border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-emerald-800">{item.id}</span>
                        <span className="text-xs font-bold text-neutral-900 font-mono">
                          {item.actualCollectedKg || item.quantityKg} kg
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-neutral-900 mt-1">{item.title}</h4>
                      <div className="text-[11px] text-neutral-500 mt-1">{item.donorName}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <form onSubmit={handleCreateBatch} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Finished Feed Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={batchName}
                  onChange={(e) => setBatchName(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Target Livestock Species *
                </label>
                <select
                  value={targetSpecies}
                  onChange={(e) => setTargetSpecies(e.target.value as AnimalSpecies)}
                  className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-emerald-600 bg-white"
                >
                  <option value="dairy_cattle">Dairy Cattle & Bovine</option>
                  <option value="poultry">Broiler & Layer Poultry</option>
                  <option value="aquaculture">Aquaculture / Fish</option>
                  <option value="swine">Swine / Piggery</option>
                  <option value="goat_sheep">Goat & Sheep</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Thermal Sterilization Extruder Temp (°C) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={70}
                    max={140}
                    required
                    value={thermalTemp}
                    onChange={(e) => setThermalTemp(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-emerald-600 font-mono"
                  />
                  <span className="absolute right-3 top-2 text-xs text-neutral-400 font-bold">°C</span>
                </div>
                <span className="text-[10px] text-neutral-400 mt-0.5 block">Minimum 70°C for pathogen elimination</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Guaranteed Crude Protein (%) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    min={5}
                    max={50}
                    required
                    value={proteinContent}
                    onChange={(e) => setProteinContent(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-emerald-600 font-mono"
                  />
                  <span className="absolute right-3 top-2 text-xs text-neutral-400 font-bold">%</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end">
              <button
                type="submit"
                disabled={selectedInputIds.length === 0}
                className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span>Execute Batch & Publish to Marketplace</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Batches Ledger Tab */}
      {activeTab === 'batches' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
            <span>Verified production batches with lab certifications</span>
            <span className="font-mono">{batches.length} completed batches</span>
          </div>

          <div className="space-y-4">
            {batches.map((b) => (
              <div
                key={b.id}
                className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono font-bold text-emerald-800">{b.id}</span>
                      <span aria-hidden="true" className="text-neutral-300">·</span>
                      <span className="text-emerald-950 font-semibold capitalize">{t.species[b.targetSpecies]}</span>
                    </div>
                    <h4 className="text-sm font-bold text-neutral-900 mt-0.5">{b.productName}</h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      {b.labCertificateNumber}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-neutral-600 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Input Organic Mass</span>
                    <strong className="text-neutral-800 font-mono">{b.totalInputWeightKg} kg</strong>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Finished Feed Yield</span>
                    <strong className="text-emerald-800 font-mono">{b.outputFeedWeightKg} kg (~{Math.floor(b.outputFeedWeightKg/50)} bags)</strong>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Thermal Kill Temp</span>
                    <strong className="text-neutral-800 font-mono">{b.thermalProcessingTempCelsius}°C</strong>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Crude Protein</span>
                    <strong className="text-neutral-800 font-mono">{b.proteinContentPercentage}%</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="text-xs text-neutral-500">
                    Linked Donations: <span className="font-mono text-neutral-700">{b.inputDonationIds.join(', ')}</span>
                  </div>

                  <button
                    onClick={() => setSelectedTraceabilityId(b.id)}
                    className="px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Provenance Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
