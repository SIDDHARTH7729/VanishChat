import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import { changeUsernameInDb, createUser, findUser } from "./queries";

export const onCurrentUser = async () => {
    try {
        const finding_user = await currentUser();
        if(!finding_user) redirect('/sign-in');
        return finding_user
    } catch (error) {
        throw error
    }
}

export const onBoardUser = async () =>{
    try {
        const finding_curr_user = await onCurrentUser();
        const checking_user_exists_in_DB = await findUser(finding_curr_user.id!)
        if(checking_user_exists_in_DB){
            return {
                status:200,
                data:{
                    email:checking_user_exists_in_DB.email,
                    username:checking_user_exists_in_DB.username,
                    showname:checking_user_exists_in_DB.showname,
                    // likes:checking_user_exists_in_DB.likes,
                    // posts:checking_user_exists_in_DB.posts,
                    // activities:checking_user_exists_in_DB.activities
                }
            }
        }

        const newUser = await createUser(
            finding_curr_user.id,
            finding_curr_user.emailAddresses[0].emailAddress,
            finding_curr_user.username || "Anonymous"
        )

        if (!newUser) {
            return { status: 500, data:null,message:"Error creating user in database" };
        }

        console.log("User created successfully");
        return { status: 200, data: newUser };
    } catch (error) {
        console.log("Eror onBoarding User",error)
        return { status: 500, data:null,message:"Something went wrong" };
    }
}



type User = {
    email: string;
    username: string;
    showname: boolean;
    likes?: any[]; 
    posts?: any[];
    activities?: any[];
    notifications?: any[];
};

type ApiResponse<T = null> = {
    status: number;
    data: T | null;
    message?: string;
};

export const currUserInfo = async ():Promise<ApiResponse<User>> => {
    try {
        const curr_user_info = await currentUser();
        if (!curr_user_info || !curr_user_info.id) {
            return { status: 401, data: null, message: "Unauthorized" };
        }
        const cur_user_details = await findUser(curr_user_info.id);
        if(cur_user_details) return {status:200, data:{
            email:cur_user_details.email,
            username:cur_user_details.username,
            showname:cur_user_details.showname,
            likes:cur_user_details.likes,
            posts:cur_user_details.posts,
            activities:cur_user_details.activities,
            notifications:cur_user_details.notifications
        }}
        return {status:500, data:null,message:"Something went wrong"}
    } catch (error) {
        console.log(error)
        return {status:500,data:null,message:"Something went wrong"}
    }
}

export const changeUsername = async (username:string,clerkId: string) =>{
   try {
    const ans = await changeUsernameInDb(clerkId,username);
    return {status:200,data:ans}
   } catch (error) {
     console.log("Error chaning Username : ",error)
     return {status:500,data:username,messages:"Erroc hanging Username"}
   }
}

// export type User = {
//     email: string;
//     username: string;
//     showname: boolean;
//     likes: any[];
//     posts: any[];
//     activities: any[];
//     notifications: any[];
// };

// type ApiResponse =
//     | { status: 200; data: User }
//     | { status: 401; data: string }
//     | { status: 500; data: never[] };