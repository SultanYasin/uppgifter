import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UserProfile from "./UserProfile";
export default function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();
  return (
/*     isAuthenticated && ( */
      <div>
        <UserProfile />
        <button
          className="btn btn-secondary btn-lg btn-block"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          sign out
        </button>
      </div>
    )
/*   ); */
}
