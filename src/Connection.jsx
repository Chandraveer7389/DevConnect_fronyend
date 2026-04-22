import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from './utils/connectionSlice';

const Connection = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnection = async () => {
    try {
      const res = await axios.get("http://localhost:7000/user/connections", {
        withCredentials: true,
      });
      // Based on your JSON: res.data.Data is the array
      //console.log("API Response:", res.data);
      dispatch(addConnection(res.data.Data));
    } catch (err) {
      console.error("Error fetching connections:", err.message);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connections) return <div className="flex justify-center my-10"><span className="loading loading-spinner loading-lg"></span></div>;

  if (connections.length === 0) return <div className="text-center my-10 text-xl font-semibold">No connections found yet. Start swiping!</div>;

  return (
    <div className="flex flex-col items-center my-10 gap-6">
      <h1 className="text-3xl font-bold mb-4">My Connections</h1>
      
      {connections.map((connection) => (
        <div key={connection._id} className="flex items-center gap-4 bg-base-300 p-4 rounded-2xl w-full max-w-lg shadow-lg border border-base-100">
          {/* Avatar */}
          <div className="avatar">
            <div className="w-20 rounded-full border-2 border-primary">
              <img 
                src={connection.photoUrl || "https://png.pngtree.com/png-vector/20250512/ourmid/pngtree-default-avatar-profile-icon-gray-placeholder-vector-png-image_16213764.png"} 
                alt="profile" 
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1">
            <h2 className="text-xl font-bold">{connection.firstName + " " + connection.lastName}</h2>
            <p className="text-sm opacity-70">{connection.age} years old • {connection.gender || "Not specified"}</p>
            
            {/* Skills */}
            <div className="flex flex-wrap gap-1 mt-2">
              {connection.skills?.map((skill, index) => (
                <span key={index} className="badge badge-outline badge-sm">{skill}</span>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button className="btn btn-primary btn-sm">Message</button>
        </div>
      ))}
    </div>
  );
};

export default Connection;