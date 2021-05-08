import {React} from 'react'
import './Square.css';

export default function Square({grid,row,col,handleChange}) {

//    let fontcolor="red"
//    if(row<3 && col<3)
//     fontcolor="#e1e5ea"
//    else if(row<3 && col<6)
//     fontcolor="#e7d4b5"  
//     else if(row<3 && col<9)
//     fontcolor="#fff9b0"
//     else if(row<6 && col<3)
//     fontcolor="#ff8474"
//    else if(row<6 && col<6)
//     fontcolor="bisque"  
//     else if(row<6 && col<9)
//     fontcolor="#b0efeb"
//     else if(row<9 && col<3)
//     fontcolor="#3edbf0"
//    else if(row<9 && col<6)
//     fontcolor="#ddffbc"  
//     else if(row<9 && col<9)
//     fontcolor="#f8a1d1"
    
   
  
  
    return (
        <>
              <input  
                  id={`${row},${col}`}
                  className="cell" 
                  type="text"
                  maxLength="1"
                  style={{backgroundColor:"white",fontWeight:600,color:"orange"}}
                  value={grid[row][col]===0?0:grid[row][col]}
                  onChange={(event)=>handleChange(event)}
                  />
        </>
    )
}


