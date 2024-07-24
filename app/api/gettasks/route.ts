import { db } from '@/db';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const session = await getServerSession();
    const userEmail = session?.user?.email;
    if (userEmail) {
        const tasks = await db.user.findUnique({
            where: { email: userEmail },
            include: { tasks: true }
        });
        if (tasks) {
            return Response.json(tasks);
        } else {
            return Response.json('no tasks found');
        }
    }
    return Response.json('no tasks found');
}
