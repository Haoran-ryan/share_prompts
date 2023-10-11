import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_SECRET,
        }),
    ],
    callbacks:{
        async session({ session }){
            const sessionUser = await User.findOne({ email:session.user.email })
            session.user.id = sessionUser._id.toString()
    
            return session;
        },
        async signIn({ profile }){
            try{
                await connectToDB();
    
                // check if an user already exists
                const userExists = await User.findOne({ email:profile.email })
    
                // if not, create a new user & save to DB 
                if(!userExists){
                    await User.create({
                        email:profile.email,
                        username:profile.name.replace(" ","").toLowerCase(), // no spaces, all lowercase
                        image:profile.picture,
                    })
                }
                return true // successful sign in
            }catch(err){
                // unsuccessful sign in
                console.log('Error in signIn callback \n', err)
                return false 
            }
        }  
    }
 
})

export { handler as GET, handler as POST }