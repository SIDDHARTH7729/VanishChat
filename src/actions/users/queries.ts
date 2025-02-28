import { client } from "@/lib/prisma";

export const findUser = async (clerkId: string) => {
    const foundUser = await client.user.findUnique({
        where: {
            clerkId: clerkId
        },
        include:{
            posts : true,
            likes: true,
            activities: true,
            notifications: true     
        }
    })

    return foundUser;
}

export const createUser = async (clerkId: string, email: string,username: string) => {
    const createdUser = client.user.create({
        data: {
            clerkId: clerkId,
            email: email,
            username: username
        },
        select: {
            clerkId: true,
            email: true,
            username: true,
            posts: true,
            likes: true,
            activities: true,
            notifications: true
        }
    })

    return createdUser;
}

export const changeUsernameInDb = async (clerkId: string,username:string,) =>{
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
    })

    return updatedUser
}
