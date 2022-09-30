// let products = [
//       {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
//       {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
//       {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
//       {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
//       {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
//       {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
//       {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
//       {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
//       {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
//       {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
//       {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
//       {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
//       {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
// ]

// export function getProducts(){

//      return{
//       type:GET_PRODUCTS,
//        payload:products
//      }
// }

export const addProductToCarrito = (payload) =>{

    fetch(`/cart/${payload.artId}`,{
          method: "POST",
          headers:{"Accept": "application/json",
         "Content-Type":"application/json"},            
       body:JSON.stringify(payload.email)
          }
      )


}


export const deleteProductFromCarrito = (payload)=>{

    fetch(`/cart/${payload.artId}`,{
          method: "POST",
          headers:{"Accept": "application/json",
         "Content-Type":"application/json"},            
       body:JSON.stringify(payload.email)
          }
      )


}
