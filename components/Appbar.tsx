'use client';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ResponsiveControl } from '@/layouts/responsive-control';
import { signIn, signOut, useSession } from 'next-auth/react';
import { AnimatedTooltipAvatar } from './ui/animated-tooltip';
import { Button } from './ui/button';
const Appbar = () => {
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
                    <div className="mr-8">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <AnimatedTooltipAvatar
                                    id={1}
                                    name={session?.data?.user?.name || ''}
                                    image={session.data?.user?.image || ''}
                                />
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
                        <Button
                            onClick={() => signIn()}
                            className="bg-blue-600 text-slate-200 hover:text-slate-50    hover:bg-blue-800"
                        >
                            Signin
                        </Button>
                    </div>
                )}
            </ResponsiveControl>
        </header>
    );
};

export default Appbar;
