import { Plus } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Input } from './input';
import { Label } from './label';
import { motion } from 'framer-motion';
const Subtasks = ({
    tasks,
    setTasks
}: {
    tasks: string[];
    setTasks: Dispatch<SetStateAction<string[]>>;
}) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, tasks.length);
    }, [tasks]);

    function handleAddTask() {
        setTasks((prev) => [...prev, '']);
    }

    function handleAddSubTask(index: number, title: string) {
        setTasks((prev) => {
            const newTasks = [...prev];
            newTasks[index] = title;
            return newTasks;
        });
    }

    function removeTask(index: number) {
        const filteredTasks = tasks.filter((x, i) => i !== index);
        setTasks(filteredTasks);
    }

    function handleKeyPress(
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (index === tasks.length - 1) {
                handleAddTask();
                setTimeout(() => {
                    inputRefs.current[index + 1]?.focus();
                }, 0);
            } else {
                inputRefs.current[index + 1]?.focus();
            }
        }
    }

    return (
        <div className="add-subtasks mt-2">
            <Label className="text-slate-400">Sub Tasks</Label>
            {tasks.length !== 0 && (
                <div className="scrollable-m h-auto max-h-36 overflow-y-scroll custom-scrollbar">
                    <div className="input-holder flex flex-col gap-2 py-1">
                        {tasks.map((task, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -10
                                }}
                                transition={{ type: 'tween', delay: 0.1 }}
                                key={index}
                                className="flex items-center gap-2 px-3"
                            >
                                <Input
                                    ref={(el: HTMLInputElement | null) => {
                                        inputRefs.current[index] = el;
                                    }}
                                    placeholder="sub-task"
                                    className="w-[90%]"
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                    value={task}
                                    onChange={(e) =>
                                        handleAddSubTask(index, e.target.value)
                                    }
                                />
                                <motion.svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="2em"
                                    height="2em"
                                    viewBox="0 0 24 24"
                                    onClick={() => removeTask(index)}
                                    className="cursor-pointer "
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <path
                                        fill="#ef4444"
                                        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
                                    ></path>
                                </motion.svg>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
            <motion.h2
                onClick={handleAddTask}
                className="leading-snug cursor-pointer mt-1 text-slate-400"
                whileTap={{
                    opacity: 0.9,
                    animationDuration: 'revert',
                    x: 0.8,
                    type: 'just'
                }}
                whileHover={{ opacity: 1, x: 0.8 }}
            >
                <Plus className="inline h-4" />
                <span> Add sub-task</span>
            </motion.h2>
        </div>
    );
};

export default Subtasks;
