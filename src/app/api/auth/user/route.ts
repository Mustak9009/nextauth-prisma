import {NextRequest,NextResponse} from 'next/server';
import {getServerSession} from 'next-auth';
import { authOption } from '@/utils/auth';
export const GET = async (req:NextRequest) => { //Way 3 to access session
    const session = await getServerSession(authOption);
    return NextResponse.json({authorized:!!session}); //!!-> help to convert 'Object' into 'boolean' expression
}