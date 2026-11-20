/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { IngredientCustomizerModal } from './components/IngredientCustomizerModal';
import { MenuShowcase } from './components/MenuShowcase';
import { Navbar } from './components/Navbar';
import { PlansPage } from './components/PlansPage';
import { ProfileQuestionnairePage } from './components/ProfileQuestionnairePage';
import { UglyFoodSection } from './components/UglyFoodSection';
import { DIETARY_LABELS, LIFESTYLE_OPTIONS, RECIPES } from './data/recipes';
import {
  ConfirmedOrder,
  CustomizedDish,
  Recipe,
  SubscriptionPlanState,
  SubscriptionTier,
  UserProfile,
} from './types/wabi';

const STORAGE_KEY_PROFILE = 'wabi_table_profile_v1';
const STORAGE_KEY_PLAN = 'wabi_table_plan_v1';
const STORAGE_KEY_ORDER = 'wabi_table_order_v1';

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  lifestyle: 'busy-parent',
  goal: 'family-dinners',
  restrictions: [],
  preferences: ['extra-greens', 'quick-prep'],
};

const DEFAULT_PLAN: SubscriptionPlanState = {
  tier: 'base',
  packageDays: 14,
  servingsPerMeal: 2,
  mealsPerWeek: 3,
  deliverySlot: 'tue-am',
  selectedRecipeIds: ['base-ginger-chicken', 'base-miso-salmon', 'base-teochew-fish'],
  customizations: {},
};

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'profile' | 'plans'>(() => {
    if (window.location.hash === '#/profile') return 'profile';
    if (window.location.hash === '#/plans') return 'plans';
    return 'home';
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      return saved ? (JSON.parse(saved) as UserProfile) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [plan, setPlan] = useState<SubscriptionPlanState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PLAN);
      if (saved) {
        const parsed = JSON.parse(saved) as SubscriptionPlanState;
        return {
          ...DEFAULT_PLAN,
          ...parsed,
          packageDays: parsed.packageDays === 30 ? 30 : 14,
        };
      }
      return DEFAULT_PLAN;
    } catch {
      return DEFAULT_PLAN;
    }
  });

  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ORDER);
      return saved ? (JSON.parse(saved) as ConfirmedOrder) : null;
    } catch {
      return null;
    }
  });

  const [customizingRecipe, setCustomizingRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === '#/profile') setCurrentView('profile');
      else if (window.location.hash === '#/plans') setCurrentView('plans');
      else setCurrentView('home');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    } catch {
      // ignore storage quota issues
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PLAN, JSON.stringify(plan));
    } catch {
      // ignore storage quota issues
    }
  }, [plan]);

  useEffect(() => {
    try {
      if (confirmedOrder) {
        localStorage.setItem(STORAGE_KEY_ORDER, JSON.stringify(confirmedOrder));
      } else {
        localStorage.removeItem(STORAGE_KEY_ORDER);
      }
    } catch {
      // ignore storage quota issues
    }
  }, [confirmedOrder]);

  const openProfilePage = () => {
    setCurrentView('profile');
    window.history.replaceState(null, '', '#/profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPlansPage = () => {
    setCurrentView('plans');
    window.history.replaceState(null, '', '#/plans');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const jumpToSection = (sectionId: string) => {
    if (sectionId === 'subscribe' || sectionId === 'plans') {
      openPlansPage();
      return;
    }

    if (currentView !== 'home') {
      setCurrentView('home');
      window.history.replaceState(null, '', `#${sectionId}`);
      window.setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 60);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleTierChange = (tier: SubscriptionTier) => {
    const matchingTierRecipes = RECIPES.filter((r) => r.tier === tier);
    const currentValidIds = plan.selectedRecipeIds.filter((id) =>
      matchingTierRecipes.some((r) => r.id === id)
    );
    const nextIds =
      currentValidIds.length > 0
        ? currentValidIds
        : matchingTierRecipes.slice(0, plan.mealsPerWeek).map((r) => r.id);

    setPlan((prev) => ({
      ...prev,
      tier,
      selectedRecipeIds: nextIds,
    }));
  };

  const handlePlanUpdate = (next: SubscriptionPlanState) => {
    if (next.tier !== plan.tier) {
      const matchingTierRecipes = RECIPES.filter((r) => r.tier === next.tier);
      const nextIds = matchingTierRecipes
        .slice(0, next.mealsPerWeek)
        .map((r) => r.id);
      setPlan({ ...next, selectedRecipeIds: nextIds });
    } else {
      setPlan({
        ...next,
        selectedRecipeIds: next.selectedRecipeIds.slice(0, next.mealsPerWeek),
      });
    }
  };

  const handleToggleRecipe = (recipeId: string) => {
    setPlan((prev) => {
      const exists = prev.selectedRecipeIds.includes(recipeId);
      if (exists) {
        return {
          ...prev,
          selectedRecipeIds: prev.selectedRecipeIds.filter((id) => id !== recipeId),
        };
      }
      const next = [...prev.selectedRecipeIds, recipeId];
      if (next.length > prev.mealsPerWeek) {
        next.shift();
      }
      return {
        ...prev,
        selectedRecipeIds: next,
      };
    });
  };

  const handleSaveCustomization = (customization: CustomizedDish) => {
    setPlan((prev) => {
      const nextSelected = prev.selectedRecipeIds.includes(customization.recipeId)
        ? prev.selectedRecipeIds
        : [...prev.selectedRecipeIds, customization.recipeId].slice(-prev.mealsPerWeek);

      return {
        ...prev,
        selectedRecipeIds: nextSelected,
        customizations: {
          ...prev.customizations,
          [customization.recipeId]: customization,
        },
      };
    });
  };

  const activeLifestyleLabel =
    LIFESTYLE_OPTIONS.find((l) => l.id === profile.lifestyle)?.label ?? 'Active Daily';

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFB] text-[#632713]">
      <Navbar
        currentView={currentView}
        onOpenProfile={openProfilePage}
        onOpenPlans={openPlansPage}
        onJumpToSection={jumpToSection}
      />

      {currentView === 'profile' ? (
        <main className="flex-1">
          <ProfileQuestionnairePage
            profile={profile}
            onChange={setProfile}
            onReset={() => setProfile(DEFAULT_PROFILE)}
            onBackHome={(targetSection = 'top') => jumpToSection(targetSection)}
          />
        </main>
      ) : currentView === 'plans' ? (
        <>
          <main className="flex-1">
            <PlansPage
              plan={plan}
              profile={profile}
              confirmedOrder={confirmedOrder}
              onUpdatePlan={handlePlanUpdate}
              onSubmitOrder={(order) => setConfirmedOrder(order)}
              onResetOrder={() => setConfirmedOrder(null)}
              onBackHome={(targetSection = 'top') => jumpToSection(targetSection)}
            />
          </main>
          <Footer
            onOpenProfile={openProfilePage}
            onOpenPlans={openPlansPage}
            onJumpTo={jumpToSection}
          />
        </>
      ) : (
        <>
          <main className="flex-1">
            <HeroSection
              profile={profile}
              onJumpTo={jumpToSection}
              onOpenProfile={openProfilePage}
              onOpenPlans={openPlansPage}
            />

            {/* Compact Profile Summary Strip linking to the separate MCQ page */}
            <section className="py-5 bg-[#FEF5ED] border-y border-[#632713]/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-sm text-[#632713]">
                  <span className="font-semibold">
                    {profile.name.trim()
                      ? `${profile.name}'s Kitchen Profile`
                      : 'Personalise Your Kitchen Profile'}
                  </span>
                  <span className="mx-2 text-[#8C5845]" aria-hidden="true">·</span>
                  <span className="text-[#8C5845]">{activeLifestyleLabel}</span>
                  {profile.restrictions.length > 0 && (
                    <>
                      <span className="mx-2 text-[#8C5845]" aria-hidden="true">·</span>
                      <span className="text-[#EC6426] font-medium">
                        {profile.restrictions.map((r) => DIETARY_LABELS[r]).join(', ')}
                      </span>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={openProfilePage}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#632713] bg-white hover:bg-[#FDE3CF]/60 border border-[#632713]/15 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#EC6426]" />
                  <span>Customise your profile</span>
                </button>
              </div>
            </section>

            <MenuShowcase
              recipes={RECIPES}
              activeTier={plan.tier}
              selectedRecipeIds={plan.selectedRecipeIds}
              requiredCount={plan.mealsPerWeek}
              customizations={plan.customizations}
              profile={profile}
              onTierChange={handleTierChange}
              onToggleRecipe={handleToggleRecipe}
              onOpenCustomizer={(recipe) => setCustomizingRecipe(recipe)}
            />

            <UglyFoodSection
              servingsPerMeal={plan.servingsPerMeal}
              mealsPerWeek={plan.mealsPerWeek}
              onJumpToSubscribe={openPlansPage}
            />

            {/* Clean Homepage Callout to Separate Plans & Checkout Page */}
            <section className="py-14 sm:py-16 bg-[#FFFDFB]">
              <div className="max-w-5xl mx-auto px-4 sm:px-8">
                <div className="rounded-3xl bg-[#FDE3CF]/65 border border-[#632713]/10 p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <p className="text-xs font-semibold text-[#EC6426] mb-1.5">
                      Ready to Cook Fresh at Home?
                    </p>
                    <h2 className="font-[Outfit] text-2xl sm:text-3xl font-bold text-[#632713]">
                      Compare Everyday Local &amp; Chef-Curated Tiers
                    </h2>
                    <p className="text-sm text-[#632713]/80 mt-2 max-w-xl">
                      View our Base Chicken Rice &amp; Premium Lobster Laksa tier cards, pick your household size, and subscribe online.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={openPlansPage}
                    className="animate-wabi-pulse inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#EC6426] hover:bg-[#d5531a] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Explore our plans</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          </main>

          <Footer
            onOpenProfile={openProfilePage}
            onOpenPlans={openPlansPage}
            onJumpTo={jumpToSection}
          />
        </>
      )}

      <IngredientCustomizerModal
        recipe={customizingRecipe}
        currentCustomization={
          customizingRecipe ? plan.customizations[customizingRecipe.id] : undefined
        }
        userRestrictions={profile.restrictions}
        onClose={() => setCustomizingRecipe(null)}
        onSave={handleSaveCustomization}
      />
    </div>
  );
}
