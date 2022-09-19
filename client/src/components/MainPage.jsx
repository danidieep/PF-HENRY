import  React from "react"
import { useEffect } from "react"
import {filterByMedium,deletefilter,getProducts,OrderByPrice,showAllProducts,getArtists,filterByArtist, AddFilters} from "../actions"
import Cards from "./Cards"
import SearchBar from "./SearchBar"
import { useState } from "react"
import { Link } from "react-router-dom"
import Message from "./Message"
import Loader from "./Loader"
import styles from "./ModulesCss/MainPage.module.css"
import { useSelector, useDispatch } from "react-redux"






let ProductsPorPage = 6

export default function MainPage(props){

    const state = useSelector(state => state)
    const dispatch = useDispatch()

    let CountOf = Math.ceil(state.productsFiltered.length/ProductsPorPage);
    let  arrCountOf = [];
    arrCountOf=state.productsFiltered.slice(0,CountOf)

    const [num1, setNum1] =  useState(0)
    const [num2, setNum2] =  useState(ProductsPorPage)
    const [current, setCurrent] =  useState(1)

    
   

   
    React.useEffect(()=>{
    if(state.allProducts.length===0)dispatch(getProducts())
    if(state.artistsList.length===0)dispatch(getArtists())
    applyFilter()
    },[state.filters])




   const handlerNext = ()=>{
    if(current<CountOf){
    setNum1(num1 + ProductsPorPage)
    setNum2(num2 + ProductsPorPage)
    setCurrent(current + 1)}

    
   }

  const handlerPrev = ()=>{
    if(current>=2){
    setNum1(num1 - ProductsPorPage)
    setNum2(num2 - ProductsPorPage)
    setCurrent(current - 1)}
   }

   const handleReset = ()=>{
    setNum1(0)
    setNum2(ProductsPorPage)
    setCurrent(1)
   }
   
   
   const applyFilter = ()=>{

    state.filters.forEach(element => {
     
     if(element.type === "artist"){
      dispatch(filterByArtist(element.name))
     }
    
  
     if(element.type === "medium"){
      dispatch(filterByMedium(element.name))
     }
    });
}

  const OrderByPriceSelector = (name)=>{
      // dispatch(OrderByPrice(type))
     dispatch(OrderByPrice(name))
      
    }
   
  

   const artistSelector = (name) => {
    dispatch(AddFilters({type:"artist",name}))
    handleReset()
   }
   
   const deleteFilter_ = (name) => {
    dispatch(deletefilter(name))
   }

 
   const mediumSelector = (name) => {
    dispatch(AddFilters({type:"medium",name}))
    // dispatch(filterByMedium(type))
    
    handleReset()
   }


 
   
  

    return  (
        <div>

            {
              //si hay productos filtras y no hay mensaje de error
            state.productsFiltered.length>0&& !state.notFound.message?
             <div id="container" className={styles.container}>
             <div className={styles.content}>

            <header >  
              <div className={styles.header} >  
                <div>
                  <button onClick={()=>{
                  dispatch(getProducts())
                  dispatch(showAllProducts())
                   }} className={styles.buttonsHeader}>Show all Products!</button>
                 </div> 
                 <div> 
                  <SearchBar handleReset={handleReset} ></SearchBar>
                 </div>  
                 <div>
                  <button>MyProfile</button>
                </div>
               </div>  
              <div className={styles.tapaHeader}>
              </div>   
            </header>

            <carrusel>
              {state.productsFiltered.length>5?
               (<div className={styles.carrusel}>
                <div>
                 <ul>
              {state.productsFiltered.slice(num1,num2).slice(0,5).map(element=>{
                return(
                  <li><img src={element.image}></img></li>
                      )
                    }
                 )
              }
                </ul>
              </div>
            </div>):
            (<div></div>)
            }
            </carrusel>
            
             <body>
               <div className={styles.body}>
                <div className={styles.filter_box}>
                 <div className={styles.filter_box_2} > 
                  <form>
                    <label>By price</label>
                    <select  className={styles.filters} name="" id=""  onChange={(event)=>OrderByPriceSelector(event.target.value)} defaultValue="base">
                      <option disabled={true} value="base">-------</option>
                      <option  value="OrderByMoreExpensive">More expensive</option>
                      <option  value="OrderByLessExpensive">Less expensive</option>
                    </select>
                  </form>
                  <form>
                    <label>By Artist</label>
                    <select  className={styles.filters} name="" id=""  onChange={(event)=>artistSelector(event.target.value)} defaultValue="base">
                      <option disabled={true} value="base">-------</option>
                      {
                      state.artistsList.map(element => {
                        
                        return( <option value={element.name}>{element.name}</option>)
                            }
                          )
                        }
                 
                    </select>
                  </form>
                  <form>
                    <label>By medium</label>
                    <select  className={styles.filters} name="" id=""  onChange={(event)=>mediumSelector(event.target.value)} defaultValue="base">
                      <option disabled={true} value="base">-------</option>
                      {
                      state.mediums.map(element => {
                        
                        return( <option value={element}>{element}</option>)
                      }
                    )
                  }
                 
                    </select>
                  </form>
                  </div>
               </div>
                  {state.filters.map(element => {
                    return (
                      <div>
                      <button onClick={()=> deleteFilter_(element)}>X</button>
                      <span>{element.name}</span>
                      </div>
                            )
                          }
                       )
                    }
                        <div className ={styles.cards}>
                        {state.productsFiltered.slice(num1,num2).map(element=>(
                        <div id="card" ><Cards data={element} key={element.id} /></div>
                        )
                        )}
                        </div>
                    
                     
                      
                     
                   
                  </div>
                </body>

                <footer className={styles}>
                <div>  
                  <button onClick={handlerPrev} className={styles.buttonsNavegation}><p className={styles.textInButtonNavegation}>{`<`}</p></button>
                  {
                  arrCountOf.map((e,i)=> (
                      
                   <button onClick={
                      ()=>{
                          setNum1(((i+1)*ProductsPorPage)-ProductsPorPage)
                          setNum2((i+1)*ProductsPorPage)
                          setCurrent(i+1)
                      }
                   }className={styles.buttonsNavigation} style={i+1===current?{fontSize:"1.3rem"}:{color:"black"}}>{i + 1}</button>
                          )
                        )
                      }   
                   <button  onClick={handlerNext} className={styles.buttonsNavegation}> <p className={styles.textInButtonNavegation}>{`>`}</p></button>
                </div>
                <div className={styles.footer_info}>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. A debitis suscipit corporis ratione blanditiis, quae perferendis sapiente, exercitationem hic rerum unde! Quasi dolorem velit officiis corrupti aut in provident obcaecati!
                  </p>
               
                </div>
                 </footer>
                  </div>
                </div>
                //Si no hay productos ni filtros...
            : state.productsFiltered.length===0 && state.filters.length===0?
              <div>
                <header >  
              <div className={styles.header} >
                
                <div>
                  <button onClick={()=>{
                  dispatch(getProducts())
                  dispatch(showAllProducts())
                   }} className={styles.buttonsHeader}>Show all Products!</button>
                </div> 
                <div> 
                  <SearchBar handleReset={handleReset} ></SearchBar>
                </div>  
                <div>
                  <button>MyProfile</button>
                </div>
              </div>  
              </header>
              <div className={styles.tapaHeader}>
              </div>  
                 <div className={styles.filter_box}>
                 <div className={styles.filter_box_2} > 
                  <form>
                    <label>By price</label>
                    <select  className={styles.filters} name="" id=""  onChange={(event)=>OrderByPriceSelector(event.target.value)} defaultValue="base">
                      <option disabled={true} value="base">-------</option>
                      <option  value="OrderByMoreExpensive">More expensive</option>
                      <option  value="OrderByLessExpensive">Less expensive</option>
                    </select>
                  </form>
                  <form>
                    <label>By Artist</label>
                    <select  className={styles.filters} name="" id=""  onChange={(event)=>artistSelector(event.target.value)} defaultValue="base">
                      <option disabled={true} value="base">-------</option>
                      {
                      state.artistsList.map(element => {
                        
                        return( <option value={element.name}>{element.name}</option>)
                      }
                    )
                  }
                 
                    </select>
                  </form>
                  <form>
                    <label>By medium</label>
                    <select  className={styles.filters} name="" id=""  onChange={(event)=>mediumSelector(event.target.value)} defaultValue="base">
                      <option disabled={true} value="base">-------</option>
                      {
                      state.mediums.map(element => {
                        
                        return( <option value={element}>{element}</option>)
                      }
                    )
                  }
                 
                    </select>
                  </form>
                  {state.filters.map(element => {
                    return (
                      <div>
                      <button onClick={()=> deleteFilter_(element)}>X</button>
                      <span>{element.name}</span>
                      </div>
                    )
                  })}
                   
                  </div>
               </div> 
               <h1>Loading...</h1>
            </div>
            //Si hay un mensaje de no enontrado
            :state.notFound.message?
            <div>
              <header >  
                <div className={styles.header} >
                <div>
                <button onClick={()=>{
                dispatch(getProducts())
                dispatch(showAllProducts())
                 }} className={styles.buttonsHeader}>Show all Products!</button>
              </div> 
              <div> 
                <SearchBar handleReset={handleReset} ></SearchBar>
              </div>  
              <div>
                <button>MyProfile</button>
              </div>
            </div>  
            <div className={styles.tapaHeader}>
            </div>   
          </header>
          <h1>Empty</h1>
          </div>
          //Si no hay obras y hay filtros
            :state.filters.length>0 && state.productsFiltered.length===0?
            <div>
             <header >  
              <div className={styles.header} >
                
                <div>
                  <button onClick={()=>{
                  dispatch(getProducts())
                  dispatch(showAllProducts())
                   }} className={styles.buttonsHeader}>Show all Products!</button>
                </div> 
                <div> 
                  <SearchBar handleReset={handleReset} ></SearchBar>
                </div>  
                <div>
                  <button>MyProfile</button>
                </div>
              </div>  
              <div className={styles.tapaHeader}>
              </div>   
            </header>
            <div className={styles.filter_box}>
              <div className={styles.filter_box_2} > 
                <form>
                    <label>By price</label>
                    <select  className={styles.filters} name="" id=""  onChange={(event)=>OrderByPriceSelector(event.target.value)} defaultValue="base">
                      <option disabled={true} value="base">-------</option>
                      <option  value="OrderByMoreExpensive">More expensive</option>
                      <option  value="OrderByLessExpensive">Less expensive</option>
                    </select>
                  </form>
                  <form>
                    <label>By Artist</label>
                    <select  className={styles.filters} name="" id=""  onChange={(event)=>artistSelector(event.target.value)} defaultValue="base">
                      <option disabled={true} value="base">-------</option>
                      {
                      state.artistsList.map(element => {
                        
                        return( <option value={element.name}>{element.name}</option>)
                      }
                    )
                  }
                 
                    </select>
                  </form>
                  <form>
                    <label>By medium</label>
                    <select  className={styles.filters} name="" id=""  onChange={(event)=>mediumSelector(event.target.value)} defaultValue="base">
                      <option disabled={true} value="base">-------</option>
                      {
                      state.mediums.map(element => {
                        
                        return( <option value={element}>{element}</option>)
                      }
                    )
                  }
                 
                    </select>
                  </form>
                  {state.filters.map(element => {
                    return (
                      <div>
                      <button onClick={()=> deleteFilter_(element)}>X</button>
                      <span>{element.name}</span>
                      </div>
                    )
                  })}
                   
                  </div>
               </div> 
            
            <h1>sorry we dont have artworks with that filters</h1>  
            </div>
            :
            <div></div>
            }
        </div>   
    )
}








