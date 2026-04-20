import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from './utils/feedSlice';
import UserCards from './UserCards';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed); // Ensure this matches appStore key

  const fetchFeed = async () => {
    try {
      // Don't fetch if data already exists
      if (feed) return; 

      const res = await axios.get("http://localhost:7000/user/feed", {
        withCredentials: true,
      });
      
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error("Feed Fetch Error:", err.message);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  // 1. Handle Loading State
  if (!feed) return <div className="flex justify-center my-10"><span className="loading loading-dots loading-lg"></span></div>;

  // 2. Handle Empty Feed (No more users)
  if (feed.length === 0) return (
    <div className="flex justify-center my-10">
      <h1 className="text-xl font-bold italic">No more new people found! Try again later.</h1>
    </div>
  );

  return (
    // Centering the card perfectly in the middle of the screen
    <div className="flex justify-center my-10">
      <div className="w-full max-w-sm">
        <UserCards user={feed[0]} />
      </div>
    </div>
  );
};

export default Feed;