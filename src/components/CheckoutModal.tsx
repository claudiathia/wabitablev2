import React, { useEffect, useState } from 'react';
import {
  CreditCard,
  Lock,
  QrCode,
  ShieldCheck,
  Smartphone,
  X,
} from 'lucide-react';
import { TIER_PRICING } from '../data/recipes';
import {
  ConfirmedOrder,
  PaymentMethod,
  SubscriptionPlanState,
  UserProfile,
} from '../types/wabi';

interface CheckoutModalProps {
  isOpen: boolean;
  plan: SubscriptionPlanState;
  profile: UserProfile;
  confirmedOrder: ConfirmedOrder | null;
  onUpdatePlan: (next: SubscriptionPlanState) => void;
  onSubmitOrder: (order: ConfirmedOrder) => void;
  onResetOrder: () => void;
  onClose: () => void;
}

const DELIVERY_SLOTS = [
  { id: 'tue-am', label: 'Tue Morning (8am–12pm)' },
  { id: 'thu-pm', label: 'Thu Evening (5pm–9pm)' },
  { id: 'sat-am', label: 'Sat Morning (8am–12pm)' },
] as const;

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  plan,
  profile,
  confirmedOrder,
  onUpdatePlan,
  onSubmitOrder,
  onResetOrder,
  onClose,
}) => {
  const [customerName, setCustomerName] = useState(profile.name || '');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (profile.name && !customerName) {
      setCustomerName(profile.name);
    }
  }, [profile.name, customerName]);

  if (!isOpen) return null;

  const tierInfo = TIER_PRICING[plan.tier];
  const packagePrice =
    plan.packageDays === 14 ? tierInfo.price14Days : tierInfo.price30Days;
  const uglyFoodSavings = +(
    plan.packageDays * tierInfo.groceryComparisonSavingsPerDay
  ).toFixed(2);
  const discountAmount = promoApplied ? +(packagePrice * 0.15).toFixed(2) : 0;
  const totalPaid = +(packagePrice - discountAmount).toFixed(2);
  const rescuedKgTotal = +(plan.packageDays * 0.45).toFixed(1);

  const handleApplyPromo = () => {
    if (promoInput.trim().toUpperCase() === 'WABI15') {
      setPromoApplied(true);
      setFormError(null);
    } else {
      setPromoApplied(false);
      setFormError('Invalid promo code. Try WABI15 for 15% off your package.');
    }
  };

  const formatCardInput = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!customerName.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      setFormError('Please complete your name, email, phone number, and delivery address.');
      return;
    }

    if (!/^\d{6}$/.test(postalCode.trim())) {
      setFormError('Please enter a valid 6-digit Singapore postal code.');
      return;
    }

    if (paymentMethod === 'card') {
      const cleanCard = cardNumber.replace(/\s+/g, '');
      if (cleanCard.length < 12 || !cardExpiry.trim() || cardCvc.trim().length < 3) {
        setFormError('Please enter valid card details, or switch to PayNow / Apple Pay.');
        return;
      }
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      const order: ConfirmedOrder = {
        orderId: `WT-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toLocaleDateString('en-SG', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        customerName: customerName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        postalCode: postalCode.trim(),
        paymentMethod,
        plan,
        subtotal: packagePrice,
        uglyFoodSavings,
        discountAmount,
        totalPaid,
        rescuedKgTotal,
      };
      setIsSubmitting(false);
      onSubmitOrder(order);
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#632713]/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div className="bg-[#FFFDFB] w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#632713]/15 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#FFFDFB]/95 backdrop-blur-md px-6 py-4 border-b border-[#632713]/10 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#EC6426]">
              {confirmedOrder ? 'Subscription Confirmed' : 'Subscribe & Pay'}
            </p>
            <h2
              id="checkout-modal-title"
              className="font-[Outfit] text-xl font-bold text-[#632713]"
            >
              {confirmedOrder
                ? `Order ${confirmedOrder.orderId}`
                : `${tierInfo.name} · ${plan.packageDays}-Day Package`}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#632713] hover:bg-[#FDE3CF]/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedOrder ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#FDE3CF]/65 text-[#632713]">
              <ShieldCheck className="w-6 h-6 text-[#EC6426] shrink-0" />
              <div>
                <p className="text-sm font-bold">
                  Payment Verified for {confirmedOrder.customerName}
                </p>
                <p className="text-xs text-[#8C5845]">
                  {TIER_PRICING[confirmedOrder.plan.tier].name} · {confirmedOrder.plan.packageDays}-Day Package
                </p>
              </div>
            </div>

            <dl className="space-y-2.5 text-sm border-y border-[#632713]/10 py-4">
              <div className="flex justify-between">
                <dt className="text-[#8C5845]">Delivering to</dt>
                <dd className="font-medium text-[#632713] text-right">
                  {confirmedOrder.address}, SG {confirmedOrder.postalCode}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#8C5845]">Rescued UglyFood Produce</dt>
                <dd className="font-mono tabular-nums font-medium text-[#632713]">
                  {confirmedOrder.rescuedKgTotal} kg
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#8C5845]">Package Total Charged</dt>
                <dd className="font-mono tabular-nums font-bold text-[#EC6426]">
                  ${confirmedOrder.totalPaid.toFixed(2)}
                </dd>
              </div>
            </dl>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onResetOrder}
                className="flex-1 py-3 px-4 text-sm font-semibold text-[#632713] bg-[#FDE3CF]/70 hover:bg-[#FDE3CF] rounded-xl transition-colors cursor-pointer"
              >
                Change Plan
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 text-sm font-bold text-white bg-[#EC6426] hover:bg-[#d5531a] rounded-xl transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCheckoutSubmit} className="p-6 sm:p-8 space-y-5">
            {/* Switch 14 vs 30 days quickly inside checkout */}
            <div>
              <p className="text-xs font-semibold text-[#632713] mb-2">
                Package Duration
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {([14, 30] as const).map((days) => {
                  const price =
                    days === 14 ? tierInfo.price14Days : tierInfo.price30Days;
                  const active = plan.packageDays === days;
                  return (
                    <button
                      key={days}
                      type="button"
                      onClick={() => onUpdatePlan({ ...plan, packageDays: days })}
                      className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#FDE3CF]/70 border-[#EC6426] ring-1 ring-[#EC6426]'
                          : 'bg-white border-[#632713]/15 hover:border-[#EC6426]'
                      }`}
                    >
                      <span className="text-xs font-semibold text-[#632713] block">
                        {days}-Day Package
                      </span>
                      <span className="font-mono tabular-nums text-base font-bold text-[#EC6426]">
                        ${price.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Delivery Window */}
            <div>
              <p className="text-xs font-semibold text-[#632713] mb-2">
                Preferred Chilled Delivery Window
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {DELIVERY_SLOTS.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => onUpdatePlan({ ...plan, deliverySlot: slot.id })}
                    className={`px-3 py-2 text-xs font-semibold rounded-xl border text-left transition-colors cursor-pointer ${
                      plan.deliverySlot === slot.id
                        ? 'bg-[#632713] text-white border-[#632713]'
                        : 'bg-white text-[#632713] border-[#632713]/15 hover:border-[#EC6426]'
                    }`}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Totals */}
            <div className="p-4 rounded-2xl bg-[#FEF5ED] border border-[#632713]/10 space-y-1.5 text-sm">
              <div className="flex justify-between text-[#632713]">
                <span>
                  {tierInfo.shortName} ({plan.packageDays} days)
                </span>
                <span className="font-mono tabular-nums font-medium">
                  ${packagePrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-[#8C5845]">
                <span>UglyFood Farm Surplus Savings</span>
                <span className="font-mono tabular-nums text-[#632713]">
                  Saved ~${uglyFoodSavings.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-[#8C5845]">
                <span>Chilled Islandwide Delivery</span>
                <span className="font-semibold text-[#632713]">Free</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-xs font-semibold text-[#EC6426]">
                  <span>Promo (WABI15 · 15% off)</span>
                  <span className="font-mono tabular-nums">
                    -${discountAmount.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-[#632713]/10 text-base font-bold text-[#632713]">
                <span>Total Due</span>
                <span className="font-mono tabular-nums text-[#EC6426]">
                  ${totalPaid.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Promo */}
            <div className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Promo code (try WABI15)"
                aria-label="Promo code"
                className="flex-1 px-3.5 py-2 text-xs text-[#632713] bg-white border border-[#632713]/20 rounded-xl focus:outline-none focus:border-[#EC6426]"
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                className="px-4 py-2 text-xs font-semibold text-[#632713] bg-[#FDE3CF] hover:bg-[#F8A91F]/50 rounded-xl transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>

            {/* Customer Info */}
            <div className="space-y-2.5">
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Full Name"
                aria-label="Full Name"
                className="w-full px-3.5 py-2.5 text-sm text-[#632713] bg-white border border-[#632713]/20 rounded-xl focus:outline-none focus:border-[#EC6426]"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  aria-label="Email Address"
                  className="w-full px-3.5 py-2.5 text-sm text-[#632713] bg-white border border-[#632713]/20 rounded-xl focus:outline-none focus:border-[#EC6426]"
                />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone (e.g. 9123 4567)"
                  aria-label="Phone Number"
                  className="w-full px-3.5 py-2.5 text-sm text-[#632713] bg-white border border-[#632713]/20 rounded-xl focus:outline-none focus:border-[#EC6426]"
                />
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street & Unit"
                  aria-label="Delivery Street Address"
                  className="col-span-2 w-full px-3.5 py-2.5 text-sm text-[#632713] bg-white border border-[#632713]/20 rounded-xl focus:outline-none focus:border-[#EC6426]"
                />
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Postal (6-digit)"
                  aria-label="Singapore Postal Code"
                  className="w-full px-3.5 py-2.5 text-sm font-mono text-[#632713] bg-white border border-[#632713]/20 rounded-xl focus:outline-none focus:border-[#EC6426]"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <p className="text-xs font-semibold text-[#632713] mb-2">
                Payment Method
              </p>
              <div className="grid grid-cols-3 gap-2 mb-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-[#632713] text-white border-[#632713]'
                      : 'bg-white text-[#632713] border-[#632713]/15'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paynow')}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                    paymentMethod === 'paynow'
                      ? 'bg-[#632713] text-white border-[#632713]'
                      : 'bg-white text-[#632713] border-[#632713]/15'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>PayNow</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple-pay')}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                    paymentMethod === 'apple-pay'
                      ? 'bg-[#632713] text-white border-[#632713]'
                      : 'bg-white text-[#632713] border-[#632713]/15'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Apple Pay</span>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardInput(e.target.value))}
                    placeholder="Card Number (e.g. 4242 4242 4242 4242)"
                    aria-label="Card Number"
                    className="w-full px-3.5 py-2.5 text-sm font-mono text-[#632713] bg-white border border-[#632713]/20 rounded-xl focus:outline-none focus:border-[#EC6426]"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      aria-label="Card Expiry"
                      className="w-full px-3.5 py-2.5 text-sm font-mono text-[#632713] bg-white border border-[#632713]/20 rounded-xl focus:outline-none focus:border-[#EC6426]"
                    />
                    <input
                      type="text"
                      maxLength={4}
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ''))}
                      placeholder="CVC"
                      aria-label="Card CVC"
                      className="w-full px-3.5 py-2.5 text-sm font-mono text-[#632713] bg-white border border-[#632713]/20 rounded-xl focus:outline-none focus:border-[#EC6426]"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'paynow' && (
                <div className="p-3 rounded-xl bg-[#FEF5ED] border border-[#632713]/10 text-xs text-[#632713]">
                  PayNow UEN <span className="font-mono font-semibold">2026WABITABLE</span> will be authorised upon clicking Subscribe &amp; Pay.
                </div>
              )}

              {paymentMethod === 'apple-pay' && (
                <div className="p-3 rounded-xl bg-[#FEF5ED] border border-[#632713]/10 text-xs text-[#632713]">
                  Express Apple Pay authorises ${totalPaid.toFixed(2)} for your {plan.packageDays}-day package.
                </div>
              )}
            </div>

            {formError && (
              <p className="text-xs font-medium text-[#EC6426]" role="alert">
                {formError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-[#EC6426] hover:bg-[#d5531a] disabled:opacity-60 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>
                {isSubmitting
                  ? 'Confirming...'
                  : `Subscribe & Pay $${totalPaid.toFixed(2)}`}
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
