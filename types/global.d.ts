declare type KanbanCardType = {
    teamName: TeamNameType;
    taskTitle: string;
    ticketID: number;
    assignees: AssigneeType[];
    tags?: string[];
};

declare type PriorityType = 'P1' | 'P2' | 'P3';

declare type KanbanListType = {
    listName: string;
    listItems: KanbanCardType[];
};
