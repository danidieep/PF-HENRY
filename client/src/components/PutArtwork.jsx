import React, { Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import { putArtwork, cleanProductId, getProductById } from '../actions/index'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

function validate(input){
  let errors = {}

if(!input.title){
    errors.title = 'Se requiere un title'
}

if(!input.date){
  errors.date = 'Se requiere una fecha'
}

if(!input.collecting_institution){
  errors.collecting_institution = 'Se requiere una institucion'
}

if(!input.image) {
    errors.image = "Se requiere imagen";
}

if(!input.creator) {
  errors.creator = "Se requiere creator";
}

if(!input.dimensions) {
  errors.dimensions = "Se requiere dimensions";
}

if(!input.medio) {
  errors.medio = "Se requiere medio";
}

if(!input.price) {
  errors.price = "Se requiere price";
}
 
  return errors

}

export default function PutArtwork(){
  const { id } = useParams();

  const dispatch = useDispatch()
const product = useSelector((state) => state.productDetails)

useEffect(() => {
  
   dispatch(getProductById(id))
  dispatch(cleanProductId())
}, [])

const [errors, setErrors] = useState({})

const [input, setInput] = useState({
    id: id,
    title: '',
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
    setErrors(validate({
      ...input,
      [e.target.name] : e.target.value
     }))
   }  

  
    

    function handleSubmit(e){
      e.preventDefault()
      if(Object.keys(errors).length !== 0){
        alert('Debes llenar el Formulario primero')
      
      } else {
        dispatch(putArtwork(input))
         alert('obra de arte actualizada')
      }
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
      product.length ? 
        
        <Fragment>
          
          <form onSubmit={e => handleSubmit(e)} >
            <h1>MODIFICAR OBRA DE ARTE:</h1>
            <br/>
             {/* -------------------------   TITLE       */} 
                  <label>title: </label>
                  <input  type="input" name="title" value={input.title} placeholder='title...' onChange={(e) => {handleChange(e)}} /> 
                  <p>title anterior : {product[0].title}</p>

                    {errors.title && (<p >{errors.title}</p>)}  
              <br/>

           {/* -------------------------   date       */}   
                  <label>año de creacion: </label>
                  <input  type="number" name="date" value={input.date} autoComplete="off" placeholder="date..." onChange={e => {handleChange(e)}}/>
                  <p>año anterior : {product[0].date}</p>

                    {errors.date && (<p>{errors.date}</p>)}  
              <br/>

             {/* -------------------------   collecting_institution       */}
             <div>
                  <label>institucion de ubicacion: </label>
                  <input type="input" name="collecting_institution" value={input.collecting_institution} autoComplete="off" placeholder="institucion..." onChange={e => {handleChange(e)}}/>
                  <p>institucion anterior : {product[0].collecting_institution}</p>

                    {errors.collecting_institution && (<p>{errors.collecting_institution}</p>)}  
             </div>
             <br/>

             {/* -------------------------   image       */}
             <div>
                   <label>image: </label>
                  <input type="input" name="image" value={input.image} autoComplete="off" placeholder="imagen..." onChange={e => {handleChange(e)}}/>
                  <p>image anterior : {product[0].image}</p>

                    {errors.image && (<p>{errors.image}</p>)}  
             </div>
             <br/>

             {/* -------------------------   creator       */}
             <div>
                   <label>creator: </label>
                  <input  type="input" name="creator" value={input.creator} autoComplete="off" placeholder="creator..." onChange={e => {handleChange(e)}}/>
                  <p>creator anterior : {product[0].creator}</p>

                    {errors.creator && (<p>{errors.creator}</p>)}  
             </div>
             <br/>

             {/* -------------------------   dimensions       */}
             <div>
                  <label>dimensions: </label>
                  <input  type="input" name="dimensions" value={input.dimensions} autoComplete="off" placeholder="Title..." onChange={e => {handleChange(e)}}/>
                  <p>dimensions anterior : {product[0].dimensions}</p>

                    {errors.dimensions && (<p>{errors.dimensions}</p>)} 
             </div>
             <br/>

             {/* -------------------------   medio       */}
             <div>
                  <label>medio: </label>
                  <input  type="input" name="medio" value={input.medio} autoComplete="off" placeholder="medio..." onChange={e => {handleChange(e)}}/>
                  <p>medio anterior : {product[0].medio}</p>

                     {errors.medio && (<p>{errors.medio}</p>)}  
             </div>
             <br/>

             {/* -------------------------   price       */}
             <div>
                  <label>price: </label>
                  <input  ttype="input" name="price" value={input.price} autoComplete="off" placeholder="Title..." onChange={e => {handleChange(e)}}/>
                  <p>price anterior : {product[0].price}</p>

                   {errors.price && (<p>{errors.price}</p>
                  )} 
             </div>
             <br/>
             <button  type='submit' onClick={e => handleSubmit(e)} >Modificar</button>

          </form>

 
        </Fragment> : <p>Loading...</p>
    )
}