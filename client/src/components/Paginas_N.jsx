import React from "react"
import "./Paginas_N_.css"
export default function Paginado({RecetasPorPagina,recipes,paginado}){
    const pageNumber=[]
    for (let i = 1; i < Math.ceil(recipes/RecetasPorPagina); i++) {
        pageNumber.push(i)
    }
    return(
        <nav className="center">
            <ul className="pagination">
                {
                    pageNumber && pageNumber.map(number=>(
                        <li key={number}>
                            <button key={number} onClick={()=>paginado(number)}>{number}</button>
                           
                        </li> 
                    ))
                }
            </ul>
        </nav>
    )
}