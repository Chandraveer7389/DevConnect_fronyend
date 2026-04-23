import React from 'react'

// Added 'onAction' prop
const UserCard = ({ user, onAction }) => {
  const { firstName, lastName, age, gender, skills, about, photoUrl, _id } = user;

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
          <h2 className="card-title text-2xl">{firstName + " " + lastName}</h2>
          
          <div className="flex gap-2 text-sm opacity-70">
            <span>{age} years old</span>
            <span>•</span>
            <span>{gender}</span>
          </div>

          <p className="mt-2 text-sm line-clamp-3">
            {about || "No bio provided yet. Looking for interesting connections!"}
          </p>

          <div className="flex flex-wrap gap-1 mt-3">
            {skills?.map((skill, index) => (
              <div key={index} className="badge badge-secondary badge-outline text-xs">{skill}</div>
            ))}
          </div>

          <div className="card-actions justify-center mt-6 gap-4">
            {/* Logic: pass status and id back to parent */}
            <button 
              className="btn btn-error btn-outline w-32 uppercase font-bold"
              onClick={() => onAction("ignored", _id)}
            >
              Ignore
            </button>
            <button 
              className="btn btn-primary w-32 uppercase font-bold"
              onClick={() => onAction("interested", _id)}
            >
              Interest
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard;