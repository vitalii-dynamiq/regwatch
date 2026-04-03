import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

import { RESTReactProvider } from '@/rest/react';
import { ThemeProvider } from 'next-themes';

export const metadata: Metadata = {
  title: {
    template: '%s | RegWatch',
    default: 'RegWatch',
  },
  description: 'RegWatch',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={geist.variable}>
        <RESTReactProvider>
          <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </RESTReactProvider>
      </body>
    </html>
  );
}
