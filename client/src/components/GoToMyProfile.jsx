import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export default function GoToMyProfile() {
  const { isAuthenticated, user } = useAuth0();
  return isAuthenticated ? (
    <Link to="/Profile">
      <button>My profile</button>
    </Link>
  ) : (
    false
  );
}
