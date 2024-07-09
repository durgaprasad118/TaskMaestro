'use client';
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
    useTransform
} from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export const AnimatedTooltipAvatar = ({
    id,
    name,
    image
}: {
    id: number;
    name: string;
    image: string;
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const springConfig = { stiffness: 100, damping: 5 };
    const x = useMotionValue(0);
    const rotate = useSpring(
        useTransform(x, [-100, 100], [-45, 45]),
        springConfig
    );
    const translateX = useSpring(
        useTransform(x, [-100, 100], [-50, 50]),
        springConfig
    );
    const handleMouseMove = (event: any) => {
        const halfWidth = event.target.offsetWidth / 2;
        x.set(event.nativeEvent.offsetX - halfWidth);
    };

    return (
        <>
            <div
                className="  relative "
                key={name}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <AnimatePresence mode="popLayout">
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.6 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                transition: {
                                    type: 'spring',
                                    stiffness: 260,
                                    damping: 10
                                }
                            }}
                            exit={{ opacity: 0, y: 20, scale: 0.6 }}
                            style={{
                                translateX: translateX,
                                rotate: rotate,
                                whiteSpace: 'nowrap'
                            }}
                            className="absolute right-12 bottom-2  flex text-xs  flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl "
                        >
                            <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                            <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                            <div className="font-light text-white relative z-30 text-base">
                                {name}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <Image
                    onMouseMove={handleMouseMove}
                    height={80}
                    width={80}
                    src={image}
                    alt={name}
                    className="object-top rounded-full h-10 w-10 border-2 hover:scale-105 hover:z-30 border-white  relative transition duration-500"
                />
            </div>
        </>
    );
};
