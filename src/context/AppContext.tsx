import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Language,
  DonationItem,
  DonationStatus,
  CollectionTask,
  QualityInspection,
  ProcessingBatch,
  FeedProduct,
  FeedOrder,
  AppNotification,
  EnvironmentalImpactMetrics,
} from '../types';
import {
  initialDonations,
  initialQualityInspections,
  initialBatches,
  initialProducts,
  initialOrders,
  initialNotifications,
  initialImpactMetrics,
} from '../data/mockData';
import { translations } from '../utils/translations';

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];
  
  donations: DonationItem[];
  addDonation: (donation: Omit<DonationItem, 'id' | 'status' | 'submittedAt'>) => string;
  updateDonationStatus: (id: string, status: DonationStatus, extra?: Partial<DonationItem>) => void;
  assignCollectorToDonation: (donationId: string, collectorName: string, vehicleNo: string) => void;
  
  inspections: QualityInspection[];
  addInspection: (inspection: Omit<QualityInspection, 'id' | 'inspectedAt'>) => string;
  
  batches: ProcessingBatch[];
  createBatch: (batch: Omit<ProcessingBatch, 'id' | 'startedAt'>) => string;
  
  products: FeedProduct[];
  orders: FeedOrder[];
  placeOrder: (order: Omit<FeedOrder, 'id' | 'orderDate' | 'trackingNumber'>) => string;
  
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  impactMetrics: EnvironmentalImpactMetrics;
  
  selectedTraceabilityId: string | null;
  setSelectedTraceabilityId: (id: string | null) => void;
  
  showSafetyModal: boolean;
  setShowSafetyModal: (show: boolean) => void;
  
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
  
  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ROLE: 'w2f_user_role',
  TAB: 'w2f_active_tab',
  LANG: 'w2f_app_lang',
  DONATIONS: 'w2f_donations_v1',
  INSPECTIONS: 'w2f_inspections_v1',
  BATCHES: 'w2f_batches_v1',
  PRODUCTS: 'w2f_products_v1',
  ORDERS: 'w2f_orders_v1',
  NOTIFICATIONS: 'w2f_notifs_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem(STORAGE_KEYS.ROLE) as UserRole) || 'donor';
  });

  const [currentTab, setCurrentTabState] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.TAB) || 'overview';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem(STORAGE_KEYS.LANG) as Language) || 'en';
  });

  const [donations, setDonations] = useState<DonationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DONATIONS);
      return saved ? JSON.parse(saved) : initialDonations;
    } catch {
      return initialDonations;
    }
  });

  const [inspections, setInspections] = useState<QualityInspection[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INSPECTIONS);
      return saved ? JSON.parse(saved) : initialQualityInspections;
    } catch {
      return initialQualityInspections;
    }
  });

  const [batches, setBatches] = useState<ProcessingBatch[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BATCHES);
      return saved ? JSON.parse(saved) : initialBatches;
    } catch {
      return initialBatches;
    }
  });

  const [products, setProducts] = useState<FeedProduct[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [orders, setOrders] = useState<FeedOrder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return saved ? JSON.parse(saved) : initialNotifications;
    } catch {
      return initialNotifications;
    }
  });

  const [selectedTraceabilityId, setSelectedTraceabilityId] = useState<string | null>(null);
  const [showSafetyModal, setShowSafetyModal] = useState<boolean>(false);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TAB, currentTab);
  }, [currentTab]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANG, language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INSPECTIONS, JSON.stringify(inspections));
  }, [inspections]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BATCHES, JSON.stringify(batches));
  }, [batches]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
  };

  const setCurrentTab = (tab: string) => {
    setCurrentTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const addDonation = (donationData: Omit<DonationItem, 'id' | 'status' | 'submittedAt'>): string => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newId = `DON-${randomDigits}`;
    const newDonation: DonationItem = {
      ...donationData,
      id: newId,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
    };

    setDonations((prev) => [newDonation, ...prev]);

    // Push notification to collectors
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'New Donation Listed for Pickup',
      message: `${newDonation.donorName} registered ${newDonation.quantityKg} kg of ${newDonation.title}.`,
      timestamp: 'Just now',
      read: false,
      roleTarget: 'collector',
      relatedId: newId,
      type: 'donation',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newId;
  };

  const updateDonationStatus = (id: string, status: DonationStatus, extra?: Partial<DonationItem>) => {
    setDonations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status,
            ...extra,
          };
        }
        return item;
      })
    );
  };

  const assignCollectorToDonation = (donationId: string, collectorName: string, vehicleNo: string) => {
    updateDonationStatus(donationId, 'collector_assigned', {
      assignedCollectorId: 'col-current',
      assignedCollectorName: `${collectorName} (${vehicleNo})`,
      scheduledPickupTime: new Date(Date.now() + 90 * 60 * 1000).toISOString(),
    });

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Collector Assigned!',
      message: `${collectorName} has accepted pickup for donation #${donationId}.`,
      timestamp: 'Just now',
      read: false,
      roleTarget: 'donor',
      relatedId: donationId,
      type: 'pickup',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const addInspection = (inspData: Omit<QualityInspection, 'id' | 'inspectedAt'>): string => {
    const inspId = `QC-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInsp: QualityInspection = {
      ...inspData,
      id: inspId,
      inspectedAt: new Date().toISOString(),
    };
    setInspections((prev) => [newInsp, ...prev]);

    // Update donation status
    const newStatus: DonationStatus =
      inspData.status === 'passed_for_processing' ? 'accepted_for_feed' : 'rejected_composted';

    updateDonationStatus(inspData.donationId, newStatus, {
      inspectionId: inspId,
      suitableForAnimalFeed: inspData.status === 'passed_for_processing',
      rejectionReason:
        inspData.status === 'rejected_diverted_to_compost'
          ? `QC Disqualification: ${inspData.notes}`
          : undefined,
    });

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `QC Inspection: ${inspData.status === 'passed_for_processing' ? 'Passed' : 'Diverted to Compost'}`,
      message: `Donation #${inspData.donationId} tested ${inspData.moisturePercentage}% moisture and score ${inspData.qcScore}/100.`,
      timestamp: 'Just now',
      read: false,
      roleTarget: 'processor',
      relatedId: inspId,
      type: 'qc',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return inspId;
  };

  const createBatch = (batchData: Omit<ProcessingBatch, 'id' | 'startedAt'>): string => {
    const batchId = `BATCH-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newBatch: ProcessingBatch = {
      ...batchData,
      id: batchId,
      startedAt: new Date().toISOString(),
      completedAt: new Date(Date.now() + 2 * 3600 * 1000).toISOString(),
    };

    setBatches((prev) => [newBatch, ...prev]);

    // Mark donations as batched
    setDonations((prev) =>
      prev.map((d) => (batchData.inputDonationIds.includes(d.id) ? { ...d, batchId } : d))
    );

    // If product SKU is created, add to feed catalog
    const newProduct: FeedProduct = {
      id: batchData.productSkuId || `FEED-BIO-${batchId}`,
      batchId,
      title: batchData.productName,
      species: batchData.targetSpecies,
      pricePerBagInr: batchData.targetSpecies === 'aquaculture' ? 1750 : 1300,
      pricePerKgInr: batchData.targetSpecies === 'aquaculture' ? 35 : 26,
      availableBags: Math.floor(batchData.outputFeedWeightKg / 50) || 10,
      bagSizeKg: 50,
      crudeProtein: batchData.proteinContentPercentage,
      crudeFat: 4.5,
      crudeFiber: batchData.crudeFiberPercentage,
      moisture: batchData.moisturePercentage,
      ingredients: [
        'Certified Bio-Processed Food Residuals',
        `Batched inputs: ${batchData.inputDonationIds.join(', ')}`,
        'Steam-sterilized mineral enriched pre-mix',
      ],
      manufacturerName: batchData.facilityName,
      facilityLocation: 'Bio-Processing Plant Unit #3, Eco Park',
      fssaiLicense: batchData.labCertificateNumber,
      imageUrl: '/src/assets/images/feed_pellets_livestock_1792718551344.jpg',
      featured: true,
    };

    setProducts((prev) => [newProduct, ...prev]);

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'New Feed Product Batched',
      message: `${newBatch.productName} (${newBatch.outputFeedWeightKg} kg) is now available in the farmer marketplace.`,
      timestamp: 'Just now',
      read: false,
      roleTarget: 'farmer',
      relatedId: batchId,
      type: 'batch',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return batchId;
  };

  const placeOrder = (orderData: Omit<FeedOrder, 'id' | 'orderDate' | 'trackingNumber'>): string => {
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const trackingNumber = `TRK-FEED-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: FeedOrder = {
      ...orderData,
      id: orderId,
      orderDate: new Date().toISOString(),
      trackingNumber,
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Deduct stock
    setProducts((prev) =>
      prev.map((prod) => {
        const orderItem = orderData.items.find((i) => i.productId === prod.id);
        if (orderItem) {
          return {
            ...prod,
            availableBags: Math.max(0, prod.availableBags - orderItem.bags),
          };
        }
        return prod;
      })
    );

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Order Confirmed!',
      message: `Order #${orderId} for ${orderData.buyerFarmName} has been recorded. Dispatch scheduled.`,
      timestamp: 'Just now',
      read: false,
      roleTarget: 'farmer',
      relatedId: orderId,
      type: 'order',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return orderId;
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const resetToDefaultData = () => {
    setDonations(initialDonations);
    setInspections(initialQualityInspections);
    setBatches(initialBatches);
    setProducts(initialProducts);
    setOrders(initialOrders);
    setNotifications(initialNotifications);
    localStorage.clear();
  };

  // Dynamic impact metrics calculation
  const totalDonatedKg =
    initialImpactMetrics.totalDonatedKg +
    donations
      .filter((d) => !initialDonations.some((init) => init.id === d.id))
      .reduce((sum, d) => sum + d.quantityKg, 0);

  const collectedDonations = donations.filter(
    (d) =>
      d.status === 'collected' ||
      d.status === 'delivered_to_facility' ||
      d.status === 'inspection_completed' ||
      d.status === 'accepted_for_feed' ||
      d.status === 'rejected_composted'
  );

  const totalCollectedKg =
    initialImpactMetrics.totalCollectedKg +
    collectedDonations
      .filter((d) => !initialDonations.some((init) => init.id === d.id))
      .reduce((sum, d) => sum + (d.actualCollectedKg || d.quantityKg), 0);

  const acceptedDonations = donations.filter((d) => d.status === 'accepted_for_feed');
  const totalAcceptedForFeedKg =
    initialImpactMetrics.totalAcceptedForFeedKg +
    acceptedDonations
      .filter((d) => !initialDonations.some((init) => init.id === d.id))
      .reduce((sum, d) => sum + (d.actualCollectedKg || d.quantityKg), 0);

  const totalFeedProducedKg =
    initialImpactMetrics.totalFeedProducedKg +
    batches
      .filter((b) => !initialBatches.some((init) => init.id === b.id))
      .reduce((sum, b) => sum + b.outputFeedWeightKg, 0);

  const impactMetrics: EnvironmentalImpactMetrics = {
    totalDonatedKg,
    totalCollectedKg,
    totalAcceptedForFeedKg,
    totalFeedProducedKg,
    activeDonorsCount: 148 + donations.length - initialDonations.length,
    activeCollectorsCount: 32,
    activeProcessingFacilitiesCount: 9,
    activeFarmersCount: 260 + orders.length - initialOrders.length,
    landfillDiversionKg: totalCollectedKg,
    ghgEmissionsAvoidedKgCO2e: Math.round(totalCollectedKg * 2.45 * 10) / 10,
    waterSavingsLitres: Math.round(totalCollectedKg * 180),
  };

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentTab,
        setCurrentTab,
        language,
        setLanguage,
        t,
        donations,
        addDonation,
        updateDonationStatus,
        assignCollectorToDonation,
        inspections,
        addInspection,
        batches,
        createBatch,
        products,
        orders,
        placeOrder,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        impactMetrics,
        selectedTraceabilityId,
        setSelectedTraceabilityId,
        showSafetyModal,
        setShowSafetyModal,
        showOnboarding,
        setShowOnboarding,
        resetToDefaultData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
