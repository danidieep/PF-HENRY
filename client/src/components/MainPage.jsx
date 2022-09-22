import React from "react"
import { useEffect } from "react"
import { filterByMedium, deletefilter, getProducts, OrderByPrice, showAllProducts, getArtists, filterByArtist, AddFilters } from "../actions"
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
    if (state.allProducts.length === 0) dispatch(getProducts())
    if (state.artistsList.length === 0) dispatch(getArtists())
    applyFilter()
  }, [state.filters])


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

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('You have been suscribed to the Newslatter')
  }

  const applyFilter = (e) => {

    state.filters.forEach(element => {

      if (element.type === "artist") {
        dispatch(filterByArtist(element.name))
      }


      if (element.type === "medium") {
        dispatch(filterByMedium(element.name))
      }
    });

  }

  const OrderByPriceSelector = (name) => {
    // dispatch(OrderByPrice(type))
    dispatch(OrderByPrice(name))

  }

  const artistSelector = (name) => {
    dispatch(AddFilters({ type: "artist", name }))
    handleReset()
  }

  const deleteFilter_ = (name) => {
    dispatch(deletefilter(name))
  }


  const mediumSelector = (name) => {
    dispatch(AddFilters({ type: "medium", name }))
    // dispatch(filterByMedium(type))
    handleReset()
  }


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header >
          {/* <div className={styles.content2}> */}
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
            <div className={styles.SearchBarHome}>
              <SearchBar handleReset={handleReset} ></SearchBar>
            </div>
            <button className={styles.buttonProfile}>Log in</button>
            <div>
              <button className={styles.buttonProfile}>Register</button>
            </div>

          </div>
        </header>

        {/* CARRUSEL */}
        <carrusel>
          <p className={styles.featured}>Featured</p>
          <div className={styles.carrusel}>
            <div>
              <ul>
                {state.productsFiltered.slice(num1, num2).slice(0, 5).map(element => {
                  return (
                    <li><img src={element.image}></img></li>
                  )
                }
                )
                }
              </ul>
            </div>
          </div>
        </carrusel>




        <p className={styles.featured}>Galery</p>
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
                {
                  state.artistsList.map(element => {

                    return (<option value={element.name}>{element.name}</option>)
                  }
                  )
                }

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
        {state.filters.map(element => {
          return (
            <div>
              <span>{element.name}</span>
              <button onClick={() => deleteFilter_(element)}>X</button>
            </div>
          )
        }
        )
        }

        {/* CARDS  */}
        {

          // si hay productos filtras y no hay mensaje de error 
          state.productsFiltered.length > 0 ?

            <div className={styles.cards}>
              {state.productsFiltered.slice(num1, num2).map(element => (

                <div id="card" ><Cards data={element} key={element.id} /></div>

              )
              )}
            </div> :
            <div><h1>NO HAY OBRAS CON ESOS FILTROS</h1>
            </div>

        }
        {/* PAGINADO */}
        <footer className={styles}>
          <div className={styles.paginado}>

            <button onClick={handlerPrev} className={styles.button31P}>{`<`}</button>
            {
              arrCountOf.map((e, i) => (

                <button onClick={
                  () => {
                    setNum1(((i + 1) * ProductsPorPage) - ProductsPorPage)
                    setNum2((i + 1) * ProductsPorPage)
                    setCurrent(i + 1)
                  }
                } className={styles.button31P} >{i + 1}</button>
              )
              )
            }
            <button className={styles.button31P} onClick={handlerNext} >{`>`}</button>
          </div>
          <div className={styles.footer_info}>
            <p className={styles.newsletter}>
              Wana recive info about our lastest sales? Register to our newsleter to be updated at every time
            </p>
            <div className={styles.formNewsletter}>
              <form className={styles.formNewsletter} onSubmit={(e) => handleSubmit(e)} >
                <input className={styles.formNewsletterBox} type="text"
                  name="suscribe"
                />
              </form>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

