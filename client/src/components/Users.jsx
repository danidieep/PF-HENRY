import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getProductsFromCarritoDB, getUSers } from "../actions";

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getUSers({role: user[0].role}));
  }, []);

  const delete_User = (user) => {
    deleteUser(user.value);
    setTimeout(() => {
      window.location.reload();
    }, 30);
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
            <button onClick={(e) => delete_User(e.target)} value={el.id}>
              Delete user
            </button>
          </div>
        ) : null
      )}
    </div>
  );
}
