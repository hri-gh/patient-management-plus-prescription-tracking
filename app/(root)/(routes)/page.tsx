

import React from 'react'
import { auth } from '@/auth'
import { SignIn } from '@/components/auth/signin-button'
import { SignOut } from '@/components/auth/signout-button'
// import { useFetchPatients } from '@/hooks/useFetchPatients'

const Homepage = async () => {
  const session = await auth()

  console.log("[ROOT_PAGE_SESSION::]", session)
  // const { data, loading, error, refetch } = useFetchPatients()

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  // console.log("ROOT::", data)
  if (!session?.user) {
    return null
  }


  return (
    <div>
      <nav>
        {session ? <SignOut /> : <SignIn />}
      </nav>
      <p>Home Page</p>
      <h1 className="text-3xl font-bold underline">Hello, {session?.user?.name}!</h1>
    </div>
  )
}

export default Homepage
