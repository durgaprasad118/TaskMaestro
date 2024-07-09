declare type AssigneeType = {
    username: string;
    avatar: string;
};

declare type KanbanCardType = {
    teamName: TeamNameType;
    taskTitle: string;
    ticketID: number;
    assignees: AssigneeType[];
    tags?: string[];
};

declare type KanbanListType = {
    listName: string;
    listItems: KanbanCardType[];
};
