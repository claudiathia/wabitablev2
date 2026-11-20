import React, { useState } from 'react';
import { Menu, User, X } from 'lucide-react';
import { WabiLogo } from './WabiLogo';

interface NavbarProps {
  currentView: 'home' | 'profile' | 'plans';
  onOpenProfile: () => void;
  onOpenPlans: () => void;
  onJumpToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onOpenProfile,
  onOpenPlans,
  onJumpToSection,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSectionClick = (id: string) => {
    setMobileOpen(false);
    onJumpToSection(id);
  };

  const handleProfileClick = () => {
    setMobileOpen(false);
    onOpenProfile();
  };

  const handlePlansClick = () => {
    setMobileOpen(false);
    onOpenPlans();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDFB]/95 backdrop-blur-md border-b border-[#632713]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-6 lg:gap-8">
        {/* Zone 1: Single-element Brand Zone */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            handleSectionClick('top');
          }}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC6426] rounded-md shrink-0"
          aria-label="Wabi Table Home"
        >
          <WabiLogo size="md" />
        </a>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#632713]/85"
        >
          <a
            href="#profile"
            onClick={(e) => {
              e.preventDefault();
              handleProfileClick();
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              currentView === 'profile'
                ? 'text-[#EC6426] border-[#EC6426] font-semibold'
                : 'border-transparent hover:text-[#EC6426] hover:border-[#EC6426]'
            }`}
          >
            Customise your profile
          </a>
          <a
            href="#menus"
            onClick={(e) => {
              e.preventDefault();
              handleSectionClick('menus');
            }}
            className="hover:text-[#EC6426] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#EC6426]"
          >
            Weekly menu
          </a>
          <a
            href="#plans"
            onClick={(e) => {
              e.preventDefault();
              handlePlansClick();
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              currentView === 'plans'
                ? 'text-[#EC6426] border-[#EC6426] font-semibold'
                : 'border-transparent hover:text-[#EC6426] hover:border-[#EC6426]'
            }`}
          >
            Plan tiers
          </a>
          <a
            href="#uglyfood"
            onClick={(e) => {
              e.preventDefault();
              handleSectionClick('uglyfood');
            }}
            className="hover:text-[#EC6426] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#EC6426]"
          >
            UglyFood Mission
          </a>
        </nav>

        {/* Zone 3: My profile icon + Explore our plans button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleProfileClick}
            aria-label="My profile"
            title="My profile"
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC6426] ${
              currentView === 'profile'
                ? 'bg-[#632713] text-white border-[#632713]'
                : 'bg-white text-[#632713] border-[#632713]/15 hover:border-[#EC6426] hover:text-[#EC6426]'
            }`}
          >
            <User className="w-4 h-4 shrink-0" />
            <span>My profile</span>
          </button>

          <button
            type="button"
            onClick={handlePlansClick}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#EC6426] hover:bg-[#d5531a] active:scale-[0.98] rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EC6426]"
          >
            Explore our plans
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl text-[#632713] hover:bg-[#FDE3CF]/60 transition-colors"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#FFFDFB] border-t border-[#632713]/10 px-4 py-4 space-y-2">
          <a
            href="#profile"
            onClick={(e) => {
              e.preventDefault();
              handleProfileClick();
            }}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#632713] hover:bg-[#FDE3CF]/50"
          >
            Customise your profile
          </a>
          <a
            href="#menus"
            onClick={(e) => {
              e.preventDefault();
              handleSectionClick('menus');
            }}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#632713] hover:bg-[#FDE3CF]/50"
          >
            Weekly menu
          </a>
          <a
            href="#plans"
            onClick={(e) => {
              e.preventDefault();
              handlePlansClick();
            }}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#632713] hover:bg-[#FDE3CF]/50"
          >
            Plan tiers
          </a>
          <a
            href="#uglyfood"
            onClick={(e) => {
              e.preventDefault();
              handleSectionClick('uglyfood');
            }}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#632713] hover:bg-[#FDE3CF]/50"
          >
            UglyFood Mission
          </a>
          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={handleProfileClick}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-semibold text-[#632713] bg-[#FDE3CF]/70"
            >
              <User className="w-4 h-4" />
              <span>My profile</span>
            </button>
            <button
              type="button"
              onClick={handlePlansClick}
              className="flex-1 text-center px-4 py-3 rounded-xl text-sm font-semibold text-white bg-[#EC6426] hover:bg-[#d5531a]"
            >
              Explore our plans
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
