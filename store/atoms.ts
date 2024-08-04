import { INITIAL_KANBAN_DATA } from '@/data/initialData';
import axios from 'axios';
import { atom, selector, useRecoilState } from 'recoil';

const KanbanDataAtom = atom<KanbanListType[]>({
    key: 'KanbanDataAtom',
    default: INITIAL_KANBAN_DATA
});

const SearchQueryAtom = atom<string>({
    key: 'SearchQueryAtom',
    default: ''
});
const allTasksAtom = atom({
    key: 'allTasksAtom',
    default: selector({
        key: 'AllTasksSelctor',
        get: async () => {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/gettasks`
            );
            return data?.tasks;
        }
    })
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
                const isTitleMatch = task.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
                const isTagMatch = task.labels?.some((tag) =>
                    tag.toLowerCase().includes(searchQuery.toLowerCase())
                );
                const isTeamNameMatch = task.priority
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());

                return isTitleMatch || isTagMatch || isTeamNameMatch;
            })
        }));
    }
});

//for add modal closing and opening
const addModalAtom = atom<Boolean>({
    key: 'addModalAtom',
    default: false
});
export {
    addModalAtom,
    filteredKanbanDataSelector,
    KanbanDataAtom,
    SearchQueryAtom,
    allTasksAtom
};
