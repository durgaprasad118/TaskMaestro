import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { DatePickerWithPresets } from './ui/DataPicker';
import { Label } from './ui/label';

const AddTask = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="p-[2px] relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                    <div className="px-8 py-1  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                        <Plus className="inline h-4" />
                        Add a task
                    </div>
                </button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Add Task</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-2">
                    <div className="grid my-2 w-full gap-2">
                        <Label>Task Name</Label>
                        <Input
                            className="w-full"
                            type="text"
                            id="title"
                            placeholder="task name"
                        />
                    </div>
                    <div className="flex gap-2 justify-between items-center">
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="blueberry">
                                        P1
                                    </SelectItem>
                                    <SelectItem value="grapes">P2</SelectItem>
                                    <SelectItem value="pineapple">
                                        P3
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <DatePickerWithPresets />
                    </div>
                </div>
                <div className="flex my-5 items-center w-full justify-center">
                    <SheetClose asChild>
                        <Button type="submit">Add</Button>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default AddTask;
