'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

const Appbar = () => {
    const session = useSession();
    return (
        <div className="flex items-center justify-between p-3">
            <div>Pro manage</div>
            {session?.status == 'authenticated' ? (
                <div className="flex gap-3">
                    <img
                        className="w-10 h-10 rounded-full"
                        src={session.data?.user?.image || ''}
                    />
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
