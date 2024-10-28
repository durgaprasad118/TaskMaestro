declare type KanbanCardType = {
  priority: PriorityType;
  title: string;
  id: string;
  date: Date;
  labels?: string[];
  Status?: Status;
  subTasks: TaskProps[];
  completed: boolean;
};

declare type PriorityType = 'P1' | 'P2' | 'P3';

declare type TaskProps = {
  completed: boolean;
  title: string;
};
declare type Status = 'Backlog' | 'Progress' | 'Todo' | 'Done';
declare type KanbanListType = {
  status: string;
  listItems: KanbanCardType[];
};
