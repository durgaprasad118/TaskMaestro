'use client';
import { ResponsiveControl } from '@/layouts/responsive-control';
import {
    filteredKanbanDataSelector,
    KanbanDataAtom,
    SearchQueryAtom
} from '@/store';
import { allTasksAtom } from '@/store/atoms';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import {
    DragDropContext,
    DragStart,
    DragUpdate,
    DropResult
} from 'react-beautiful-dnd';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { AddTaskModal } from './AddTaskModal';
import { KanbanList } from './ui/Kanban-list';
import { toast } from 'sonner';

const KanbanView = () => {
    const [kanbanData, setKanbanData] = useRecoilState(KanbanDataAtom);
    const filteredKanbanData = useRecoilValue(filteredKanbanDataSelector);
    const serach = useRecoilValue(SearchQueryAtom);
    const [draggedItem, setDraggedItem] = useState<KanbanCardType | null>(null);
    const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(
        null
    );
    const { state, contents: Tasks } = useRecoilValueLoadable(allTasksAtom);
    let selectedId = '';
    useEffect(() => {
        setKanbanData(Tasks);
    }, [state]);

    const SortData = async (status: String, id: String) => {
        try {
            const { data } = await axios.put(
                process.env.NEXT_PUBLIC_BASE_URL + `/changeStatus/` || '',
                {
                    status: status,
                    id: id
                }
            );
        } catch (error) {
            console.log(error);
            toast.error('error changing status');
        }
    };
    const onDragStart = useCallback(
        (initial: DragStart): void => {
            const { source } = initial;
            const sourceList = kanbanData.find(
                (list) => list.status === source.droppableId
            );
            const draggedTask = sourceList?.listItems[source.index];
            // setSelectedId(draggedTask?.id || ' ');
            selectedId = draggedTask?.id || '';
            setDraggedItem(draggedTask || null);
        },
        [kanbanData]
    );

    const onDragUpdate = useCallback((update: DragUpdate): void => {
        const { destination } = update;
        setDraggedOverIndex(destination?.index || null);
    }, []);

    const onDragEnd = useCallback(
        (result: DropResult): void => {
            setDraggedItem(null);
            setDraggedOverIndex(null);

            if (!result.destination) {
                return;
            }

            const { source, destination } = result;
            SortData(destination.droppableId, selectedId);

            // Find the source and destination lists
            const sourceListIndex = kanbanData.findIndex(
                (list) => list.status === source.droppableId
            );
            const destinationListIndex = kanbanData.findIndex(
                (list) => list.status === destination.droppableId
            );

            // Create a copy of the kanbanData array
            const updatedKanbanData = [...kanbanData];

            // Create a copy of the source and destination lists
            const sourceList = { ...updatedKanbanData[sourceListIndex] };
            const destinationList = {
                ...updatedKanbanData[destinationListIndex]
            };

            // Create a copy of the listItems arrays
            const sourceListItems = [...sourceList.listItems];
            const destinationListItems = [...destinationList.listItems];

            // Remove the dragged task from the source list
            const [draggedTask] = sourceListItems.splice(source.index, 1);

            // Add the dragged task to the destination list
            destinationListItems.splice(destination.index, 0, draggedTask);

            // Update the listItems arrays in the source and destination lists
            sourceList.listItems = sourceListItems;
            destinationList.listItems = destinationListItems;

            // Update the source and destination lists in the kanbanData array
            updatedKanbanData[sourceListIndex] = sourceList;
            updatedKanbanData[destinationListIndex] = destinationList;

            setKanbanData(updatedKanbanData);
        },
        [kanbanData, setKanbanData]
    );

    if (state == 'loading') {
        return <h1> Loading</h1>;
    }

    return (
        <div>
            <div className="mt-3">
                <AddTaskModal />
            </div>
            <DragDropContext
                onDragStart={onDragStart}
                onDragUpdate={onDragUpdate}
                onDragEnd={onDragEnd}
            >
                <ResponsiveControl className="flex flex-row items-start justify-start gap-3 max-xl:overflow-x-scroll">
                    {filteredKanbanData.map(
                        (list: KanbanListType, index: number) => (
                            <KanbanList
                                key={list.status}
                                index={index}
                                {...list}
                            />
                        )
                    )}
                </ResponsiveControl>
            </DragDropContext>
        </div>
    );
};

export default KanbanView;
