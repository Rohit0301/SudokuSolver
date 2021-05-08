import { Grid } from '@material-ui/core';
import React from 'react'
import SmallBoard from '../SmallBoard/SmallBoard'
import './Board.css';
export default function Board({grid,handleChange}) {
    const a=[1,2,3,4,5,6,7,8,9];
  
    const showboard=()=>{
      const cellMap=a.map((row)=>{
        return  <SmallBoard grid={grid} row={row} key={row} handleChange={(event)=>handleChange(event)} />
      })
      return <Grid container direction="column" className="rowboard">{cellMap}</Grid>;
    }

    return (
        <>
            {
              showboard()
            }        
            
        </>
    )
}
