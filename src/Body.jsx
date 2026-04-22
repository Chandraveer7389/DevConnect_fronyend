import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './utils/userSlice'

const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector((store) => store.user)
  const fetchUser = async () => {
    try{
      const res = await axios.get("http://localhost:7000/profile/view",{withCredentials : true})
      dispatch(addUser(res.data))
      //console.log(res.data)

    }catch (err) {
      navigate("/login")
      console.log("ERROR IN BODY FETCHUSER :" +err.message)
    }

  }

  useEffect(() => {
    if(!userData){
      fetchUser()
    }
  }, [])
  return (
    <div>
        <NavBar />
        <Outlet />
    </div>
  )
}

export default Body