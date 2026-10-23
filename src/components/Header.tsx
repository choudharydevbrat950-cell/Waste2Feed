import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Recycle,
  Globe,
  Bell,
  ShieldCheck,
  Info,
  ChevronDown,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { UserRole } from '../types';

export const Header: React.FC = () => {
  const {
    currentRole,
    setCurrentRole,
    currentTab,
    setCurrentTab,
    language,
    setLanguage,
    t,
    notifications,
    setShowSafetyModal,
    setShowOnboarding,
  } = useApp();

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const roleLabels: Record<UserRole, string> = {
    donor: t.roles.donor,
    collector: t.roles.collector,
    processor: t.roles.processor,
    farmer: t.roles.farmer,
    admin: t.roles.admin,
  };

  const navItems = [
    { id: 'overview', label: t.nav.overview },
    { id: 'donate', label: t.nav.donate },
    { id: 'collections', label: t.nav.collections },
    { id: 'processing', label: t.nav.processing },
    { id: 'marketplace', label: t.nav.marketplace },
    { id: 'impact', label: t.nav.impact },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-950/10">
      {/* Top Banner Bar for Trust & Circular Mission */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold tracking-wide text-emerald-300">Waste2Feed</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span className="text-emerald-200">
              {language === 'en'
                ? 'Certified FSSAI-Compliant Pre-Consumer Food Waste to Animal Feed Network'
                : 'FSSAI प्रमाणित खाद्य अपशिष्ट से सुरक्षित पशु आहार निर्माण नेटवर्क'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSafetyModal(true)}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.nav.safety}</span>
            </button>
            <span aria-hidden="true" className="opacity-30">·</span>
            <button
              onClick={() => setShowOnboarding(true)}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-emerald-300" />
              <span>{language === 'en' ? 'How it Works' : 'यह कैसे काम करता है'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Row - Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Wordmark Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setCurrentTab('overview')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-800 text-white flex items-center justify-center shadow-sm shadow-emerald-900/20 group-hover:bg-emerald-700 transition-colors">
              <Recycle className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-emerald-950 font-sans block leading-none">
                Waste2Feed
              </span>
              <span className="text-[10px] text-emerald-800 font-medium tracking-wider uppercase block mt-0.5">
                Circular Bio-Feed
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-600">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 ${
                  isActive
                    ? 'border-emerald-700 text-emerald-950 font-semibold'
                    : 'border-transparent hover:text-emerald-900 hover:border-neutral-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          {currentRole === 'admin' && (
            <button
              onClick={() => setCurrentTab('admin')}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 ${
                currentTab === 'admin'
                  ? 'border-emerald-700 text-emerald-950 font-semibold'
                  : 'border-transparent text-amber-900 hover:text-amber-950'
              }`}
            >
              {t.nav.admin}
            </button>
          )}
        </nav>

        {/* Zone 3: Primary Action & Role Selection */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-neutral-700 hover:bg-neutral-100 border border-neutral-200 transition-colors cursor-pointer"
            title="Toggle English / Hindi"
          >
            <Globe className="w-3.5 h-3.5 text-neutral-500" />
            <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* Role Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-900 border border-emerald-200/80 hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span className="font-semibold">{roleLabels[currentRole]}</span>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-700 opacity-80" />
            </button>

            {showRoleDropdown && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-neutral-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                onMouseLeave={() => setShowRoleDropdown(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-semibold text-neutral-600 uppercase tracking-wider border-b border-neutral-100">
                  {language === 'en' ? 'Select Active Role' : 'सक्रिय भूमिका चुनें'}
                </div>
                {(['donor', 'collector', 'processor', 'farmer', 'admin'] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setCurrentRole(role);
                      setShowRoleDropdown(false);
                      if (role === 'donor') setCurrentTab('donate');
                      if (role === 'collector') setCurrentTab('collections');
                      if (role === 'processor') setCurrentTab('processing');
                      if (role === 'farmer') setCurrentTab('marketplace');
                      if (role === 'admin') setCurrentTab('admin');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                      currentRole === role
                        ? 'bg-emerald-50 text-emerald-950 font-semibold'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{roleLabels[role]}</span>
                    {currentRole === role && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 border border-neutral-200 transition-colors cursor-pointer relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadNotifs}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div
                className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                onMouseLeave={() => setShowNotifMenu(false)}
              >
                <div className="px-3 py-2 border-b border-neutral-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-900">
                    {language === 'en' ? 'Notifications' : 'सूचनाएं'}
                  </span>
                  <span className="text-[11px] text-neutral-500 font-mono tabular-nums">
                    {unreadNotifs} {language === 'en' ? 'unread' : 'अपठित'}
                  </span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-neutral-100">
                  {notifications.slice(0, 5).map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 text-xs transition-colors hover:bg-neutral-50 ${
                        !notif.read ? 'bg-emerald-50/50' : ''
                      }`}
                    >
                      <div className="font-semibold text-neutral-900">{notif.title}</div>
                      <div className="text-neutral-600 text-[11px] mt-0.5">{notif.message}</div>
                      <div className="text-[10px] text-neutral-600 mt-1">{notif.timestamp}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Primary CTA */}
          <button
            onClick={() => {
              if (currentRole === 'farmer') {
                setCurrentTab('marketplace');
              } else {
                setCurrentTab('donate');
              }
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>
              {currentRole === 'farmer'
                ? t.actions.buyFeed
                : t.actions.donateNow}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
