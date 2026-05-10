import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Lora } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: '--font-jakarta' });
const lora = Lora({ subsets: ["latin"], variable: '--font-lora' });

export const metadata: Metadata = {
  title: 'Quran Mazid',
  description: 'A beautiful Quranic reading platform with audio, translations, and font controls',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

import { AppProvider } from './AppContext'
import { GlobalUI } from '@/components/GlobalUI'
import { SmoothScroll } from '@/components/SmoothScroll'
import { QueryProvider } from '@/components/query-provider'

import { ThemeProvider } from '@/components/theme-provider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!theme && supportDarkMode) theme = 'dark';
                  if (!theme) theme = 'light';
                  if (theme === 'dark') document.documentElement.classList.add('dark');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${jakarta.variable} ${lora.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <SmoothScroll root={true}>
            <QueryProvider>
              <AppProvider>
                <GlobalUI>
                  {children}
                </GlobalUI>
              </AppProvider>
            </QueryProvider>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
