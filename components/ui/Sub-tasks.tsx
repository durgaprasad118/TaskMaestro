import { Plus } from 'lucide-react';
import { Input } from './input';

const Subtasks = ({ tasks }: { tasks: string[] }) => {
    return (
        <div className="add-subtasks mt-2">
            {tasks.length != 0 ? (
                <div className="scrollable-m">
                    <div className="input-holder">
                        {tasks.map((task, index) => {
                            return <Input placeholder="sub-task" />;
                        })}
                    </div>
                </div>
            ) : (
                <></>
            )}
            <h2 className="leading-snug text-slate-500">
                <Plus className="inline  h-4" />
                <span> Add sub-task</span>
            </h2>
        </div>
    );
};

export default Subtasks;
