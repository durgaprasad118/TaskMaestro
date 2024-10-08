import { cn } from '@/lib/utils';
import { forwardRef, ReactNode, useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { KanbanCard } from './Kanban-Card';

export interface KanbanListProps
    extends React.HTMLAttributes<HTMLDivElement>,
        KanbanListType {
    index: number;
    children?: ReactNode;
}

export const KanbanList = forwardRef<HTMLDivElement, KanbanListProps>(
    ({ className, listItems = [], status, index, ...args }, ref) => {
        const [enabled, setEnabled] = useState(false);
        useEffect(() => {
            const animation = requestAnimationFrame(() => setEnabled(true));

            return () => {
                cancelAnimationFrame(animation);
                setEnabled(false);
            };
        }, []);

        if (!enabled) {
            return null;
        }
        return (
            <div>
                <div className="kanban-list-details-wrapper  px-2 mb-2">
                    <p className="leading-snug font-semibold pt-3 tracking-tight text-center text-gray-400 text-md">
                        {status}
                    </p>
                </div>
                <Droppable droppableId={status} key={status}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={cn(
                                'kanban-list p-2 border-b-4 border-transparent rounded-xl   bg-[#1E293B] min-w-[280px] w-fit max-w-[300px] h-[600px] custom-scrollbar overflow-y-scroll',
                                className
                            )}
                            {...args}
                        >
                            <div className="grid grid-cols-1 gap-2">
                                {listItems.map(
                                    (card: KanbanCardType, index: number) => {
                                        return (
                                            <Draggable
                                                key={`${card?.id}-${card?.date}`}
                                                draggableId={`${card?.id}-${card?.date}`}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <KanbanCard
                                                            className=""
                                                            key={index}
                                                            {...card}
                                                            index={index}
                                                            status={status}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    }
                                )}
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    }
);

KanbanList.displayName = 'KanbanList';
