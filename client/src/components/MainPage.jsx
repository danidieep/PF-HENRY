import React from "react"
import { useEffect } from "react"
import { deleteMediumFromFilter, addFilterMedium, filterByMedium, deletePriceFromFilter, deleteArtistFromfilter, addFilterArtist, getProducts, OrderByPrice, showAllProducts, getArtists, filterByArtist, addPriceType } from "../actions"
import Cards from "./Cards"
import SearchBar from "./SearchBar"
import { useState } from "react"
import { Link } from "react-router-dom"
import Message from "./Message"
import Loader from "./Loader"
import styles from "./ModulesCss/MainPage.module.css"
import { useSelector, useDispatch } from "react-redux"






let ProductsPorPage = 6

export default function MainPage(props) {

  const state = useSelector(state => state)
  const dispatch = useDispatch()

  let CountOf = Math.ceil(state.productsFiltered.length / ProductsPorPage);
  let arrCountOf = [];
  arrCountOf = state.productsFiltered.slice(0, CountOf)

  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(ProductsPorPage)
  const [current, setCurrent] = useState(1)





  React.useEffect(() => {
    if (state.productsFiltered.length === 0) dispatch(getProducts())
    if (state.artistsList.length === 0) dispatch(getArtists())
  }, [])




  const handlerNext = () => {
    if (current < CountOf) {
      setNum1(num1 + ProductsPorPage)
      setNum2(num2 + ProductsPorPage)
      setCurrent(current + 1)
    }
  }

  const handlerPrev = () => {
    if (current >= 2) {
      setNum1(num1 - ProductsPorPage)
      setNum2(num2 - ProductsPorPage)
      setCurrent(current - 1)
    }
  }

  const handleReset = () => {
    setNum1(0)
    setNum2(ProductsPorPage)
    setCurrent(1)
  }


  const OrderByPriceSelector = (type) => {
    dispatch(OrderByPrice(type))
    dispatch(addPriceType(type))
  }

  const deletePriceFromFilter_ = (type) => {
    dispatch(deletePriceFromFilter())
  }


  const artistSelector = (name) => {
    dispatch(filterByArtist(name))
    dispatch(addFilterArtist(name))
    handleReset()
  }
  const deleteArtistFromFilter_ = (name) => {
    dispatch(deleteArtistFromfilter(name))
  }


  const mediumSelector = (type) => {
    dispatch(filterByMedium(type))
    dispatch(addFilterMedium(type))
    handleReset()
  }

  const deleteMediumFromFilter_ = (name) => {
    dispatch(deleteMediumFromFilter(name))
  }





  return (
    <div className={styles.container}>


      <div className={styles.content}>
        <div className={styles.content2}>
          <div className={styles.header}>
            <div>
              <button className={styles.Products}>About us</button>
            </div>
            <div>
              <button onClick={() => {
                dispatch(getProducts())
                dispatch(showAllProducts())
              }} className={styles.Products}>Show all Products</button>
            </div>
            <div>
              <h1 className={styles.logo}>Artket</h1>
            </div>
            <button className={styles.buttonProfile}>Log in</button>
            <div>
              <button className={styles.buttonProfile}>Register</button>
            </div>
            <div className={styles.SearchBarHome}>
              <SearchBar handleReset={handleReset} ></SearchBar>
            </div>
          </div>

          <p className={styles.featured}>Featured</p>
          {state.productsFiltered.length > 5 ?
            (<div className={styles.carrusel}>
              <div>

                <ul>
                  {state.productsFiltered.slice(num1, num2).slice(0, 5).map(element => {
                    return (
                      <li>
                        <img src={element.image} height='640px' width='640px'></img>
                        <p>{element.title}</p>
                      </li>
                    )
                  }
                  )}
                </ul>
              </div>
            </div>) :
            (<div></div>)
          }

          {/* FILTROS */}
          <div className={styles.filtersDiv}>
            {/* <p className={styles.filter}>Filters</p> */}
            <div className={styles.select}>
              <form>
                <label>By price </label>
                <select className={styles.filters} name="" id="" onChange={(event) => OrderByPriceSelector(event.target.value)} defaultValue="base">
                  <option disabled={true} value="base">-------</option>
                  <option value="OrderByMoreExpensive">More expensive</option>
                  <option value="OrderByLessExpensive">Less expensive</option>
                </select>
              </form>
            </div>

            <div className={styles.select}>
              <form>
                <label>By Artist </label>
                <select className={styles.filters} name="" id="" onChange={(event) => artistSelector(event.target.value)} defaultValue="base">
                  <option disabled={true} value="base">-------</option>
                  {/* {
                      state.artistsList?.map(element => {
                        
                        return( <option value={element.name}>{element.name}</option>)
                      }
                    )
                  } */}

                </select>
              </form>
            </div>

            <div className={styles.select}>
              <form>
                <label>By medium </label>
                <select className={styles.filters} name="" id="" onChange={(event) => mediumSelector(event.target.value)} defaultValue="base">
                  <option disabled={true} value="base">-------</option>
                  {
                    state.mediums.map(element => {

                      return (<option value={element}>{element}</option>)
                    }
                    )
                  }

                </select>
              </form>
            </div>
          </div>

          {/* LIMPIAR FILTROS */}
          <div className={styles.clearFiters}>
            {state.filterArtist.map(element => {
              return (
                <div>
                  <button onClick={() => deleteArtistFromFilter_(element)}>X</button>
                  <span>{element}</span>
                </div>
              )
            })}
            {
              state.orderByPrice.map(element => {
                return (
                  <div>
                    <button onClick={() => deletePriceFromFilter_(element)} >X</button>
                    <span>{element}</span>
                  </div>
                )
              })
            }
            {state.filterMediums.map(element => {
              return (
                <div>
                  <button onClick={() => deleteMediumFromFilter_(element)}>X</button>
                  <span>{element}</span>
                </div>
              )
            })}
          </div>

          {/* CARDS  */}
          <p className={styles.featured}>Galery</p>
          <div className={styles.cards}>

            {state.productsFiltered.slice(num1, num2).map(element => (
              <div id="card" ><Cards data={element} key={element.id} /></div>
            )
            )}
          </div>

          {/* Paginado */}
          <footer className={styles}>
            <div>
              <button onClick={handlerPrev} className={styles.buttonsNavegation}><p className={styles.textInButtonNavegation}>{`<`}</p></button>
              {
                arrCountOf.map((e, i) => (

                  <button onClick={
                    () => {
                      setNum1(((i + 1) * ProductsPorPage) - ProductsPorPage)
                      setNum2((i + 1) * ProductsPorPage)
                      setCurrent(i + 1)
                    }
                  } className={styles.buttonsNavigation} style={i + 1 === current ? { fontSize: "1.3rem" } : { color: "black" }}>{i + 1}</button>

                )
                )


              }
              <button onClick={handlerNext} className={styles.buttonsNavegation}> <p className={styles.textInButtonNavegation}>{`>`}</p></button>
            </div>
            <div className={styles.footer_info}>


            </div>
          </footer>
        </div>:


      </div >
      {/* : false
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
              </div>  
              <div className={styles.tapaHeader}>
              </div>   
            </header>Loading...</div>
            
        </div>    */}
      {/* </div> </div> </div>  */}
    </div >
  )
}








