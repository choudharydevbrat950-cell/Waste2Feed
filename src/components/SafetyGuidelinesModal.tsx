import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  X,
  FileCheck,
  Flame,
  ThermometerSun,
} from 'lucide-react';

export const SafetyGuidelinesModal: React.FC = () => {
  const { showSafetyModal, setShowSafetyModal, language } = useApp();

  if (!showSafetyModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/65 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-emerald-900 text-white p-6 relative">
          <button
            onClick={() => setShowSafetyModal(false)}
            className="absolute top-5 right-5 p-1 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>REGULATORY STANDARDS & LIVESTOCK SAFETY AUDIT</span>
          </div>
          <h2 className="text-xl font-bold mt-1 text-white">
            {language === 'en'
              ? 'FSSAI & Circular Animal Feed Safety Protocols'
              : 'FSSAI और चक्रीय पशु आहार सुरक्षा दिशानिर्देश'}
          </h2>
          <p className="text-xs text-emerald-200 mt-1 max-w-xl">
            {language === 'en'
              ? 'Strict regulatory standards ensuring animal health, eliminating biosecurity risks, and guaranteeing 100% feed purity.'
              : 'पशु स्वास्थ्य की रक्षा, बायोसिक्योरिटी जोखिमों के उन्मूलन और 100% शुद्धता हेतु कानूनी मानक।'}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs text-neutral-700">
          {/* Key Rule Callout */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-900 text-sm">
                {language === 'en'
                  ? 'The Golden Rule: Pre-Consumer vs. Post-Consumer Swill'
                  : 'मुख्य नियम: कच्चा व स्वच्छ अपशिष्ट बनाम जूठा भोजन'}
              </h4>
              <p className="mt-1 text-amber-800 leading-relaxed">
                {language === 'en'
                  ? 'Waste2Feed strictly prohibits post-consumer plate scrapings, customer table waste, or mixed catering swill for ruminant and poultry feed. Only clean, unadulterated pre-consumer surpluses (bakery, brewery mash, vegetable mandis, fruit pulp) are permitted.'
                  : 'कस्टमर की थाली का जूठा भोजन, मिश्रित कैटरिंग कचरा पशु आहार में पूर्णतः वर्जित है। केवल स्वच्छ कच्चा अपशिष्ट (बेकरी, मट्ठा, सब्जी मंडी, माल्ट) ही स्वीकृत है।'}
              </p>
            </div>
          </div>

          {/* Permissible vs Prohibited Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Approved */}
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Eligible & Permissible Materials</span>
              </div>
              <ul className="space-y-2 text-emerald-950">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Day-old Bakery & Bread:</strong> Breads, buns, flour dusting, unseasoned cracker trims.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Brewer's Spent Grain (BSG):</strong> High-protein malt & barley mash directly from silos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Mandi Vegetable Trimmings:</strong> Fresh sorting cabbage, carrot, greens from wholesale yards.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Fruit Pomace & Peels:</strong> Pressed citrus, apple, pomegranate after cold juice pressing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Pre-Consumer Cooked Grains:</strong> Unserved banquet rice or dal kept refrigerated &lt; 4 hours.</span>
                </li>
              </ul>
            </div>

            {/* Prohibited */}
            <div className="bg-red-50/60 border border-red-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
                <XCircle className="w-4 h-4 text-red-600" />
                <span>Strictly Prohibited & Disqualified</span>
              </div>
              <ul className="space-y-2 text-red-950">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✕</span>
                  <span><strong>Plate Scrapings & Table Leftovers:</strong> High contamination risk (saliva, toothpicks, napkins).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✕</span>
                  <span><strong>Ruminant Meat / Bone Waste:</strong> Strictly banned to prevent Bovine Spongiform Encephalopathy (BSE).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✕</span>
                  <span><strong>Moldy, Rancid or Putrid Waste:</strong> Visible mycotoxins (Aflatoxin B1 &gt; 20 ppb causes organ failure).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✕</span>
                  <span><strong>Heavy Chemical / Detergent Contact:</strong> Wash sink rinses or pesticide contaminated peelings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✕</span>
                  <span><strong>Unpackaged Foreign Objects:</strong> Plastics, staples, foils, ties, glass or packaging shards.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Mandatory Thermal Treatment Protocol */}
          <div className="border border-neutral-200 rounded-xl p-4 bg-neutral-50 space-y-3">
            <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
              <ThermometerSun className="w-4 h-4 text-emerald-700" />
              <span>Mandatory Thermal Pathogen Elimination Protocol</span>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              Every licensed processing facility in the Waste2Feed network must log and verify minimum thermal kill parameters prior to final feed pelletization:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded-lg border border-neutral-200">
                <div className="font-bold text-neutral-900">Extrusion Processing</div>
                <div className="font-mono text-emerald-700 font-bold text-sm mt-0.5">115°C – 125°C</div>
                <div className="text-[11px] text-neutral-500 mt-1">Dwell time: 30–60 seconds at 25–35 bar pressure</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-neutral-200">
                <div className="font-bold text-neutral-900">Drum Drying</div>
                <div className="font-mono text-emerald-700 font-bold text-sm mt-0.5">&gt; 85°C</div>
                <div className="text-[11px] text-neutral-500 mt-1">Moisture reduction from 70% down to &lt; 10%</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-neutral-200">
                <div className="font-bold text-neutral-900">Pathogen Standard</div>
                <div className="font-mono text-emerald-700 font-bold text-sm mt-0.5">0 cfu / 25g</div>
                <div className="text-[11px] text-neutral-500 mt-1">Certified Salmonella, E. coli & Listeria negative</div>
              </div>
            </div>
          </div>

          {/* Rejected Materials Diversion Route */}
          <div className="flex items-start gap-3 bg-neutral-100 p-3.5 rounded-xl text-neutral-600">
            <FileCheck className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Procedure for Rejected Batches:</strong> Any material failing visual, moisture, or chemical screening is automatically diverted to registered municipal aerobic composting or bio-gas digesters. Rejected materials are never returned to landfill.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-neutral-50 px-6 py-3 border-t border-neutral-200 flex items-center justify-end">
          <button
            onClick={() => setShowSafetyModal(false)}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            I Understand the Safety Protocols
          </button>
        </div>
      </div>
    </div>
  );
};
