import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { GoogleTagManager } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://logicrent.ae/'),
  title: 'Logic Rent A Car Dubai | Affordable Car Rental No Deposit | Monthly Car Rental Dubai',
  description:
    'Reliable & affordable car rental in Dubai & Abu Dhabi. Daily, weekly & monthly car hire. SUVs, sedans & luxury cars.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Ads gtag.js */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17770474237"
          strategy="afterInteractive"
        />

        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17770474237');
          `}
        </Script>
      </head>

      {/* Google Tag Manager */}
      <GoogleTagManager gtmId="GTM-KBG7S42T" />

      <body className={inter.className}>{children}</body>
    </html>
  )
}
