import React, { useState } from 'react';
import { Check, Plus, SlidersHorizontal } from 'lucide-react';
import { DIETARY_LABELS, TIER_PRICING } from '../data/recipes';
import {
  CustomizedDish,
  Recipe,
  SubscriptionTier,
  UserProfile,
} from '../types/wabi';

interface MenuShowcaseProps {
  recipes: Recipe[];
  activeTier: SubscriptionTier;
  selectedRecipeIds: string[];
  requiredCount: number;
  customizations: Record<string, CustomizedDish>;
  profile: UserProfile;
  onTierChange: (tier: SubscriptionTier) => void;
  onToggleRecipe: (recipeId: string) => void;
  onOpenCustomizer: (recipe: Recipe) => void;
}

export const MenuShowcase: React.FC<MenuShowcaseProps> = ({
  recipes,
  activeTier,
  selectedRecipeIds,
  requiredCount,
  customizations,
  profile,
  onTierChange,
  onToggleRecipe,
  onOpenCustomizer,
}) => {
  const [viewFilter, setViewFilter] = useState<'active-tier' | 'all'>('active-tier');
  const [matchProfileOnly, setMatchProfileOnly] = useState(false);

  const visibleRecipes = recipes.filter((recipe) => {
    if (viewFilter === 'active-tier' && recipe.tier !== activeTier) {
      return false;
    }
    if (matchProfileOnly && profile.restrictions.length > 0) {
      // Check if recipe has un-swappable conflicts; vegetarian filters pure meat unless plant swap exists
      if (
        profile.restrictions.includes('vegetarian') &&
        !recipe.proteinOptions.some(
          (p) =>
            p.label.toLowerCase().includes('tofu') ||
            p.label.toLowerCase().includes('tempeh') ||
            p.label.toLowerCase().includes('mushroom') ||
            p.label.toLowerCase().includes('portobello')
        )
      ) {
        return false;
      }
    }
    return true;
  });

  const getCalculatedNutrition = (recipe: Recipe) => {
    const custom = customizations[recipe.id];
    const p =
      recipe.proteinOptions.find((x) => x.id === (custom?.proteinId || recipe.defaultProteinId)) ??
      recipe.proteinOptions[0];
    const b =
      recipe.baseOptions.find((x) => x.id === (custom?.baseId || recipe.defaultBaseId)) ??
      recipe.baseOptions[0];
    const v =
      recipe.vegOptions.find((x) => x.id === (custom?.vegId || recipe.defaultVegId)) ??
      recipe.vegOptions[0];

    return {
      calories: recipe.baseCalories + p.calorieDelta + b.calorieDelta + v.calorieDelta,
      protein: recipe.baseProtein + p.proteinDelta + b.proteinDelta + v.proteinDelta,
      isCustomized: Boolean(custom),
      proteinLabel: p.label,
      baseLabel: b.label,
    };
  };

  return (
    <section id="menus" className="py-14 sm:py-20 bg-[#FFFDFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header & Tier Switch */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#EC6426] mb-2">
              01. Two Tiers · Unlimited Customisation
            </p>
            <h2
              className="font-[Outfit] text-3xl sm:text-4xl font-bold text-[#632713] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Choose your menu tier, then tailor every ingredient.
            </h2>
            <p className="text-base text-[#632713]/75 mt-3">
              Whether you pick Everyday Local dishes or Celebrity Chef-Curated menus by Gordon Ramsay, you get full control over proteins, grains, and allergy swaps.
            </p>
          </div>

          {/* Segmented Tier Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            <div
              className="inline-flex p-1 bg-[#FDE3CF]/70 rounded-xl border border-[#632713]/10"
              role="tablist"
              aria-label="Subscription Tier Menu Filter"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTier === 'base' && viewFilter === 'active-tier'}
                onClick={() => {
                  onTierChange('base');
                  setViewFilter('active-tier');
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTier === 'base' && viewFilter === 'active-tier'
                    ? 'bg-[#632713] text-white shadow-sm'
                    : 'text-[#632713] hover:text-[#EC6426]'
                }`}
              >
                Base: Everyday Local ($9.90)
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTier === 'premium' && viewFilter === 'active-tier'}
                onClick={() => {
                  onTierChange('premium');
                  setViewFilter('active-tier');
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTier === 'premium' && viewFilter === 'active-tier'
                    ? 'bg-[#EC6426] text-white shadow-sm'
                    : 'text-[#632713] hover:text-[#EC6426]'
                }`}
              >
                Premium: Chef-Curated ($14.90)
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewFilter === 'all'}
                onClick={() => setViewFilter('all')}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  viewFilter === 'all'
                    ? 'bg-white text-[#632713] shadow-sm'
                    : 'text-[#632713]/80 hover:text-[#632713]'
                }`}
              >
                Compare All
              </button>
            </div>
          </div>
        </div>

        {/* Quiet Selection Status Bar */}
        <div className="mb-8 px-5 py-4 rounded-2xl bg-[#FEF5ED] border border-[#632713]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-sm text-[#632713]">
            <span className="font-semibold">
              {activeTier === 'premium'
                ? TIER_PRICING.premium.name
                : TIER_PRICING.base.name}
            </span>
            <span className="mx-2 text-[#8C5845]" aria-hidden="true">·</span>
            <span className="text-[#8C5845]">
              {selectedRecipeIds.length} of {requiredCount} weekly meals selected
            </span>
            {profile.restrictions.length > 0 && (
              <>
                <span className="mx-2 text-[#8C5845]" aria-hidden="true">·</span>
                <span className="text-[#EC6426] font-medium">
                  Profile safeguards: {profile.restrictions.map((r) => DIETARY_LABELS[r]).join(', ')}
                </span>
              </>
            )}
          </div>

          {profile.restrictions.length > 0 && (
            <button
              type="button"
              onClick={() => setMatchProfileOnly((prev) => !prev)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                matchProfileOnly
                  ? 'bg-[#632713] text-white border-[#632713]'
                  : 'bg-white text-[#632713] border-[#632713]/15 hover:border-[#EC6426]'
              }`}
            >
              {matchProfileOnly ? 'Showing Profile-Matched Only' : 'Filter Strictly to My Profile'}
            </button>
          )}
        </div>

        {/* Uniform Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {visibleRecipes.map((recipe) => {
            const isSelected = selectedRecipeIds.includes(recipe.id);
            const { calories, protein, isCustomized, proteinLabel, baseLabel } =
              getCalculatedNutrition(recipe);
            const isPremium = recipe.tier === 'premium';

            return (
              <article
                key={recipe.id}
                className={`group flex flex-col justify-between bg-white rounded-3xl overflow-hidden border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                  isSelected
                    ? 'border-[#EC6426] ring-1 ring-[#EC6426]'
                    : 'border-[#632713]/12'
                }`}
              >
                <div>
                  {/* 4:3 Recipe Photo */}
                  <div className="relative aspect-[4/3] bg-[#FDE3CF]/40 overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {/* Unboxed clean metadata line */}
                    <p className="text-xs font-medium text-[#8C5845] mb-1.5">
                      <span>{isPremium ? 'Chef-Curated Tier' : 'Base Local Tier'}</span>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      <span>{recipe.cuisine}</span>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{recipe.prepMinutes} min</span>
                    </p>

                    <h3 className="font-[Outfit] text-lg font-bold text-[#632713] leading-snug">
                      {recipe.title}
                    </h3>

                    {recipe.chefCredit && (
                      <p className="text-xs font-semibold text-[#EC6426] mt-1">
                        {recipe.chefCredit}
                      </p>
                    )}

                    <p className="text-sm text-[#632713]/75 mt-2 leading-relaxed">
                      {recipe.subtitle}
                    </p>

                    {/* Current Customisation Snapshot */}
                    <div className="mt-4 pt-3.5 border-t border-[#632713]/10 space-y-1.5 text-xs">
                      <p className="text-[#632713]">
                        <span className="text-[#8C5845]">Protein: </span>
                        <span className="font-medium">{proteinLabel}</span>
                      </p>
                      <p className="text-[#632713]">
                        <span className="text-[#8C5845]">Base: </span>
                        <span className="font-medium">{baseLabel}</span>
                      </p>
                      <p className="text-[#632713]">
                        <span className="text-[#8C5845]">UglyFood Rescue: </span>
                        <span className="font-medium">
                          {recipe.rescuedProduce.slice(0, 2).join(', ')}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Macros + Actions */}
                <div className="px-6 pb-6 pt-3 border-t border-[#632713]/8 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#632713]">
                    <span className="font-mono tabular-nums font-semibold">
                      {calories} kcal · {protein}g protein
                    </span>
                    <span className="font-mono tabular-nums font-semibold text-[#EC6426]">
                      ${isPremium ? '19.90' : '9.90'} / day
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => onOpenCustomizer(recipe)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-[#632713] bg-[#FDE3CF]/65 hover:bg-[#FDE3CF] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>{isCustomized ? 'Edited' : 'Customise'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (recipe.tier !== activeTier) {
                          onTierChange(recipe.tier);
                        }
                        onToggleRecipe(recipe.id);
                      }}
                      className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-[#632713] text-white hover:bg-[#4c1d0e]'
                          : 'bg-[#EC6426] text-white hover:bg-[#d5531a]'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#F8A91F]" />
                          <span>In Your Box</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Box</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
