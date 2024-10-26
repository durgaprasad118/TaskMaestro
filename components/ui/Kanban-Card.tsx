'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { allTasksAtom } from '@/store';
import { analyticsAtom } from '@/store/atoms';
import axios from 'axios';
import { format, isAfter, isBefore, isToday, startOfToday } from 'date-fns';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Tag, Tags } from 'lucide-react';
import { forwardRef, memo, useId, useState } from 'react';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import { toast } from 'sonner';
import { Badge } from './Badge';
import { Checkbox } from './checkbox';
import { DatePickerWithPresets } from './DataPicker';
import { Input } from './input';
import { Label } from './label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';
import Spinner from './Spinner';
import Subtasks from './Sub-tasks';
import { TagsInput } from './TagsInput';
declare type PriorityNameType = 'P1' | 'P2' | 'P3';
export const BageForPriority: Record<PriorityNameType, string> = {
  P1: 'red',
  P2: 'yellow',
  P3: 'green',
};
export interface KanbanCardProps extends KanbanCardType {
  index: number;
  className: string;
  status: string;
}

// eslint-disable-next-line react/display-name
const KanbanCardComponent = forwardRef<HTMLDivElement, KanbanCardProps>(
  (
    {
      className,
      title: taskTitle,
      priority,
      id: taskID,
      subTasks,
      date: taskDate,
      labels,
      index,
      status,
      completed,
      ...args
    },
    ref
  ) => {
    const [tags, setTags] = useState<string[]>(labels ?? []);
    const [tasks, setTasks] = useState<TaskProps[]>(subTasks);
    const [date, setDate] = useState<Date | undefined>(new Date(taskDate));
    const [title, setTitle] = useState<string>(taskTitle || ' ');
    const [prior, setPriority] = useState<PriorityType>(priority);
    const [done, setDone] = useState<boolean>(completed);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const refresh = useRecoilRefresher_UNSTABLE(allTasksAtom);
    const AnalyticRefresh = useRecoilRefresher_UNSTABLE(analyticsAtom);
    let taskcount = tasks.filter((x) => x.title != '').length;
    let doneTasks = tasks.filter((x) => x.completed).length;

    const handleDelete = async () => {
      try {
        setDeleting(true);
        const { data } = await axios.delete(
          process.env.NEXT_PUBLIC_BASE_URL + '/deletetask' || '',
          {
            data: { taskId: taskID },
          }
        );
        if (data.task) {
          toast.success(data?.message);
        } else if (data.error) {
          toast.error(data.error.message ?? 'Failed to delete task');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setDeleting(false);
        refresh();
        AnalyticRefresh();
      }
    };
    const UpdateTask = async (taskComplted: boolean) => {
      try {
        setUpdating(true);
        if (!title) {
          toast.error('Title is mandatory');
          setUpdating(false);
          return;
        }
        let updatedStatus = status;
        if (taskComplted && updatedStatus === 'Backlog') {
          updatedStatus = 'Done';
        } else if (taskComplted && updatedStatus !== 'Done') {
          updatedStatus = 'Done';
        } else if (!taskComplted && updatedStatus === 'Done') {
          const isSubTaskDoneCount =
            tasks && tasks.filter((x) => x.completed).length;
          updatedStatus = isSubTaskDoneCount > 0 ? 'Progress' : 'Todo';
        } else if (
          updatedStatus === 'Backlog' &&
          !taskComplted &&
          date &&
          (isAfter(date, startOfToday()) || isToday(date))
        ) {
          const isSubTaskDoneCount =
            tasks && tasks.filter((x) => x.completed).length;
          updatedStatus = isSubTaskDoneCount > 0 ? 'Progress' : 'Todo';
        }

        const { data } = await axios.put(
          process.env.NEXT_PUBLIC_BASE_URL + '/updatetask' || '',
          {
            title: title,
            date: date,
            priority: prior,
            subTasks: tasks.filter((x) => x.title != ''),
            labels: [...tags],
            completed: taskComplted,
            status: updatedStatus,
            taskId: taskID,
          }
        );
        if (data.task) {
          toast.success(data?.message);
          if (
            data.task.status !== 'Backlog' &&
            data.task.date &&
            !data.task.completed
          ) {
            const taskDate = new Date(data.task.date);
            const today = startOfToday();
            if (isBefore(taskDate, today)) {
              try {
                const response = await axios.put(
                  process.env.NEXT_PUBLIC_BASE_URL + '/backlog',
                  {
                    id: taskID,
                  }
                );
              } catch (er) {
                console.log(er);
              }
            }
          }
          refresh();
        } else if (data.error) {
          toast.error(data.error.message ?? 'Failed to update task');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setUpdating(false);
        refresh();
        AnalyticRefresh();
      }
    };
    let id = `${taskID}-${taskDate}`;
    if (updating) {
      return (
        <div
          ref={ref}
          id={id}
          {...args}
          key={id}
          className="relative group bg-gradient-to-b dark:from-slate-900 from-slate-200 dark:to-slate-950 to-slate-300 p-6 rounded-3xl overflow-hidden"
        >
          <Grid size={20} />
          <Badge theme={BageForPriority[priority]} className="mb-2">
            P1
          </Badge>
          <div className="flex items-center space-x-2">
            <Checkbox
              className="rounded-full"
              onClick={(e) => {
                e.stopPropagation();
              }}
              checked={false}
              id={id}
            />
            <p className="group-hover:translate-x-1 overflow-hidden  text-ellipsis whitespace-nowrap  transition-transform duration-200 font-bold text-neutral-800 dark:text-slate-300 relative z-20">
              {'Title ...'}
            </p>
          </div>

          <div className="my-3 flex flex-row items-center mr-4">
            <div className="flex items-center">
              <CalendarIcon className="h-3" />
              <span className="text-gray-400 font-medium text-xs">date</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="#7c3aed" strokeWidth={2}>
                  <rect
                    width={4}
                    height={4}
                    x={18}
                    y={9}
                    rx={2}
                    transform="rotate(90 18 9)"
                  ></rect>
                  <rect
                    width={4}
                    height={4}
                    x={18}
                    y={17}
                    rx={2}
                    transform="rotate(90 18 17)"
                  ></rect>
                  <rect
                    width={4}
                    height={4}
                    x={3}
                    y={7}
                    rx={2}
                    transform="rotate(-90 3 7)"
                  ></rect>
                  <path d="M5 8v7c0 1.886 0 2.828.586 3.414C6.172 19 7.114 19 9 19h5"></path>
                  <path d="M5 7c0 1.886 0 2.828.586 3.414C6.172 11 7.114 11 9 11h5"></path>
                </g>
              </svg>
              <span className="text-xs font-medium text-slate-400">
                {'done tasks/total tasks'}
              </span>
            </div>
            <div>
              <div className="flex flex-row items-center text-violet-500  ">
                <Tag className="h-3 scale-x-[-1]" />
                <span className="text-xs uppercase text-violet-500 font-medium">
                  xyz
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <motion.div
        initial={{
          y: (index + 1) * 12,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          type: 'spring',
        }}
        whileTap={{
          rotate: -4,
        }}
      >
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <div
                ref={ref}
                id={id}
                {...args}
                key={id}
                className="relative group bg-gradient-to-b dark:from-slate-900 from-slate-200 dark:to-slate-950 to-slate-300 p-6 rounded-3xl overflow-hidden"
              >
                <Grid size={20} />
                <Badge theme={BageForPriority[priority]} className="mb-2">
                  {priority}
                </Badge>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    className="rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      const taskComplted = !done;
                      setDone(taskComplted);
                      UpdateTask(taskComplted);
                    }}
                    checked={done}
                    id={id}
                  />
                  <p className="group-hover:translate-x-1 overflow-hidden  text-ellipsis whitespace-nowrap  transition-transform duration-200 font-bold text-neutral-800 dark:text-slate-300 relative z-20">
                    {title}
                  </p>
                </div>

                <div className="my-3 flex flex-row items-center mr-4">
                  <div className="flex items-center">
                    <CalendarIcon className="h-3" />
                    <span className="text-gray-400 font-medium text-xs">
                      {format(date || new Date(), 'do MMMM')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none" stroke="#7c3aed" strokeWidth={2}>
                        <rect
                          width={4}
                          height={4}
                          x={18}
                          y={9}
                          rx={2}
                          transform="rotate(90 18 9)"
                        ></rect>
                        <rect
                          width={4}
                          height={4}
                          x={18}
                          y={17}
                          rx={2}
                          transform="rotate(90 18 17)"
                        ></rect>
                        <rect
                          width={4}
                          height={4}
                          x={3}
                          y={7}
                          rx={2}
                          transform="rotate(-90 3 7)"
                        ></rect>
                        <path d="M5 8v7c0 1.886 0 2.828.586 3.414C6.172 19 7.114 19 9 19h5"></path>
                        <path d="M5 7c0 1.886 0 2.828.586 3.414C6.172 11 7.114 11 9 11h5"></path>
                      </g>
                    </svg>
                    <span className="text-xs font-medium text-slate-400">
                      {doneTasks + '/' + taskcount}
                    </span>
                  </div>
                  <div>
                    {labels &&
                      labels?.length >= 1 &&
                      (labels?.length === 1 ? (
                        <div className="flex flex-row items-center text-violet-500  ">
                          <Tag className="h-3 scale-x-[-1]" />
                          <span className="text-xs uppercase text-violet-500 font-medium">
                            {labels[0]}
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-row items-center  text-violet-500">
                          <Tags className="h-3 scale-x-[-1]" />
                          <span className="text-xs uppercase text-violet-500 font-medium">
                            {`${labels[0]} +${labels?.length - 1}`}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>Update Task</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    className="h-5 w-5 border-slate-700 mt-3 "
                    checked={done}
                    onClick={() => setDone(!done)}
                    id={id}
                  />
                  <div className="grid my-2 w-full gap-2">
                    <Label>Task Name</Label>
                    <Input
                      className="w-full"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      id="task name"
                      placeholder="task name"
                    />
                  </div>
                </div>
                <div className="flex gap-2 flex-col">
                  <div className="flex gap-2">
                    <Select
                      value={prior}
                      onValueChange={(value: PriorityType) =>
                        setPriority(value)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue
                          placeholder="Priority"
                          className="text-slate-500"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="P1">P1</SelectItem>
                          <SelectItem value="P2">P2</SelectItem>
                          <SelectItem value="P3">P3</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <DatePickerWithPresets date={date} setDate={setDate} />
                  </div>
                  <div className="">
                    <TagsInput tags={tags} setTags={setTags} />
                  </div>
                  <Subtasks tasks={tasks} setTasks={setTasks} />
                </div>
              </div>
              <div className="">
                <div className="flex my-5 items-center w-full justify-center">
                  <SheetClose asChild>
                    <button
                      onClick={() => UpdateTask(done)}
                      className="w-3/4 dark:bg-green-500 dark:text-white hover:bg-green-800 hover:scale-105 transition-all duration-300 text-sm px-3 py-2 rounded-md border border-black"
                    >
                      Update Task
                    </button>
                  </SheetClose>
                </div>

                <div className="flex my-5 items-center w-full justify-center">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="w-3/4 dark:bg-red-500 dark:text-white hover:bg-red-800 hover:scale-105 transition-all duration-300 text-sm px-3 py-2 rounded-md border border-black ">
                        Delete Task
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your task!
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <SheetClose asChild>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </SheetClose>
                        <AlertDialogAction
                          onClick={handleDelete}
                          className="text-white bg-red-500 hover:bg-red-600"
                          disabled={deleting}
                        >
                          {deleting ? <Spinner /> : ' Delete'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.div>
    );
  }
);

const Grid = ({ pattern, size }: { pattern?: number[][]; size?: number }) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];
  return (
    <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: any) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
export const KanbanCard = memo(KanbanCardComponent);
KanbanCard.displayName = 'KanbanCard';
