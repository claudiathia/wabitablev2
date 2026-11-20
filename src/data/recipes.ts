import { DietaryRestriction, LifestyleMode, HealthGoal, Recipe, TastePreference } from '../types/wabi';

export const DIETARY_LABELS: Record<DietaryRestriction, string> = {
  'nut-free': 'Nut-Free',
  'shellfish-free': 'Shellfish-Free',
  'dairy-free': 'Dairy-Free',
  'gluten-free': 'Gluten-Free',
  'halal-friendly': 'Halal-Friendly',
  vegetarian: 'Vegetarian',
  'low-sodium': 'Low-Sodium',
  'no-spicy': 'Mild / No Chilli',
};

export const LIFESTYLE_OPTIONS: {
  id: LifestyleMode;
  label: string;
  detail: string;
  kcalTarget: string;
  proteinFocus: string;
}[] = [
  {
    id: 'gym-runner',
    label: 'Gym & Runner',
    detail: 'High output training 4–6x weekly',
    kcalTarget: '620–750 kcal / meal',
    proteinFocus: '38–48g protein',
  },
  {
    id: 'active-daily',
    label: 'Active Daily',
    detail: 'Brisk walks, yoga, steady movement',
    kcalTarget: '520–620 kcal / meal',
    proteinFocus: '28–36g protein',
  },
  {
    id: 'busy-parent',
    label: 'Busy Working Adult / Parent',
    detail: 'Fast, nourishing home dinners in 20 mins',
    kcalTarget: '500–600 kcal / meal',
    proteinFocus: '26–35g protein',
  },
  {
    id: 'retiree-light',
    label: 'Retiree / Gentle Pace',
    detail: 'Lighter, heart-friendly & easy to digest',
    kcalTarget: '430–520 kcal / meal',
    proteinFocus: '24–30g protein',
  },
];

export const GOAL_OPTIONS: {
  id: HealthGoal;
  label: string;
  detail: string;
}[] = [
  {
    id: 'lean-muscle',
    label: 'Lean Muscle & Recovery',
    detail: 'Higher lean protein + complex local grains',
  },
  {
    id: 'heart-low-gi',
    label: 'Heart-Smart & Low-GI',
    detail: 'Low sodium, high fibre, wholegrain swaps',
  },
  {
    id: 'family-dinners',
    label: 'Effortless Family Meals',
    detail: 'Zero grocery queues, crowd-pleasing flavours',
  },
  {
    id: 'weight-care',
    label: 'Balanced Weight Care',
    detail: 'Portion-controlled macros & extra rescued greens',
  },
];

export const PREFERENCE_OPTIONS: {
  id: TastePreference;
  label: string;
}[] = [
  { id: 'extra-greens', label: 'Extra Rescued Greens' },
  { id: 'high-protein', label: 'High-Protein Boost' },
  { id: 'whole-grains', label: 'Whole-Grain Base' },
  { id: 'less-oil', label: 'Light Oil & Less Sugar' },
  { id: 'quick-prep', label: '20-Min Quick Prep' },
];

export const TIER_PRICING = {
  base: {
    name: 'Everyday Local Table',
    shortName: 'Base Tier',
    pricePerServing: 9.9,
    price14Days: 138.6,
    price30Days: 297.0,
    groceryComparisonSavingsPerDay: 3.1,
    description:
      'Wholesome Singaporean & regional home cooking built around fresh UglyFood rescued vegetables and customisable macros.',
  },
  premium: {
    name: 'Chef-Curated Table',
    shortName: 'Premium Tier',
    pricePerServing: 19.9,
    price14Days: 278.6,
    price30Days: 597.0,
    groceryComparisonSavingsPerDay: 5.2,
    description:
      'Elevated restaurant-calibre recipes designed with celebrity chefs like Gordon Ramsay, tailored to cook effortlessly in your own kitchen.',
  },
} as const;

