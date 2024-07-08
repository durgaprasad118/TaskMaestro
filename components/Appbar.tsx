'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
const Appbar = () => {
    const session = useSession();
    return (
        <div className="flex items-center justify-between p-3">
            <div>Pro manage</div>
            {session?.status == 'authenticated' ? (
                <div className="flex gap-3">
                    <Avatar>
                        <AvatarImage src={session.data?.user?.image || ''} />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <button
                        onClick={() => signOut()}
                        className="px-4 py-2 bg-red-600 rounded  hover:bg-red-800"
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                <div className="flex gap-3">
                    <button
                        onClick={() => signIn()}
                        className="px-4 py-2 bg-blue-600 rounded  hover:bg-blue-800"
                    >
                        Signin
                    </button>
                </div>
            )}
        </div>
    );
};

export default Appbar;
