import { db } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const messages = await db.message.findMany();

        if (!messages.length) {
            return NextResponse.json(
                { message: 'No messages found' },
                { status: 404 }
            );
        }

        return NextResponse.json(messages[0]?.content);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Failed to fetch messages' },
            { status: 500 }
        );
    }
}
