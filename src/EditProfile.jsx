import React, { useState } from 'react';
import UserCard from './UserCards'; // Reusing your previous card component
import axios from 'axios';

const EditProfile = ({ user }) => {
  // 1. Local state for form inputs
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [skills, setSkills] = useState(user.skills.join(", "));
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  
  // 2. Notification state
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  const handleSaveProfile = async () => {
    try {
      setError("");
      const res = await axios.patch(
        "http://localhost:7000/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
          // Convert comma-separated string back to array for Mongoose
          skills: skills.split(",").map((s) => s.trim()),
        },
        { withCredentials: true }
      );

      // Show success notification
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 justify-center items-start p-4">
      
      {/* LEFT SIDE: THE EDIT FORM */}
      <div className="card bg-base-300 w-full max-w-md shadow-xl border border-base-100">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">Edit Profile</h2>
          
          <div className="form-control w-full">
            <label className="label"><span className="label-text">First Name</span></label>
            <input 
              type="text" value={firstName} 
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered w-full" 
            />
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text">Last Name</span></label>
            <input 
              type="text" value={lastName} 
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered w-full" 
            />
          </div>

          <div className="flex gap-4">
            <div className="form-control w-1/2">
              <label className="label"><span className="label-text">Age</span></label>
              <input 
                type="number" value={age} 
                onChange={(e) => setAge(e.target.value)}
                className="input input-bordered w-full" 
              />
            </div>

            <div className="form-control w-1/2">
              <label className="label"><span className="label-text">Gender</span></label>
              <select 
                className="select select-bordered w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option disabled value="">Pick one</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text">Skills (comma separated)</span></label>
            <input 
              type="text" value={skills} 
              onChange={(e) => setSkills(e.target.value)}
              className="input input-bordered w-full" 
              placeholder="React, Node, Python..."
            />
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text">About/Bio</span></label>
            <textarea 
              value={about} 
              onChange={(e) => setAbout(e.target.value)}
              className="textarea textarea-bordered h-24"
            ></textarea>
          </div>

          {error && <p className="text-error text-xs mt-2">{error}</p>}

          <div className="card-actions justify-center mt-6">
            <button className="btn btn-primary w-full" onClick={handleSaveProfile}>
              Save Profile
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: LIVE PREVIEW CARD */}
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-bold mb-4 opacity-50 uppercase tracking-widest">Preview</h3>
        {/* We pass the local state as a 'user' prop so the card updates live as we type */}
        <UserCard user={{ 
          firstName, lastName, age, gender, about, photoUrl,
          skills: skills.split(",").map((s) => s.trim()) 
        }} />
      </div>

      {/* SUCCESS NOTIFICATION (TOAST) */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{firstName} your Update is successfull!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;