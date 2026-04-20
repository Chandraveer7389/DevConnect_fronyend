import React from 'react'

const UserCard = ({ user }) => {
  // Destructuring the data from the prop
  const { firstName, lastName, age, gender, skills, about, photoUrl } = user;

  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-xl border border-base-300">
        <figure className="px-4 pt-4">
          <img
            src={photoUrl || "https://png.pngtree.com/png-vector/20250512/ourmid/pngtree-default-avatar-profile-icon-gray-placeholder-vector-png-image_16213764.png"}
            alt="profile"
            className="rounded-xl h-64 w-full object-cover"
          />
        </figure>
        
        <div className="card-body">
          <h2 className="card-title text-2xl">
            {firstName + " " + lastName}
          </h2>
          
          <div className="flex gap-2 text-sm opacity-70">
            <span>{age} years old</span>
            <span>•</span>
            <span>{gender}</span>
          </div>

          {/* About section - shows default text if about is missing */}
          <p className="mt-2 text-sm line-clamp-3">
            {about || "No bio provided yet. Looking for interesting connections!"}
          </p>

          {/* Skills rendered as Badges */}
          <div className="flex flex-wrap gap-1 mt-3">
            {skills?.map((skill, index) => (
              <div key={index} className="badge badge-secondary badge-outline text-xs">
                {skill}
              </div>
            ))}
          </div>

          {/* Interaction Buttons */}
          <div className="card-actions justify-center mt-6 gap-4">
            <button className="btn btn-error btn-outline w-32 uppercase font-bold">
              Ignore
            </button>
            <button className="btn btn-primary w-32 uppercase font-bold">
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard;