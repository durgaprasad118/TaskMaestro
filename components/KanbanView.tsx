'use client';
import { ResponsiveControl } from '@/layouts/responsive-control';
import {
    DragDropContext,
    DragStart,
    DragUpdate,
    DropResult
} from 'react-beautiful-dnd';
import { KanbanList } from './ui/Kanban-list';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { KanbanDataAtom } from '@/store';
const KanbanView = () => {
    const [kanbanData, setKanbanData] = useRecoilState(KanbanDataAtom);
    const [draggedItem, setDraggedItem] = useState<KanbanCardType | null>(null);
    const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(
        null
    );
    const onDragStart = (initial: DragStart): void => {
        const { source } = initial;
        const sourceList = kanbanData.find(
            (list) => list.listName === source.droppableId
        );
        const draggedTask = sourceList?.listItems[source.index];
        setDraggedItem(draggedTask || null);
    };

    const onDragUpdate = (update: DragUpdate): void => {
        const { destination } = update;
        setDraggedOverIndex(destination?.index || null);
    };

    const onDragEnd = (result: DropResult): void => {
        // Reset state
        setDraggedItem(null);
        setDraggedOverIndex(null);

        // Dropped outside the list
        if (!result.destination) {
            return;
        }

        const { source, destination } = result;

        // Update the data after dragging and dropping
        const updatedKanbanData = [...kanbanData];
        const sourceList = updatedKanbanData.find(
            (list) => list.listName === source.droppableId
        );
        const destinationList = updatedKanbanData.find(
            (list) => list.listName === destination.droppableId
        );
        const [draggedTask] = sourceList!.listItems.splice(source.index, 1);
        destinationList!.listItems.splice(destination.index, 0, draggedTask);

        // Update the local storage with the latest Kanban data
        localStorage.setItem('kanban', JSON.stringify(updatedKanbanData));

        // Update the state to trigger a re-render
        setKanbanData(updatedKanbanData);
    };
    return (
        <div>
            <DragDropContext
                onDragStart={onDragStart}
                onDragUpdate={onDragUpdate}
                onDragEnd={onDragEnd}
            >
                <ResponsiveControl className="flex flex-row items-start justify-start gap-3 max-xl:overflow-x-scroll">
                    {kanbanData.map((list: KanbanListType, index: number) => {
                        return (
                            <KanbanList key={index} index={index} {...list} />
                        );
                    })}
                </ResponsiveControl>
            </DragDropContext>
        </div>
    );
};

export default KanbanView;
