import { db } from '@/db';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
export async function POST(req: NextRequest) {
    const {
        title,
        date,
        labels,
        subTasks,
        priority,
        taskId
    }: {
        title: string;
        date: Date;
        labels: string[];
        priority: PriorityType;
        subTasks: any;
        taskId: string;
    } = await req.json();
    const session = await getServerSession();
    const userEmail = session?.user?.email;
    if (userEmail) {
        const user = await db.user.findFirst({
            where: {
                email: userEmail
            }
        });
        if (user) {
            const updatedTask = await db.task.update({
                where: { taskId: taskId, userId: user.id },
                data: {
                    title,
                    date,
                    priority,
                    subTasks,
                    labels,
                    userId: user.id
                }
            });
            if (updatedTask) {
                return Response.json({ task: updatedTask });
            }
        }
    }
    return Response.json('not added the task');
}
