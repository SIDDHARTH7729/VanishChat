import { client } from "@/lib/prisma";

export const findUser = async (clerkId: string) => {
    const foundUser = await client.user.findUnique({
        where: {
            clerkId: clerkId
        },
        select: {
            id: true,
            clerkId: true,
            email: true,
            username: true,
            showname: true,
            posts: true,
            likes: true,
            activities: true,
            notifications: true,
            createdAt: true
        }
    });

    return foundUser;
}

export const createUser = async (clerkId: string, email: string, username: string) => {
    const createdUser = await client.user.create({
        data: {
            clerkId,
            email,
            username,
            showname: false
        },
        select: {
            id: true,
            clerkId: true,
            email: true,
            username: true,
            showname: true,
            posts: true,
            likes: true,
            activities: true,
            notifications: true,
            createdAt: true
        }
    });

    return createdUser;
}

export const changeUsernameInDb = async (clerkId: string, username: string) => {
    const updatedUser = await client.user.update({
        where: {
            clerkId: clerkId
        },
        data: {
            username: username
        },
        select: {
            username: true,
        }
    });

    return updatedUser;
}
