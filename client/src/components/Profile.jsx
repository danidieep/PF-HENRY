import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { getUser } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { deleteUser } from "../actions";




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

    {!edit?
    <div>
     <h2>picture</h2>
     <img style={{width:"15rem"}} src="https://pbs.twimg.com/profile_images/1077237220497678336/V07CdmoH_400x400.jpg"></img>
     <h2>Name: {user[0].name} </h2>
     <h2>LastName:  {user[0].lastname}</h2>
     <h2>Email:  {user[0].email}</h2>
     <h2>Date born:  {user[0].dateBorn}</h2>
     <br />
     <button onClick={()=>setEdit(!edit)}>edit</button>
     </div>

     :<div>
        <h2>picture</h2>
     <img style={{width:"15rem"}} src="https://pbs.twimg.com/profile_images/1077237220497678336/V07CdmoH_400x400.jpg"></img>
     <h2>Name: {user[0].name} </h2>
     <input placeholder="New name..."></input>
     <h2>LastName:  {user[0].lastname}</h2>
     <input placeholder="new Lastname..."></input>
     <h2>Email:  {user[0].email}</h2>
     <input placeholder="new email..."></input>
     <h2>Date born:  {user[0].dateBorn}</h2>
     <input placeholder="new date born..."></input>
     <br />
     <button onClick={()=>setEdit(!edit)}>cancel</button>
     </div>
}
    <br/>
    <button style={{backgroundColor:"red", color:"white"}}
    onClick={()=> delete_User()
    }
    >Delete user</button>
     </div>
     :
     <div>Loading</div>
    }
    </div>
)
}
