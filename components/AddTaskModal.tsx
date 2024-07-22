'use client';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Label } from '@radix-ui/react-dropdown-menu';
import { useEffect, useState } from 'react';
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
import { useRecoilState } from 'recoil';
import { addModalAtom } from '@/store/atoms';

export function AddTaskModal() {
    const [tags, setTags] = useState<string[]>([]);
    const [tasks, setTasks] = useState<string[]>([]);
    const [date, setDate] = useState<Date>();
    const [title, setTitle] = useState<string>('');
    const [priority, setPriority] = useState<PriorityType>('P1');
    const [open, setOpen] = useRecoilState(addModalAtom);
    function doclick() {
        console.log(tags);
        console.log(date);
        console.log(title);
        console.log(priority);
        console.log(tasks);
    }
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
                <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
                    <span className="group-hover/modal-btn:translate-x-40 text-center px-4 transition duration-500">
                        Add a task{' '}
                    </span>
                    <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                        ✅
                    </div>
                </ModalTrigger>
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
                            onClick={doclick}
                            className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28"
                        >
                            Add Task
                        </button>
                    </ModalFooter>
                </ModalBody>
            </Modal>
        </div>
    );
}
