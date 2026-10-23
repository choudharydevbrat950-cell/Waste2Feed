import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BarChart3,
  Globe2,
  Leaf,
  Droplets,
  Scale,
  Factory,
  Tractor,
  Store,
  Info,
  Calculator,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

export const ImpactDashboard: React.FC = () => {
  const { impactMetrics, language, t } = useApp();

  // Interactive Calculator State
  const [calcWeeklyKg, setCalcWeeklyKg] = useState<number>(500);

  const calcAnnualDiverted = calcWeeklyKg * 52;
  const calcAnnualCO2 = Math.round(calcAnnualDiverted * 2.45);
  const calcAnnualFeed = Math.round(calcAnnualDiverted * 0.42);
  const calcAnnualWater = Math.round(calcAnnualDiverted * 180);

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-900 text-emerald-300 text-xs font-mono font-medium">
            <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>VERIFIED CIRCULAR ENVIRONMENTAL LEDGER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {language === 'en' ? t.impact.title : t.impact.title}
          </h1>
          <p className="text-sm text-emerald-200/90 leading-relaxed">
            {language === 'en'
              ? 'Every kilogram of pre-consumer surplus diverted from landfills prevents anaerobic methane decomposition while substituting water-intensive virgin crop feeds.'
              : 'प्रत्येक किलोग्राम अपशिष्ट मीथेन गैस उत्सर्जन रोकता है और पशुओं के लिए स्वच्छ पौष्टिक आहार तैयार करता है।'}
          </p>
        </div>

        {/* Dual Section Note: Measured vs Estimated */}
        <div className="mt-6 pt-4 border-t border-emerald-900/60 flex flex-wrap items-center justify-between gap-3 text-xs text-emerald-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span><strong>Measured Data:</strong> Digital scale weigh tickets & facility batch logs</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span><strong>Estimated Equivalents:</strong> EPA WARM v15 & IPCC AR6 emission factors</span>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              {t.impact.foodDiverted}
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-neutral-900 font-mono tabular-nums">
            {impactMetrics.totalCollectedKg.toLocaleString()} <span className="text-sm font-normal text-neutral-500">kg</span>
          </div>
          <div className="text-xs text-emerald-700 flex items-center gap-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            <span>Measured scale intake</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              {t.impact.co2Avoided}
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <Leaf className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-800 font-mono tabular-nums">
            {impactMetrics.ghgEmissionsAvoidedKgCO2e.toLocaleString()} <span className="text-sm font-normal text-neutral-500">kg CO₂e</span>
          </div>
          <div className="text-xs text-amber-700 flex items-center gap-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>2.45 kg CO₂e / kg diverted</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              {t.impact.feedProduced}
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <Factory className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-neutral-900 font-mono tabular-nums">
            {impactMetrics.totalFeedProducedKg.toLocaleString()} <span className="text-sm font-normal text-neutral-500">kg</span>
          </div>
          <div className="text-xs text-emerald-700 flex items-center gap-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            <span>~{Math.floor(impactMetrics.totalFeedProducedKg / 50)} bags packaged</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              {t.impact.waterSaved}
            </span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-blue-900 font-mono tabular-nums">
            {(impactMetrics.waterSavingsLitres / 1000).toFixed(1)} <span className="text-sm font-normal text-neutral-500">kL</span>
          </div>
          <div className="text-xs text-blue-700 flex items-center gap-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            <span>Replaces water-intensive crops</span>
          </div>
        </div>
      </div>

      {/* Network Scale Bar */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-neutral-900 mb-4">
          Active Verified Circular Network Ecosystem
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
            <Store className="w-5 h-5 text-emerald-700 mx-auto mb-1" />
            <div className="text-xl font-black text-neutral-900 font-mono">{impactMetrics.activeDonorsCount}</div>
            <div className="text-xs text-neutral-500">Food Donors & Bakeries</div>
          </div>
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
            <Scale className="w-5 h-5 text-emerald-700 mx-auto mb-1" />
            <div className="text-xl font-black text-neutral-900 font-mono">{impactMetrics.activeCollectorsCount}</div>
            <div className="text-xs text-neutral-500">Collection Fleet Vehicles</div>
          </div>
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
            <Factory className="w-5 h-5 text-emerald-700 mx-auto mb-1" />
            <div className="text-xl font-black text-neutral-900 font-mono">{impactMetrics.activeProcessingFacilitiesCount}</div>
            <div className="text-xs text-neutral-500">Licensed Bio-Mills</div>
          </div>
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
            <Tractor className="w-5 h-5 text-emerald-700 mx-auto mb-1" />
            <div className="text-xl font-black text-neutral-900 font-mono">{impactMetrics.activeFarmersCount}</div>
            <div className="text-xs text-neutral-500">Farmers & Livestock Buyers</div>
          </div>
        </div>
      </div>

      {/* Interactive Impact Simulation Calculator */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-7 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                Interactive Food Waste Diversion & Animal Feed Calculator
              </h3>
              <p className="text-xs text-neutral-500">
                Estimate your business or restaurant's annual planetary footprint reduction and feed generation.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-neutral-800">Your Average Weekly Food Surplus (kg):</span>
              <span className="font-mono font-bold text-emerald-800 text-sm">{calcWeeklyKg} kg / week</span>
            </div>
            <input
              type="range"
              min={50}
              max={5000}
              step={50}
              value={calcWeeklyKg}
              onChange={(e) => setCalcWeeklyKg(Number(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
              <span>50 kg (Small Cafe)</span>
              <span>1,000 kg (Supermarket)</span>
              <span>5,000 kg (Industrial Mandi)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 text-xs">
              <span className="text-neutral-500 block">Annual Landfill Diversion</span>
              <span className="text-lg font-black text-emerald-950 font-mono mt-0.5 block">
                {(calcAnnualDiverted / 1000).toFixed(1)} MT
              </span>
              <span className="text-[10px] text-neutral-400 font-mono">{calcAnnualDiverted.toLocaleString()} kg/yr</span>
            </div>

            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 text-xs">
              <span className="text-neutral-500 block">Avoided Greenhouse Gas</span>
              <span className="text-lg font-black text-emerald-800 font-mono mt-0.5 block">
                {(calcAnnualCO2 / 1000).toFixed(1)} t CO₂e
              </span>
              <span className="text-[10px] text-neutral-400">Equivalent to planting {Math.round(calcAnnualCO2 / 22)} trees</span>
            </div>

            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 text-xs">
              <span className="text-neutral-500 block">Nutritious Animal Feed</span>
              <span className="text-lg font-black text-neutral-900 font-mono mt-0.5 block">
                {Math.floor(calcAnnualFeed / 50)} Bags
              </span>
              <span className="text-[10px] text-neutral-400 font-mono">{calcAnnualFeed.toLocaleString()} kg pellets</span>
            </div>

            <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-100 text-xs">
              <span className="text-neutral-500 block">Saved Agricultural Water</span>
              <span className="text-lg font-black text-blue-900 font-mono mt-0.5 block">
                {(calcAnnualWater / 1000).toFixed(0)} kL
              </span>
              <span className="text-[10px] text-neutral-400">Conserves irrigation aquifers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Methodology Section */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 text-xs text-neutral-600 space-y-2">
        <div className="flex items-center gap-2 font-bold text-neutral-900">
          <Info className="w-4 h-4 text-emerald-700" />
          <span>Documentation of Calculation Standards & Assumptions</span>
        </div>
        <p className="leading-relaxed">
          1. <strong>Landfill Methane Avoidance:</strong> Computed in accordance with the United States EPA WARM (Waste Reduction Model) v15 and IPCC Good Practice Guidance. Diverting 1 metric ton of organic food waste from anaerobic municipal dumps prevents ~2.45 MT CO₂e emissions.
        </p>
        <p className="leading-relaxed">
          2. <strong>Feed Conversion Efficiency:</strong> Based on industrial high-temperature thermal drying and extrusion records. Moisture is reduced from ~65% in raw mash to &lt; 10% in dense pellets, with an average net yield of 42% finished feed by weight.
        </p>
        <p className="leading-relaxed">
          3. <strong>Water Savings:</strong> Replaces virgin cultivated soy and corn grain meal, conserving ~180 litres of agricultural freshwater per kg of animal feed formulated from upcycled by-products.
        </p>
      </div>
    </div>
  );
};
