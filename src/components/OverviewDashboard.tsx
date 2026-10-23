import React from 'react';
import { useApp } from '../context/AppContext';
import { InteractiveMap } from './InteractiveMap';
import {
  Recycle,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Store,
  Truck,
  Factory,
  Tractor,
  Scale,
  Leaf,
  Droplets,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

export const OverviewDashboard: React.FC = () => {
  const {
    setCurrentTab,
    setCurrentRole,
    impactMetrics,
    donations,
    products,
    language,
    t,
    setShowSafetyModal,
    setShowOnboarding,
    setSelectedTraceabilityId,
  } = useApp();

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-neutral-900 text-white shadow-xl min-h-[460px] flex items-center">
        <img
          src="/src/assets/images/hero_circular_economy_1792718551498.jpg"
          alt="Waste2Feed Circular Bio-Economy in Action"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/80 to-transparent"></div>

        <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-mono font-medium border border-emerald-700/60">
            <Recycle className="w-3.5 h-3.5 text-emerald-300" />
            <span>CLOSED-LOOP CIRCULAR BIO-ECONOMY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight font-sans">
            {language === 'en'
              ? 'Donate Food Waste. Create Animal Feed. Protect Our Planet.'
              : 'भोजन अपशिष्ट दान करें। पशु आहार बनाएं। धरती बचाएं।'}
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-xl">
            {language === 'en'
              ? 'Connecting restaurants, supermarkets, and food processors with certified collection partners and bio-mills to turn surplus organic waste into safe, nutritious, low-cost animal feed.'
              : 'रेस्तरां, सुपरमार्केट और खाद्य उद्योगों को प्रमाणित वाहनों और बायो-मिलों से जोड़कर अपशिष्ट को सुरक्षित, पौष्टिक और किफायती पशु आहार में बदलना।'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setCurrentRole('donor');
                setCurrentTab('donate');
              }}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-emerald-600/30 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>{t.actions.donateNow}</span>
            </button>

            <button
              onClick={() => {
                setCurrentRole('farmer');
                setCurrentTab('marketplace');
              }}
              className="px-5 py-3 bg-white hover:bg-neutral-100 text-emerald-950 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <Tractor className="w-4 h-4 text-emerald-700" />
              <span>{t.actions.buyFeed}</span>
            </button>

            <button
              onClick={() => setShowOnboarding(true)}
              className="px-4 py-3 bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-200 border border-emerald-700/50 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              <span>{language === 'en' ? 'Interactive Guide' : 'प्रक्रिया समझें'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4-Metric Full-Width KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-semibold text-neutral-500">Diverted from Landfills</span>
            <Scale className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-neutral-900 font-mono tabular-nums">
            {impactMetrics.totalCollectedKg.toLocaleString()} <span className="text-xs font-normal text-neutral-400">kg</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">100% digital scale verified</span>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-semibold text-neutral-500">CO₂e Emissions Avoided</span>
            <Leaf className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-emerald-800 font-mono tabular-nums">
            {impactMetrics.ghgEmissionsAvoidedKgCO2e.toLocaleString()} <span className="text-xs font-normal text-neutral-400">kg CO₂e</span>
          </div>
          <span className="text-[11px] text-neutral-500 font-medium">EPA WARM Standard</span>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-semibold text-neutral-500">Safe Feed Produced</span>
            <Factory className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-neutral-900 font-mono tabular-nums">
            {impactMetrics.totalFeedProducedKg.toLocaleString()} <span className="text-xs font-normal text-neutral-400">kg</span>
          </div>
          <span className="text-[11px] text-neutral-500 font-medium">High protein cattle & poultry</span>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-semibold text-neutral-500">Freshwater Conserved</span>
            <Droplets className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-900 font-mono tabular-nums">
            {(impactMetrics.waterSavingsLitres / 1000).toFixed(1)} <span className="text-xs font-normal text-neutral-400">kL</span>
          </div>
          <span className="text-[11px] text-blue-700 font-medium">Replaces virgin crop demand</span>
        </div>
      </div>

      {/* The 4-Step Closed Loop Flow */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">
              {language === 'en'
                ? 'How the Waste2Feed Circular System Operates'
                : 'वेस्ट2फीड चक्रीय प्रणाली कैसे कार्य करती है'}
            </h2>
            <p className="text-xs text-neutral-500">
              {language === 'en'
                ? 'A fully verified, legally compliant, temperature-monitored supply chain'
                : 'पूर्णतः सत्यापित, कानूनी रूप से वैध और तापमान नियंत्रित आपूर्ति श्रृंखला'}
            </p>
          </div>
          <button
            onClick={() => setShowSafetyModal(true)}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>FSSAI Quality & Safety Rules</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Step 1 */}
          <div
            onClick={() => {
              setCurrentRole('donor');
              setCurrentTab('donate');
            }}
            className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs hover:border-emerald-400 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
              <Store className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-emerald-800">01. FOOD DONATION</div>
            <h3 className="text-sm font-bold text-neutral-900 mt-1">Donors List Surplus</h3>
            <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
              Bakeries, wholesale mandis, juice processors, and hotels register clean, pre-consumer organic surplus in under 2 minutes.
            </p>
          </div>

          {/* Step 2 */}
          <div
            onClick={() => {
              setCurrentRole('collector');
              setCurrentTab('collections');
            }}
            className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs hover:border-emerald-400 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
              <Truck className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-emerald-800">02. CERTIFIED FLEET</div>
            <h3 className="text-sm font-bold text-neutral-900 mt-1">Smart Pickup & Weighing</h3>
            <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
              Authorized collection fleets claim nearby pickups, weigh on digital scales, and transport materials in covered food-grade bins.
            </p>
          </div>

          {/* Step 3 */}
          <div
            onClick={() => {
              setCurrentRole('processor');
              setCurrentTab('processing');
            }}
            className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs hover:border-emerald-400 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
              <Factory className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-emerald-800">03. THERMAL BIO-MILL</div>
            <h3 className="text-sm font-bold text-neutral-900 mt-1">Extrusion & Quality Control</h3>
            <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
              Materials undergo moisture and mold testing, followed by thermal extrusion at 118°C to destroy pathogens and formulate feed.
            </p>
          </div>

          {/* Step 4 */}
          <div
            onClick={() => {
              setCurrentRole('farmer');
              setCurrentTab('marketplace');
            }}
            className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs hover:border-emerald-400 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
              <Tractor className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-emerald-800">04. LIVESTOCK NOURISHMENT</div>
            <h3 className="text-sm font-bold text-neutral-900 mt-1">Affordable Feed for Farmers</h3>
            <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
              Dairy, poultry, and fish farmers purchase tested, high-protein feed at 30-40% savings with cryptographic batch QR codes.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Logistics Map Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">
              {language === 'en' ? 'Live Regional Circular Grid' : 'लाइव क्षेत्रीय ग्रिड'}
            </h2>
            <p className="text-xs text-neutral-500">
              Interactive geographic tracking of donors, collection fleets, and bio-mills
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('collections')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Full Logistics Console</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <InteractiveMap />
      </div>

      {/* Featured Feed Products & Recent Donations 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Available Feed Products */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                {language === 'en' ? 'Upcycled Animal Feed Catalog' : 'उपलब्ध पशु आहार कैटलॉग'}
              </h3>
              <p className="text-xs text-neutral-500">Ready for farm dispatch in 50kg bags</p>
            </div>
            <button
              onClick={() => setCurrentTab('marketplace')}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {products.slice(0, 2).map((prod) => (
              <div
                key={prod.id}
                className="p-3.5 rounded-xl border border-neutral-200 hover:border-emerald-300 transition-all flex items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase">
                    {t.species[prod.species]} · Protein: {prod.crudeProtein}%
                  </span>
                  <h4 className="text-xs font-bold text-neutral-900">{prod.title}</h4>
                  <div className="text-[11px] text-neutral-500 font-mono">
                    ₹{prod.pricePerBagInr} / 50kg bag · {prod.availableBags} bags available
                  </div>
                </div>

                <button
                  onClick={() => setSelectedTraceabilityId(prod.batchId)}
                  className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Verify QC
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Active Organic Surplus Streams */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                {language === 'en' ? 'Active Surplus Donations' : 'सक्रिय भोजन अपशिष्ट दान'}
              </h3>
              <p className="text-xs text-neutral-500">Live streams in the collection pipeline</p>
            </div>
            <button
              onClick={() => setCurrentTab('donate')}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
            >
              <span>Donate</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {donations.slice(0, 2).map((d) => (
              <div
                key={d.id}
                className="p-3.5 rounded-xl border border-neutral-200 hover:border-emerald-300 transition-all flex items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono font-bold text-emerald-800">{d.id}</span>
                    <span className="text-neutral-500">· {d.quantityKg} kg</span>
                  </div>
                  <h4 className="text-xs font-bold text-neutral-900">{d.title}</h4>
                  <div className="text-[11px] text-neutral-500 truncate max-w-[280px]">
                    {d.donorName} ({d.location.city})
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md shrink-0">
                  {t.statuses[d.status]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
