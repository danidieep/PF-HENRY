import { useAuth0 } from "@auth0/auth0-react";



export default function Profile(){
    const {user,isLoading} = useAuth0()
    console.log(user)

if(isLoading)return(<div>Loading...</div>)

return (
    <div>
     <h1>My profile</h1>
     <h2>hello {user.name}</h2>
     <img src={user.picture}></img>
     <h3>{user.email}</h3>
    </div>
)
}
