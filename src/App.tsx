/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { RoleSwitcher } from './components/RoleSwitcher';
import { MobileBottomNav } from './components/MobileBottomNav';
import { OverviewDashboard } from './components/OverviewDashboard';
import { DonorDashboard } from './components/DonorDashboard';
import { CollectorDashboard } from './components/CollectorDashboard';
import { ProcessorDashboard } from './components/ProcessorDashboard';
import { FarmerMarketplace } from './components/FarmerMarketplace';
import { ImpactDashboard } from './components/ImpactDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { TraceabilityModal } from './components/TraceabilityModal';
import { SafetyGuidelinesModal } from './components/SafetyGuidelinesModal';
import { OnboardingModal } from './components/OnboardingModal';
import { ShieldCheck, RefreshCw, Heart, Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentTab, setCurrentTab, resetToDefaultData, language, setShowSafetyModal } = useApp();

  const renderActiveScreen = () => {
    switch (currentTab) {
      case 'overview':
        return <OverviewDashboard />;
      case 'donate':
        return <DonorDashboard />;
      case 'collections':
        return <CollectorDashboard />;
      case 'processing':
        return <ProcessorDashboard />;
      case 'marketplace':
        return <FarmerMarketplace />;
      case 'impact':
        return <ImpactDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 pb-20 lg:pb-0">
      {/* Top Header */}
      <Header />

      {/* Role Switcher Toolbar */}
      <RoleSwitcher />

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {renderActiveScreen()}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-neutral-200 bg-white text-xs text-neutral-600 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-emerald-950 text-sm">Waste2Feed</span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span>Donate Food Waste. Create Animal Feed. Protect Our Planet.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-neutral-500">
            <button
              onClick={() => setShowSafetyModal(true)}
              className="hover:text-emerald-800 transition-colors cursor-pointer flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>FSSAI & Livestock Feed Safety</span>
            </button>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <button
              onClick={resetToDefaultData}
              className="hover:text-emerald-800 transition-colors cursor-pointer flex items-center gap-1"
              title="Reset sample demonstration records"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-neutral-400">
          <div>
            ISO 22000 & FSSAI Animal Feed Circular Bioeconomy Standards · EPA WARM v15 Methodology
          </div>
          <div>
            Built for sustainable agriculture and landfill-free urban ecosystems
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav />

      {/* Global Interactive Modals */}
      <TraceabilityModal />
      <SafetyGuidelinesModal />
      <OnboardingModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
