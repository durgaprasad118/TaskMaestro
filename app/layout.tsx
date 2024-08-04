import Appbar from '@/components/Appbar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers, { RecoilRootProvider, ThemeProvider } from './providers';
const inter = Inter({ subsets: ['latin'] });
import { Toaster } from 'sonner';
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
                            <Toaster
                                toastOptions={{
                                    className: 'py-3'
                                }}
                                expand={true}
                                position="top-right"
                                richColors
                                closeButton
                            />
                        </Providers>
                    </ThemeProvider>
                </RecoilRootProvider>
            </body>
        </html>
    );
}
