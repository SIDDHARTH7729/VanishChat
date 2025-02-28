import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import { changeUsernameInDb, createUser, findUser } from "./queries";

type User = {
    email: string;
    username: string;
    showname: boolean;
    likes?: Array<{id: string; postId: string}>;
    posts?: Array<{id: string; content: string; isVisible: boolean; createdAt: string}>;
    activities?: Array<{id: string; type: string; postId?: string; createdAt: string}>;
    notifications?: Array<{id: string; message: string; postId?: string; createdAt: string}>;
};

type ApiResponse<T = null> = {
    status: number;
    data: T | null;
    message?: string;
};

export const onCurrentUser = async () => {
    try {
        const user = await currentUser();
        if(!user || !user.id) {
            redirect('/sign-in');
        }
        return user;
    } catch (error) {
        console.error("Error getting current user:", error);
        redirect('/sign-in');
    }
}

export const onBoardUser = async (): Promise<ApiResponse<User>> => {
    try {
        const currentUserData = await onCurrentUser();
        const existingUser = await findUser(currentUserData.id);
        
        if(existingUser) {
            const userData: User = {
                email: existingUser.email,
                username: existingUser.username,
                showname: existingUser.showname,
                likes: existingUser.likes.map(like => ({
                    id: like.id,
                    postId: like.postId
                })),
                posts: existingUser.posts.map(post => ({
                    id: post.id,
                    content: post.content,
                    isVisible: post.isVisible,
                    createdAt: post.createdAt.toISOString()
                })),
                activities: existingUser.activities.map(activity => ({
                    id: activity.id,
                    type: activity.type,
                    postId: activity.postId || undefined,
                    createdAt: activity.createdAt.toISOString()
                })),
                notifications: existingUser.notifications.map(notification => ({
                    id: notification.id,
                    message: notification.message,
                    postId: notification.postId || undefined,
                    createdAt: notification.createdAt.toISOString()
                }))
            };
            return { status: 200, data: userData };
        }

        const newUser = await createUser(
            currentUserData.id,
            currentUserData.emailAddresses[0].emailAddress,
            currentUserData.username || "Anonymous"
        );

        if (!newUser) {
            return { status: 500, data: null, message: "Error creating user in database" };
        }

        const newUserData: User = {
            email: newUser.email,
            username: newUser.username,
            showname: newUser.showname,
            likes: [],
            posts: [],
            activities: [],
            notifications: []
        };

        return { status: 200, data: newUserData };
    } catch (error) {
        console.error("Error onBoarding User:", error);
        return { status: 500, data: null, message: "Something went wrong" };
    }
}

export const currUserInfo = async (): Promise<ApiResponse<User>> => {
    try {
        const curr_user_info = await currentUser();
        if (!curr_user_info || !curr_user_info.id) {
            return { status: 401, data: null, message: "Unauthorized" };
        }
        const cur_user_details = await findUser(curr_user_info.id);
        if(cur_user_details) {
            const userData: User = {
                email: cur_user_details.email,
                username: cur_user_details.username,
                showname: cur_user_details.showname,
                likes: cur_user_details.likes.map(like => ({
                    id: like.id,
                    postId: like.postId
                })),
                posts: cur_user_details.posts.map(post => ({
                    id: post.id,
                    content: post.content,
                    isVisible: post.isVisible,
                    createdAt: post.createdAt.toISOString()
                })),
                activities: cur_user_details.activities.map(activity => ({
                    id: activity.id,
                    type: activity.type,
                    postId: activity.postId || undefined,
                    createdAt: activity.createdAt.toISOString()
                })),
                notifications: cur_user_details.notifications.map(notification => ({
                    id: notification.id,
                    message: notification.message,
                    postId: notification.postId || undefined,
                    createdAt: notification.createdAt.toISOString()
                }))
            };
            return { status: 200, data: userData };
        }
        return { status: 500, data: null, message: "User not found" };
    } catch (error) {
        console.error("Error getting user info:", error);
        return { status: 500, data: null, message: "Something went wrong" };
    }
}

export const changeUsername = async (username: string, clerkId: string): Promise<ApiResponse<string>> => {
   try {
    const result = await changeUsernameInDb(clerkId, username);
    return { status: 200, data: result.username };
   } catch (error) {
     console.error("Error changing Username:", error);
     return { status: 500, data: null, message: "Error changing Username" };
   }
}