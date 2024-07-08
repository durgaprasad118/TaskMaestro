import type { Metadata } from 'next';
import Appbar from '@/components/Appbar';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import Providers from './providers';
const inter = Inter({ subsets: ['latin'] });

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
                <Providers>
                    <Appbar />
                    {children}
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
