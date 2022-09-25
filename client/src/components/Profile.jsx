import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { getUser } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { deleteUser, updateUser, findUserById} from "../actions";




export default function Profile(){

    const data = useAuth0()
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)


    const user = JSON.parse(localStorage.getItem("user"))


      const delete_User = ()=>{
        localStorage.setItem("user",JSON.stringify([]))
        deleteUser(user[0].id)
        data.logout()
      }


      const [input, setInput] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        id:user[0].id
      });
    
      function handleChange(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });

        console.log(e.target.value)
        console.log(input)
      }
    
      function handleSubmit(e) {
        e.preventDefault();
        dispatch(updateUser(input))
        setTimeout(() => {
          dispatch(findUserById(user[0].id))
        }, 200);
       
       setTimeout(() => {
        window.location.reload()
      }, 300);

      }














return (

    <div>
     {user.length?
    
     <div>
    <button onClick={()=>window.history.back()}>Back</button>
     <h1>My profile</h1>
     <br />
     <hr />
     <br />
     <br />
     <img style={{width:"15rem"}} src="https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"></img>
    {!edit?
    <div>
      
      <h2>{user[0].name} {user[0].lastname} </h2>
     <h2>{user[0].email}</h2>
     <br />
     <button onClick={()=>setEdit(!edit)}>edit</button>
     </div>

     :<div>
      

      <form onSubmit={(e)=>handleSubmit(e)} >
        <h2>Name: {user[0].name} </h2>
        <input  placeholder="New name..." onChange={(e)=>handleChange(e)} name="name"></input>
        <h2>LastName:  {user[0].lastname}</h2>
        <input placeholder="new Lastname..." onChange={(e)=>handleChange(e)} name="lastname" ></input>
        <h2>Email:  {user[0].email}</h2>
        <input type="email" placeholder="new email..." onChange={(e)=>handleChange(e)} name="email" ></input>
        <h2>Password:</h2>
        <input type="password" placeholder="new password..." onChange={(e)=>handleChange(e)} name="password" ></input>
        <br></br>
        <br></br>
        <button type="submit">save changes</button>
     </form>
      <br></br>
       <button style={{backgroundColor:"red", color:"white"}}
       onClick={()=> delete_User()
       }
      >Delete user</button>
      <br></br>
      <button onClick={()=>setEdit(!edit)}>cancel</button>
      </div>
}   
    <br/>
   
     </div>
     :
     <div>Loading</div>
    }
    </div>
)
}
