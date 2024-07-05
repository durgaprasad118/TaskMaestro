import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

export const authConfig = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'email', type: 'text', placeholder: '' },
                password: {
                    label: 'password',
                    type: 'password',
                    placeholder: ''
                }
            },
            async authorize(credentials: any) {
                console.log(credentials);
                return {
                    id: 'user1',
                    name: 'dp'
                };
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || ''
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        session: ({ session, token, user }: any) => {
            if (session.user) {
                session.user.id = token.userId;
            }
            return session;
        }
    }
    //custom signin page other than the nextauth defualt thingy
    //just use this
    // pages: {
    //     signIn: '/signIN'
    // }
};
