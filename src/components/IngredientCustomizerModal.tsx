import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { DIETARY_LABELS } from '../data/recipes';
import { CustomizedDish, DietaryRestriction, Recipe } from '../types/wabi';

interface IngredientCustomizerModalProps {
  recipe: Recipe | null;
  currentCustomization?: CustomizedDish;
  userRestrictions: DietaryRestriction[];
  onClose: () => void;
  onSave: (customization: CustomizedDish) => void;
}

const EXCLUSION_OPTIONS = [
  'Omit chilli & spice oil',
  'Pack sauce on the side (low sodium)',
  'No garlic or shallots',
  'Extra lime & fresh herbs',
];

export const IngredientCustomizerModal: React.FC<IngredientCustomizerModalProps> = ({
  recipe,
  currentCustomization,
  userRestrictions,
  onClose,
  onSave,
}) => {
  const [proteinId, setProteinId] = useState('');
  const [baseId, setBaseId] = useState('');
  const [vegId, setVegId] = useState('');
  const [excludedNotes, setExcludedNotes] = useState<string[]>([]);

  useEffect(() => {
    if (!recipe) return;
    setProteinId(currentCustomization?.proteinId || recipe.defaultProteinId);
    setBaseId(currentCustomization?.baseId || recipe.defaultBaseId);
    setVegId(currentCustomization?.vegId || recipe.defaultVegId);
    setExcludedNotes(currentCustomization?.excludedNotes || []);
  }, [recipe, currentCustomization]);

  if (!recipe) return null;

  const selectedProtein =
    recipe.proteinOptions.find((p) => p.id === proteinId) ?? recipe.proteinOptions[0];
  const selectedBase =
    recipe.baseOptions.find((b) => b.id === baseId) ?? recipe.baseOptions[0];
  const selectedVeg =
    recipe.vegOptions.find((v) => v.id === vegId) ?? recipe.vegOptions[0];

  const totalCalories =
    recipe.baseCalories +
    selectedProtein.calorieDelta +
    selectedBase.calorieDelta +
    selectedVeg.calorieDelta;
  const totalProtein =
    recipe.baseProtein +
    selectedProtein.proteinDelta +
    selectedBase.proteinDelta +
    selectedVeg.proteinDelta;
  const totalCarbs =
    recipe.baseCarbs +
    selectedProtein.carbsDelta +
    selectedBase.carbsDelta +
    selectedVeg.carbsDelta;

  const toggleNote = (note: string) => {
    setExcludedNotes((prev) =>
      prev.includes(note) ? prev.filter((n) => n !== note) : [...prev, note]
    );
  };

  const handleConfirm = () => {
    onSave({
      recipeId: recipe.id,
      proteinId: selectedProtein.id,
      baseId: selectedBase.id,
      vegId: selectedVeg.id,
      excludedNotes,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#632713]/45 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="customizer-title"
    >
      <div className="bg-[#FFFDFB] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#632713]/15 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#FFFDFB]/95 backdrop-blur-md px-6 py-5 border-b border-[#632713]/10 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#EC6426]">
              {recipe.tier === 'premium' ? 'Chef-Curated Customisation' : 'Everyday Local Customisation'}
            </p>
            <h3
              id="customizer-title"
              className="font-[Outfit] text-xl sm:text-2xl font-bold text-[#632713] mt-0.5"
            >
              {recipe.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close ingredient customizer"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#632713] hover:bg-[#FDE3CF]/60 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-7">
          {userRestrictions.length > 0 && (
            <div className="p-4 rounded-2xl bg-[#FDE3CF]/60 border border-[#632713]/10 text-xs text-[#632713]">
              <span className="font-semibold">Your Profile Safeguards Applied: </span>
              <span>
                {userRestrictions.map((r) => DIETARY_LABELS[r]).join(' · ')}
              </span>
            </div>
          )}

          {/* Live Macros Strip */}
          <div className="grid grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-[#632713]/10">
            <div>
              <p className="text-xs text-[#8C5845]">Energy</p>
              <p className="font-mono tabular-nums text-lg font-semibold text-[#EC6426]">
                {totalCalories} kcal
              </p>
            </div>
            <div>
              <p className="text-xs text-[#8C5845]">Protein</p>
              <p className="font-mono tabular-nums text-lg font-semibold text-[#632713]">
                {totalProtein}g
              </p>
            </div>
            <div>
              <p className="text-xs text-[#8C5845]">Carbs</p>
              <p className="font-mono tabular-nums text-lg font-semibold text-[#632713]">
                {totalCarbs}g
              </p>
            </div>
            <div>
              <p className="text-xs text-[#8C5845]">Fibre</p>
              <p className="font-mono tabular-nums text-lg font-semibold text-[#632713]">
                {recipe.baseFiber}g
              </p>
            </div>
          </div>

          {/* 1. Protein Choice */}
          <div>
            <p className="text-sm font-semibold text-[#632713] mb-2.5">
              1. Choose Your Protein
            </p>
            <div className="space-y-2">
              {recipe.proteinOptions.map((opt) => {
                const selected = opt.id === selectedProtein.id;
                const conflicts = opt.allergens?.some((a) => userRestrictions.includes(a));
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setProteinId(opt.id)}
                    className={`w-full text-left px-4 py-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all cursor-pointer ${
                      selected
                        ? 'bg-[#FDE3CF]/60 border-[#EC6426] ring-1 ring-[#EC6426]'
                        : 'bg-white border-[#632713]/12 hover:border-[#632713]/30'
                    }`}
                  >
                    <div>
                      <span className="text-sm font-semibold text-[#632713] block">
                        {opt.label}
                      </span>
                      {conflicts && (
                        <span className="text-xs text-[#EC6426] font-medium">
                          Contains allergen flagged in your profile — consider swapping
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono tabular-nums text-xs text-[#8C5845]">
                        {opt.proteinDelta >= 0 ? `+${opt.proteinDelta}` : opt.proteinDelta}g P
                      </span>
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                          selected
                            ? 'bg-[#EC6426] border-[#EC6426] text-white'
                            : 'border-[#632713]/25 bg-white'
                        }`}
                      >
                        {selected && <Check className="w-3.5 h-3.5" />}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Base / Grain Choice */}
          <div>
            <p className="text-sm font-semibold text-[#632713] mb-2.5">
              2. Choose Your Grain or Low-GI Base
            </p>
            <div className="space-y-2">
              {recipe.baseOptions.map((opt) => {
                const selected = opt.id === selectedBase.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setBaseId(opt.id)}
                    className={`w-full text-left px-4 py-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all cursor-pointer ${
                      selected
                        ? 'bg-[#FDE3CF]/60 border-[#EC6426] ring-1 ring-[#EC6426]'
                        : 'bg-white border-[#632713]/12 hover:border-[#632713]/30'
                    }`}
                  >
                    <span className="text-sm font-semibold text-[#632713]">
                      {opt.label}
                    </span>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono tabular-nums text-xs text-[#8C5845]">
                        {opt.calorieDelta === 0
                          ? 'Standard'
                          : `${opt.calorieDelta > 0 ? '+' : ''}${opt.calorieDelta} kcal`}
                      </span>
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                          selected
                            ? 'bg-[#EC6426] border-[#EC6426] text-white'
                            : 'border-[#632713]/25 bg-white'
                        }`}
                      >
                        {selected && <Check className="w-3.5 h-3.5" />}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. UglyFood Rescued Veg Boost */}
          <div>
            <p className="text-sm font-semibold text-[#632713] mb-2.5">
              3. Pick Your UglyFood Rescued Veg Side
            </p>
            <div className="space-y-2">
              {recipe.vegOptions.map((opt) => {
                const selected = opt.id === selectedVeg.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setVegId(opt.id)}
                    className={`w-full text-left px-4 py-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all cursor-pointer ${
                      selected
                        ? 'bg-[#FDE3CF]/60 border-[#EC6426] ring-1 ring-[#EC6426]'
                        : 'bg-white border-[#632713]/12 hover:border-[#632713]/30'
                    }`}
                  >
                    <span className="text-sm font-semibold text-[#632713]">
                      {opt.label}
                    </span>
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center border ${
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

          {/* 4. Prep & Allergen Adjustments */}
          <div>
            <p className="text-sm font-semibold text-[#632713] mb-2.5">
              4. Kitchen Packing Notes
            </p>
            <div className="flex flex-wrap gap-2">
              {EXCLUSION_OPTIONS.map((note) => {
                const active = excludedNotes.includes(note);
                return (
                  <button
                    key={note}
                    type="button"
                    onClick={() => toggleNote(note)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-xl border transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#632713] text-white border-[#632713]'
                        : 'bg-white text-[#632713] border-[#632713]/15 hover:border-[#EC6426]'
                    }`}
                  >
                    {note}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="sticky bottom-0 bg-[#FFFDFB]/95 backdrop-blur-md px-6 py-4 border-t border-[#632713]/10 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold text-[#632713] hover:bg-[#FDE3CF]/50 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-6 py-3 text-sm font-semibold text-white bg-[#EC6426] hover:bg-[#d5531a] rounded-xl transition-colors cursor-pointer whitespace-nowrap"
          >
            Save Ingredients to Dish
          </button>
        </div>
      </div>
    </div>
  );
};
