'use client';

import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';

export default function Header() {
  return (
    <>
      {/* Mobile Header - Only visible on mobile */}
      <MobileHeader />

      {/* Desktop Header - Only visible on desktop */}
      <DesktopHeader />
    </>
  );
}