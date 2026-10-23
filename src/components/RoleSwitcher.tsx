import React from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  Store,
  Truck,
  Factory,
  Tractor,
  ShieldAlert,
} from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { currentRole, setCurrentRole, currentTab, setCurrentTab, language } = useApp();

  const roleDefinitions: {
    id: UserRole;
    tab: string;
    labelEn: string;
    labelHi: string;
    icon: React.ComponentType<{ className?: string }>;
    descEn: string;
    descHi: string;
  }[] = [
    {
      id: 'donor',
      tab: 'donate',
      labelEn: '1. Food Donor',
      labelHi: '1. खाद्य दाता',
      icon: Store,
      descEn: 'Restaurants, supermarkets & bakeries donating surplus',
      descHi: 'रेस्तरां, सुपरमार्केट व बेकरी द्वारा अपशिष्ट दान',
    },
    {
      id: 'collector',
      tab: 'collections',
      labelEn: '2. Collector Partner',
      labelHi: '2. संग्रहण भागीदार',
      icon: Truck,
      descEn: 'Logistics fleets discovering & transporting donations',
      descHi: 'वाहनों द्वारा नजदीकी दान सामग्री का उठाव व परिवहन',
    },
    {
      id: 'processor',
      tab: 'processing',
      labelEn: '3. Feed Mill & QC',
      labelHi: '3. प्रसंस्करण मिल व QC',
      icon: Factory,
      descEn: 'Inspecting safety, extrusion pelletizing & batching',
      descHi: 'गुणवत्ता जांच, सुखाना व पौष्टिक पशु आहार निर्माण',
    },
    {
      id: 'farmer',
      tab: 'marketplace',
      labelEn: '4. Farmer & Buyer',
      labelHi: '4. किसान / पशुपालक',
      icon: Tractor,
      descEn: 'Buying affordable, high-protein upcycled feed',
      descHi: 'सस्ता व उच्च प्रोटीन पशु आहार खरीद व डिलीवरी',
    },
    {
      id: 'admin',
      tab: 'admin',
      labelEn: '5. Admin Console',
      labelHi: '5. एडमिन कंसोल',
      icon: ShieldAlert,
      descEn: 'FSSAI compliance, KYC verification & platform oversight',
      descHi: 'सुरक्षा नियम, FSSAI अनुपालन व सत्यापन व्यवस्था',
    },
  ];

  return (
    <div className="bg-neutral-100/90 border-b border-neutral-200 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 text-xs text-neutral-600">
          <span className="font-semibold text-neutral-800 uppercase tracking-wider text-[11px]">
            {language === 'en' ? 'Interactive Flow:' : 'सक्रिय भूमिका:'}
          </span>
          <span className="hidden sm:inline text-neutral-500">
            {language === 'en'
              ? 'Switch roles to test the entire closed-loop supply chain'
              : 'पूरी चक्रीय आपूर्ति श्रृंखला का परीक्षण करने हेतु भूमिका बदलें'}
          </span>
        </div>

        {/* Role buttons segmented bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {roleDefinitions.map((role) => {
            const Icon = role.icon;
            const isSelected = currentRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => {
                  setCurrentRole(role.id);
                  setCurrentTab(role.tab);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-900 text-white shadow-sm ring-1 ring-emerald-950/20'
                    : 'bg-white text-neutral-700 hover:bg-neutral-200/60 border border-neutral-200'
                }`}
                title={language === 'en' ? role.descEn : role.descHi}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-300' : 'text-neutral-500'}`} />
                <span>{language === 'en' ? role.labelEn : role.labelHi}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
