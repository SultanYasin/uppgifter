import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
   /*  !isAuthenticated && ( */
      <div>
        <button
          onClick={() => loginWithRedirect()}
          className="btn btn-primary btn-lg btn-block"
        >
          Log in
        </button>
      </div>
   /*  ) */
  );
}
