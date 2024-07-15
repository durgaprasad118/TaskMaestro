'use client';
/**
 *ALl the providers
 * THeme provider
 * Session Provider
 * RecoilRoot Provider
 * */
import React from 'react';

import { SessionProvider } from 'next-auth/react';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { RecoilRoot } from 'recoil';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
const Providers = ({ children }: { children: React.ReactNode }) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;

export function RecoilRootProvider({
    children
}: {
    children: React.ReactNode;
}) {
    return <RecoilRoot>{children}</RecoilRoot>;
}
