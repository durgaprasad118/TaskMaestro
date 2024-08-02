import { db } from '@/db';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
export async function GET(req: NextRequest) {
    const session = await getServerSession();
    const userEmail = session?.user?.email;
    if (userEmail) {
        try {
            const tasks = await db.user.findUnique({
                where: { email: userEmail },
                include: { tasks: { include: { subTasks: true } } }
            });
            if (tasks)
                return Response.json({
                    message: 'Tasks fetched successfully',
                    tasks: tasks
                });
        } catch (error) {
            console.log(error);
            return Response.json(
                { message: 'Failed to fetch tasks' },
                { status: 500 }
            );
        }
    }

    return Response.json(
        { message: 'Unauthorized or task not found' },
        { status: 404 }
    );
}
