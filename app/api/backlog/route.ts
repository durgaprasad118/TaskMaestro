import { db } from '@/db';
import { startOfToday } from 'date-fns';
import { NextResponse } from 'next/server';
export async function PUT() {
    const today = startOfToday();
    try {
        const overdueTasks = await db.task.updateMany({
            where: {
                date: {
                    lt: today
                },
                status: {
                    not: 'Backlog'
                }
            },
            data: {
                status: 'Backlog'
            }
        });

        return NextResponse.json({
            message: `Updated ${overdueTasks.count} tasks to Backlog`
        });
    } catch (error) {
        console.error('Error updating overdue tasks:', error);
        return NextResponse.json(
            { message: 'Failed to update overdue tasks' },
            { status: 500 }
        );
    }
}
