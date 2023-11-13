import type { NextAuthOptions } from 'next-auth'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/src/lib/mongodb"
import Google, {GoogleProfile} from "next-auth/providers/google"
import CredentialsProvider from 'next-auth/providers/credentials'



export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers:[
        Google({
          profile(profile: GoogleProfile){
              return{
                ...profile,
                role: profile.role ?? "employee",
                id: profile.sub,
                image: profile.picture,
              }
          }, 
            clientId: process.env.GOOGLE_ID as string, 
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      session({session, user}){
        session.user.role = user.role
        return session
      }
    } 
}