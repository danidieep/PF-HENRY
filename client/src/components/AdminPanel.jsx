import { Link } from "react-router-dom";

export default function AdminPanel() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      {user.length ? (
        user[0].role ? (
          <div>
            <Link to="/Users">
              <button>Gestionar usuarios</button>
            </Link>
            <Link to="/PostArtwork">
              <button>crear obra</button>
            </Link>
            <Link to="/PostArtist">
              <button>crear artista</button>
            </Link>
          </div>
        ) : null
      ) : null}
    </div>
  );
}
