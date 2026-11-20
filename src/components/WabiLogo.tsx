import React from 'react';

interface WabiLogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const WabiLogo: React.FC<WabiLogoProps> = ({
  className = '',
  showWordmark = true,
  size = 'md',
}) => {
  const iconDimension = size === 'sm' ? 28 : size === 'lg' ? 42 : 34;

  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
      <svg
        width={iconDimension}
        height={iconDimension}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Warm apricot circular backdrop */}
        <circle cx="20" cy="20" r="19" fill="#FDE3CF" />
        {/* Wonky organic heirloom harvest fruit (burnt orange) */}
        <path
          d="M11.5 23.5C11.2 17.8 14.8 14.2 19.6 14.6C24.8 15 29.1 17.9 28.6 23.5C28.3 26.8 25.4 28.5 20 28.5C14.7 28.5 11.8 26.9 11.5 23.5Z"
          fill="#EC6426"
        />
        {/* Sunlit golden harvest highlight */}
        <path
          d="M19.8 14.6C24.2 14.9 27.6 17.5 27.9 21.8C25.5 22.8 22.2 21.4 21.1 18.8C20.4 17.2 20.1 15.9 19.8 14.6Z"
          fill="#F8A91F"
        />
        {/* Fresh sprout leaf */}
        <path
          d="M19.7 14.5C19.7 11.1 22.1 8.5 25.6 8.3C25.2 11.5 23 14.1 19.7 14.5Z"
          fill="#632713"
        />
        <path
          d="M19.7 14.5C17.4 13.7 15.6 12.1 14.9 9.9C17.2 10.2 18.9 11.9 19.7 14.5Z"
          fill="#632713"
        />
        {/* Clean dining table line & legs */}
        <path
          d="M7.5 29.2H32.5"
          stroke="#632713"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M12.5 29.5L11 34.5M27.5 29.5L29 34.5"
          stroke="#632713"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
      {showWordmark && (
        <span className="font-[Outfit] text-xl font-bold tracking-tight text-[#632713] whitespace-nowrap shrink-0">
          Wabi Table
        </span>
      )}
    </span>
  );
};
