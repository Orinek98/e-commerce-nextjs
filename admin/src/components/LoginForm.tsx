"use client"
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import UserCard from '../components/UserCard'
import { useState } from "react"
import { signIn } from "next-auth/react";

function LoginForm() {

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/api/auth/signin?callbackUrl=/')
    }
  })

  return (
    <div>logged</div>
  )
}
  
export default LoginForm
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
//     e.preventDefault();
//     console.log(username, password)
//     try {
//       const res = await signIn("credentials", {
//         username,
//         password,
//         redirect: true,
//       });

//       if (res.error) {
//         setError("Invalid Credentials");
//         return;
//       }

//     } catch (error) {
//       console.log(error);
//     }
// }


//   return (
//     <div className='flex flex-col gap-3 max-w-[20%] bg-mid-blue p-10 rounded-md shadow-md'>
//       <h1 className='text-xl text-white'>Login</h1>
//         <form>
//             <label className='text-white'>Email</label>
//             <input type='text' onChange={ev => setUsername(ev.target.value)}
//               value={username} id="username"/>
            
//             <label className='text-white'>Password</label>
//             <input type='password' onChange={ev => setPassword(ev.target.value)}
//             value={password} id="password" />

//             <button onClick={handleSubmit} className='btn-primary bg-mid-blue'>Log in</button>
//         </form>
//     </div>
//   )
// }

// export default LoginForm