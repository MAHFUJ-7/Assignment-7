import React from 'react'

const myProfile = async (session) => {
    const sessionData = await session;
  return (
    <div>
        <h1>আমার প্রোফাইল</h1>
        <p>আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

        <div>
            {sessionData.myProfile}
            <div>
                <h1>{sessionData.name}</h1>
                <p>{sessionData.email}</p>
            </div>

        </div>
    </div>
  )
}

export default myProfile