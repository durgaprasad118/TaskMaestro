'use client';
import { Label } from '@radix-ui/react-dropdown-menu';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger
} from './ui/Animated-Modal';
import { Input } from './ui/input';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { DatePickerWithPresets } from './ui/DataPicker';

export function AnimatedModalDemo() {
    return (
        <div className="py-40  bg-slate-950 flex items-center justify-center">
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
                                    type="text"
                                    id="title"
                                    placeholder="task name"
                                />
                            </div>
                            <div className="z-1 flex gap-2 justify-between items-center">
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="blueberry">
                                                P1
                                            </SelectItem>
                                            <SelectItem value="grapes">
                                                P2
                                            </SelectItem>
                                            <SelectItem value="pineapple">
                                                P3
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <DatePickerWithPresets />
                            </div>
                        </div>
                    </ModalContent>
                    <ModalFooter className="gap-4 flex items-center justify-center">
                        <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
                            Add Task
                        </button>
                    </ModalFooter>
                </ModalBody>
            </Modal>
        </div>
    );
}
