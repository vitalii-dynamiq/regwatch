'use client';

import LogoFull from '@/components/icons/LogoFull';
import * as React from 'react';

export default function LogoFullImage() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className='shrink-0' style={{ width: 121, height: 32 }} aria-hidden />;
  }

  return (
    <div className='shrink-0' style={{ color: 'var(--logo-primary)' }}>
      <LogoFull />
    </div>
  );
}
