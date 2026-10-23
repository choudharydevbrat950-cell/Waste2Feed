export type UserRole = 'donor' | 'collector' | 'processor' | 'farmer' | 'admin';

export type Language = 'en' | 'hi';

export type FoodCategory =
  | 'bakery_grains'
  | 'fresh_vegetables_fruits'
  | 'brewers_grain'
  | 'dairy_byproducts'
  | 'pre_consumer_grains'
  | 'fruit_pulp_peels'
  | 'oilseed_meals';

export type AnimalSpecies = 'poultry' | 'dairy_cattle' | 'aquaculture' | 'swine' | 'goat_sheep';

export type DonationStatus =
  | 'submitted'
  | 'collector_assigned'
  | 'pickup_scheduled'
  | 'on_the_way'
  | 'collected'
  | 'delivered_to_facility'
  | 'inspection_completed'
  | 'accepted_for_feed'
  | 'rejected_composted';

export interface LocationCoordinates {
  lat: number;
  lng: number;
  address: string;
  city: string;
  pincode?: string;
}

export interface DonationItem {
  id: string; // e.g. DON-8421
  title: string;
  category: FoodCategory;
  donorId: string;
  donorName: string;
  donorType: 'restaurant' | 'supermarket' | 'hotel' | 'vegetable_market' | 'food_processor' | 'household';
  donorPhone: string;
  quantityKg: number;
  actualCollectedKg?: number;
  description: string;
  imageUrl?: string;
  storageCondition: 'ambient' | 'refrigerated' | 'frozen' | 'dry_covered';
  timeSinceGenerationHours: number;
  pickupWindowStart: string;
  pickupWindowEnd: string;
  location: LocationCoordinates;
  specialInstructions?: string;
  status: DonationStatus;
  submittedAt: string;
  assignedCollectorId?: string;
  assignedCollectorName?: string;
  scheduledPickupTime?: string;
  collectedAt?: string;
  collectionProofPhoto?: string;
  deliveredAt?: string;
  facilityId?: string;
  facilityName?: string;
  inspectionId?: string;
  batchId?: string;
  suitableForAnimalFeed: boolean;
  rejectionReason?: string;
}

export interface CollectionTask {
  id: string; // COL-3012
  donationId: string;
  collectorId: string;
  collectorName: string;
  collectorVehicleNumber: string;
  status: 'assigned' | 'en_route' | 'collected' | 'delivered';
  targetFacilityId: string;
  targetFacilityName: string;
  assignedAt: string;
  completedAt?: string;
  verifiedWeightKg?: number;
  driverNotes?: string;
  distanceKm: number;
}

export interface QualityInspection {
  id: string; // QC-5120
  donationId: string;
  facilityId: string;
  inspectorName: string;
  inspectedAt: string;
  moisturePercentage: number;
  temperatureCelsius: number;
  visualMoldPresent: boolean;
  foreignMatterPresent: boolean;
  foreignMatterNotes?: string;
  foulOdorDetected: boolean;
  feedSafetyCompliance: boolean; // FSSAI & Livestock Feed Safe
  eligibleSpecies: AnimalSpecies[];
  status: 'passed_for_processing' | 'rejected_diverted_to_compost';
  qcScore: number; // 0-100
  notes: string;
}

export interface ProcessingBatch {
  id: string; // BATCH-2026-081
  facilityId: string;
  facilityName: string;
  startedAt: string;
  completedAt?: string;
  status: 'in_drying' | 'pelletizing_extrusion' | 'quality_testing' | 'packaged_ready';
  inputDonationIds: string[];
  totalInputWeightKg: number;
  outputFeedWeightKg: number;
  conversionYieldPercentage: number; // e.g. 42%
  thermalProcessingTempCelsius: number; // e.g. 115°C
  targetSpecies: AnimalSpecies;
  proteinContentPercentage: number;
  moisturePercentage: number;
  crudeFiberPercentage: number;
  productSkuId: string;
  productName: string;
  labCertificateNumber: string;
}

export interface FeedProduct {
  id: string; // FEED-401
  batchId: string;
  title: string;
  species: AnimalSpecies;
  pricePerBagInr: number; // 50kg bag
  pricePerKgInr: number;
  availableBags: number;
  bagSizeKg: number;
  crudeProtein: number;
  crudeFat: number;
  crudeFiber: number;
  moisture: number;
  ingredients: string[];
  manufacturerName: string;
  facilityLocation: string;
  fssaiLicense: string;
  imageUrl?: string;
  featured?: boolean;
}

export interface FeedOrder {
  id: string; // ORD-7712
  buyerId: string;
  buyerName: string;
  buyerFarmName: string;
  buyerContact: string;
  deliveryAddress: string;
  items: {
    productId: string;
    productTitle: string;
    batchId: string;
    bags: number;
    pricePerBag: number;
    totalKg: number;
  }[];
  totalAmountInr: number;
  orderDate: string;
  status: 'pending' | 'confirmed' | 'dispatched' | 'delivered';
  paymentStatus: 'paid' | 'pay_on_delivery';
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  roleTarget?: UserRole;
  relatedId?: string;
  type: 'donation' | 'pickup' | 'qc' | 'batch' | 'order' | 'compliance';
}

export interface EnvironmentalImpactMetrics {
  totalDonatedKg: number;
  totalCollectedKg: number;
  totalAcceptedForFeedKg: number;
  totalFeedProducedKg: number;
  activeDonorsCount: number;
  activeCollectorsCount: number;
  activeProcessingFacilitiesCount: number;
  activeFarmersCount: number;
  landfillDiversionKg: number;
  ghgEmissionsAvoidedKgCO2e: number;
  waterSavingsLitres: number;
}
