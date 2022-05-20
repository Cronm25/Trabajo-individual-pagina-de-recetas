import React from "react"
import "./Paginas_N_.css"
export default function Paginado({RecetasPorPagina,recipes,paginado}){
    const pageNumber=[]
    for (let i = 0; i < Math.ceil(recipes/RecetasPorPagina); i++) {
        pageNumber.push(i+1)
    }
    return(
        <nav className="center">
            <ul className="pagination">
                {
                    pageNumber && pageNumber.map(number=>{
                        <li key={number}>
                            <a onClick={()=>paginado(number)}>{number}</a>
                        </li> 
                    })
                }
            </ul>
        </nav>
    )
}