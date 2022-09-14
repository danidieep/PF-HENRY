import  React from "react"
import { useEffect } from "react"
import {getProducts,OrderByMoreExpensive,OrderByLessExpensive} from "../actions"
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
    dispatch(getProducts())
   
    },[])




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
   

   

  
   

   const restSelector = (tipo)=>{

    if(tipo==="OrderByMoreExpensive"){dispatch(OrderByMoreExpensive())}
    if(tipo==="OrderByLessExpensive"){dispatch(OrderByLessExpensive())}
   }

 
   
  

    return  (
        <div>
            {state.productsFiltered.length>0?
            <div id="container" className={styles.container}>
            <div className={styles.content}>
            <header>  
              <div className={styles.header}>
                  <button onClick={()=>{
                  dispatch(getProducts())
                  props.state.productDetails = {}
                   }} className={styles.buttonsHeader}>Show all Products!</button>
                  <SearchBar handleReset={handleReset} ></SearchBar>
              </div>     
            </header>
                <div className={styles.filter_box}>
                  <form>
                    <label>By price</label>
                    <select  className={styles.filters} name="" id=""  onChange={(event)=>restSelector(event.target.value)} defaultValue="base">
                      <option disabled={true} value="base">-------</option>
                      <option value="a-z">A-Z</option>
                      <option value="z-a">Z-A</option>
                    </select>
                  </form>
               </div>
                <div className={styles.body}>
                  
                    
                     
                        <div className ={styles.cards}>
                        {state.productsFiltered.slice(num1,num2).map(element=>(
                        <div id="card" ><Cards data={element} key={element.id} /></div>
                        )
                        )}
                        </div>
                      
                     
                   
                </div>
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
                   }className={styles.buttonsNavigation}>{i + 1}</button>
                   
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
                  </div>:

      
                </div>
            :
              <div>No products</div>
            }
        </div>   
    )
}








