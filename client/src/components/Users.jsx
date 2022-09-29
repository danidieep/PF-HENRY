import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getUSers,
} from "../actions";

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getUSers({ role: user[0].role }));
  }, []);

  const delete_User = (user, ban) => {
    deleteUser(user.value, ban);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  return (
    <div>
      <button
        onClick={() => {
          window.location.href = "/MainPage";
        }}
      >
        Back
      </button>
      {users.map((el) =>
        el.role === false ? (
          <div key={el.id}>
            <h2>{el.name}</h2>
            <h2>{el.lastname}</h2>
            <h5>{el.email}</h5>
            <h5>{el.dateBorn}</h5>
            {el.ban === true ? <h6>Usuario banneado</h6> : <h6>Usuario desbanneado</h6>}
            <button onClick={(e) => delete_User(e.target, el.ban)} value={el.id}>
              {el.ban === true ? 'Desbanear' : 'Banear'}
            </button>
          </div>
        ) : null
      )}
    </div>
  );
}
