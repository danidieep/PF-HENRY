import { BiBorderRadius } from "react-icons/bi"
import { Link } from "react-router-dom"


export default function UserBanned(){
return(
    <div style={{width:"100%",height:"47rem",display:"flex", alignItems:"center", justifyContent:"center"}}>
        <div style={{
            backgroundColor:"white",
            width:"40rem", height:"20rem",
            display:"flex", 
            alignItems:"center", 
            justifyContent:"center",
            borderRadius:"1rem"
            }}>
        <div>
        <h1 style={{color:"red"}}>Your user has been banned</h1>
        <br /><br />
        <Link to="/">
        <h4 style={{color:"black"}}>Click here to return</h4>
        </Link>
        </div>
        
        </div>
        </div>
)
}