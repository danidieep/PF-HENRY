
import {GET_PRODUCTS, GET_PRODUCT_BY_NAME,GET_PRODUCT_BY_ID} from "./action-types.js"



let products = [
      {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
      {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
      {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
      {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
      {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
      {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
      {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
      {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
      {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
      {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
      {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
      {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
      {id:"1", title:"title1", category:"paint",date:"2001",image:"http://www.marolio.com.ar/sites/default/files/styles/portfolio_3_cols/public/salsa-1.jpg?itok=Ef7rhWWe",price:"1000"},
]


export function getProducts(){

     return{
      type:GET_PRODUCTS, payload:products
     }
}



export const getProductByName = (name)=>{

            
}


export const getProductById = (id)=>{
    
  
}

export const OrderByLessExpensive = ()=>{

}

export const OrderByMoreExpensive = ()=>{

}

