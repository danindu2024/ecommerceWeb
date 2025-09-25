import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginSignup = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>Login / Sign Up</button>
      )}
      {isAuthenticated && (
        <div>
          <p>Welcome, {user.name}</p>
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
