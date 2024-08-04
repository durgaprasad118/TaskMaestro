'use client';
import { motion } from 'framer-motion';
import { signIn, useSession } from 'next-auth/react';
import Footer from './Footer';
import { HeroHighlight, Highlight } from './ui/hero-highlight';
import { TypewriterEffectSmooth } from './ui/typewriter-effect';
import { AccordionHome } from './Accordion';
import { AnimatedTooltip } from './ui/animated-tooltip';
import { features, people } from '@/lib/data';
import { HoverEffect } from './ui/card-hover-effect';
import { useRouter } from 'next/navigation';
export function LandingPage() {
    const session = useSession();
    const router = useRouter();
    const words = [
        {
            text: 'Simplify'
        },
        {
            text: 'your'
        },
        {
            text: 'day, '
        },

        {
            text: 'stay'
        },
        {
            text: 'organized, '
        },
        {
            text: 'stay'
        },
        {
            text: 'Ahead',

            className: 'text-blue-500 dark:text-blue-500'
        }
    ];
    return (
        <HeroHighlight>
            <motion.h1
                initial={{
                    opacity: 0,
                    y: 20
                }}
                animate={{
                    opacity: 1,
                    y: [20, -5, 0]
                }}
                transition={{
                    duration: 0.5,
                    ease: [0.4, 0.0, 0.2, 1]
                }}
                className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
            >
                <div className="flex flex-col items-center justify-center h-[100vh]  ">
                    <TypewriterEffectSmooth words={words} />

                    <Highlight className="text-black dark:text-white px-4 py-2 text-lg">
                        The key is not to prioritize what&aposs on your
                        schedule, but to schedule your priorities.
                    </Highlight>
                    <div className="flex mt-2 flex-col py-4 md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                        {session.status == 'authenticated' ? (
                            <button
                                onClick={() => router.push('/Dashboard')}
                                className="px-6 py-2 bg-none hover:bg-white hover:text-slate-800 hover:text-slate rounded-xl bg-black border flex gap-1 items-center justify-center dark:border-white hover:scale-105 transition-all duration-400  border-transparent text-slate-200 text-sm"
                            >
                                {' '}
                                Go to Dashboard{' '}
                                <img
                                    src="/logo.png"
                                    className="h-8 "
                                    alt="Task Maestro Logo"
                                />
                            </button>
                        ) : (
                            <button
                                onClick={() =>
                                    signIn('google', {
                                        callbackUrl: '/'
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
                        )}
                    </div>
                </div>
            </motion.h1>

            <div className="my-10">
                <h2 className="my-4 text-xl text-center sm:text-4xl dark:text-white text-black">
                    Key Features
                </h2>

                <div className="max-w-5xl mx-auto px-8">
                    <HoverEffect items={features} />
                </div>
            </div>

            <div className="w-full flex items-center my-10 justify-center">
                <AccordionHome />
            </div>
            <div className="my-20">
                <h2 className="my-4 text-xl text-center sm:text-3xl dark:text-white text-black">
                    Join the team
                </h2>
                <div className="flex flex-row items-center justify-center w-full">
                    <AnimatedTooltip items={people} />
                </div>
            </div>
            <Footer />
        </HeroHighlight>
    );
}
