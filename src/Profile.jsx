import React from 'react'
import { useSelector } from 'react-redux'
import EditProfile from './EditProfile'

const Profile = () => {
  const user = useSelector((store) => store.user)

  return (
    <div className="flex justify-center my-10">
      {/* JavaScript logic must be inside curly braces */}
      {user && <EditProfile user={user} />}
    </div>
  )
}

export default Profile