import {React,useState} from 'react'
import './Square.css';

export default function Square({grid,row,col,handleChange}) {
 const [color, setcolor] = useState("orange");
    return (
        <>
              <input  
                  id={`${row},${col}`}
                  className="cell" 
                  type="text"
                  maxLength="1"
                  style={{backgroundColor:"white",fontWeight:600,color:color}}
                  value={grid[row][col]===0?0:grid[row][col]}
                  onChange={(event)=>{handleChange(event); setcolor("green");}}
                  />
        </>
    )
}


