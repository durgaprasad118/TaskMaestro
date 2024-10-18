import { db } from '@/db';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';

export async function PUT(req: NextRequest) {
    const {
        title,
        date,
        labels,
        subTasks,
        priority,
        status,
        completed,
        taskId
    }: {
        title: string;
        date: Date;
        labels: string[];
        priority: PriorityType;
        subTasks: TaskProps[];
        status: Status;
        completed:boolean,
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
            try {
                //  Deleting the  existing sub-tasks to avoid the re-cerating the subTasks
                await db.subTask.deleteMany({
                    where: {
                        taskId: taskId
                    }
                });

                const updatedTask = await db.task.update({
                    where: { id: taskId },
                    data: {
                        title: title,
                        date: date,
                        priority: priority,
                       completed:completed, 
                        subTasks: {
                            create: subTasks.map(
                                (task: {
                                    title: string;
                                    completed: boolean;
                                }) => ({
                                    title: task.title,
                                    completed: task.completed
                                })
                            )
                        },
                        status,
                        labels,
                        userId: user.id,
                    }
                });

                if (updatedTask) {
                    return Response.json({
                        task: updatedTask,
                        message: 'Task updated successfully'
                    });
                }
            } catch (error) {
                console.log(error);
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
