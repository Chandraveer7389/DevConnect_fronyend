import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed, removeUserFromFeed } from './utils/feedSlice'
import UserCard from './UserCards'

const Feed = () => {
  const dispatch = useDispatch()
  const feed = useSelector((store) => store.feed)

  const fetchFeed = async () => {
    try {
      if (feed) return
      const res = await axios.get("http://localhost:7000/user/feed", { withCredentials: true })
      dispatch(addFeed(res.data))
    } catch (err) {
      console.error("Feed Error: " + err.message)
    }
  }

  // Handle the Ignore/Interest click
  const handleRequest = async (status, userId) => {
    try {
      await axios.post(
        `http://localhost:7000/request/send/${status}/${userId}`,
        {}, // Body is empty
        { withCredentials: true }
      );
      
      // Remove that user from Redux so the next one shows up
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Request Error: " + err.message);
    }
  }

  useEffect(() => {
    fetchFeed()
  }, [])

  if (!feed) return (
    <div className="flex justify-center my-10">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  )

  if (feed.length === 0) return (
    <div className="flex justify-center my-10">
      <h1 className="text-xl font-bold italic">No more developers found! Try again later.</h1>
    </div>
  )

  return (
    <div className="flex justify-center my-10">
      {/* Only render the first user in the array */}
      <UserCard user={feed[0]} onAction={handleRequest} />
    </div>
  )
}

export default Feed