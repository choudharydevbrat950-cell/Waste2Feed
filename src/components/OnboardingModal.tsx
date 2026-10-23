import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Recycle,
  Store,
  Truck,
  Factory,
  Tractor,
  ArrowRight,
  CheckCircle2,
  X,
  Sparkles,
} from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { showOnboarding, setShowOnboarding, language, setCurrentTab, setCurrentRole } = useApp();
  const [step, setStep] = useState(0);

  if (!showOnboarding) return null;

  const slides = [
    {
      titleEn: 'Transforming Surplus Food Waste into Animal Feed',
      titleHi: 'भोजन अपशिष्ट को पौष्टिक पशु आहार में बदलना',
      descEn:
        'Over 40% of food in commercial chains goes to waste, emitting potent methane in landfills. Waste2Feed intercepts clean pre-consumer food waste and safely converts it into high-protein animal nutrition.',
      descHi:
        'व्यावसायिक खाद्य श्रृंखला में 40% से अधिक भोजन बर्बाद होकर लैंडफिल में मीथेन गैस उत्पन्न करता है। वेस्ट2फीड स्वच्छ अपशिष्ट को एकत्रित कर सुरक्षित पशु आहार में परिवर्तित करता है।',
      icon: Recycle,
      image: '/src/assets/images/hero_circular_economy_1792718551498.jpg',
      badge: 'Circular Economy Mission',
    },
    {
      titleEn: '1. Food Donors & Verified Collections',
      titleHi: '1. खाद्य दाता और प्रमाणित संग्रहण',
      descEn:
        'Bakeries, wholesale mandis, juice processors, and hotels list clean surplus food in under 2 minutes. Authorized collection fleets accept pickups, verify weights on digital scales, and transport them to bio-mills.',
      descHi:
        'बेकरी, सब्जी मंडियां और खाद्य उद्योग 2 मिनट से कम में दान दर्ज करते हैं। प्रमाणित वाहन डिजिटल वजन तोलकर सुरक्षित मिलों तक पहुंचाते हैं।',
      icon: Truck,
      image: '/src/assets/images/food_donor_produce_1792718551739.jpg',
      badge: 'Step 1 & 2',
    },
    {
      titleEn: '2. QC Lab & Thermal Extrusion Processing',
      titleHi: '2. प्रयोगशाला QC और थर्मल एक्सट्रूज़न',
      descEn:
        'Certified bio-processing facilities run moisture, toxin, and mold tests. Materials are thermally sterilized at 115°C+ (eliminating pathogens) and pelletized into balanced animal feed with full batch traceability.',
      descHi:
        'प्रसंस्करण इकाइयां नमी और गुणवत्ता परीक्षण करती हैं। 115°C+ तापमान पर जीवाणुरहित कर संतुलित पेलेट्स तैयार किए जाते हैं।',
      icon: Factory,
      image: '/src/assets/images/processing_facility_1792718551336.jpg',
      badge: 'Step 3',
    },
    {
      titleEn: '3. Nutritious Feed for Farmers & Verified Impact',
      titleHi: '3. किसानों हेतु सस्ता आहार और पर्यावरण बचत',
      descEn:
        'Livestock and poultry farmers purchase certified feed at 30-40% lower cost than virgin grains. Every kilogram diverted saves 2.45 kg CO₂e and replaces water-intensive crops.',
      descHi:
        'किसान बाजार से 30-40% कम कीमत पर उच्च गुणवत्ता वाला पशु आहार खरीदते हैं। प्रत्येक 1 किलो अपशिष्ट 2.45 किलो CO₂e उत्सर्जन रोकता है।',
      icon: Tractor,
      image: '/src/assets/images/feed_pellets_livestock_1792718551344.jpg',
      badge: 'Step 4',
    },
  ];

  const currentSlide = slides[step];
  const Icon = currentSlide.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Top visual banner */}
        <div className="relative h-48 sm:h-56 bg-neutral-900 overflow-hidden">
          <img
            src={currentSlide.image}
            alt={currentSlide.titleEn}
            className="w-full h-full object-cover opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
          
          <button
            onClick={() => setShowOnboarding(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[11px] font-mono text-emerald-300 font-semibold tracking-wider uppercase block">
              {currentSlide.badge}
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              {language === 'en' ? currentSlide.titleEn : currentSlide.titleHi}
            </h3>
          </div>
        </div>

        {/* Description body */}
        <div className="p-6">
          <p className="text-sm text-neutral-600 leading-relaxed">
            {language === 'en' ? currentSlide.descEn : currentSlide.descHi}
          </p>

          {/* Stepper dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === step ? 'w-8 bg-emerald-700' : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>

          {/* Action buttons */}
          <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
            <button
              onClick={() => setShowOnboarding(false)}
              className="text-xs font-semibold text-neutral-500 hover:text-neutral-800 cursor-pointer"
            >
              {language === 'en' ? 'Skip Introduction' : 'छोड़ें'}
            </button>

            <div className="flex items-center gap-2">
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-3 py-1.5 rounded-lg border border-neutral-300 text-xs font-medium text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                >
                  {language === 'en' ? 'Back' : 'पीछे'}
                </button>
              )}

              {step < slides.length - 1 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{language === 'en' ? 'Next' : 'आगे'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowOnboarding(false);
                    setCurrentTab('donate');
                    setCurrentRole('donor');
                  }}
                  className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{language === 'en' ? 'Start Using Waste2Feed' : 'उपयोग शुरू करें'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
