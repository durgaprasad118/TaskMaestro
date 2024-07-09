import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface PageContainerProps
    extends React.HTMLAttributes<HTMLDivElement> {}
export const PageContainer = forwardRef<HTMLDivElement, PageContainerProps>(
    ({ className, ...args }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('page-container py-6', className)}
                {...args}
            />
        );
    }
);

PageContainer.displayName = 'PageContainer';
