import { NextResponse } from "next/server";
import { changeUsernameInDb } from "@/actions/users/queries";
import { auth } from "@clerk/nextjs/server";
import { changeUsername } from "@/actions/users";

export async function PATCH(req: Request) {
    try {
        const { userId } = await auth(); 
        if (!userId) {
            return NextResponse.json({ status: 401, data: null, message: "Unauthorized" });
        }
        const { username } = await req.json();
        if (!username) {
            return NextResponse.json({ status: 400, data: null, message: "Username is required" });
        }
        const response = await changeUsername(username, userId);
        return NextResponse.json({ status: 200, data: response, message: "Changed successfully" });
    } catch (error) {
        console.error("Error updating username:", error);
        return NextResponse.json({ status: 500, data: null, message: "Internal Server Error" });
    }
}

