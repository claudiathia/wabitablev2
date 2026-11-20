import React from 'react';
import { WabiLogo } from './WabiLogo';

interface FooterProps {
  onOpenProfile: () => void;
  onOpenPlans: () => void;
  onJumpTo: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenProfile,
  onOpenPlans,
  onJumpTo,
}) => {
  return (
    <footer className="bg-[#632713] text-[#FDE3CF] py-12 border-t border-[#632713]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <div className="inline-flex items-center gap-2.5 bg-[#FFFDFB] px-3.5 py-2 rounded-xl">
            <WabiLogo size="sm" />
          </div>
          <p className="text-sm text-[#FDE3CF]/80 mt-3 max-w-md">
            Fresh local meal kits powered by rescued farm produce with UglyFood Singapore. Healthy, honest home cooking for busy adults, families, and retirees.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm">
          <button
            type="button"
            onClick={onOpenProfile}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Customise your profile
          </button>
          <button
            type="button"
            onClick={() => onJumpTo('menus')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Weekly menu
          </button>
          <button
            type="button"
            onClick={onOpenPlans}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Plan tiers
          </button>
          <button
            type="button"
            onClick={() => onJumpTo('uglyfood')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            UglyFood Mission
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#FDE3CF]/65">
        <p>© 2026 Wabi Table Pte. Ltd. All rights reserved.</p>
        <p>Singapore Islandwide Chilled Delivery · Pause or Cancel Anytime</p>
      </div>
    </footer>
  );
};
