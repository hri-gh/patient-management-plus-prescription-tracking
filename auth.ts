import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import dbConnect from "./lib/db-connect"
import AdminModel from "./models/admin.model";
import bcrypt from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            authorize: async (credentials): Promise<any> => {
                await dbConnect()
                try {
                    let user = await AdminModel.findOne({ username: credentials.username })

                    if (!user) {
                        throw new Error('No user found with this Username');
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password as string, user.password);

                    if (isPasswordCorrect) {
                        console.log("[AUTH.TS_USER::]", user)
                        return user;
                    }
                    else {
                        throw new Error('Incorrect password');
                    }
                } catch (error: any) {
                    throw new Error(error);
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

        authorized: async ({ auth }) => {
            // // Logged in users are authenticated, otherwise redirect to login page
            return !!auth
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
})
