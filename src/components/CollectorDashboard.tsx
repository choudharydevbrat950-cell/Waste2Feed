import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DonationItem, FoodCategory, DonationStatus } from '../types';
import { InteractiveMap } from './InteractiveMap';
import {
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  Navigation,
  Scale,
  Factory,
  Filter,
  Check,
  X,
  FileCheck2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const CollectorDashboard: React.FC = () => {
  const {
    donations,
    updateDonationStatus,
    assignCollectorToDonation,
    t,
    language,
    setSelectedTraceabilityId,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'available' | 'active' | 'map'>('available');
  const [categoryFilter, setCategoryFilter] = useState<FoodCategory | 'all'>('all');
  const [selectedDonationForWeighing, setSelectedDonationForWeighing] = useState<DonationItem | null>(null);
  const [scaleWeightKg, setScaleWeightKg] = useState<number>(0);
  const [driverNotes, setDriverNotes] = useState('Collected in clean food-grade drums. Tare weight verified.');

  const availableDonations = donations.filter(
    (d) => d.status === 'submitted' && (categoryFilter === 'all' || d.category === categoryFilter)
  );

  const activeFleetTasks = donations.filter(
    (d) =>
      (d.status === 'collector_assigned' ||
        d.status === 'pickup_scheduled' ||
        d.status === 'on_the_way' ||
        d.status === 'collected') &&
      (categoryFilter === 'all' || d.category === categoryFilter)
  );

  const completedPickups = donations.filter(
    (d) =>
      d.status === 'delivered_to_facility' ||
      d.status === 'inspection_completed' ||
      d.status === 'accepted_for_feed'
  );

  const handleAcceptPickup = (donation: DonationItem) => {
    assignCollectorToDonation(
      donation.id,
      'EcoHaul Clean Fleet #12',
      'DL-1AB-4812'
    );
    setActiveTab('active');
  };

  const handleAdvanceStatus = (donation: DonationItem, nextStatus: DonationStatus) => {
    if (nextStatus === 'collected') {
      setSelectedDonationForWeighing(donation);
      setScaleWeightKg(donation.quantityKg);
      return;
    }
    updateDonationStatus(donation.id, nextStatus);
  };

  const handleConfirmWeighing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDonationForWeighing) return;

    updateDonationStatus(selectedDonationForWeighing.id, 'collected', {
      actualCollectedKg: scaleWeightKg,
      collectedAt: new Date().toISOString(),
      specialInstructions: driverNotes,
    });

    setSelectedDonationForWeighing(null);
  };

  const handleDeliverToMill = (donation: DonationItem) => {
    updateDonationStatus(donation.id, 'delivered_to_facility', {
      deliveredAt: new Date().toISOString(),
      facilityId: 'fac-1',
      facilityName: 'NutriFeed BioTech Hub #1',
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Fleet Header */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 font-semibold">
              <Truck className="w-4 h-4 text-emerald-700" />
              <span>COLLECTION PARTNER FLEET DISPATCH</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
              {language === 'en'
                ? 'Clean Bio-Fleet Logistics Console'
                : 'स्वच्छ बायो-वाहन लॉजिस्टिक्स कंसोल'}
            </h1>
            <p className="text-xs text-neutral-500">
              {language === 'en'
                ? 'Authorized collection partners transport pre-consumer surplus to regional bio-processing mills.'
                : 'अधिकृत संग्रहण भागीदार अधिशेष अपशिष्ट को क्षेत्रीय बायो-मिलों तक पहुंचाते हैं।'}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 text-xs shrink-0">
            <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
              <span className="text-emerald-700 block text-[11px]">Active Fleet</span>
              <span className="text-sm font-bold text-emerald-950 font-mono">14 EV Vans</span>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 p-2.5 rounded-xl">
              <span className="text-neutral-500 block text-[11px]">Daily Diverted</span>
              <span className="text-sm font-bold text-neutral-900 font-mono">3,480 kg</span>
            </div>
          </div>
        </div>

        {/* Tab Controls & Category Filter */}
        <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl text-xs font-medium">
            <button
              onClick={() => setActiveTab('available')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'available'
                  ? 'bg-white text-emerald-950 font-bold shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Available Pickups ({availableDonations.length})
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'active'
                  ? 'bg-white text-emerald-950 font-bold shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              My In-Progress Fleet ({activeFleetTasks.length})
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'map'
                  ? 'bg-white text-emerald-950 font-bold shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Interactive Map
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-neutral-500" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as FoodCategory | 'all')}
              className="bg-white border border-neutral-300 rounded-lg px-2.5 py-1.5 text-xs font-medium cursor-pointer focus:outline-emerald-600"
            >
              <option value="all">All Waste Streams</option>
              <option value="bakery_grains">{t.categories.bakery_grains}</option>
              <option value="brewers_grain">{t.categories.brewers_grain}</option>
              <option value="fresh_vegetables_fruits">{t.categories.fresh_vegetables_fruits}</option>
              <option value="fruit_pulp_peels">{t.categories.fruit_pulp_peels}</option>
              <option value="pre_consumer_grains">{t.categories.pre_consumer_grains}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Map View */}
      {activeTab === 'map' && (
        <InteractiveMap filterCategory={categoryFilter} />
      )}

      {/* Available Pickups Tab */}
      {activeTab === 'available' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
            <span>Showing verified food waste listings awaiting pickup partner assignment</span>
            <span className="font-mono">{availableDonations.length} available</span>
          </div>

          {availableDonations.length === 0 ? (
            <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center text-neutral-500">
              <Truck className="w-10 h-10 text-neutral-400 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-semibold">No pending pickups in this category</p>
              <p className="text-xs text-neutral-400 mt-1">Check back shortly or view in-progress fleet tasks.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableDonations.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-800">
                        {item.id} · {item.donorType}
                      </span>
                      <span className="text-xs font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded font-mono tabular-nums">
                        {item.quantityKg} kg
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-neutral-900">{item.title}</h4>
                      <p className="text-xs text-neutral-500 mt-0.5">{item.donorName}</p>
                    </div>

                    <p className="text-xs text-neutral-600 line-clamp-2">{item.description}</p>

                    <div className="space-y-1 text-xs text-neutral-500 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span className="truncate">{item.location.address}, {item.location.city}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span>Pickup: {item.pickupWindowStart} - {item.pickupWindowEnd}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Storage: {item.storageCondition} (Generated {item.timeSinceGenerationHours}h ago)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedTraceabilityId(item.id)}
                      className="text-xs font-medium text-neutral-600 hover:text-neutral-900 cursor-pointer"
                    >
                      Inspect Source
                    </button>
                    <button
                      onClick={() => handleAcceptPickup(item)}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>{t.actions.acceptPickup}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Active In-Progress Fleet Tasks */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
            <span>Fleet tasks under transit or pending delivery to bio-processing mills</span>
            <span className="font-mono">{activeFleetTasks.length} active</span>
          </div>

          {activeFleetTasks.length === 0 ? (
            <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center text-neutral-500">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2 opacity-60" />
              <p className="text-sm font-semibold">All assigned pickups completed</p>
              <p className="text-xs text-neutral-400 mt-1">Accept new available pickups from the first tab.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeFleetTasks.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-mono font-bold text-emerald-800">{item.id}</span>
                        <span aria-hidden="true" className="text-neutral-300">·</span>
                        <span className="text-neutral-700 font-semibold">{item.donorName}</span>
                      </div>
                      <h4 className="text-sm font-bold text-neutral-900 mt-0.5">{item.title}</h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {t.statuses[item.status]}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-600 bg-neutral-50 p-3.5 rounded-xl border border-neutral-100">
                    <div>
                      <span className="text-neutral-400 block text-[11px]">Location & Contact</span>
                      <strong className="text-neutral-800">{item.location.address}</strong>
                      <span className="block text-neutral-500">{item.donorPhone}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[11px]">Assigned Fleet</span>
                      <strong className="text-neutral-800">{item.assignedCollectorName || 'EcoHaul Clean Fleet #12'}</strong>
                      <span className="block text-neutral-500">Vehicle DL-1AB-4812</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[11px]">Tare / Load</span>
                      <strong className="text-neutral-800 font-mono">{item.quantityKg} kg expected</strong>
                      <span className="block text-neutral-500">Destination: NutriFeed BioTech Hub #1</span>
                    </div>
                  </div>

                  {/* Flow Action Controls */}
                  <div className="flex flex-wrap items-center justify-end gap-2.5 pt-1">
                    {item.status === 'collector_assigned' && (
                      <button
                        onClick={() => handleAdvanceStatus(item, 'on_the_way')}
                        className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>{t.actions.startRoute}</span>
                      </button>
                    )}

                    {item.status === 'on_the_way' && (
                      <button
                        onClick={() => handleAdvanceStatus(item, 'collected')}
                        className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                      >
                        <Scale className="w-3.5 h-3.5" />
                        <span>Weigh on Digital Scale & Collect</span>
                      </button>
                    )}

                    {item.status === 'collected' && (
                      <button
                        onClick={() => handleDeliverToMill(item)}
                        className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                      >
                        <Factory className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Deliver to Bio-Mill (NutriFeed Hub #1)</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Digital Weighing Scale Modal */}
      {selectedDonationForWeighing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-sm">
          <div className="bg-white max-w-md w-full rounded-2xl shadow-xl border border-neutral-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-700" />
                <h3 className="text-base font-bold text-neutral-900">Digital Scale Weight Verification</h3>
              </div>
              <button
                onClick={() => setSelectedDonationForWeighing(null)}
                className="text-neutral-400 hover:text-neutral-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmWeighing} className="space-y-4 text-xs">
              <div>
                <span className="text-neutral-500 block mb-1">Donation Reference:</span>
                <strong className="text-neutral-900 font-mono text-sm block">
                  {selectedDonationForWeighing.id} — {selectedDonationForWeighing.title}
                </strong>
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1">
                  Actual Scale Net Weight (kg) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    min={1}
                    value={scaleWeightKg}
                    onChange={(e) => setScaleWeightKg(Number(e.target.value))}
                    className="w-full text-base font-bold px-3 py-2 border border-neutral-300 rounded-lg focus:outline-emerald-600 font-mono"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-neutral-400 font-semibold">kg</span>
                </div>
                <span className="text-[11px] text-neutral-400 mt-1 block">
                  Donor estimated: {selectedDonationForWeighing.quantityKg} kg
                </span>
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1">
                  Driver Inspection & Seal Notes
                </label>
                <textarea
                  rows={2}
                  value={driverNotes}
                  onChange={(e) => setDriverNotes(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-emerald-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDonationForWeighing(null)}
                  className="px-3 py-1.5 border border-neutral-300 rounded-lg text-neutral-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Confirm Weight & Mark Collected
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
