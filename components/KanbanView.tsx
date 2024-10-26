'use client';
import { ResponsiveControl } from '@/layouts/responsive-control';
import {
  allTasksAtom,
  filteredKanbanDataSelector,
  KanbanDataAtom,
  SearchQueryAtom,
} from '@/store';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import {
  DragDropContext,
  DragStart,
  DragUpdate,
  DropResult,
} from 'react-beautiful-dnd';
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
} from 'recoil';
import { toast } from 'sonner';
import { AddTaskModal } from './AddTaskModal';
import SmallerDevicesError from './SmallerDevicesError';
import { KanbanList } from './ui/Kanban-list';
import { analyticsAtom } from '@/store/atoms';

const KanbanView = () => {
  const [kanbanData, setKanbanData] = useRecoilState(KanbanDataAtom);
  const filteredKanbanData = useRecoilValue(filteredKanbanDataSelector);
  const search = useRecoilValue(SearchQueryAtom);
  const [draggedItem, setDraggedItem] = useState<KanbanCardType | null>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);

  const refresh = useRecoilRefresher_UNSTABLE(allTasksAtom);
  const { state, contents } = useRecoilValueLoadable(allTasksAtom);
  const [isClient, setIsClient] = useState(false);
  const [a, setA] = useState(false);
  const AnalyticRefresh = useRecoilRefresher_UNSTABLE(analyticsAtom);
  useEffect(() => {
    if (state === 'hasValue') {
      setKanbanData(contents.tasks);
    }
  }, [state, contents.tasks]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const SortData = useCallback(
    async (status: string, id: string) => {
      let completed = false;
      if (status === 'Done') {
        completed = true;
      }
      try {
        const { data } = await axios.put(
          process.env.NEXT_PUBLIC_BASE_URL + `/changeStatus/`,
          {
            status,
            id,
            completed: completed,
          }
        );
        setKanbanData((prevData) => {
          const updatedKanbanData = prevData.map((list) => {
            if (list.status === status) {
              return {
                ...list,
                listItems: list.listItems.filter((task) => task.id !== id),
              };
            }
            if (list.status === data.newStatus) {
              return {
                ...list,
                listItems: [...list.listItems, data.task],
              };
            }
            return list;
          });
          return updatedKanbanData;
        });
      } catch (error) {
        console.error(error);
        toast.error('Error changing status');
      } finally {
        refresh();
        AnalyticRefresh();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refresh, AnalyticRefresh]
  );

  const onDragStart = useCallback(
    (initial: DragStart): void => {
      const { source } = initial;
      const sourceList = kanbanData.find(
        (list) => list.status === source.droppableId
      );
      const draggedTask = sourceList?.listItems[source.index];
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
      SortData(destination.droppableId, draggedItem?.id || '');

      const sourceListIndex = kanbanData.findIndex(
        (list) => list.status === source.droppableId
      );
      const destinationListIndex = kanbanData.findIndex(
        (list) => list.status === destination.droppableId
      );

      const updatedKanbanData = [...kanbanData];

      const sourceList = { ...updatedKanbanData[sourceListIndex] };
      const destinationList = {
        ...updatedKanbanData[destinationListIndex],
      };

      const sourceListItems = [...sourceList.listItems];
      const destinationListItems = [...destinationList.listItems];

      const [draggedTask] = sourceListItems.splice(source.index, 1);

      destinationListItems.splice(destination.index, 0, draggedTask);

      sourceList.listItems = sourceListItems;
      destinationList.listItems = destinationListItems;

      updatedKanbanData[sourceListIndex] = sourceList;
      updatedKanbanData[destinationListIndex] = destinationList;

      setKanbanData(updatedKanbanData);
    },
    [SortData, kanbanData, draggedItem, setKanbanData]
  );

  if (!isClient) {
    return null;
  }
  return (
    <div>
      <SmallerDevicesError />
      <div className="flex ">
        <div className="hide-on-small-screens">
          <div className="mt-3">
            <AddTaskModal />
          </div>
          <DragDropContext
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
            onDragEnd={onDragEnd}
          >
            <ResponsiveControl className="flex flex-row items-start justify-start gap-3 max-xl:overflow-x-scroll">
              {filteredKanbanData.map((list: KanbanListType, index: number) => (
                <KanbanList key={list.status} index={index} {...list} />
              ))}
            </ResponsiveControl>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default KanbanView;
