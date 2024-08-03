import { db } from '@/db';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';

export async function PUT(req: NextRequest) {
    const { status, id } = await req.json();
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
                const updatedTask = await db.task.update({
                    where: { id: id },
                    data: {
                        status: status
                    }
                });
                if (updatedTask) {
                    return Response.json({
                        message: 'Task added successfully'
                    });
                }
            } catch (error) {
                console.error('Error updating task:', error);
                return Response.json(
                    { message: 'Failed to update task' },
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
