import { db } from '@/db';
import { startOfToday } from 'date-fns';
import { NextResponse } from 'next/server';
export async function PUT(req: Request) {
    const today = startOfToday();
    const { id } = await req.json();
    try {
        if (id) {
            const updatedTask = await db.task.update({
                where: {
                    id: id,
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
                message: `Updated task with ID ${id} to Backlog`,
                task: updatedTask
            });
        } else {
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
            const response = NextResponse.json({
                message: `Updated ${overdueTasks.count} tasks to Backlog`
            });

            response.headers.set(
                'Cache-Control',
                'no-store, no-cache, must-revalidate, proxy-revalidate'
            );
            return response;
        }
    } catch (error) {
        console.error('Error updating overdue tasks:', error);
        return NextResponse.json(
            { message: 'Failed to update overdue tasks' },
            { status: 500 }
        );
    }
}
