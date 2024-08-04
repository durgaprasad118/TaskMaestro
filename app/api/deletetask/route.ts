import { db } from '@/db';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';

export async function DELETE(req: NextRequest) {
    const body = await req.json();
    const { taskId } = body;
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
                const deletedTask = await db.task.delete({
                    where: {
                        id: taskId
                    }
                });

                if (deletedTask) {
                    return Response.json({
                        message: 'Task deleted successfully',
                        task: deletedTask
                    });
                }
            } catch (error) {
                console.error('Error deleting task:', error);
                return Response.json(
                    { message: 'Failed to delete task' },
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
