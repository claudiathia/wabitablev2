import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, RotateCcw, X } from 'lucide-react';
import {
  DIETARY_LABELS,
  GOAL_OPTIONS,
  LIFESTYLE_OPTIONS,
  PREFERENCE_OPTIONS,
} from '../data/recipes';
import {
  DietaryRestriction,
  HealthGoal,
  LifestyleMode,
  TastePreference,
  UserProfile,
} from '../types/wabi';

interface ProfileQuestionnairePageProps {
  profile: UserProfile;
  onChange: (updated: UserProfile) => void;
  onReset: () => void;
  onBackHome: (targetSection?: string) => void;
}

const TOTAL_QUESTIONS = 5;

export const ProfileQuestionnairePage: React.FC<ProfileQuestionnairePageProps> = ({
  profile,
  onChange,
  onReset,
  onBackHome,
}) => {
  const [step, setStep] = useState<number>(1);
  const [completed, setCompleted] = useState<boolean>(false);

  const activeLifestyle =
    LIFESTYLE_OPTIONS.find((l) => l.id === profile.lifestyle) ?? LIFESTYLE_OPTIONS[1];
  const activeGoal =
    GOAL_OPTIONS.find((g) => g.id === profile.goal) ?? GOAL_OPTIONS[0];

  const handleNext = () => {
    if (step < TOTAL_QUESTIONS) {
      setStep((s) => s + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrev = () => {
    if (completed) {
      setCompleted(false);
      setStep(TOTAL_QUESTIONS);
    } else if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  const toggleRestriction = (item: DietaryRestriction) => {
    const exists = profile.restrictions.includes(item);
    const restrictions = exists
      ? profile.restrictions.filter((r) => r !== item)
      : [...profile.restrictions, item];
    onChange({ ...profile, restrictions });
  };

  const togglePreference = (item: TastePreference) => {
    const exists = profile.preferences.includes(item);
    const preferences = exists
      ? profile.preferences.filter((p) => p !== item)
      : [...profile.preferences, item];
    onChange({ ...profile, preferences });
  };

  const progressPct = completed ? 100 : Math.round((step / TOTAL_QUESTIONS) * 100);

  return (
    <section
      aria-label="Profile Customisation Questionnaire"
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-8 overflow-hidden bg-[#632713]"
    >
      {/* Subtle Visual Culinary Meal Collage Backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1.5 opacity-60 scale-[1.03]"
      >
        <img
          src="/src/assets/images/hero_wabi_meal_kit_1795158524958.jpg"
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover blur-[1px]"
        />
        <img
          src="/src/assets/images/dish_chef_gordon_laksa_1795158525867.jpg"
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover blur-[1px]"
        />
        <img
          src="/src/assets/images/dish_base_local_fare_1795158525805.jpg"
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover blur-[1px]"
        />
        <img
          src="/src/assets/images/uglyfood_rescue_crate_1795158526140.jpg"
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover blur-[1px]"
        />
      </div>

      {/* Measured Warm Scrim so meal photos stay inspiring without hurting legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-[#632713]/65 via-[#632713]/45 to-[#EC6426]/35 backdrop-blur-[2px]"
      />

      {/* Centered Pop-Up Questionnaire Box */}
      <div className="relative z-10 w-full max-w-xl bg-[#FFFDFB] rounded-3xl border border-[#632713]/15 shadow-2xl overflow-hidden">
        {/* Top Progress Header */}
        <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-[#632713]/10">
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="text-xs font-semibold text-[#EC6426]">
              {completed
                ? 'Profile Complete'
                : `Question ${step} of ${TOTAL_QUESTIONS}`}
            </span>

            <button
              type="button"
              onClick={() => onBackHome('top')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C5845] hover:text-[#632713] px-2.5 py-1.5 rounded-lg hover:bg-[#FDE3CF]/50 transition-colors cursor-pointer"
            >
              <span>Back to Home</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="w-full h-2 rounded-full bg-[#FDE3CF] overflow-hidden">
            <div
              className="h-full bg-[#EC6426] transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Question Body — Strictly One Question at a Time */}
        <div className="p-6 sm:p-8">
          {!completed && step === 1 && (
            <div className="space-y-6">
              <div>
                <h1 className="font-[Outfit] text-2xl sm:text-3xl font-bold text-[#632713] tracking-tight">
                  First, what should we call your kitchen?
                </h1>
                <p className="text-sm text-[#8C5845] mt-2">
                  We personalise your weekly menu cards and recipe labels for your household.
                </p>
              </div>

              <div>
                <label htmlFor="mcq-name-input" className="sr-only">
                  Your Name
                </label>
                <input
                  id="mcq-name-input"
                  type="text"
                  autoFocus
                  value={profile.name}
                  onChange={(e) => onChange({ ...profile, name: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleNext();
                    }
                  }}
                  placeholder="Enter your name (e.g. Rachel, Wei Ming, or Tan Family)"
                  className="w-full px-4 py-3.5 text-base text-[#632713] bg-white border border-[#632713]/20 rounded-xl focus:outline-none focus:border-[#EC6426] focus:ring-2 focus:ring-[#EC6426]/20"
                />
              </div>
            </div>
          )}

          {!completed && step === 2 && (
            <div className="space-y-5">
              <div>
                <h1 className="font-[Outfit] text-2xl sm:text-3xl font-bold text-[#632713] tracking-tight">
                  Which best describes your daily lifestyle?
                </h1>
                <p className="text-sm text-[#8C5845] mt-2">
                  Choose one option so we calibrate your meal portions and protein balance.
                </p>
              </div>

              <div className="space-y-2.5" role="radiogroup" aria-label="Lifestyle choice">
                {LIFESTYLE_OPTIONS.map((option, idx) => {
                  const selected = profile.lifestyle === option.id;
                  const letter = String.fromCharCode(65 + idx);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => {
                        onChange({ ...profile, lifestyle: option.id as LifestyleMode });
                      }}
                      className={`w-full text-left p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all duration-150 cursor-pointer ${
                        selected
                          ? 'bg-[#FDE3CF]/70 border-[#EC6426] ring-1 ring-[#EC6426]'
                          : 'bg-white border-[#632713]/15 hover:border-[#EC6426]/60'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <span
                          className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                            selected
                              ? 'bg-[#EC6426] text-white'
                              : 'bg-[#FEF5ED] text-[#632713] border border-[#632713]/15'
                          }`}
                        >
                          {letter}
                        </span>
                        <div>
                          <span className="text-sm font-semibold text-[#632713] block">
                            {option.label}
                          </span>
                          <span className="text-xs text-[#8C5845] block mt-0.5">
                            {option.detail} · {option.kcalTarget}
                          </span>
                        </div>
                      </div>
                      {selected && <Check className="w-5 h-5 text-[#EC6426] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {!completed && step === 3 && (
            <div className="space-y-5">
              <div>
                <h1 className="font-[Outfit] text-2xl sm:text-3xl font-bold text-[#632713] tracking-tight">
                  What is your main goal with Wabi Table?
                </h1>
                <p className="text-sm text-[#8C5845] mt-2">
                  Pick the priority that matters most for your weekly box.
                </p>
              </div>

              <div className="space-y-2.5" role="radiogroup" aria-label="Health goal choice">
                {GOAL_OPTIONS.map((goal, idx) => {
                  const selected = profile.goal === goal.id;
                  const letter = String.fromCharCode(65 + idx);
                  return (
                    <button
                      key={goal.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => {
                        onChange({ ...profile, goal: goal.id as HealthGoal });
                      }}
                      className={`w-full text-left p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all duration-150 cursor-pointer ${
                        selected
                          ? 'bg-[#FDE3CF]/70 border-[#EC6426] ring-1 ring-[#EC6426]'
                          : 'bg-white border-[#632713]/15 hover:border-[#EC6426]/60'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <span
                          className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                            selected
                              ? 'bg-[#EC6426] text-white'
                              : 'bg-[#FEF5ED] text-[#632713] border border-[#632713]/15'
                          }`}
                        >
                          {letter}
                        </span>
                        <div>
                          <span className="text-sm font-semibold text-[#632713] block">
                            {goal.label}
                          </span>
                          <span className="text-xs text-[#8C5845] block mt-0.5">
                            {goal.detail}
                          </span>
                        </div>
                      </div>
                      {selected && <Check className="w-5 h-5 text-[#EC6426] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {!completed && step === 4 && (
            <div className="space-y-5">
              <div>
                <h1 className="font-[Outfit] text-2xl sm:text-3xl font-bold text-[#632713] tracking-tight">
                  Any dietary restrictions or allergies?
                </h1>
                <p className="text-sm text-[#8C5845] mt-2">
                  Select all that apply, or leave unchecked if you have no restrictions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(Object.keys(DIETARY_LABELS) as DietaryRestriction[]).map((key) => {
                  const selected = profile.restrictions.includes(key);
                  return (
                    <button
                      key={key}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleRestriction(key)}
                      className={`text-left px-4 py-3 rounded-xl border flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                        selected
                          ? 'bg-[#632713] text-white border-[#632713]'
                          : 'bg-white text-[#632713] border-[#632713]/15 hover:border-[#EC6426]'
                      }`}
                    >
                      <span className="text-sm font-medium">{DIETARY_LABELS[key]}</span>
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 ${
                          selected
                            ? 'bg-[#EC6426] border-[#EC6426] text-white'
                            : 'border-[#632713]/25 bg-[#FFFDFB]'
                        }`}
                      >
                        {selected && <Check className="w-3.5 h-3.5" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              {profile.restrictions.length > 0 && (
                <button
                  type="button"
                  onClick={() => onChange({ ...profile, restrictions: [] })}
                  className="text-xs font-semibold text-[#8C5845] hover:text-[#EC6426] underline underline-offset-4 cursor-pointer"
                >
                  Clear selections (No dietary restrictions)
                </button>
              )}
            </div>
          )}

          {!completed && step === 5 && (
            <div className="space-y-5">
              <div>
                <h1 className="font-[Outfit] text-2xl sm:text-3xl font-bold text-[#632713] tracking-tight">
                  How should we tailor your ingredients?
                </h1>
                <p className="text-sm text-[#8C5845] mt-2">
                  Choose any kitchen preferences you want applied across Base or Chef-Curated menus.
                </p>
              </div>

              <div className="space-y-2.5">
                {PREFERENCE_OPTIONS.map((pref, idx) => {
                  const selected = profile.preferences.includes(pref.id);
                  const letter = String.fromCharCode(65 + idx);
                  return (
                    <button
                      key={pref.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => togglePreference(pref.id)}
                      className={`w-full text-left px-4 py-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all cursor-pointer ${
                        selected
                          ? 'bg-[#FDE3CF]/70 border-[#EC6426] ring-1 ring-[#EC6426]'
                          : 'bg-white border-[#632713]/15 hover:border-[#EC6426]/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                            selected
                              ? 'bg-[#EC6426] text-white'
                              : 'bg-[#FEF5ED] text-[#632713] border border-[#632713]/15'
                          }`}
                        >
                          {letter}
                        </span>
                        <span className="text-sm font-semibold text-[#632713]">
                          {pref.label}
                        </span>
                      </div>
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 ${
                          selected
                            ? 'bg-[#EC6426] border-[#EC6426] text-white'
                            : 'border-[#632713]/25 bg-white'
                        }`}
                      >
                        {selected && <Check className="w-3.5 h-3.5" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {completed && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold text-[#EC6426] mb-1">
                  Tailored Kitchen Profile Ready
                </p>
                <h1 className="font-[Outfit] text-2xl sm:text-3xl font-bold text-[#632713] tracking-tight">
                  Welcome to Wabi Table, {profile.name.trim() || 'Friend'}.
                </h1>
                <p className="text-sm text-[#8C5845] mt-2">
                  Your preferences are saved. Every dish on both tiers will highlight compatible proteins, bases, and UglyFood swaps.
                </p>
              </div>

              <dl className="p-5 rounded-2xl bg-[#FEF5ED] border border-[#632713]/10 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-[#8C5845]">Lifestyle</dt>
                  <dd className="font-semibold text-[#632713] text-right">
                    {activeLifestyle.label}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#8C5845]">Target Portion</dt>
                  <dd className="font-mono tabular-nums font-semibold text-[#EC6426] text-right">
                    {activeLifestyle.kcalTarget} · {activeLifestyle.proteinFocus}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#8C5845]">Primary Goal</dt>
                  <dd className="font-semibold text-[#632713] text-right">
                    {activeGoal.label}
                  </dd>
                </div>
                <div className="pt-2 border-t border-[#632713]/10">
                  <dt className="text-[#8C5845] mb-1">Dietary Safeguards</dt>
                  <dd className="font-medium text-[#632713]">
                    {profile.restrictions.length > 0
                      ? profile.restrictions.map((r) => DIETARY_LABELS[r]).join(' · ')
                      : 'None — all ingredients enabled'}
                  </dd>
                </div>
              </dl>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => onBackHome('subscribe')}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#EC6426] hover:bg-[#d5531a] rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Explore Our Plans</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onBackHome('menus')}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#632713] bg-white hover:bg-[#FEF5ED] border border-[#632713]/15 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Explore Weekly Menu</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="px-6 sm:px-8 py-4 bg-[#FEF5ED]/75 border-t border-[#632713]/10 flex items-center justify-between gap-4">
          {!completed ? (
            <>
              <button
                type="button"
                onClick={handlePrev}
                disabled={step === 1}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-[#632713] hover:bg-[#FDE3CF]/60 disabled:opacity-35 disabled:pointer-events-none rounded-xl transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-[#EC6426] hover:bg-[#d5531a] rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>{step === TOTAL_QUESTIONS ? 'Finish Profile' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setCompleted(false);
                  setStep(1);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#632713] hover:text-[#EC6426] cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Edit Answers</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onReset();
                  setCompleted(false);
                  setStep(1);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C5845] hover:text-[#632713] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Start Fresh</span>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
