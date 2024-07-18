import { CircleX } from 'lucide-react';
import { Badge } from './Badge';
import { Input } from './input';
interface TagsInputProps {
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

function TagsInput({ tags, setTags }: TagsInputProps) {
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key !== 'Enter') return;
        const value = (e.target as HTMLInputElement).value;
        if (!value.trim()) return;
        setTags((prevTags) => [...prevTags, value]);
        (e.target as HTMLInputElement).value = '';
    }

    function removeTag(index: number) {
        setTags((prevTags) => {
            const newTags = [...prevTags];
            newTags.splice(index, 1);
            return newTags;
        });
    }

    return (
        <div className="flex gap-1 items-center flex-wrap bg-white border border-slate-800 rounded-lg shadow  dark:bg-slate-800 hover:bg-slate-900">
            {tags.map((tag, index) => (
                <div className="flex flex-wrap gap-2 pt-1 p-1">
                    <Badge key={index} theme="purple">
                        {tag}
                        <CircleX
                            className="inline pl-2"
                            onClick={() => removeTag(index)}
                        />
                    </Badge>
                </div>
            ))}
            <Input
                type="text"
                placeholder="add labels"
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}

export { TagsInput };