export const RECIPES: Recipe[] = [
  {
    id: 'base-ginger-chicken',
    tier: 'base',
    title: 'Hainanese Poached Chicken & Ginger Rice',
    subtitle: 'Fragrant ginger-garlic brown rice, blanched bok choy & heirloom cucumber',
    cuisine: 'Singaporean Local',
    prepMinutes: 20,
    baseCalories: 540,
    baseProtein: 38,
    baseCarbs: 52,
    baseFiber: 7,
    image: '/src/assets/images/dish_chicken_rice_1795159607214.jpg',
    imageAlt: 'Singaporean Hainanese poached chicken rice with ginger-garlic brown rice, cucumber, and bok choy',
    rescuedProduce: ['Bent Sweet Scallions', 'Twisted Heirloom Cucumbers', 'Surplus Young Ginger', 'Baby Bok Choy'],
    containsAllergens: [],
    defaultProteinId: 'p-chicken',
    defaultBaseId: 'b-quinoa',
    defaultVegId: 'v-kailan',
    proteinOptions: [
      { id: 'p-chicken', label: 'Free-Range Kampong Chicken Breast', calorieDelta: 0, proteinDelta: 0, carbsDelta: 0 },
      { id: 'p-tofu', label: 'Organic Pressed Silken Tofu & Edamame', calorieDelta: -60, proteinDelta: -8, carbsDelta: 6 },
      { id: 'p-salmon', label: 'Pan-Seared Atlantic Salmon Fillet', calorieDelta: 85, proteinDelta: 4, carbsDelta: 0 },
    ],
    baseOptions: [
      { id: 'b-quinoa', label: 'Ginger-Garlic Brown Rice & Quinoa', calorieDelta: 0, proteinDelta: 0, carbsDelta: 0 },
      { id: 'b-brown', label: 'Wholegrain Thai Brown Rice', calorieDelta: 15, proteinDelta: -1, carbsDelta: 4 },
      { id: 'b-cauli', label: 'Garlicky Cauliflower Rice', calorieDelta: -140, proteinDelta: 1, carbsDelta: -36 },
    ],
    vegOptions: [
      { id: 'v-kailan', label: 'Blanched Bok Choy & Cucumber', calorieDelta: 0, proteinDelta: 0, carbsDelta: 0 },
      { id: 'v-bokchoy', label: 'Charred Baby Kai Lan & Pickled Radish', calorieDelta: 15, proteinDelta: 1, carbsDelta: 3 },
      { id: 'v-carrots', label: 'Roasted Wonky Rainbow Carrots', calorieDelta: 25, proteinDelta: 0, carbsDelta: 6 },
    ],
  },
  {
    id: 'base-miso-salmon',
    tier: 'base',
    title: 'Turmeric Glazed Salmon & Rainbow Roots',
    subtitle: 'Oven-roasted UglyFood heirloom carrots, soft-boiled egg & sesame greens',
    cuisine: 'Healthy Local Fusion',
    prepMinutes: 22,
    baseCalories: 590,
    baseProtein: 36,
    baseCarbs: 48,
    baseFiber: 8,
    image: '/src/assets/images/hero_wabi_meal_kit_1795158524958.jpg',
    imageAlt: 'Glazed salmon bowl with roasted purple and yellow carrots, edamame, and bok choy',
    rescuedProduce: ['Curved Rainbow Carrots', 'Blemished Cherry Tomatoes', 'Baby Bok Choy', 'Fresh Mint'],
    containsAllergens: ['gluten-free'],
    defaultProteinId: 'p-salmon-2',
    defaultBaseId: 'b-brown-2',
    defaultVegId: 'v-rainbow',
    proteinOptions: [
      { id: 'p-salmon-2', label: 'Miso-Turmeric Salmon Fillet', calorieDelta: 0, proteinDelta: 0, carbsDelta: 0 },
      { id: 'p-tempeh', label: 'Crispy Kecap Manis Tempeh (Plant)', calorieDelta: -70, proteinDelta: -10, carbsDelta: 10 },
      { id: 'p-chicken-2', label: 'Lemongrass Herb Chicken Thigh', calorieDelta: -20, proteinDelta: -2, carbsDelta: 2 },
    ],
    baseOptions: [
      { id: 'b-brown-2', label: 'Steamed Multigrain Brown Rice', calorieDelta: 0, proteinDelta: 0, carbsDelta: 0 },
      { id: 'b-soba', label: 'Chilled Buckwheat Soba Noodles', calorieDelta: -25, proteinDelta: 2, carbsDelta: -4 },
      { id: 'b-cauli-2', label: 'Herb Roasted Cauliflower & Edamame', calorieDelta: -130, proteinDelta: 2, carbsDelta: -32 },
    ],
    vegOptions: [
      { id: 'v-rainbow', label: 'Wonky Rainbow Carrots & Bok Choy', calorieDelta: 0, proteinDelta: 0, carbsDelta: 0 },
      { id: 'v-tomato', label: 'Blistered Heirloom Tomatoes & Kale', calorieDelta: -10, proteinDelta: 1, carbsDelta: -2 },
    ],
  },
  {
    id: 'base-teochew-fish',
    tier: 'base',
    title: 'Teochew Steamed Seabass & Surplus Greens',
    subtitle: 'Light sour-plum broth, braised daikon, shiitake & ginger strips',
    cuisine: 'Heritage Low-Sodium',
    prepMinutes: 18,
    baseCalories: 460,
    baseProtein: 34,
    baseCarbs: 44,
    baseFiber: 6,
    image: '/src/assets/images/dish_base_local_fare_1795158525805.jpg',
    imageAlt: 'Steamed seabass dish with bright greens and light aromatic broth',
    rescuedProduce: ['Odd-Shaped White Daikon', 'Surplus Plum Tomatoes', 'Ginger Root', 'Chinese Celery'],
    containsAllergens: [],
    defaultProteinId: 'p-seabass',
    defaultBaseId: 'b-jasmine',
    defaultVegId: 'v-daikon',
    proteinOptions: [
      { id: 'p-seabass', label: 'Local Farmed Seabass Fillet', calorieDelta: 0, proteinDelta: 0, carbsDelta: 0 },
      { id: 'p-tofu-fish', label: 'Braised Tau Kwa & Shiitake Mushrooms', calorieDelta: -45, proteinDelta: -9, carbsDelta: 8 },
    ],
    baseOptions: [
      { id: 'b-jasmine', label: 'Fragrant Red & Jasmine Rice', calorieDelta: 0, proteinDelta: 0, carbsDelta: 0 },
      { id: 'b-porridge', label: 'Silky Millet & Brown Rice Congee', calorieDelta: -40, proteinDelta: -1, carbsDelta: -6 },
    ],
    vegOptions: [
      { id: 'v-daikon', label: 'Braised Daikon & Cherry Tomatoes', calorieDelta: 0, proteinDelta: 0, carbsDelta: 0 },
      { id: 'v-chye', label: 'Extra Steamed Chye Sim & Mushrooms', calorieDelta: 10, proteinDelta: 2, carbsDelta: 1 },
    ],
  },
  {
    id: 'base-tempeh-rendang',
    tier: 'base',
    title: 'Light Coconut Lemongrass Tofu & Kang Kong',
    subtitle: 'Heart-smart rempah spice paste, toasted cashew crumble & rescued eggplant',
    cuisine: 'Plant-Forward Local',
    prepMinutes: 20,
    baseCalories: 510,
    baseProtein: 26,
    baseCarbs: 54,
    baseFiber: 11,
    image: '/src/assets/images/uglyfood_rescue_crate_1795158526140.jpg',
    imageAlt: 'Fresh farm vegetables including purple eggplant, mangoes, and crisp greens',
    rescuedProduce: ['Curved Purple Eggplants', 'Knobby Galangal & Lemongrass', 'Spinach Leaves', 'Green Mangoes'],
    containsAllergens: ['nut-free'],
    defaultProteinId: 'p-tempeh-2',
    defaultBaseId: 'b-basmati',
    defaultVegId: 'v-eggplant',
    proteinOptions: [
      { id: 'p-tempeh-2', label: 'Artisanal Fermented Tempeh & Tofu', calorieDelta: 0, proteinDelta: 0, carbsDelta: 0 },
      { id: 'p-chicken-3', label: 'Lean Free-Range Chicken Strips', calorieDelta: 25, proteinDelta: 10, carbsDelta: -6 },
    ],
    baseOptions: [
      { id: 'b-basmati', label: 'Turmeric Basmati & Quinoa', calorieDelta: 0, proteinDelta: 0, carbsDelta: 0 },
      { id: 'b-cauli-3', label: 'Green Mango & Cauliflower Rice', calorieDelta: -120, proteinDelta: 1, carbsDelta: -30 },
    ],
    vegOptions: [
      { id: 'v-eggplant', label: 'Charred Purple Eggplant & Spinach', calorieDelta: 0, proteinDelta: 0, carbsDelta: 0 },
      { id: 'v-mango-slaw', label: 'Extra Green Mango Herb Slaw', calorieDelta: -15, proteinDelta: 0, carbsDelta: 4 },
    ],
  },
  {
    id: 'prem-gordon-barramundi',
    tier: 'premium',
    title: 'Char-Grilled Spiny Lobster Laksa Vermicelli',
    subtitle: 'Silky rice vermicelli in golden coconut-laksa emulsion & blistered tomatoes',
    cuisine: 'Chef-Curated Local',
    chefCredit: 'Curated by Chef Gordon Ramsay',
    prepMinutes: 25,
    baseCalories: 615,
    baseProtein: 42,
    baseCarbs: 49,
    baseFiber: 6,
    image: '/src/assets/images/dish_lobster_laksa_1795159608695.jpg',
    imageAlt: 'Roasted lobster tail over vermicelli noodles in golden coconut laksa emulsion with heirloom cherry tomatoes',
    rescuedProduce: ['Bumpy Heirloom Cherry Tomatoes', 'Surplus Laksa Leaves', 'Fresh Turmeric Root', 'Micro Coriander'],
    containsAllergens: ['shellfish-free'],
    defaultProteinId: 'p-lobster',
    defaultBaseId: 'b-vermicelli',
    defaultVegId: 'v-tomato-laksa',
    proteinOptions: [
      { id: 'p-lobster', label: 'Char-Grilled Spiny Lobster Tail', calorieDelta: 0, proteinDelta: 0, carbsDelta: 0, allergens: ['shellfish-free'] },
      { id: 'p-barramundi', label: 'Local Kuhlbarra Crispy Barramundi (Shellfish-Free)', calorieDelta: 15, proteinDelta: 2, carbsDelta: 0 },
      { id: 'p-kingoyster', label: 'Seared King Oyster Mushroom Scallops (Plant)', calorieDelta: -110, proteinDelta: -18, carbsDelta: 12 },
    ],
    baseOptions: [
      { id: 'b-vermicelli', label: 'Artisanal Wholegrain Rice Vermicelli', calorieDelta: 0, proteinDelta: 0, carbsDelta: 0 },
      { id: 'b-zucchini', label: 'Spiralised Zucchini & Vermicelli Half-Half', calorieDelta: -95, proteinDelta: 1, carbsDelta: -24 },
    ],
    vegOptions: [
      { id: 'v-tomato-laksa', label: 'Blistered Heirloom Tomatoes & Herbs', calorieDelta: 0, proteinDelta: 0, carbsDelta: 0 },
      { id: 'v-beansprout', label: 'Charred French Beans & Sweet Peas', calorieDelta: 20, proteinDelta: 2, carbsDelta: 3 },
    ],
  },
  {
    id: 'prem-gordon-beef',
    tier: 'premium',
    title: 'Wok-Seared Beef Tenderloin & Black Pepper Jus',
    subtitle: 'Caramelised UglyFood sweet onions, rainbow carrots & garlic mash',
    cuisine: 'Chef-Curated East-West',
    chefCredit: 'Curated by Chef Gordon Ramsay',
    prepMinutes: 28,
    baseCalories: 660,
    baseProtein: 46,
    baseCarbs: 44,
    baseFiber: 7,
    image: '/src/assets/images/hero_wabi_meal_kit_1795158524958.jpg',
    imageAlt: 'Chef-curated seared protein with colourful roasted roots and crisp greens',
    rescuedProduce: ['Wonky Sweet Carrots', 'Surplus Red Onions', 'Baby Spinach', 'Heirloom Garlic'],
    containsAllergens: ['dairy-free'],
    defaultProteinId: 'p-tenderloin',
    defaultBaseId: 'b-mash',
    defaultVegId: 'v-carrots-jus',
    proteinOptions: [
      { id: 'p-tenderloin', label: 'Grass-Fed Beef Tenderloin Medallions', calorieDelta: 0, proteinDelta: 0, carbsDelta: 0 },
      { id: 'p-duck', label: 'Pan-Roasted Five-Spice Duck Breast', calorieDelta: 45, proteinDelta: -4, carbsDelta: 0 },
      { id: 'p-portobello', label: 'Balsamic Miso Portobello Steak', calorieDelta: -160, proteinDelta: -24, carbsDelta: 10 },
    ],
    baseOptions: [
      { id: 'b-mash', label: 'Olive-Oil Sweet Potato & Cauliflower Mash', calorieDelta: 0, proteinDelta: 0, carbsDelta: 0 },
      { id: 'b-quinoa-beef', label: 'Toasted Garlic Tri-Colour Quinoa', calorieDelta: -20, proteinDelta: 4, carbsDelta: -4 },
    ],
    vegOptions: [
      { id: 'v-carrots-jus', label: 'Glazed Rainbow Carrots & Spinach', calorieDelta: 0, proteinDelta: 0, carbsDelta: 0 },
      { id: 'v-asparagus', label: 'Charred Asparagus & Shiitake', calorieDelta: -15, proteinDelta: 2, carbsDelta: -3 },
    ],
  },
  {
    id: 'prem-chef-duck',
    tier: 'premium',
    title: 'Pandan-Brined Roast Duck & Mango Gastrique',
    subtitle: 'Spiced UglyFood honey-mango glaze, crispy kale & jasmine rice pilaf',
    cuisine: 'Modern Nyonya Fine Dining',
    chefCredit: 'Curated by Chef Malcolm Lee Guest Edit',
    prepMinutes: 26,
    baseCalories: 635,
    baseProtein: 39,
    baseCarbs: 51,
    baseFiber: 7,
    image: '/src/assets/images/dish_chef_gordon_laksa_1795158525867.jpg',
    imageAlt: 'Chef-curated golden glazed dish plated with vibrant herbs and heirloom tomatoes',
    rescuedProduce: ['Freckled Honey Mangoes', 'Curly Heritage Kale', 'Surplus Pandan Leaves', 'Red Shallots'],
    containsAllergens: [],
    defaultProteinId: 'p-duck-2',
    defaultBaseId: 'b-pilaf',
    defaultVegId: 'v-kale-mango',
    proteinOptions: [
      { id: 'p-duck-2', label: 'Pandan-Brined Duck Breast (Halal)', calorieDelta: 0, proteinDelta: 0, carbsDelta: 0 },
      { id: 'p-chicken-duck', label: 'Crispy Skin Spatchcock Chicken', calorieDelta: -55, proteinDelta: 2, carbsDelta: 0 },
    ],
    baseOptions: [
      { id: 'b-pilaf', label: 'Turmeric & Shallot Jasmine Pilaf', calorieDelta: 0, proteinDelta: 0, carbsDelta: 0 },
      { id: 'b-cauli-pilaf', label: 'Cauliflower & Pandan Herb Rice', calorieDelta: -135, proteinDelta: 1, carbsDelta: -32 },
    ],
    vegOptions: [
      { id: 'v-kale-mango', label: 'Crispy Kale & Freckled Mango Salad', calorieDelta: 0, proteinDelta: 0, carbsDelta: 0 },
      { id: 'v-eggplant-nyonya', label: 'Charred Sambal-Free Purple Eggplant', calorieDelta: 15, proteinDelta: 1, carbsDelta: 4 },
    ],
  },
  {
    id: 'prem-chef-risotto',
    tier: 'premium',
    title: 'Charred Miso Eggplant & Pumpkin Pearl Risotto',
    subtitle: 'Slow-roasted UglyFood kabocha purée, crispy sage & toasted pepitas',
    cuisine: 'Chef-Curated Vegetarian',
    chefCredit: 'Curated by Chef Gordon Ramsay',
    prepMinutes: 25,
    baseCalories: 545,
    baseProtein: 22,
    baseCarbs: 62,
    baseFiber: 10,
    image: '/src/assets/images/uglyfood_rescue_crate_1795158526140.jpg',
    imageAlt: 'Rescued local purple eggplants, golden squash, tomatoes, and leafy greens',
    rescuedProduce: ['Mottled Kabocha Pumpkin', 'Curved Purple Eggplants', 'Baby Spinach', 'Lemon Zest'],
    containsAllergens: ['dairy-free'],
    defaultProteinId: 'p-halloumi',
    defaultBaseId: 'b-barley',
    defaultVegId: 'v-kabocha',
    proteinOptions: [
      { id: 'p-halloumi', label: 'Seared Chickpea Tofu & Pepitas (Dairy-Free)', calorieDelta: 0, proteinDelta: 0, carbsDelta: 0 },
      { id: 'p-scallop', label: 'Hokkaido Pan-Seared Scallops', calorieDelta: 30, proteinDelta: 14, carbsDelta: -6, allergens: ['shellfish-free'] },
    ],
    baseOptions: [
      { id: 'b-barley', label: 'Creamy Pearl Barley & Brown Rice', calorieDelta: 0, proteinDelta: 0, carbsDelta: 0 },
      { id: 'b-quinoa-ris', label: 'Roasted Squash & Red Quinoa', calorieDelta: -45, proteinDelta: 3, carbsDelta: -10 },
    ],
    vegOptions: [
      { id: 'v-kabocha', label: 'Miso-Glazed Eggplant & Baby Spinach', calorieDelta: 0, proteinDelta: 0, carbsDelta: 0 },
      { id: 'v-heirloom-ris', label: 'Blistered Heirloom Tomatoes & Kale', calorieDelta: -15, proteinDelta: 1, carbsDelta: -2 },
    ],
  },
];
