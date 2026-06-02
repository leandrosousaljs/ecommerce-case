import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import './globals.css';

import Footer from './components/Footer';
import NavBar from './components/NavBar';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Online Shop',
  description: 'Sua loja online',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${roboto.variable} h-full scroll-smooth antialiased`}>
      <body className="body">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
