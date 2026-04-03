'use client';

import LogoMark from '@/components/icons/LogoMark';
import * as React from 'react';

export default function LogoImage() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className='flex h-8 w-8 items-center justify-center shrink-0' aria-hidden />;
  }

  return (
    <div className='flex h-8 w-8 items-center justify-center shrink-0' style={{ color: 'var(--logo-primary)' }}>
      <LogoMark />
    </div>
  );
}
