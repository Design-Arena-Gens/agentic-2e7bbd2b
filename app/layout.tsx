import type { Metadata } from 'next';
import './globals.css';
import { Roboto, Open_Sans } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: ['300','400','500','700'] });
const openSans = Open_Sans({ subsets: ['latin'], weight: ['300','400','600','700'], variable: '--font-open-sans' });

export const metadata: Metadata = {
  title: 'CalmWrite — AI Writing Assistant',
  description: 'A minimalist, accessible AI-powered writing assistant',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${openSans.variable}`}>
        <a className="skip-link" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
