import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    theme?: 'green' | 'orange' | 'purple' | 'yellow' | string;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
    ({ className, theme, ...args }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'px-2 py-1 rounded-md text-[10px] font-medium w-fit uppercase hover:brightness-95',
                    !theme && 'bg-gray-100 text-gray-500',
                    theme === 'green' && 'text-green-600 bg-green-100',
                    theme === 'orange' && 'text-orange-500 bg-orange-100',
                    theme === 'purple' && 'text-purple-500 bg-purple-100',
                    theme === 'yellow' && 'text-yellow-500 bg-yellow-100',
                    className
                )}
                {...args}
            >
                {args.children}
            </div>
        );
    }
);

Badge.displayName = 'Badge';
