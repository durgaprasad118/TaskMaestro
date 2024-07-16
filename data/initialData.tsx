export const INITIAL_KANBAN_DATA: KanbanListType[] = [
    {
        listName: 'Not Started',
        listItems: [
            {
                priority: 'P1',
                taskTitle: 'Inbox DesignInbox DesignInbox Design',
                ticketID: 1,
                labels: ['design', 'blocker'],
                assignees: [
                    {
                        username: 'Dp',
                        avatar: 'https://github.com/durgaprasad118.png'
                    }
                ]
            },
            {
                priority: 'P2',
                taskTitle: 'Inbox Infrastructure',
                ticketID: 2,
                labels: ['backend'],
                assignees: [
                    {
                        username: 'Dp',
                        avatar: 'https://github.com/durgaprasad118.png'
                    },
                    {
                        username: 'kartik',

                        avatar: 'https://github.com/kartikver15gr8.png'
                    }
                ]
            },
            {
                priority: 'P3',
                ticketID: 8,
                taskTitle: 'Build Conversation Module',
                labels: ['frontend', 'data'],
                assignees: []
            }
        ]
    },
    {
        listName: 'In Progress',
        listItems: [
            {
                priority: 'P2',
                taskTitle: "Setup co-pilot API's",
                ticketID: 3,
                labels: ['backend', 'API'],
                assignees: [
                    {
                        username: 'kartik',

                        avatar: 'https://github.com/kartikver15gr8.png'
                    }
                ]
            },
            {
                priority: 'P2',
                taskTitle: 'Setup redux structure',
                ticketID: 10,
                assignees: [
                    {
                        username: 'Dp',

                        avatar: 'https://github.com/durgaprasad118.png'
                    }
                ]
            },
            {
                priority: 'P3',
                taskTitle: 'Build co-pilot UI',
                ticketID: 4,
                labels: ['frontend', 'ui'],
                assignees: [
                    {
                        username: 'kartik',

                        avatar: 'https://github.com/kartikver15gr8.png'
                    }
                ]
            },
            {
                priority: 'P1',
                taskTitle: 'Notification Module',
                ticketID: 5,
                assignees: [
                    {
                        username: 'Dp',

                        avatar: 'https://github.com/durgaprasad118.png'
                    },
                    {
                        username: 'kartik',

                        avatar: 'https://github.com/kartikver15gr8.png'
                    }
                ]
            },
            {
                priority: 'P3',
                taskTitle: 'Editor Design',
                ticketID: 11,
                labels: ['design', 'frontend'],
                assignees: [
                    {
                        username: 'Dp',

                        avatar: 'https://github.com/kartikver15gr8.png'
                    }
                ]
            }
        ]
    },
    {
        listName: 'To-do',
        listItems: [
            {
                priority: 'P2',
                taskTitle: 'Project table API tests',
                ticketID: 6,
                labels: ['api', 'backend', 'testing'],
                assignees: [
                    {
                        username: 'Dp',

                        avatar: 'https://github.com/durgaprasad118.png'
                    }
                ]
            },
            {
                priority: 'P3',
                taskTitle: 'Project table fixes',
                ticketID: 9,
                assignees: [
                    {
                        username: 'Dp',

                        avatar: 'https://github.com/durgaprasad118.png'
                    },
                    {
                        username: 'kartik',

                        avatar: 'https://github.com/kartikver15gr8.png'
                    },
                    {
                        username: 'harkirat',
                        avatar: 'https://github.com/hkirat.png'
                    }
                ]
            }
        ]
    },
    {
        listName: 'Done',
        listItems: [
            {
                priority: 'P3',
                taskTitle: 'Public view links',
                ticketID: 7,
                labels: ['frontend', 'backend'],
                assignees: [
                    {
                        username: 'Dp',

                        avatar: 'https://github.com/durgaprasad118.png'
                    }
                ]
            },
            {
                priority: 'P2',
                taskTitle: 'Command center UI testing',
                ticketID: 3,
                labels: ['ui', 'frontend', 'testing'],
                assignees: [
                    {
                        username: 'kartik',

                        avatar: 'https://github.com/kartikver15gr8.png'
                    }
                ]
            },
            {
                priority: 'P1',
                taskTitle: 'Notifictions Phase',
                ticketID: 4,
                assignees: [
                    {
                        username: 'Dp',

                        avatar: 'https://github.com/durgaprasad118.png'
                    }
                ]
            }
        ]
    }
];
