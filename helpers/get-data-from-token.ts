import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { create } from "domain";

export const getDataFromToken = (token:string) => {
    try {
        // const token = request.headers.get('Authorization')?.split(' ')[1];

        console.log("GET_DATA_FROM_TOKEN::", token)

        // const decodedToken:any = jwt.verify(token, process.env.NEXTAUTH_SECRET as string)

        // console.log(decodedToken)
        // const token = request.cookies.get("token")?.value || '';
        const decodedToken: any = jwt.verify(token, process.env.NEXTAUTH_SECRET!);

        console.log("DT::", decodedToken)
        // return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }

}
