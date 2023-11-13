import LoginForm from "../components/LoginForm";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next"
import type { User } from "next-auth"
import UserCard from "@/src/components/UserCard"

export default async function Home() {
  const session = await getServerSession(authOptions)
  console.log("session: ", session)
   
  
  return (
    <>
      {session? (
        <section className="flex flex-col gap-6">
          <UserCard user={session?.user} pagetype={"Home"} />
        </section>
      ) : (
          <LoginForm />
      )}
    </>
  )
}
  
  
  
  
  
  
  
  
  
  
//   if (!session) {
//     return (
//       <div className="flex justify-center items-center h-full">
//         <LoginForm />
//       </div>
//     );
//   } else
//     return (
//     <div className="bg-bgGray min-h-screen ">
//       <div className="block md:hidden flex items-center p-4">
//         <div className="flex grow justify-center mr-6">
//           pippo2
//         </div>
//       </div>
//       <div className="flex">
//         <div className="flex-grow p-4">
//           pippo
//         </div>
//       </div>
//     </div>
//   );
// }


























/*import { signIn, signOut, useSession } from "next-auth/react"
import Navbar from "./components/Navbar"
import { getServerSession } from "next-auth/next"
import { options } from "./api/auth/[...nextauth]/options"
import UserCard from "./components/UserCard"

export  default async function Home() {
    const session  = await getServerSession(options)
    console.log('session: ',session);

    return(
      <>
        {session ? (
          <div>logged</div>
        ): (
          <div>not logged</div>
        )
        }
      </>
    )
}*/
