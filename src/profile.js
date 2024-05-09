import { React, useState, useEffect } from "react";
import { useAuth } from "./auth";

function Profile() {
  const auth = useAuth();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <>
      <div>
        {user ? (
          <>
            <h3>Your Informaiton:</h3>
            <div className="info">
              <h2>Username: {user.username}</h2>
              <h2>Password: {user.password}</h2>
              <h2>FullName: {user.fullName}</h2>
              <h2>phone: {user.phone}</h2>
              <h2>Address: {user.address}</h2>
              <h2>Birthday: {user.birth}</h2>
              <h2>Gender: {user.gender}</h2>
            </div>
          </>
        ) : (
          <p>Please login to view your profile.</p>
        )}
      </div>
    </>
  );
}

export default Profile;
