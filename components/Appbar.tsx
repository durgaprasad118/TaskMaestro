'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ResponsiveControl } from '@/layouts/responsive-control';
import { SearchQueryAtom } from '@/store';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { Input } from './ui/input';
const Appbar = () => {
    const [search, setSearch] = useRecoilState(SearchQueryAtom);
    const session = useSession();
    return (
        <header className=" border-b   bg-transparent relative z-10">
            <ResponsiveControl className="flex flex-row py-2 px-4 h-full items-center justify-between">
                <div className="header-content-wrapper">
                    <div className="flex items-center justify-center gap-3">
                        <img
                            src="/logo.png"
                            className="h-12 w-12"
                            alt="Task Maestro Logo"
                        />
                        <h1 className=" cursor-pointer relative z-10 text-2xl md:text-4xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
                            Task Maestro
                        </h1>
                    </div>
                </div>
                {session?.status == 'authenticated' ? (
                    <div className="px-4 flex items-center w-[30vw] gap-2">
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Task here"
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage
                                        src={session?.data?.user?.image || ''}
                                        alt={
                                            session?.data?.user?.name ||
                                            'profile Image'
                                        }
                                    />
                                    <AvatarFallback>
                                        profile Image
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="w-48 text-center">
                                <DropdownMenuLabel>
                                    {session.data?.user?.name}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioItem value="Settings">
                                    Settings
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem
                                    onClick={() => signOut()}
                                    value="Log Out"
                                >
                                    Log Out
                                </DropdownMenuRadioItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    <div className="flex gap-3">
                        <button
                            onClick={() =>
                                signIn('google', {
                                    callbackUrl: '/account'
                                })
                            }
                            className="px-6 py-3 bg-none hover:bg-white hover:text-slate-800 hover:text-slate rounded-xl bg-black border flex gap-1 items-center justify-center dark:border-white hover:scale-105 transition-all duration-400  border-transparent text-slate-200 text-sm"
                        >
                            Sign In with
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1.5em"
                                height="1.5em"
                                viewBox="0 0 48 48"
                            >
                                <path
                                    fill="#ffc107"
                                    d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                                />
                                <path
                                    fill="#ff3d00"
                                    d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
                                />
                                <path
                                    fill="#4caf50"
                                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
                                />
                                <path
                                    fill="#1976d2"
                                    d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
                                />
                            </svg>
                        </button>
                    </div>
                )}
            </ResponsiveControl>
        </header>
    );
};

export default Appbar;
