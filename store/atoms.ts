import { INITIAL_KANBAN_DATA } from '@/data/initialData';
import { atom, selector } from 'recoil';
const KanbanDataAtom = atom<KanbanListType[]>({
    key: 'KanbanDataAtom',
    default: INITIAL_KANBAN_DATA
});
const SearchQueryAtom = atom<string>({
    key: 'SearchQueryAtom',
    default: ''
});
const filteredKanbanDataSelector = selector<KanbanListType[]>({
    key: 'filteredKanbanDataSelector',
    get: ({ get }) => {
        const kanbanData = get(KanbanDataAtom);
        const searchQuery = get(SearchQueryAtom);
        if (!searchQuery) return kanbanData;
        return kanbanData.map((list) => ({
            ...list,
            listItems: list.listItems.filter((task) => {
                const isTitleMatch = task.taskTitle
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
                const isAssigneeMatch = task.assignees.some((assignee) =>
                    assignee.username
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                );
                const isTagMatch = task.tags?.some((tag) =>
                    tag.toLowerCase().includes(searchQuery.toLowerCase())
                );
                const isTeamNameMatch = task.teamName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());

                return (
                    isTitleMatch ||
                    isAssigneeMatch ||
                    isTagMatch ||
                    isTeamNameMatch
                );
            })
        }));
    }
});

export { filteredKanbanDataSelector, KanbanDataAtom, SearchQueryAtom };
