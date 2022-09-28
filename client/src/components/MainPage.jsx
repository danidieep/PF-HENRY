import React from "react"
import { useEffect } from "react"
import { sendEmail, filterByMedium, deletefilter, getProducts, OrderByPrice, showAllProducts, getArtists, filterByArtist, AddFilters } from "../actions"
import Cards from "./Cards"
import SearchBar from "./SearchBar"
import { useState } from "react"
import { Link } from "react-router-dom"
import Message from "./Message"
import Loader from "./Loader"
import styles from "./ModulesCss/MainPage.module.css"
import { useSelector, useDispatch } from "react-redux"
import LogIn from "./LogIn"
import LogOut from "./LogOut"
import { User } from "@auth0/auth0-react"
import AdminPanel from "./AdminPanel"


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

  const handleSubscribe = (e) => {
    e.preventDefault()
    const email = JSON.parse(localStorage.getItem("user"))[0].email
    dispatch(sendEmail(email))
    alert('You have been suscribed to our Newsletter')
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

{JSON.parse(localStorage.getItem("user")).length?
            <div>
              <Link to="/ShopCart">
                <button className={styles.btnCarrito}>
                  <img src="https://i.imgur.com/WsQE0Cn.png" alt="" />
                </button>
              </Link>
            </div>
            :false
}

            <div>
              <h1 className={styles.logo}>Artket</h1>
            </div>
            <div className={styles.SearchBarHome}>
              <SearchBar handleReset={handleReset} ></SearchBar>
            </div>
            <div>
              <LogIn></LogIn>
              <LogOut></LogOut>
            </div>

          </div>
        </header>
        <Link to="/PostArtwork">
            <button className={styles.SearchBarHome}>crear obra</button>
          </Link>

        {/* CARRUSEL */}

        {state.productsFiltered.length>5?
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
        :false
}
        <p className={styles.featured}>Galery</p>
        {/* FILTROS */}
        <div className={styles.filtersDiv}>
          <button
          onClick={()=>dispatch(showAllProducts()) }
          >Reload artworks</button>
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
        
        <AdminPanel/>

        {/* LIMPIAR FILTROS */}
        {state.filters.map(element => {
          return (
            <div key={1}>
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
            !state.allProducts && !state.filters.length?
              <div className={styles.contenedorLoading}>
                <img className="loading" src="https://i.pinimg.com/originals/2e/b8/d0/2eb8d009f410f30866b6a34a374af797.gif" alt="" />
              </div>
              :state.allProducts && state.filters.length?
              <div><h1>NO HAY OBRAS CON ESOS FILTROS</h1>
              </div>
              :
              false

        }
        {/* PAGINADO */}
        <footer className={styles}>
          <div className={styles.paginado}>

            <button onClick={handlerPrev} className={styles.button31Paginado}>{`<`}</button>
            {
              arrCountOf.map((e, i) => (

                <button onClick={
                  () => {
                    setNum1(((i + 1) * ProductsPorPage) - ProductsPorPage)
                    setNum2((i + 1) * ProductsPorPage)
                    setCurrent(i + 1)
                  }
                } className={styles.button31Paginado} >{i + 1}</button>
              )
              )
            }
            <button className={styles.button31Paginado} onClick={handlerNext} >{`>`}</button>
          </div>
          <div className={styles.footer_info}>

            {JSON.parse(localStorage.getItem("user")).length ?
              <div>
                <p className={styles.newsletter}>
                  Wana recive info about our lastest sales? Register to our newsleter to be updated at every time
                </p>
                <div className={styles.formNewsletter}>
                  <button className={styles.btnSubscribe} onClick={handleSubscribe}>Subscribe to Newsletter</button>
                </div>


              </div>

              : false

            }

          </div>

        </footer>

      </div>
    </div>
  )
}
