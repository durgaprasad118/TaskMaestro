import { db } from '@/db';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const session = await getServerSession();
    const userEmail = session?.user?.email;

    if (!userEmail) {
        return NextResponse.json(
            { message: 'Unauthorized or task not found' },
            { status: 404 }
        );
    }

    try {
        const userWithTasks = await db.user.findUnique({
            where: { email: userEmail },
            include: { tasks: { include: { subTasks: true } } }
        });

        if (!userWithTasks) {
            return NextResponse.json(
                { message: 'Tasks not found' },
                { status: 404 }
            );
        }
        const initialStructure: KanbanListType[] = [
            { status: 'Backlog', listItems: [] },
            { status: 'Progress', listItems: [] },
            { status: 'Todo', listItems: [] },
            { status: 'Done', listItems: [] }
        ];
        userWithTasks.tasks.forEach((task) => {
            const statusCategory = initialStructure.find(
                (category) => category.status === task.status
            );

            if (statusCategory) {
                statusCategory.listItems.push(task);
            }
        });
        const analyticData = {
            Backlog: [
                initialStructure[0].listItems.length,
                initialStructure[0].listItems.reduce((acc, curr) => {
                    acc += curr?.subTasks.length;
                    return acc;
                }, 0)
            ],
            Progress: [
                initialStructure[1].listItems.length,
                initialStructure[1].listItems.reduce((acc, curr) => {
                    acc += curr?.subTasks.length;
                    return acc;
                }, 0)
            ],
            Todo: [
                initialStructure[2].listItems.length,
                initialStructure[2].listItems.reduce((acc, curr) => {
                    acc += curr?.subTasks.length;
                    return acc;
                }, 0)
            ],
            Done: [
                initialStructure[3].listItems.length,
                initialStructure[3].listItems.reduce((acc, curr) => {
                    acc += curr?.subTasks.length;
                    return acc;
                }, 0)
            ]
        };

        return NextResponse.json({
            message: 'Tasks fetched successfully',
            tasks: initialStructure,
            analytics: analyticData
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: 'Failed to fetch tasks' },
            { status: 500 }
        );
    }
}
