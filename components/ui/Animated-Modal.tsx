'use client';
import { cn } from '@/lib/utils';
import { addModalAtom } from '@/store/atoms';
import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactNode, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

export function Modal({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
}

export const ModalTrigger = ({
    children,
    className
}: {
    children: ReactNode;
    className?: string;
}) => {
    const [open, setOpen] = useRecoilState(addModalAtom);
    return (
        <button
            className={cn(
                'px-4 py-2 rounded-md text-black dark:text-white text-center relative overflow-hidden',
                className
            )}
            onClick={() => setOpen(true)}
        >
            {children}
        </button>
    );
};

export const ModalBody = ({
    children,
    className
}: {
    children: ReactNode;
    className?: string;
}) => {
    const [open, setOpen] = useRecoilState(addModalAtom);
    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [open]);

    useOutsideClick(modalRef, () => setOpen(false));

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
                    exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                    className="fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full flex items-center justify-center z-50 modal-overlay"
                >
                    <Overlay />
                    <motion.div
                        ref={modalRef}
                        className={cn(
                            'min-h-[50%] max-h-[90%] md:max-w-[40%] bg-white dark:bg-slate-950 border border-transparent dark:border-slate-800 md:rounded-2xl relative z-50 flex flex-col flex-1 overflow-hidden',
                            className
                        )}
                        initial={{ opacity: 0, scale: 0.5, rotateX: 40, y: 40 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotateX: 10 }}
                        transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 15
                        }}
                    >
                        <CloseIcon />
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const ModalContent = ({
    children,
    className
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={cn(
                'modal-content flex flex-col flex-1 p-8 md:p-10',
                className
            )}
        >
            {children}
        </div>
    );
};

export const ModalFooter = ({
    children,
    className
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                'flex justify-end p-4 bg-gray-100 dark:bg-slate-900',
                className
            )}
        >
            {children}
        </div>
    );
};

const Overlay = ({ className }: { className?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className={`fixed inset-0 h-full w-full bg-black bg-opacity-50 z-50 modal-overlay ${className}`}
        ></motion.div>
    );
};

const CloseIcon = () => {
    const [open, setOpen] = useRecoilState(addModalAtom);
    return (
        <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 group"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black dark:text-white h-4 w-4 group-hover:scale-125 group-hover:rotate-3 transition duration-200"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
            </svg>
        </button>
    );
};

export const useOutsideClick = (
    ref: React.RefObject<HTMLDivElement>,
    callback: Function
) => {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            if (
                (event.target as HTMLElement).classList.contains(
                    'modal-overlay'
                )
            ) {
                callback(event);
            }
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, callback]);
};
