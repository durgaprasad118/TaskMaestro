'use client';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ListChecks, Tag, Tags } from 'lucide-react';
import Image from 'next/image';
import React, { forwardRef, useId } from 'react';
import { Badge } from './Badge';
import { Checkbox } from './checkbox';
declare type PriorityNameType = 'P1' | 'P2' | 'P3';
export const BageForPriority: Record<PriorityNameType, string> = {
    P1: 'red',
    P2: 'yellow',
    P3: 'green'
};
export interface KanbanCardProps
    extends React.HTMLAttributes<HTMLDivElement>,
        KanbanCardType {
    index: number;
}

export const KanbanCard = forwardRef<HTMLDivElement, KanbanCardProps>(
    (
        {
            className,
            taskTitle,
            priority,
            ticketID,
            labels,
            assignees,
            index,
            ...args
        },
        ref
    ) => {
        let id = `${taskTitle.replaceAll(' ', '-')}-${ticketID}`;
        return (
            <motion.div
                initial={{
                    y: (index + 1) * 12,
                    opacity: 0
                }}
                animate={{
                    y: 0,
                    opacity: 1
                }}
                transition={{
                    type: 'spring'
                }}
                whileTap={{
                    rotate: -4
                }}
            >
                <div>
                    <div
                        ref={ref}
                        id={id}
                        {...args}
                        key={id}
                        className="relative group bg-gradient-to-b dark:from-slate-900 from-slate-200 dark:to-slate-950 to-slate-300 p-6 rounded-3xl overflow-hidden"
                    >
                        <Grid size={20} />

                        <Badge
                            theme={BageForPriority[priority]}
                            className="mb-2"
                        >
                            {priority}
                        </Badge>
                        <div className="flex items-center space-x-2">
                            <Checkbox className="rounded-full" id={id} />
                            <p className="group-hover:translate-x-1 overflow-hidden  text-ellipsis whitespace-nowrap  transition-transform duration-200 font-bold text-neutral-800 dark:text-slate-300 relative z-20">
                                {taskTitle}
                            </p>
                        </div>

                        <div className="my-3 flex flex-row items-center justify-between">
                            <div className="flex items-center">
                                <CalendarIcon className=" h-3 " />
                                <span className="text-gray-400 font-medium text-xs">
                                    {format(new Date(), 'do MMMM')}
                                </span>
                            </div>
                            <div className="flex flex-row items-center justify-end gap-0">
                                {assignees?.map(
                                    ({ username, avatar }, index) => {
                                        return (
                                            <Image
                                                key={index}
                                                src={avatar}
                                                alt={username}
                                                width={24}
                                                height={24}
                                                className="rounded-full even:ml-[-4px]"
                                                priority
                                            />
                                        );
                                    }
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            {/*Add a check if theree are  subtasks then onbly render this else don't  */}
                            <div className="flex items-center">
                                <ListChecks className="h-3" />
                                <span className="text-xs font-medium text-slate-400">
                                    {'1/4'}
                                </span>
                            </div>
                            <div>
                                {labels &&
                                    labels?.length >= 1 &&
                                    (labels?.length === 1 ? (
                                        <div className="flex flex-row items-center text-violet-500  ">
                                            <Tag className="h-3 scale-x-[-1]" />
                                            <span className="text-xs uppercase text-violet-500 font-medium">
                                                {labels[0]}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-row items-center  text-violet-500">
                                            <Tags className="h-3 scale-x-[-1]" />
                                            <span className="text-xs uppercase text-violet-500 font-medium">
                                                {`${labels[0]} +${labels?.length - 1}`}
                                            </span>
                                        </div>
                                    ))}
                                {/* {labels?.map((tag: string, index: number) => ( */}
                                {/*     <Badge key={index}>{tag}</Badge> */}
                                {/* ))} */}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }
);

const Grid = ({ pattern, size }: { pattern?: number[][]; size?: number }) => {
    const p = pattern ?? [
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1]
    ];
    return (
        <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
            <div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
                <GridPattern
                    width={size ?? 20}
                    height={size ?? 20}
                    x="-12"
                    y="4"
                    squares={p}
                    className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
                />
            </div>
        </div>
    );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
    const patternId = useId();

    return (
        <svg aria-hidden="true" {...props}>
            <defs>
                <pattern
                    id={patternId}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <path d={`M.5 ${height}V.5H${width}`} fill="none" />
                </pattern>
            </defs>
            <rect
                width="100%"
                height="100%"
                strokeWidth={0}
                fill={`url(#${patternId})`}
            />
            {squares && (
                <svg x={x} y={y} className="overflow-visible">
                    {squares.map(([x, y]: any) => (
                        <rect
                            strokeWidth="0"
                            key={`${x}-${y}`}
                            width={width + 1}
                            height={height + 1}
                            x={x * width}
                            y={y * height}
                        />
                    ))}
                </svg>
            )}
        </svg>
    );
}
