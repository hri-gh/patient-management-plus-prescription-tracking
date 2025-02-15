// middleware/auth.ts
import { getServerSession } from "next-auth";
import { User } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function authenticate(req: NextRequest) {
    const session = await getServerSession({ req, ...authOptions });
    // const session = await getServerSession(authOptions);
    // console.log("Session::", session)

    const user: User = session?.user;

    if (!session || !user) {
        return { status: 401, success: false, message: 'Unauthorized' };
    }

    return { session, user };
}
