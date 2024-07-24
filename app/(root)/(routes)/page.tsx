

import React from 'react'
import { auth } from '@/auth'
// import { SignIn } from '@/components/auth/signin-button'
// import { SignOut } from '@/components/auth/signout-button'
import Link from 'next/link'
// import { useFetchPatients } from '@/hooks/useFetchPatients'
import LoginButton from '@/components/auth/signin-button'

const Homepage = async () => {
  // const session = await auth()

  //console.log("[ROOT_PAGE_SESSION::]", session)
  // const { data, loading, error, refetch } = useFetchPatients()

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  // console.log("ROOT::", data)
  // if (!session?.user) {
  //   return null
  // }


  return (
    <div>
      <nav>
        {/* {session ? <SignOut /> : <SignIn />} */}
        <LoginButton />
      </nav>
      <p>Home Page</p>
      {/* <h1 className="text-3xl font-bold underline">Hello, {session?.user?.username}!</h1> */}
      <Link href={"/patients"}>Patients</Link>
    </div>
  )
}

export default Homepage
