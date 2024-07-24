// middleware/auth.ts
import { getServerSession } from "next-auth";
import { User } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/options';


export async function authenticate(req: Request) {
    const session = await getServerSession({ req, ...authOptions });
    const user: User = session?.user;

    if (!session || !user) {
        return { status: 401, success: false, message: 'Unauthorized' };
    }

    return { session, user };
}
