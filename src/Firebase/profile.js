import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Redirect to login (default page)
        navigate("/", { replace: true });
      }
    });
    return unsubscribe;
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/", { replace: true });
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <h2>Welcome, {user.email}</h2>
      <p>User ID: {user.uid}</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default Profile;