import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Toggle state
  const [isLoginForm, setIsLoginForm] = useState(true);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("2004@gmail.com");
  const [password, setPassword] = useState("@1234");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAuth = async () => {
    try {
      setError(""); // Reset error
      const endpoint = isLoginForm ? "/login" : "/signup";
      
      const payload = isLoginForm 
        ? { email, password } 
        : { firstName, lastName, email, password };

      const res = await axios.post(`http://localhost:7000${endpoint}`, payload, {
        withCredentials: true,
      });

      // Navigate home on success
      dispatch(addUser(res.data?.data || res.data));
      navigate("/");

    } catch (err) {
      // Catch backend error messages
      setError(err.response?.data || err.message);
    }
  };

  return (
    <div className="flex justify-center mt-10 mb-10">
      <div className="card bg-base-300 w-96 shadow-xl border border-base-content/10">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>

          {/* Conditional Signup Fields */}
          {!isLoginForm && (
            <>
              <label className="form-control w-full">
                <div className="label"><span className="label-text">First Name</span></div>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={firstName}
                  placeholder="Enter first name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full mt-2">
                <div className="label"><span className="label-text">Last Name</span></div>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={lastName}
                  placeholder="Enter last name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </>
          )}

          <label className="form-control w-full mt-2">
            <div className="label"><span className="label-text">Email ID</span></div>
            <input
              type="email"
              className="input input-bordered w-full"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="form-control w-full mt-2">
            <div className="label"><span className="label-text">Password</span></div>
            <input
              type="password"
              className="input input-bordered w-full"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && <p className="text-error text-xs mt-2 font-semibold italic">{error}</p>}

          <div className="card-actions justify-center mt-6">
            <button className="btn btn-primary w-full" onClick={handleAuth}>
              {isLoginForm ? "Login" : "Create Account"}
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm">
              {isLoginForm ? "New to DevTinder?" : "Already have an account?"}{" "}
              <span 
                className="text-primary cursor-pointer hover:underline font-semibold"
                onClick={() => setIsLoginForm(!isLoginForm)}
              >
                {isLoginForm ? "Sign up here" : "Login here"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;