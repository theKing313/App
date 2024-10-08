import { verifyToken } from '@/app/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
// import { verifyToken } from '../lib/auth';
// import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
    try {
        const user = verifyToken(req);

        return NextResponse.json({ message: 'This is a protected route', user });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 401 });
    }
}
