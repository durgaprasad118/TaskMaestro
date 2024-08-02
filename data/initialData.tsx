export const INITIAL_KANBAN_DATA: KanbanListType[] = [
    {
        status: 'Backlog',
        listItems: [
            {
                priority: 'P1',
                title: 'Inbox DesignInbox DesignInbox Design',
                id: 'a',
                labels: ['design', 'blocker'],
                date: new Date('2024-07-08T18:30:00.000Z'),
                subTasks: []
            }
        ]
    },
    {
        status: 'Progress',
        listItems: [
            {
                priority: 'P2',
                title: "Setup co-pilot API's",
                id: 'b',
                labels: ['backend', 'API'],
                date: new Date('2024-07-08T18:30:00.000Z'),
                subTasks: []
            }
        ]
    },
    {
        status: 'Todo',
        listItems: [
            {
                priority: 'P2',
                title: 'Project table API tests',
                labels: ['api', 'backend', 'testing'],
                id: 'c',
                date: new Date('2024-07-08T18:30:00.000Z'),
                subTasks: []
            }
        ]
    },
    {
        status: 'Done',
        listItems: [
            {
                priority: 'P3',
                title: 'Public view links',
                id: 'd',
                date: new Date('2024-07-08T18:30:00.000Z'),
                subTasks: [],
                labels: ['frontend', 'backend']
            }
        ]
    }
];
