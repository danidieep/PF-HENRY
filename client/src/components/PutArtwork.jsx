import React from "react"
import { useDispatch } from "react-redux"
import { putArtwork } from '../actions/index'
import { useState, useEffect } from 'react'

export default function PutArtwork(){

  const dispatch = useDispatch()

  const [input, setInput] = useState({
    title:'',
    date:'',
    collecting_institution:'',
    image:'',
    creator:'',
    dimensions:'',
    medio:'',
    price:''
   })

   function handleChange(e) {
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
   }  

  
    

    function handleSubmit(e){
      e.preventDefault()
       dispatch(putArtwork(input))
         alert('obra de arte actualizada')
        
         setInput({
          title:'',
          date:'',
          collecting_institution:'',
          image:'',
          creator:'',
          dimensions:'',
          medio:'',
          price:''
      })
      
     }
   
 
    return(
        <div>
          <form onSubmit={e => handleSubmit(e)} >
             {/* -------------------------   TITLE       */}
             <div>
                  <input  type='text' name="title" value={input.title} autoComplete="off" placeholder="Title..." onChange={e => {handleChange(e)}}/>
                    {/* {errors.title && (
                  <p className={s.errors} >{errors.title}</p>
                  )}  */}
             </div>

             {/* -------------------------   DATE       */}
             <div>
                  <input  type='text' name="date" value={input.date} autoComplete="off" placeholder="date..." onChange={e => {handleChange(e)}}/>
                    {/* {errors.date && (
                  <p className={s.errors} >{errors.date}</p>
                  )}  */}
             </div>

             {/* -------------------------   collecting_institution       */}
             <div>
                  <input  type='text' name="collecting_institution" value={input.collecting_institution} autoComplete="off" placeholder="Nombre del VideoJuego..." onChange={e => {handleChange(e)}}/>
                    {/* {errors.collecting_institution && (
                  <p className={s.errors} >{errors.collecting_institution}</p>
                  )}  */}
             </div>

             {/* -------------------------   image       */}
             <div>
                  <input  type='text' name="image" value={input.image} autoComplete="off" placeholder="Nombre del VideoJuego..." onChange={e => {handleChange(e)}}/>
                    {/* {errors.image && (
                  <p className={s.errors} >{errors.image}</p>
                  )}  */}
             </div>
             {/* -------------------------   creator       */}
             <div>
                  <input  type='text' name="creator" value={input.creator} autoComplete="off" placeholder="Title..." onChange={e => {handleChange(e)}}/>
                    {/* {errors.creator && (
                  <p className={s.errors} >{errors.creator}</p>
                  )}  */}
             </div>
             {/* -------------------------   dimensions       */}
             <div>
                  <input  type='text' name="dimensions" value={input.dimensions} autoComplete="off" placeholder="Title..." onChange={e => {handleChange(e)}}/>
                    {/* {errors.dimensions && (
                  <p className={s.errors} >{errors.dimensions}</p>
                  )}  */}
             </div>
             {/* -------------------------   medio       */}
             <div>
                  <input  type='text' name="medio" value={input.medio} autoComplete="off" placeholder="Title..." onChange={e => {handleChange(e)}}/>
                    {/* {errors.medio && (
                  <p className={s.errors} >{errors.medio}</p>
                  )}  */}
             </div>
             {/* -------------------------   price       */}
             <div>
                  <input  type='text' name="price" value={input.price} autoComplete="off" placeholder="Title..." onChange={e => {handleChange(e)}}/>
                    {/* {errors.price && (
                  <p className={s.errors} >{errors.price}</p>
                  )}  */}
             </div>
          </form>

        </div>
    )
}