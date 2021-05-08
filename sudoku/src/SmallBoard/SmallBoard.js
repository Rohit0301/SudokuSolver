import { Grid } from '@material-ui/core'
import React from 'react'
import Square from '../Square/Square';
import './SmallBoard.css'
export default function SmallBoard({grid,row,handleChange}) {
    const a=[1,2,3,4,5,6,7,8,9]
    const showcell=()=>{
        const cell=a.map((col)=>{
            return <Square grid={grid} row={row-1} col={col-1} handleChange={(event)=>handleChange(event)} key={`${row-1},${col-1}`}/>
        })
        return cell;
    }

    return (
        <>
            <Grid className="smallboard">
             {
                 showcell()
             }
            </Grid>
            
        </>
    )
}
