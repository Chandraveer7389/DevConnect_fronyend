import axios from "axios";
import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("piccolo2004@gmail.com");
  const [password, setPassword] = useState("Piccolo@1234");
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:7000/login",{
        email : email,
        password : password
      },{withCredentials : true})
     
      dispatch(addUser(res.data))
       navigate("/")

    } catch(err){
      setError(err.message)
      console.log("Error in login " + err.message)
    }
    
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="card bg-base-300 w-96 shadow-xl border border-base-content/10">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">Login</h2>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email ID</span>
            </div>
            <input
              type="email"
              className="input input-bordered w-full"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="form-control w-full mt-4">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              className="input input-bordered w-full"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-red-500">{error}</p>
          </label>

          <div className="card-actions justify-center mt-6">
            <button 
              className="btn btn-primary w-full" 
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;