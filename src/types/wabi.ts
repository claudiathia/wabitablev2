export type SubscriptionTier = 'base' | 'premium';

export type DietaryRestriction =
  | 'nut-free'
  | 'shellfish-free'
  | 'dairy-free'
  | 'gluten-free'
  | 'halal-friendly'
  | 'vegetarian'
  | 'low-sodium'
  | 'no-spicy';

export type LifestyleMode =
  | 'gym-runner'
  | 'active-daily'
  | 'busy-parent'
  | 'retiree-light';

export type HealthGoal =
  | 'lean-muscle'
  | 'heart-low-gi'
  | 'family-dinners'
  | 'weight-care';

export type TastePreference =
  | 'extra-greens'
  | 'high-protein'
  | 'whole-grains'
  | 'less-oil'
  | 'quick-prep';

export interface UserProfile {
  name: string;
  lifestyle: LifestyleMode;
  goal: HealthGoal;
  restrictions: DietaryRestriction[];
  preferences: TastePreference[];
}

export interface SwapOption {
  id: string;
  label: string;
  calorieDelta: number;
  proteinDelta: number;
  carbsDelta: number;
  allergens?: DietaryRestriction[];
  note?: string;
}

export interface Recipe {
  id: string;
  tier: SubscriptionTier;
  title: string;
  subtitle: string;
  chefCredit?: string;
  cuisine: string;
  prepMinutes: number;
  baseCalories: number;
  baseProtein: number;
  baseCarbs: number;
  baseFiber: number;
  image: string;
  imageAlt: string;
  rescuedProduce: string[];
  containsAllergens: DietaryRestriction[];
  proteinOptions: SwapOption[];
  baseOptions: SwapOption[];
  vegOptions: SwapOption[];
  defaultProteinId: string;
  defaultBaseId: string;
  defaultVegId: string;
}

export interface CustomizedDish {
  recipeId: string;
  proteinId: string;
  baseId: string;
  vegId: string;
  excludedNotes: string[];
}

export interface SubscriptionPlanState {
  tier: SubscriptionTier;
  packageDays: 14 | 30;
  servingsPerMeal: 1 | 2 | 4;
  mealsPerWeek: 3 | 4 | 5;
  deliverySlot: 'tue-am' | 'thu-pm' | 'sat-am';
  selectedRecipeIds: string[];
  customizations: Record<string, CustomizedDish>;
}

export type PaymentMethod = 'card' | 'paynow' | 'apple-pay';

export interface ConfirmedOrder {
  orderId: string;
  createdAt: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  paymentMethod: PaymentMethod;
  plan: SubscriptionPlanState;
  subtotal: number;
  uglyFoodSavings: number;
  discountAmount: number;
  totalPaid: number;
  rescuedKgTotal: number;
}
