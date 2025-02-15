import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import dbConnect from "@/lib/db-connect";
import AdminModel from "@/models/admin.model";
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            id: 'credentials',
            credentials: {
                username: {
                    label: "Email/Username",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            authorize: async (credentials: any): Promise<any> => {
                await dbConnect()
                try {
                    let user = await AdminModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier },
                        ]
                    })

                    if (!user) {
                        throw new Error('No user found with this Username or Email');
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                    if (isPasswordCorrect) {
                        return user;
                    }
                    else {
                        throw new Error('Incorrect password');
                    }
                } catch (err: any) {
                    throw new Error(err);
                }
            },
        }),
    ],

    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token._id = user._id?.toString(); // Convert ObjectId to string
                token.username = user.username;
            }
            return token
        },

        session: async ({ session, token }) => {
            if (token) {

                session.user._id = token._id;
                session.user.username = token.username;
            }
            return session
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/sign-in",
    },
}
