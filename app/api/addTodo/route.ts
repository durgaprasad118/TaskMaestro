import { db } from '@/db';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const {
        title,
        date,
        labels,
        subTasks,
        priority
    }: {
        title: string;
        date: Date;
        labels: string[];
        priority: PriorityType;
        subTasks: any;
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
            const newTask = await db.task.create({
                data: {
                    title,
                    date,
                    priority,
                    subTasks,
                    labels,
                    userId: user.id
                }
            });
            if (newTask) {
                return Response.json({ task: newTask });
            }
        }
    }
    return Response.json('not added the task');
}
