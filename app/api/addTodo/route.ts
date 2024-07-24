import { db } from '@/db';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const { title, date, labels, subTasks, priority } = await req.json();
    const session = await getServerSession();
    const userEmail = session?.user?.email;
    if (userEmail) {
        const user = await db.user.findFirst({
            where: {
                email: userEmail
            }
        });
        if (user) {
            try {
                const newTask = await db.task.create({
                    data: {
                        title,
                        date,
                        priority,
                        subTasks: subTasks,
                        labels,
                        userId: user.id
                    }
                });
                if (newTask) {
                    return Response.json({
                        message: 'Task added successfully',
                        task: newTask
                    });
                }
            } catch (error) {
                console.error('Error creating task:', error);
                return Response.json(
                    { message: 'Failed to create task' },
                    { status: 500 }
                );
            }
        }
    }

    return Response.json(
        { message: 'Unauthorized or task not found' },
        { status: 404 }
    );
}
