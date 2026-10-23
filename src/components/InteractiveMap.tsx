import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DonationItem, FoodCategory } from '../types';
import {
  MapPin,
  Truck,
  Factory,
  Store,
  Navigation,
  CheckCircle,
  Filter,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface InteractiveMapProps {
  onSelectDonation?: (donation: DonationItem) => void;
  selectedDonationId?: string;
  filterCategory?: FoodCategory | 'all';
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  onSelectDonation,
  selectedDonationId,
  filterCategory = 'all',
}) => {
  const { donations, assignCollectorToDonation, t, language, setSelectedTraceabilityId } = useApp();

  const [activePin, setActivePin] = useState<DonationItem | null>(null);
  const [radiusKm, setRadiusKm] = useState<number>(30);
  const [mapLayer, setMapLayer] = useState<'all' | 'pending' | 'hubs'>('all');

  // Facilities data for the map
  const facilities = [
    {
      id: 'fac-1',
      name: 'NutriFeed BioTech Hub #1',
      type: 'mill',
      lat: 28.4744,
      lng: 77.5040,
      address: 'Ecotech III, Greater Noida',
      capacity: '50 MT / day processing',
    },
    {
      id: 'fac-2',
      name: 'Pragati BioFeed Innovations',
      type: 'mill',
      lat: 28.9931,
      lng: 77.0151,
      address: 'Sonipat Agro Hub, Haryana',
      capacity: '30 MT / day processing',
    },
  ];

  // Vehicles simulated
  const fleet = [
    { id: 'v-1', name: 'EcoHaul Clean Fleet #12', lat: 28.5700, lng: 77.3000, status: 'Active Pickup' },
    { id: 'v-2', name: 'AgroLogistics Green Van 4', lat: 28.4800, lng: 77.1000, status: 'En Route to Mill' },
  ];

  const filteredDonations = donations.filter((d) => {
    if (filterCategory !== 'all' && d.category !== filterCategory) return false;
    if (mapLayer === 'pending' && (d.status !== 'submitted' && d.status !== 'collector_assigned')) return false;
    return true;
  });

  // Convert lat/lng to SVG coordinates
  // Normalized around Delhi/NCR bounds approx: lat 28.35 - 29.1, lng 76.9 - 77.6
  const minLat = 28.35, maxLat = 29.15;
  const minLng = 76.85, maxLng = 77.65;

  const toSvgCoords = (lat: number, lng: number) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * 800;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 500;
    return {
      x: Math.max(40, Math.min(760, x)),
      y: Math.max(30, Math.min(470, y)),
    };
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
      {/* Map Control Bar */}
      <div className="p-4 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 bg-neutral-50/70">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-900">
              {language === 'en' ? 'Live Circular Logistics Map' : 'लाइव सर्कुलर लॉजिस्टिक्स मैप'}
            </h3>
            <p className="text-xs text-neutral-500">
              {language === 'en'
                ? 'Discover surplus donations, collection vehicles & bio-mills'
                : 'उपलब्ध अपशिष्ट दान, संग्रहण वाहन और प्रोसेसिंग मिल देखें'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Radius Filter */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-600">
            <span>Radius:</span>
            <select
              value={radiusKm}
              onChange={(e) => setRadiusKm(Number(e.target.value))}
              className="bg-white border border-neutral-300 rounded-md px-2 py-1 text-xs font-medium cursor-pointer focus:outline-emerald-600"
            >
              <option value={15}>15 km</option>
              <option value={30}>30 km</option>
              <option value={50}>50 km</option>
              <option value={100}>All Region</option>
            </select>
          </div>

          {/* Layer Selector */}
          <div className="flex items-center gap-1 bg-neutral-200/70 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setMapLayer('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                mapLayer === 'all' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              All Pins
            </button>
            <button
              onClick={() => setMapLayer('pending')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                mapLayer === 'pending' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Pending Pickup
            </button>
          </div>
        </div>
      </div>

      {/* SVG Canvas Map */}
      <div className="relative w-full h-[400px] sm:h-[460px] bg-emerald-950/5 overflow-hidden select-none">
        <svg
          viewBox="0 0 800 500"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Map Grid / Topography background */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
            </pattern>
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Grid pattern */}
          <rect width="800" height="500" fill="#f8fafc" />
          <rect width="800" height="500" fill="url(#grid)" />

          {/* River Yamuna Stylized Path across region */}
          <path
            d="M 520 0 Q 480 120 460 210 T 490 340 T 560 500"
            fill="none"
            stroke="#93c5fd"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M 520 0 Q 480 120 460 210 T 490 340 T 560 500"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Major Logistics Ring Road & Expressways */}
          <ellipse
            cx="400"
            cy="250"
            rx="240"
            ry="160"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="2.5"
            strokeDasharray="6 4"
          />
          <line x1="160" y1="250" x2="640" y2="250" stroke="#e2e8f0" strokeWidth="2" />
          <line x1="400" y1="90" x2="400" y2="410" stroke="#e2e8f0" strokeWidth="2" />

          {/* Hub coverage circles */}
          {facilities.map((fac) => {
            const { x, y } = toSvgCoords(fac.lat, fac.lng);
            return (
              <g key={fac.id}>
                <circle cx={x} cy={y} r="90" fill="url(#hubGlow)" />
                <circle cx={x} cy={y} r="90" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
              </g>
            );
          })}

          {/* Simulated Route Line from active donor to facility */}
          {filteredDonations.slice(0, 2).map((d, idx) => {
            const dCoords = toSvgCoords(d.location.lat, d.location.lng);
            const targetFac = facilities[0];
            const facCoords = toSvgCoords(targetFac.lat, targetFac.lng);
            return (
              <path
                key={`route-${idx}`}
                d={`M ${dCoords.x} ${dCoords.y} Q ${(dCoords.x + facCoords.x) / 2} ${(dCoords.y + facCoords.y) / 2 - 30} ${facCoords.x} ${facCoords.y}`}
                fill="none"
                stroke="#059669"
                strokeWidth="2"
                strokeDasharray="5 5"
                opacity="0.6"
              />
            );
          })}

          {/* Facilities Pins */}
          {facilities.map((fac) => {
            const { x, y } = toSvgCoords(fac.lat, fac.lng);
            return (
              <g
                key={fac.id}
                transform={`translate(${x}, ${y})`}
                className="cursor-pointer"
              >
                <circle cx="0" cy="0" r="16" fill="#047857" className="shadow-lg" />
                <circle cx="0" cy="0" r="18" fill="none" stroke="#34d399" strokeWidth="2" opacity="0.8" />
                <Factory className="w-4 h-4 text-white" x="-8" y="-8" />
                <text
                  x="0"
                  y="28"
                  textAnchor="middle"
                  className="text-[10px] font-bold fill-emerald-950 font-sans"
                  style={{ textShadow: '0 1px 2px white' }}
                >
                  {fac.name}
                </text>
              </g>
            );
          })}

          {/* Collection Fleets */}
          {fleet.map((veh) => {
            const { x, y } = toSvgCoords(veh.lat, veh.lng);
            return (
              <g key={veh.id} transform={`translate(${x}, ${y})`}>
                <rect x="-12" y="-12" width="24" height="24" rx="6" fill="#1e40af" />
                <Truck className="w-3.5 h-3.5 text-white" x="-7" y="-7" />
                <text
                  x="0"
                  y="20"
                  textAnchor="middle"
                  className="text-[9px] font-semibold fill-blue-950"
                  style={{ textShadow: '0 1px 2px white' }}
                >
                  {veh.name}
                </text>
              </g>
            );
          })}

          {/* Donation Pins */}
          {filteredDonations.map((donation) => {
            const { x, y } = toSvgCoords(donation.location.lat, donation.location.lng);
            const isSelected = selectedDonationId === donation.id || activePin?.id === donation.id;
            const isPending = donation.status === 'submitted';
            const isRejected = donation.status === 'rejected_composted';

            const fillColor = isRejected ? '#dc2626' : isPending ? '#d97706' : '#15803d';

            return (
              <g
                key={donation.id}
                transform={`translate(${x}, ${y})`}
                className="cursor-pointer transition-transform duration-150 hover:scale-125"
                onClick={() => {
                  setActivePin(donation);
                  if (onSelectDonation) onSelectDonation(donation);
                }}
              >
                {isSelected && (
                  <circle cx="0" cy="0" r="22" fill="none" stroke="#059669" strokeWidth="2" opacity="0.9" />
                )}
                <circle
                  cx="0"
                  cy="0"
                  r={isSelected ? "14" : "11"}
                  fill={fillColor}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="drop-shadow-md"
                />
                <Store className="w-3 h-3 text-white" x="-6" y="-6" />
                <text
                  x="0"
                  y="-14"
                  textAnchor="middle"
                  className="text-[10px] font-bold fill-neutral-900 font-sans"
                  style={{ textShadow: '0 1px 3px white, 0 1px 3px white' }}
                >
                  {donation.quantityKg} kg
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend Overlay */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl border border-neutral-200 text-xs shadow-md flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block border border-white"></span>
            <span className="text-neutral-700 font-medium">Available Pickup</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-700 inline-block border border-white"></span>
            <span className="text-neutral-700 font-medium">In Transit / Accepted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-emerald-800 text-white flex items-center justify-center text-[8px] font-bold">M</span>
            <span className="text-neutral-700 font-medium">Bio-Feed Mill</span>
          </div>
        </div>

        {/* Selected Pin Floating Card */}
        {activePin && (
          <div className="absolute top-3 right-3 w-80 bg-white rounded-xl shadow-xl border border-neutral-200 p-4 z-20 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[11px] font-mono text-emerald-800 font-semibold uppercase tracking-wider block">
                  {activePin.id} · {activePin.donorType}
                </span>
                <h4 className="text-sm font-bold text-neutral-900 leading-snug mt-0.5">
                  {activePin.title}
                </h4>
              </div>
              <button
                onClick={() => setActivePin(null)}
                className="text-neutral-400 hover:text-neutral-700 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 text-xs space-y-1.5 text-neutral-600">
              <div className="flex items-center justify-between">
                <span>Quantity:</span>
                <span className="font-bold text-emerald-900 font-mono tabular-nums text-sm">
                  {activePin.quantityKg} kg
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Location:</span>
                <span className="font-medium text-neutral-800 truncate max-w-[170px]">
                  {activePin.location.address}, {activePin.location.city}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Pickup Window:</span>
                <span className="font-medium text-neutral-800">
                  {activePin.pickupWindowStart} - {activePin.pickupWindowEnd}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Status:</span>
                <span className="font-semibold text-emerald-700 capitalize">
                  {activePin.status.replace(/_/g, ' ')}
                </span>
              </div>
            </div>

            {/* Action buttons inside card */}
            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center gap-2">
              {activePin.status === 'submitted' ? (
                <button
                  onClick={() => {
                    assignCollectorToDonation(
                      activePin.id,
                      'EcoHaul Clean Fleet #12',
                      'DL-1AB-4812'
                    );
                    setActivePin(null);
                  }}
                  className="w-full py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Accept Pickup Request</span>
                </button>
              ) : (
                <button
                  onClick={() => setSelectedTraceabilityId(activePin.id)}
                  className="w-full py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Inspect Traceability Chain</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
