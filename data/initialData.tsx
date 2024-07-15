export const INITIAL_KANBAN_DATA: KanbanListType[] = [
    {
        listName: 'Not Started',
        listItems: [
            {
                teamName: 'CHRONOS',
                taskTitle: 'Inbox Design',
                ticketID: 1,
                tags: ['design', 'blocker'],
                assignees: [
                    {
                        username: 'yashsehgal',
                        avatar: 'https://github.com/yashsehgal.png'
                    }
                ]
            },
            {
                teamName: 'CHRONOS',
                taskTitle: 'Inbox Infrastructure',
                ticketID: 2,
                tags: ['backend'],
                assignees: [
                    {
                        username: 'yashsehgal',
                        avatar: 'https://github.com/yashsehgal.png'
                    },
                    {
                        username: 'viveknigam',
                        avatar: 'https://github.com/viveknigam3003.png'
                    }
                ]
            },
            {
                teamName: 'CHRONOS',
                ticketID: 8,
                taskTitle: 'Build Conversation Module',
                tags: ['frontend', 'data'],
                assignees: []
            }
        ]
    },
    {
        listName: 'In Progress',
        listItems: [
            {
                teamName: 'LABS',
                taskTitle: "Setup co-pilot API's",
                ticketID: 3,
                tags: ['backend', 'API'],
                assignees: [
                    {
                        username: 'viveknigam',
                        avatar: 'https://github.com/viveknigam3003.png'
                    }
                ]
            },
            {
                teamName: 'PHOENIX',
                taskTitle: 'Setup redux structure',
                ticketID: 10,
                assignees: [
                    {
                        username: 'yashsehgal',
                        avatar: 'https://github.com/yashsehgal.png'
                    }
                ]
            },
            {
                teamName: 'LABS',
                taskTitle: 'Build co-pilot UI',
                ticketID: 4,
                tags: ['frontend', 'ui'],
                assignees: [
                    {
                        username: 'viveknigam',
                        avatar: 'https://github.com/viveknigam3003.png'
                    }
                ]
            },
            {
                teamName: 'CHRONOS',
                taskTitle: 'Notification Module',
                ticketID: 5,
                assignees: [
                    {
                        username: 'yashsehgal',
                        avatar: 'https://github.com/yashsehgal.png'
                    },
                    {
                        username: 'viveknigam',
                        avatar: 'https://github.com/viveknigam3003.png'
                    }
                ]
            },
            {
                teamName: 'PHOENIX',
                taskTitle: 'Editor Design',
                ticketID: 11,
                tags: ['design', 'frontend'],
                assignees: [
                    {
                        username: 'yashsehgal',
                        avatar: 'https://github.com/viveknigam3003.png'
                    }
                ]
            }
        ]
    },
    {
        listName: 'Under Review',
        listItems: [
            {
                teamName: 'CHRONOS',
                taskTitle: 'Project table API tests',
                ticketID: 6,
                tags: ['api', 'backend', 'testing'],
                assignees: [
                    {
                        username: 'yashsehgal',
                        avatar: 'https://github.com/yashsehgal.png'
                    }
                ]
            },
            {
                teamName: 'CHRONOS',
                taskTitle: 'Project table fixes',
                ticketID: 9,
                assignees: [
                    {
                        username: 'yashsehgal',
                        avatar: 'https://github.com/yashsehgal.png'
                    },
                    {
                        username: 'viveknigam',
                        avatar: 'https://github.com/viveknigam3003.png'
                    },
                    {
                        username: 'communal',
                        avatar: 'https://github.com/communal.png'
                    }
                ]
            }
        ]
    },
    {
        listName: 'Shipped',
        listItems: [
            {
                teamName: 'LUMOS',
                taskTitle: 'Public view links',
                ticketID: 7,
                tags: ['frontend', 'backend'],
                assignees: [
                    {
                        username: 'yashsehgal',
                        avatar: 'https://github.com/yashsehgal.png'
                    }
                ]
            },
            {
                teamName: 'LABS',
                taskTitle: 'Command center UI testing',
                ticketID: 3,
                tags: ['ui', 'frontend', 'testing'],
                assignees: [
                    {
                        username: 'viveknigam',
                        avatar: 'https://github.com/viveknigam3003.png'
                    }
                ]
            },
            {
                teamName: 'CHRONOS',
                taskTitle: 'Notifictions Phase',
                ticketID: 4,
                assignees: [
                    {
                        username: 'yashsehgal',
                        avatar: 'https://github.com/yashsehgal.png'
                    }
                ]
            }
        ]
    }
];
