import { forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { KanbanCard } from './Kanban-Card';
import { Draggable, Droppable } from 'react-beautiful-dnd';
export interface KanbanListProps
    extends React.HTMLAttributes<HTMLDivElement>,
        KanbanListType {
    index: number;
    children?: ReactNode;
}

/**
 * Represents a Kanban list UI component with draggable cards.
 *
 * @component
 * @example
 * <KanbanList
 *   className="custom-styles"
 *   listName="To Do"
 *   listItems={[
 *     { teamName: 'CHRONOS', taskTitle: 'Task 1', ticketID: 123, assignees: [], tags: ['Tag1'] },
 *   ]}
 *   index={0}
 * />
 */
export const KanbanList = forwardRef<HTMLDivElement, KanbanListProps>(
    ({ className, listItems = [], listName, index, ...args }, ref) => {
        return (
            <div>
                <div className="kanban-list-details-wrapper px-2 mb-2">
                    <p className="leading-snug font-medium tracking-tight text-gray-500 text-sm">
                        {listName}
                    </p>
                </div>
                <Droppable droppableId={listName} key={listName}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={cn(
                                'kanban-list p-2 border-b-4 border-transparent rounded-xl bg-gray-100/80 min-w-[280px] w-fit max-w-[300px] h-[600px] overflow-y-scroll',
                                className
                            )}
                            {...args}
                        >
                            <div className="grid grid-cols-1 gap-2">
                                {listItems.map(
                                    (card: KanbanCardType, index: number) => (
                                        <Draggable
                                            key={`${card.taskTitle.replaceAll(' ', '-')}-${card.ticketID}`}
                                            draggableId={`${card.taskTitle.replaceAll(' ', '-')}-${card.ticketID}`}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <KanbanCard
                                                        key={index}
                                                        {...card}
                                                        index={index}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    )
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
