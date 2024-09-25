import { db } from '@/db';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
export const authConfig = {
    adapter: PrismaAdapter(db),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: 'jwt' },
    pages: {
        signIn: '/login'
    }
};
