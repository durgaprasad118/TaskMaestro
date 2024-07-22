'use client';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Tag, Tags } from 'lucide-react';
import Image from 'next/image';
import React, { forwardRef, useId } from 'react';
import { Badge } from './Badge';
import { Checkbox } from './checkbox';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { DatePickerWithPresets } from './DataPicker';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from './sheet';
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
                    <Sheet>
                        <SheetTrigger asChild>
                            <div
                                ref={ref}
                                id={id}
                                {...args}
                                key={id}
                                className="relative group   bg-gradient-to-b dark:from-slate-900 from-slate-200 dark:to-slate-950 to-slate-300 p-6 rounded-3xl overflow-hidden"
                            >
                                <Grid size={20} />

                                <Badge
                                    theme={BageForPriority[priority]}
                                    className="mb-2"
                                >
                                    {priority}
                                </Badge>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        className="rounded-full"
                                        id={id}
                                    />
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
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 24 24"
                                        >
                                            <g
                                                fill="none"
                                                stroke="#7c3aed"
                                                strokeWidth={2}
                                            >
                                                <rect
                                                    width={4}
                                                    height={4}
                                                    x={18}
                                                    y={9}
                                                    rx={2}
                                                    transform="rotate(90 18 9)"
                                                ></rect>
                                                <rect
                                                    width={4}
                                                    height={4}
                                                    x={18}
                                                    y={17}
                                                    rx={2}
                                                    transform="rotate(90 18 17)"
                                                ></rect>
                                                <rect
                                                    width={4}
                                                    height={4}
                                                    x={3}
                                                    y={7}
                                                    rx={2}
                                                    transform="rotate(-90 3 7)"
                                                ></rect>
                                                <path d="M5 8v7c0 1.886 0 2.828.586 3.414C6.172 19 7.114 19 9 19h5"></path>
                                                <path d="M5 7c0 1.886 0 2.828.586 3.414C6.172 11 7.114 11 9 11h5"></path>
                                            </g>
                                        </svg>
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
                                    </div>
                                </div>
                            </div>
                        </SheetTrigger>

                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Add Task</SheetTitle>
                            </SheetHeader>

                            <div className="flex flex-col gap-2">
                                <div className="grid my-2 w-full gap-2">
                                    <Label>Task Name</Label>
                                    <Input
                                        className="w-full"
                                        type="text"
                                        id="title"
                                        placeholder="task name"
                                    />
                                </div>
                                <div className="flex gap-2 justify-between items-center">
                                    <Select>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="blueberry">
                                                    P1
                                                </SelectItem>
                                                <SelectItem value="grapes">
                                                    P2
                                                </SelectItem>
                                                <SelectItem value="pineapple">
                                                    P3
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {/* <DatePickerWithPresets date={} /> */}
                                </div>
                            </div>
                            <div className="flex my-5 items-center w-full justify-center">
                                <SheetClose asChild>
                                    <Button type="submit">Add</Button>
                                </SheetClose>
                            </div>
                        </SheetContent>
                    </Sheet>
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
