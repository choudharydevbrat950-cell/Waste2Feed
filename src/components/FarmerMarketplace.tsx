import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AnimalSpecies, FeedProduct, FeedOrder } from '../types';
import {
  ShoppingBag,
  Tractor,
  ShieldCheck,
  CheckCircle2,
  Tag,
  Truck,
  ArrowRight,
  FileCheck,
  Package,
  Layers,
  Sparkles,
  Phone,
  MapPin,
} from 'lucide-react';

export const FarmerMarketplace: React.FC = () => {
  const {
    products,
    orders,
    placeOrder,
    t,
    language,
    setSelectedTraceabilityId,
  } = useApp();

  const [selectedSpecies, setSelectedSpecies] = useState<AnimalSpecies | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'catalog' | 'orders'>('catalog');
  const [selectedProductForOrder, setSelectedProductForOrder] = useState<FeedProduct | null>(null);

  // Order Form State
  const [bagsCount, setBagsCount] = useState<number>(4);
  const [buyerName, setBuyerName] = useState('Vikram Choudhary');
  const [farmName, setFarmName] = useState('Surya Dairy & Holstein Cattle Farm (45 Cows)');
  const [contact, setContact] = useState('+91 97180 33410');
  const [deliveryAddress, setDeliveryAddress] = useState('Village Mandawar, Sohna Road, District Gurugram, Haryana');
  const [paymentMethod, setPaymentMethod] = useState<'paid' | 'pay_on_delivery'>('paid');
  const [orderConfirmedId, setOrderConfirmedId] = useState<string | null>(null);

  const filteredProducts = products.filter(
    (p) => selectedSpecies === 'all' || p.species === selectedSpecies
  );

  const handleStartOrder = (product: FeedProduct) => {
    setSelectedProductForOrder(product);
    setBagsCount(Math.min(4, product.availableBags || 1));
    setOrderConfirmedId(null);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductForOrder) return;

    const totalKg = bagsCount * selectedProductForOrder.bagSizeKg;
    const totalAmount = bagsCount * selectedProductForOrder.pricePerBagInr;

    const orderId = placeOrder({
      buyerId: 'usr-farmer-current',
      buyerName,
      buyerFarmName: farmName,
      buyerContact: contact,
      deliveryAddress,
      items: [
        {
          productId: selectedProductForOrder.id,
          productTitle: selectedProductForOrder.title,
          batchId: selectedProductForOrder.batchId,
          bags: bagsCount,
          pricePerBag: selectedProductForOrder.pricePerBagInr,
          totalKg,
        },
      ],
      totalAmountInr: totalAmount,
      status: 'confirmed',
      paymentStatus: paymentMethod,
      estimatedDelivery: 'Tomorrow by 02:00 PM',
    });

    setOrderConfirmedId(orderId);
    setSelectedProductForOrder(null);
    setActiveTab('orders');
  };

  return (
    <div className="space-y-6">
      {/* Marketplace Banner */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 font-semibold">
              <Tractor className="w-4 h-4 text-emerald-700" />
              <span>CIRCULAR ANIMAL FEED MARKETPLACE</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
              {language === 'en'
                ? 'Affordable, High-Protein Upcycled Animal Feed'
                : 'सस्ता और उच्च प्रोटीन चक्रीय पशु आहार बाज़ार'}
            </h1>
            <p className="text-xs text-neutral-500 max-w-2xl">
              {language === 'en'
                ? 'Nutrient-rich feed formulated from verified pre-consumer bakery and brewery by-products. Lab-tested for pathogen elimination with full batch traceability.'
                : 'प्रमाणित खाद्य अवशेषों से निर्मित पौष्टिक चारा। प्रयोगशाला द्वारा परीक्षित और पूर्णतः सुरक्षित।'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs shrink-0">
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
              <span className="text-emerald-700 block text-[11px] font-medium">Farmer Savings</span>
              <span className="text-sm font-bold text-emerald-950 font-mono">30%–40% Off Virgin Grain</span>
            </div>
          </div>
        </div>

        {/* View Switcher & Species Filters */}
        <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl text-xs font-medium">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'catalog'
                  ? 'bg-white text-emerald-950 font-bold shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Browse Feed Catalog ({filteredProducts.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-white text-emerald-950 font-bold shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              My Livestock Orders ({orders.length})
            </button>
          </div>

          {/* Species tabs */}
          {activeTab === 'catalog' && (
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
              {(['all', 'dairy_cattle', 'poultry', 'aquaculture', 'goat_sheep'] as (AnimalSpecies | 'all')[]).map((sp) => (
                <button
                  key={sp}
                  onClick={() => setSelectedSpecies(sp)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    selectedSpecies === sp
                      ? 'bg-emerald-900 text-white shadow-xs'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {sp === 'all' ? 'All Livestock' : t.species[sp]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Catalog View */}
      {activeTab === 'catalog' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Product Image */}
                <div className="relative h-44 bg-neutral-100 overflow-hidden">
                  <img
                    src={product.imageUrl || '/src/assets/images/feed_pellets_livestock_1792718551344.jpg'}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-md text-[11px] font-semibold text-emerald-900 font-sans border border-neutral-200">
                    {t.species[product.species]}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-neutral-900/90 text-white px-2 py-1 rounded text-xs font-mono font-bold">
                    ₹{product.pricePerBagInr} / 50kg Bag
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-emerald-800 font-bold">{product.id}</span>
                    <span className="text-neutral-500 font-mono">
                      {product.availableBags} bags in stock
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-neutral-900 leading-snug">
                    {product.title}
                  </h3>

                  {/* Guaranteed Nutrients Grid */}
                  <div className="grid grid-cols-3 gap-2 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-neutral-400 block uppercase">Protein</span>
                      <strong className="text-emerald-800 font-mono text-sm">{product.crudeProtein}%</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 block uppercase">Crude Fat</span>
                      <strong className="text-neutral-800 font-mono text-sm">{product.crudeFat}%</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 block uppercase">Max Moisture</span>
                      <strong className="text-neutral-800 font-mono text-sm">{product.moisture}%</strong>
                    </div>
                  </div>

                  {/* Ingredients preview */}
                  <div className="text-[11px] text-neutral-600 line-clamp-2">
                    <strong className="text-neutral-800">Key Inputs: </strong>
                    {product.ingredients.join(', ')}
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{product.fssaiLicense}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-neutral-100 pt-3">
                <button
                  onClick={() => setSelectedTraceabilityId(product.batchId)}
                  className="text-xs font-medium text-neutral-600 hover:text-neutral-900 cursor-pointer"
                >
                  Inspect Batch QC
                </button>

                <button
                  onClick={() => handleStartOrder(product)}
                  disabled={product.availableBags === 0}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Order Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Orders View */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
            <span>Your confirmed animal feed delivery orders</span>
            <span className="font-mono">{orders.length} orders</span>
          </div>

          <div className="space-y-4">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono font-bold text-emerald-800">{ord.id}</span>
                      <span aria-hidden="true" className="text-neutral-300">·</span>
                      <span className="font-mono text-neutral-500">Tracking: {ord.trackingNumber}</span>
                    </div>
                    <h4 className="text-sm font-bold text-neutral-900 mt-0.5">{ord.buyerFarmName}</h4>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 capitalize">
                      {ord.status}
                    </span>
                    <span className="text-sm font-mono font-bold text-neutral-900">
                      ₹{ord.totalAmountInr.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-neutral-700">
                  {ord.items.map((i, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-neutral-50 p-2.5 rounded-lg">
                      <div>
                        <strong>{i.productTitle}</strong>
                        <span className="text-neutral-500 block text-[11px]">Batch: {i.batchId}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold">{i.bags} bags</span>
                        <span className="text-neutral-500 block text-[11px] font-mono">({i.totalKg} kg)</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500 pt-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{ord.deliveryAddress}</span>
                  </div>
                  <div>
                    Estimated Delivery: <strong className="text-neutral-800">{ord.estimatedDelivery}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order Modal */}
      {selectedProductForOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-sm">
          <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl border border-neutral-200 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-neutral-900">Place Animal Feed Order</h3>
                <span className="text-xs text-emerald-800 font-mono">{selectedProductForOrder.title}</span>
              </div>
              <button
                onClick={() => setSelectedProductForOrder(null)}
                className="text-neutral-400 hover:text-neutral-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1">
                    Number of Bags (50kg each) *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={selectedProductForOrder.availableBags}
                    value={bagsCount}
                    onChange={(e) => setBagsCount(Number(e.target.value))}
                    className="w-full text-base font-bold px-3 py-2 border border-neutral-300 rounded-lg focus:outline-emerald-600 font-mono"
                  />
                  <span className="text-[11px] text-neutral-400 mt-0.5 block">
                    Total weight: {bagsCount * 50} kg
                  </span>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-800 mb-1">
                    Total Invoice Amount (INR)
                  </label>
                  <div className="w-full text-base font-bold px-3 py-2 bg-neutral-100 rounded-lg font-mono text-neutral-900">
                    ₹{(bagsCount * selectedProductForOrder.pricePerBagInr).toLocaleString()}
                  </div>
                  <span className="text-[11px] text-emerald-700 mt-0.5 block">
                    ~₹{selectedProductForOrder.pricePerKgInr}/kg net
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1">
                  Farmer / Buyer Name *
                </label>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1">
                  Farm Name & Livestock Details *
                </label>
                <input
                  type="text"
                  required
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1">
                  Delivery Address *
                </label>
                <textarea
                  rows={2}
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1">
                  Contact Phone *
                </label>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1">
                  Payment Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2 p-2.5 bg-neutral-50 rounded-lg border border-neutral-200 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'paid'}
                      onChange={() => setPaymentMethod('paid')}
                    />
                    <span>UPI / NetBanking (Instant)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 bg-neutral-50 rounded-lg border border-neutral-200 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'pay_on_delivery'}
                      onChange={() => setPaymentMethod('pay_on_delivery')}
                    />
                    <span>Pay On Delivery (Weigh Check)</span>
                  </label>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedProductForOrder(null)}
                  className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Confirm & Dispatch Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
