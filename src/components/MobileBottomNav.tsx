import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Home,
  PlusCircle,
  Truck,
  ShoppingBag,
  BarChart3,
  Users,
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { currentTab, setCurrentTab, currentRole, t, language } = useApp();

  const tabs = [
    { id: 'overview', label: language === 'en' ? 'Home' : 'होम', icon: Home },
    {
      id: currentRole === 'collector' ? 'collections' : 'donate',
      label: currentRole === 'collector' ? (language === 'en' ? 'Pickups' : 'उठाव') : (language === 'en' ? 'Donate' : 'दान'),
      icon: currentRole === 'collector' ? Truck : PlusCircle,
    },
    { id: 'processing', label: language === 'en' ? 'Bio-Mill' : 'मिल', icon: Users },
    { id: 'marketplace', label: language === 'en' ? 'Market' : 'बाज़ार', icon: ShoppingBag },
    { id: 'impact', label: language === 'en' ? 'Impact' : 'प्रभाव', icon: BarChart3 },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 py-1 px-2 flex items-center justify-around">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg text-[10px] font-medium transition-colors cursor-pointer ${
              isActive
                ? 'text-emerald-800 font-bold'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-700' : 'text-neutral-400'}`} />
            <span className="mt-0.5">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
