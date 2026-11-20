import React from 'react';
import { ArrowRight, SlidersHorizontal, Sprout } from 'lucide-react';
import { UserProfile } from '../types/wabi';

interface HeroSectionProps {
  profile: UserProfile;
  onJumpTo: (sectionId: string) => void;
  onOpenProfile: () => void;
  onOpenPlans: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onJumpTo,
  onOpenProfile,
  onOpenPlans,
}) => {
  const hasName = profile.name.trim().length > 0;

  return (
    <section id="top" className="pt-8 pb-12 sm:pt-12 sm:pb-16 bg-[#FFFDFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Split Hero Grid with balanced stretch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Editorial Column */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-[#FDE3CF]/55 rounded-3xl p-7 sm:p-10 lg:p-12 border border-[#632713]/10">
            <div>
              <p className="text-sm font-medium text-[#8C5845] mb-4">
                Local Meal Kits · Rescued UglyFood Produce · Zero Grocery Stress
              </p>

              <h1
                className="font-[Outfit] font-bold text-[#632713] tracking-tight leading-[1.08] mb-5"
                style={{
                  fontSize: 'clamp(2.25rem, 3.8vw, 3.5rem)',
                  textWrap: 'balance',
                }}
              >
                {hasName
                  ? `Fresh local cooking for ${profile.name}, tailored to your table.`
                  : 'Honest local fare, cooked fresh at home.'}
              </h1>

              <p className="text-base sm:text-lg text-[#632713]/80 leading-relaxed max-w-xl mb-8">
                Wabi Table partners with{' '}
                <a
                  href="#uglyfood"
                  onClick={(e) => {
                    e.preventDefault();
                    onJumpTo('uglyfood');
                  }}
                  className="font-semibold text-[#EC6426] underline decoration-[#EC6426]/40 underline-offset-4 hover:decoration-[#EC6426]"
                >
                  UglyFood
                </a>{' '}
                to rescue crisp, nutritious, slightly wonky local fruits and vegetables at lower farm cost. Choose everyday Singaporean favourites or chef-curated menus by Gordon Ramsay—customised for your allergies, macros, and pace of life.
              </p>
            </div>

            <div className="space-y-6">
              {/* Equal-sized buttons with gentle pulse on Explore our plans */}
              <div className="flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={onOpenPlans}
                  className="animate-wabi-pulse inline-flex items-center justify-center gap-2 px-6 py-3.5 min-w-[210px] text-sm font-semibold text-white bg-[#EC6426] hover:bg-[#d5531a] active:scale-[0.98] rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EC6426]"
                >
                  <span>Explore our plans</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onOpenProfile}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-w-[210px] text-sm font-semibold text-[#632713] bg-white hover:bg-[#FEF5ED] border border-[#632713]/15 rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#632713]"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Customise your profile</span>
                </button>
              </div>

              <div className="pt-4 border-t border-[#632713]/10 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-[#8C5845]">
                <span>Built for busy adults &amp; mums</span>
                <span aria-hidden="true">·</span>
                <span>Queue-free for retirees</span>
                <span aria-hidden="true">·</span>
                <span>Allergen-safe swaps on every tier</span>
              </div>
            </div>
          </div>

          {/* Right Media Column */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden bg-[#FDE3CF]/40 border border-[#632713]/10 min-h-[320px] sm:min-h-[420px]">
            <img
              src="/src/assets/images/hero_wabi_meal_kit_1795158524958.jpg"
              alt="Fresh local meal kit ingredients and glazed salmon grain bowl with rainbow heirloom carrots"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 bg-gradient-to-t from-[#632713]/85 via-[#632713]/45 to-transparent text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-[#FDE3CF]">
                    This Week’s Rescued Harvest
                  </p>
                  <p className="font-[Outfit] text-lg sm:text-xl font-semibold">
                    Wonky Rainbow Carrots &amp; Farm Bok Choy
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#632713] bg-[#F8A91F] px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0">
                  <Sprout className="w-3.5 h-3.5" />
                  Save up to 31%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-column Value & Metrics Strip below hero split */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-[#632713]/10">
            <p className="font-mono tabular-nums text-2xl font-semibold text-[#EC6426]">
              25–35%
            </p>
            <p className="text-sm font-medium text-[#632713] mt-1">
              Lower produce cost
            </p>
            <p className="text-xs text-[#8C5845] mt-0.5">
              Via UglyFood surplus sourcing
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#632713]/10">
            <p className="font-mono tabular-nums text-2xl font-semibold text-[#632713]">
              18–25 min
            </p>
            <p className="text-sm font-medium text-[#632713] mt-1">
              Home prep &amp; cook time
            </p>
            <p className="text-xs text-[#8C5845] mt-0.5">
              Pre-portioned sauces &amp; fresh veg
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#632713]/10">
            <p className="font-mono tabular-nums text-2xl font-semibold text-[#F8A91F]">
              2 Tiers
            </p>
            <p className="text-sm font-medium text-[#632713] mt-1">
              Everyday or Chef-Curated
            </p>
            <p className="text-xs text-[#8C5845] mt-0.5">
              Same customisation on every box
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#632713]/10">
            <p className="font-mono tabular-nums text-2xl font-semibold text-[#632713]">
              8 Filters
            </p>
            <p className="text-sm font-medium text-[#632713] mt-1">
              Allergy &amp; dietary controls
            </p>
            <p className="text-xs text-[#8C5845] mt-0.5">
              Auto-swaps incompatible items
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
