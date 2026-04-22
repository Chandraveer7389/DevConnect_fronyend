import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from './utils/requestSlice';

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:7000/user/pending/requests", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Fetch Error:", err.message);
    }
  };

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        `http://localhost:7000/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.error("Review Error:", err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return (
    <div className="flex justify-center my-10">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );

  if (requests.length === 0) return (
    <h1 className="text-center my-20 text-xl font-bold opacity-50">
      No pending requests found.
    </h1>
  );

  return (
    <div className="flex flex-col items-center my-10 gap-4 px-4">
      <h1 className="text-3xl font-bold mb-6">Connection Requests</h1>

      {requests.map((req) => (
        <div key={req._id} className="flex items-center gap-4 bg-base-300 p-5 rounded-2xl w-full max-w-xl shadow-xl border border-base-100">
          <div className="avatar">
            <div className="w-20 rounded-full border-2 border-primary">
              <img 
                src={req.photoUrl || "https://png.pngtree.com/png-vector/20250512/ourmid/pngtree-default-avatar-profile-icon-gray-placeholder-vector-png-image_16213764.png"} 
                alt="user" 
              />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold">{req.firstName + " " + req.lastName}</h2>
            <p className="text-sm opacity-70">{req.age} years old • {req.gender}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {req.skills?.slice(0, 3).map((skill, i) => (
                <span key={i} className="badge badge-outline badge-xs">{skill}</span>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => reviewRequest("rejected", req._id)} 
              className="btn btn-ghost text-error btn-sm font-bold"
            >
              Ignore
            </button>
            <button 
              onClick={() => reviewRequest("accepted", req._id)} 
              className="btn btn-primary btn-sm px-6 font-bold"
            >
              Accept
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Request;