import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FoodCategory, DonationItem } from '../types';
import {
  PlusCircle,
  Clock,
  MapPin,
  Scale,
  Sparkles,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Camera,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Building,
} from 'lucide-react';

export const DonorDashboard: React.FC = () => {
  const {
    donations,
    addDonation,
    t,
    language,
    setSelectedTraceabilityId,
    setShowSafetyModal,
  } = useApp();

  const [showForm, setShowForm] = useState(false);
  const [successDonationId, setSuccessDonationId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<FoodCategory>('bakery_grains');
  const [donorName, setDonorName] = useState('Greenfield Artisan Bakery');
  const [donorType, setDonorType] = useState<DonationItem['donorType']>('restaurant');
  const [donorPhone, setDonorPhone] = useState('+91 98201 44102');
  const [quantityKg, setQuantityKg] = useState<number>(250);
  const [description, setDescription] = useState('');
  const [storageCondition, setStorageCondition] = useState<DonationItem['storageCondition']>('dry_covered');
  const [timeSinceHours, setTimeSinceHours] = useState<number>(4);
  const [pickupWindowStart, setPickupWindowStart] = useState('09:00 AM');
  const [pickupWindowEnd, setPickupWindowEnd] = useState('01:00 PM');
  const [address, setAddress] = useState('Plot 44, Okhla Industrial Area Phase III, New Delhi');
  const [specialInstructions, setSpecialInstructions] = useState('Loading bay B, packed in food-grade crates.');
  const [safetyConfirmed, setSafetyConfirmed] = useState(false);

  // Quick Preset Helper
  const applyPreset = (preset: 'bakery' | 'brewery' | 'mandi' | 'juice') => {
    if (preset === 'bakery') {
      setTitle('Day-old Artisanal Multigrain & Wheat Breads');
      setCategory('bakery_grains');
      setDonorName('Greenfield Artisan Bakery');
      setDonorType('restaurant');
      setQuantityKg(320);
      setDescription('Unsold day-old bread, bun trimmings and whole grain flour residuals. Unseasoned and dry.');
      setStorageCondition('dry_covered');
      setTimeSinceHours(4);
      setAddress('Okhla Industrial Area Phase III, New Delhi');
      setSafetyConfirmed(true);
    } else if (preset === 'brewery') {
      setTitle('Spent Malt & Barley Mash Residuals');
      setCategory('brewers_grain');
      setDonorName('CraftBrew Biotech Beverages');
      setDonorType('food_processor');
      setQuantityKg(750);
      setDescription('High protein unfermented spent barley mash. Direct from silo batch #41.');
      setStorageCondition('refrigerated');
      setTimeSinceHours(2);
      setAddress('Sector 34 Infotech Corridor, Gurugram');
      setSafetyConfirmed(true);
    } else if (preset === 'mandi') {
      setTitle('Fresh Wholesale Vegetable Sorting Trimmings');
      setCategory('fresh_vegetables_fruits');
      setDonorName('Azadpur Wholesale Mandi Association');
      setDonorType('vegetable_market');
      setQuantityKg(550);
      setDescription('Clean surplus vegetable cuttings: spinach, cabbage outer leaves, carrot trimmings.');
      setStorageCondition('ambient');
      setTimeSinceHours(3);
      setAddress('Shed C-12, Main Mandi Yard, Delhi');
      setSafetyConfirmed(true);
    } else if (preset === 'juice') {
      setTitle('Fresh Pressed Citrus & Pomegranate Pomace');
      setCategory('fruit_pulp_peels');
      setDonorName('PureNectar Cold Pressed Juices');
      setDonorType('food_processor');
      setQuantityKg(400);
      setDescription('Clean fruit pomace after cold-press extraction. Sealed in food grade drums.');
      setStorageCondition('dry_covered');
      setTimeSinceHours(3);
      setAddress('Udyog Vihar Phase IV, Gurugram');
      setSafetyConfirmed(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!safetyConfirmed) {
      alert('Please confirm the FSSAI animal feed safety checklist before submitting.');
      return;
    }

    const newId = addDonation({
      title,
      category,
      donorId: 'usr-donor-current',
      donorName,
      donorType,
      donorPhone,
      quantityKg,
      description,
      imageUrl: '/src/assets/images/food_donor_produce_1792718551739.jpg',
      storageCondition,
      timeSinceGenerationHours: timeSinceHours,
      pickupWindowStart,
      pickupWindowEnd,
      location: {
        lat: 28.5355,
        lng: 77.3910,
        address,
        city: 'Delhi NCR',
      },
      specialInstructions,
      suitableForAnimalFeed: true,
    });

    setSuccessDonationId(newId);
    setShowForm(false);
  };

  const donorDonations = donations;

  return (
    <div className="space-y-6">
      {/* Donor Hero Strip */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-800/80 text-emerald-200 text-xs font-mono font-medium">
            <Building className="w-3.5 h-3.5 text-emerald-300" />
            <span>FOOD DONOR PORTAL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {language === 'en'
              ? 'Donate Food Waste. Protect Our Planet.'
              : 'भोजन अपशिष्ट दान करें। धरती बचाएं।'}
          </h1>
          <p className="text-sm text-emerald-100/90 leading-relaxed">
            {language === 'en'
              ? 'Connect your restaurant, hotel, supermarket, or food facility with authorized collectors. We redirect your organic surplus directly into certified bio-mills for animal feed production.'
              : 'अपने रेस्तरां, होटल या उद्योग के अपशिष्ट को अधिकृत वाहनों से जोड़ें। हम आपके अवशेष को सुरक्षित पशु आहार निर्माण हेतु भेजते हैं।'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setShowForm(true);
                setSuccessDonationId(null);
              }}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{language === 'en' ? 'Create New Donation (< 2 Mins)' : 'नया दान दर्ज करें (< 2 मिनट)'}</span>
            </button>
            <button
              onClick={() => setShowSafetyModal(true)}
              className="px-4 py-2.5 bg-emerald-800/60 hover:bg-emerald-800 text-emerald-100 border border-emerald-700/60 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <FileCheck className="w-4 h-4 text-emerald-300" />
              <span>{language === 'en' ? 'Check Eligible Materials' : 'पात्र सामग्री जांचें'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Success Banner */}
      {successDonationId && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 text-emerald-950 animate-in fade-in duration-200">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-700">
                  DONATION REGISTERED · ID: {successDonationId}
                </span>
                <button
                  onClick={() => setSuccessDonationId(null)}
                  className="text-neutral-400 hover:text-neutral-700 text-xs font-bold"
                >
                  ✕
                </button>
              </div>
              <h3 className="text-base font-bold text-emerald-950">
                {language === 'en'
                  ? 'Pickup Request Broadcast to Nearby Authorized Fleets!'
                  : 'उठाव अनुरोध नजदीकी अधिकृत वाहनों को भेजा गया!'}
              </h3>
              <p className="text-xs text-emerald-800">
                {language === 'en'
                  ? 'Our automated routing algorithm is matching collection partners within 15 km. You will receive an instant notification once accepted.'
                  : 'हमारा सिस्टम 15 किमी के दायरे में वाहन नियुक्त कर रहा है। स्वीकृत होते ही आपको सूचना मिलेगी।'}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="bg-white/80 p-2.5 rounded-lg border border-emerald-200">
                  <span className="text-neutral-500 block text-[11px]">CO₂e Avoided</span>
                  <span className="font-bold text-emerald-700 font-mono text-sm">~612.5 kg CO₂e</span>
                </div>
                <div className="bg-white/80 p-2.5 rounded-lg border border-emerald-200">
                  <span className="text-neutral-500 block text-[11px]">Expected Feed Yield</span>
                  <span className="font-bold text-emerald-700 font-mono text-sm">~105 kg Feed</span>
                </div>
                <div className="bg-white/80 p-2.5 rounded-lg border border-emerald-200">
                  <span className="text-neutral-500 block text-[11px]">Diversion Status</span>
                  <span className="font-bold text-emerald-700 text-sm">100% Landfill Free</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Donation Modal / Drawer */}
      {showForm && (
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-5">
            <div>
              <h2 className="text-base font-bold text-neutral-900">
                {language === 'en' ? 'Submit Food Waste Donation' : 'भोजन अपशिष्ट दान दर्ज करें'}
              </h2>
              <p className="text-xs text-neutral-500">
                {language === 'en'
                  ? 'Provide accurate material details for FSSAI compliance and rapid collector dispatch.'
                  : 'सटीक विवरण भरें ताकि वाहन तुरंत उठाव कर सके।'}
              </p>
            </div>
            <button
              onClick={() => setShowForm(false)}
              className="text-neutral-400 hover:text-neutral-700 text-xs font-semibold px-2 py-1 rounded-md"
            >
              Cancel
            </button>
          </div>

          {/* 1-Click Demo Presets */}
          <div className="mb-6 bg-neutral-50 p-3.5 rounded-xl border border-neutral-200">
            <span className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider block mb-2">
              ⚡ Quick Fill Presets (1-Click Fill)
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => applyPreset('bakery')}
                className="px-2.5 py-1.5 bg-white hover:bg-neutral-100 text-neutral-700 rounded-lg text-xs font-medium border border-neutral-200 transition-colors cursor-pointer"
              >
                🥖 Artisan Bakery (320 kg)
              </button>
              <button
                type="button"
                onClick={() => applyPreset('brewery')}
                className="px-2.5 py-1.5 bg-white hover:bg-neutral-100 text-neutral-700 rounded-lg text-xs font-medium border border-neutral-200 transition-colors cursor-pointer"
              >
                🌾 Brewery Spent Grain (750 kg)
              </button>
              <button
                type="button"
                onClick={() => applyPreset('mandi')}
                className="px-2.5 py-1.5 bg-white hover:bg-neutral-100 text-neutral-700 rounded-lg text-xs font-medium border border-neutral-200 transition-colors cursor-pointer"
              >
                🥦 Mandi Veg Trimmings (550 kg)
              </button>
              <button
                type="button"
                onClick={() => applyPreset('juice')}
                className="px-2.5 py-1.5 bg-white hover:bg-neutral-100 text-neutral-700 rounded-lg text-xs font-medium border border-neutral-200 transition-colors cursor-pointer"
              >
                🍊 Fruit Pomace (400 kg)
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Food or Material Name *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Day-old Bread & Whole Wheat Residuals"
                  className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Material Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as FoodCategory)}
                  className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-emerald-600 bg-white"
                >
                  <option value="bakery_grains">{t.categories.bakery_grains}</option>
                  <option value="fresh_vegetables_fruits">{t.categories.fresh_vegetables_fruits}</option>
                  <option value="brewers_grain">{t.categories.brewers_grain}</option>
                  <option value="dairy_byproducts">{t.categories.dairy_byproducts}</option>
                  <option value="pre_consumer_grains">{t.categories.pre_consumer_grains}</option>
                  <option value="fruit_pulp_peels">{t.categories.fruit_pulp_peels}</option>
                  <option value="oilseed_meals">{t.categories.oilseed_meals}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Available Quantity (kg) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    min={10}
                    max={50000}
                    value={quantityKg}
                    onChange={(e) => setQuantityKg(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-emerald-600 font-mono"
                  />
                  <span className="absolute right-3 top-2 text-xs text-neutral-400 font-medium">kg</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Donor Organization / Facility *
                </label>
                <input
                  type="text"
                  required
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Storage Conditions *
                </label>
                <select
                  value={storageCondition}
                  onChange={(e) => setStorageCondition(e.target.value as DonationItem['storageCondition'])}
                  className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-emerald-600 bg-white"
                >
                  <option value="dry_covered">Dry & Covered (Ambient)</option>
                  <option value="refrigerated">Refrigerated (2°C - 6°C)</option>
                  <option value="frozen">Deep Frozen (-18°C)</option>
                  <option value="ambient">Ambient Open Air</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Time Since Generation (Hours) *
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  max={48}
                  value={timeSinceHours}
                  onChange={(e) => setTimeSinceHours(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-emerald-600 font-mono"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Collection Pickup Address & Gate Instructions *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, industrial block, city, landmark"
                  className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Preferred Pickup Window *
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={pickupWindowStart}
                    onChange={(e) => setPickupWindowStart(e.target.value)}
                    placeholder="09:00 AM"
                    className="w-1/2 text-xs px-3 py-2 border border-neutral-300 rounded-lg"
                  />
                  <span className="text-xs text-neutral-400">to</span>
                  <input
                    type="text"
                    value={pickupWindowEnd}
                    onChange={(e) => setPickupWindowEnd(e.target.value)}
                    placeholder="01:00 PM"
                    className="w-1/2 text-xs px-3 py-2 border border-neutral-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Donor Contact Phone *
                </label>
                <input
                  type="text"
                  required
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg font-mono"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Description & Packaging Method
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Packaging details, crates, moisture condition..."
                  className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-emerald-600"
                />
              </div>
            </div>

            {/* Regulatory Safety Checkbox */}
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={safetyConfirmed}
                  onChange={(e) => setSafetyConfirmed(e.target.checked)}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <span className="text-xs text-emerald-950 leading-relaxed">
                  <strong>Mandatory FSSAI & Animal Health Declaration:</strong> I hereby certify that this food waste is clean, pre-consumer organic surplus free from customer plate scrapings, toxic chemicals, packaging debris, and mold. It has been stored in clean food-grade conditions.
                </span>
              </label>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-neutral-300 text-xs font-medium rounded-lg text-neutral-700 hover:bg-neutral-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span>Submit Donation Listing</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Donation History Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              {language === 'en' ? 'Donation History & Status Tracking' : 'दान इतिहास व लाइव स्थिति'}
            </h3>
            <p className="text-xs text-neutral-500">
              {language === 'en'
                ? 'Track your food waste from pickup through extrusion into verified animal feed'
                : 'उठाव से लेकर पशु आहार बनने तक की संपूर्ण लाइव ट्रैकिंग'}
            </p>
          </div>
          <div className="text-xs text-neutral-500 font-mono">
            Total Logged: <strong className="text-neutral-900">{donorDonations.length} listings</strong>
          </div>
        </div>

        <div className="divide-y divide-neutral-200 overflow-x-auto">
          {donorDonations.map((item) => {
            const isAccepted = item.status === 'accepted_for_feed';
            const isRejected = item.status === 'rejected_composted';
            const isDelivered = item.status === 'delivered_to_facility' || item.status === 'inspection_completed';

            return (
              <div
                key={item.id}
                className="p-4 sm:p-5 hover:bg-neutral-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left info */}
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono font-bold text-emerald-800">{item.id}</span>
                    <span aria-hidden="true" className="text-neutral-300">·</span>
                    <span className="text-neutral-600">{t.categories[item.category]}</span>
                    <span aria-hidden="true" className="text-neutral-300">·</span>
                    <span className="text-neutral-500">{item.location.city}</span>
                  </div>

                  <h4 className="text-sm font-bold text-neutral-900">{item.title}</h4>
                  <p className="text-xs text-neutral-600 line-clamp-1">{item.description}</p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500 pt-1">
                    <span>
                      Quantity: <strong className="text-neutral-900 font-mono tabular-nums">{item.quantityKg} kg</strong>
                    </span>
                    <span>
                      Storage: <strong className="text-neutral-800 capitalize">{item.storageCondition}</strong>
                    </span>
                    {item.assignedCollectorName && (
                      <span>
                        Collector: <strong className="text-emerald-800">{item.assignedCollectorName}</strong>
                      </span>
                    )}
                  </div>
                </div>

                {/* Right status & action */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0">
                  <div className="text-left sm:text-right">
                    <span
                      className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md ${
                        isAccepted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isRejected
                          ? 'bg-red-100 text-red-800'
                          : isDelivered
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {t.statuses[item.status] || item.status}
                    </span>
                    <span className="block text-[11px] text-neutral-400 font-mono mt-0.5">
                      {new Date(item.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedTraceabilityId(item.id)}
                    className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>Traceability Passport</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
