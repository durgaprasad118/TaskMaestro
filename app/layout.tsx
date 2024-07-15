import Appbar from '@/components/Appbar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers, { RecoilRootProvider, ThemeProvider } from './providers';
const inter = Inter({ subsets: ['latin'] });

import { Toaster } from '@/components/ui/toaster';
export const metadata: Metadata = {
    title: 'Task Maestro',
    description: 'Ultimate task manager'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <RecoilRootProvider>
                    <ThemeProvider attribute="class" defaultTheme="dark">
                        <Providers>
                            <Appbar />
                            {children}
                            <Toaster />
                        </Providers>
                    </ThemeProvider>
                </RecoilRootProvider>
            </body>
        </html>
    );
}
