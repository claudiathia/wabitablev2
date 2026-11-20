import React from 'react';
import { ExternalLink, Leaf } from 'lucide-react';

interface UglyFoodSectionProps {
  servingsPerMeal: number;
  mealsPerWeek: number;
  onJumpToSubscribe: () => void;
}

export const UglyFoodSection: React.FC<UglyFoodSectionProps> = ({
  servingsPerMeal,
  mealsPerWeek,
  onJumpToSubscribe,
}) => {
  const weeklyServings = servingsPerMeal * mealsPerWeek;
  const rescuedKgMonthly = +(weeklyServings * 0.42 * 4).toFixed(1);
  const monthlySavings = (weeklyServings * 3.1 * 4).toFixed(2);

  return (
    <section id="uglyfood" className="py-14 sm:py-20 bg-[#FDE3CF]/45 border-y border-[#632713]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Photo */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden bg-white border border-[#632713]/10 min-h-[300px]">
            <img
              src="/src/assets/images/uglyfood_rescue_crate_1795158526140.jpg"
              alt="Harvest crate of fresh wonky carrots, heirloom tomatoes, mangoes, eggplants, and greens rescued via UglyFood"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Story + Dynamic Impact */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-white rounded-3xl p-7 sm:p-10 border border-[#632713]/10">
            <div>
              <p className="text-sm font-semibold text-[#EC6426] mb-2">
                02. Our UglyFood Partnership
              </p>
              <h2
                className="font-[Outfit] text-3xl sm:text-4xl font-bold text-[#632713] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Imperfect outside. Peak farm nutrition inside.
              </h2>

              <p className="text-base text-[#632713]/80 leading-relaxed mt-4">
                Supermarkets reject tons of crisp local greens, curved carrots, freckled honey mangoes, and twin-stemmed tomatoes simply for cosmetic quirks. We partner directly with{' '}
                <span className="font-semibold text-[#632713]">UglyFood Singapore</span>{' '}
                to rescue this fresh surplus before it hits landfills—passing the savings directly to your weekly meal subscription.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#632713]/10">
                <div>
                  <p className="font-mono tabular-nums text-2xl font-bold text-[#EC6426]">
                    {rescuedKgMonthly} kg / mo
                  </p>
                  <p className="text-sm font-medium text-[#632713] mt-0.5">
                    Produce rescued with your box
                  </p>
                  <p className="text-xs text-[#8C5845] mt-0.5">
                    Based on {mealsPerWeek} meals × {servingsPerMeal} pax weekly
                  </p>
                </div>

                <div>
                  <p className="font-mono tabular-nums text-2xl font-bold text-[#632713]">
                    ~${monthlySavings} / mo
                  </p>
                  <p className="text-sm font-medium text-[#632713] mt-0.5">
                    Estimated grocery savings
                  </p>
                  <p className="text-xs text-[#8C5845] mt-0.5">
                    Compared against retail supermarket produce
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-[#632713]/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#8C5845]">
                <Leaf className="w-4 h-4 text-[#EC6426] shrink-0" />
                <span>Every box lists the exact rescued harvest inside.</span>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="https://uglyfoodco.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#632713] hover:text-[#EC6426] transition-colors whitespace-nowrap"
                >
                  <span>Learn about UglyFood</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={onJumpToSubscribe}
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-[#EC6426] hover:bg-[#d5531a] rounded-xl transition-colors whitespace-nowrap cursor-pointer"
                >
                  Configure Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
