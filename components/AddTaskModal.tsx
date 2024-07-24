'use client';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { addModalAtom } from '@/store/atoms';
import { Label } from '@radix-ui/react-dropdown-menu';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger
} from './ui/Animated-Modal';
import { DatePickerWithPresets } from './ui/DataPicker';
import { Input } from './ui/input';
import Subtasks from './ui/Sub-tasks';
import { TagsInput } from './ui/TagsInput';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from './ui/use-toast';
import { TaskProps } from './ui/Sub-tasks';
export function AddTaskModal() {
    const [tags, setTags] = useState<string[]>([]);
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [date, setDate] = useState<Date | undefined>();
    const [title, setTitle] = useState<string>('');
    const [priority, setPriority] = useState<PriorityType>('P1');
    const [open, setOpen] = useRecoilState(addModalAtom);
    console.log(tasks);
    const addTodos = async () => {
        try {
            const { data } = await axios.post(
                process.env.NEXT_PUBLIC_BASE_URL + '/addTodo' || '',
                {
                    title: title,
                    date: date,
                    priority: priority,
                    subTasks: [...tasks],
                    labels: [...tags]
                }
            );
            console.log(data);
            if (data.task) {
                console.log('Task created:', data.task);
                toast(data.message || 'Task added successfully');
                // setOpen(false); // Close the modal
                setTitle('');
                setDate(undefined);
                setPriority('P1');
                setTasks([]);
                setTags([]);
            } else if (data.error) {
                toast(data.error);
            }
            toast(data?.message || '');
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (!open) {
            setTags([]);
            setTasks([]);
            setDate(undefined);
            setTitle('');
            setPriority('P1');
        }
    }, [open]);

    return (
        <div className="bg-slate-950 flex items-center justify-center">
            <Modal>
                <motion.div
                    initial={{
                        y: 12,
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1
                    }}
                    transition={{
                        type: 'spring'
                    }}
                >
                    <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
                        <span className="group-hover/modal-btn:translate-x-40 text-center px-4 transition duration-500">
                            Add a task{' '}
                        </span>
                        <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                            ✅
                        </div>
                    </ModalTrigger>
                </motion.div>
                <ModalBody>
                    <ModalContent>
                        <div className="flex flex-col gap-2">
                            <div className="grid w-full gap-1.5">
                                <Label>Task Name</Label>
                                <Input
                                    className="w-full"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    type="text"
                                    id="title"
                                    placeholder="task name"
                                />
                            </div>
                            <div className="z-1 flex gap-2 justify-between items-center">
                                <Select
                                    value={priority}
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
                                            <SelectItem value="P1">
                                                P1
                                            </SelectItem>
                                            <SelectItem value="P2">
                                                P2
                                            </SelectItem>
                                            <SelectItem value="P3">
                                                P3
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <DatePickerWithPresets
                                    date={date}
                                    setDate={setDate}
                                />
                            </div>
                            <div className="">
                                <TagsInput tags={tags} setTags={setTags} />
                            </div>
                            <Subtasks tasks={tasks} setTasks={setTasks} />
                        </div>
                    </ModalContent>
                    <ModalFooter className="gap-4 flex items-center justify-center">
                        <button
                            onClick={addTodos}
                            className=" dark:bg-slate-200 dark:text-black hover:bg-slate-100 hover:scale-105 transition-all duration-300 text-sm px-2 py-1 rounded-md border border-black w-28"
                        >
                            Add Task
                        </button>
                    </ModalFooter>
                </ModalBody>
            </Modal>
        </div>
    );
}
