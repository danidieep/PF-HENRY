
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { getUser } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { deleteUser, updateUser, findUserById } from "../actions";
import styles from "./ModulesCss/profileEdit.module.css";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from "sweetalert"
import {FaUserCircle} from "react-icons/fa"
import {BsBagCheck} from "react-icons/bs"
import {GrFavorite} from "react-icons/gr"
import {AiOutlineShoppingCart} from "react-icons/ai"
import {BiUserCircle} from "react-icons/bi"
import {BiShield} from "react-icons/bi"
import {AiOutlineDelete} from "react-icons/ai"

 



export default function ProfileEdit(){

    const data = useAuth0();
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const validatorEmail = (valor) => {
        if (
          /^\w+([\.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es)+$/.test(
            valor
          )
        ) {
          return true;
        } else return false;
      };
      const onlyCharacters = /^[a-zA-Z\s]+$/;
    
    
    
      const user = JSON.parse(localStorage.getItem("user"))

    const [input, setInput] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        id: user[0].id,
        image:''
      });
    
      function handleChange(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
      }








      const Save_User = () => {
        alertaDeGuardar()
      };
    
      
    
      const alertaDeGuardar = (e) => {
        swal({
          title: "Save changes?",
          text: "Are you sure you want to save changes?",
          icon: "info",
          buttons: ["Cancel", "Accept"]
        }).then(respuesta => {
          if (respuesta) {
            
            dispatch(updateUser(input));
            setTimeout(() => {
              dispatch(findUserById(user[0].id));
            }, 200);
    
            setTimeout(() => {
              window.location.href="/Profile";
            }, 300);
           
          }
        })
      }











    
      function handleSubmit(e) {
        e.preventDefault();
            alertaDeGuardar()
        }
      
      const [loading, setLoading] = useState(false)
    
      const uploadImage = async (e) => {
        const files = e.target.files[0]
        const data = new FormData()
    
        data.append('file', files)
        data.append('upload_preset', 'artket')
        data.append("api_key", "194228613445554")
        setLoading(true)
        const res = await axios.post('https://api.cloudinary.com/v1_1/daxy95gra/image/upload',
          data, {
          headers: { "X-Requested-With": "XMLHttpRequest" }
        }
        ).then(response => {
          const imagen = response.data
          const fileURL = imagen
          setInput({ ...input, image: fileURL.secure_url })
    
        }).catch(function (error) {
          console.log(error);
        });
    
      }
    
      function alertWrongEmailFormat() {
        toast.warning(`Wrong email format`, {
          position: "top-center",
          theme: 'dark',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }

      
    return(
        <div className={styles.container}>
              <div className={styles.header}>
                <Link to="/MainPage">
                <h1 className={styles.logoForm}>Arteck</h1>
                </Link>
             </div>

            
             <div className={styles.body}>
                <button className={styles.volver} onClick={()=>window.location.href="/Profile"}>{"<"}</button>

                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className={styles.items}>
                    <body className={styles.items_title}>Name </body>
                    <input
                        className={styles.input}
                        placeholder="New name..."
                        onChange={(e) => handleChange(e)}
                        name="name"
                    ></input>
                  </div>
                  <div className={styles.items}>
                  <body className={styles.items_title}>Lastname</body>
                  <input
                  className={styles.input}
                    placeholder="new Lastname..."
                    onChange={(e) => handleChange(e)}
                    name="lastname"
                  ></input>
                  </div>
                  <div className={styles.items}>
                  <body className={styles.items_title}>Picture</body>
                  <div className={styles.selectorDeImagen}>
                  <input className={styles.selectorDeImagenInput} type='file' name="file" onChange={e => { uploadImage(e) }}/>
                  
                 
                  </div>
                  </div>
                  {/* <div className={styles.items} >
                  <body>Password:</body>
                  <input
                    type="password"
                    placeholder="new password..."
                    onChange={(e) => handleChange(e)}
                    name="password"
                  ></input>
                  </div> */}
                  <br></br>
                  <br></br>
                  <button type="submit" className={styles.button}>Save changes</button>
                </form>
                <br></br>
                </div>
        </div>
    )
}