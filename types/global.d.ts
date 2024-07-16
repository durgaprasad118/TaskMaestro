declare type KanbanCardType = {
    priority: PriorityType;
    taskTitle: string;
    ticketID: number;
    assignees?: AssigneeType[];
    labels?: string[];
};

declare type PriorityType = 'P1' | 'P2' | 'P3';

declare type KanbanListType = {
    listName: string;
    listItems: KanbanCardType[];
};
