import './App.css';
import Board from './Board/Board'
import {React,useState,useEffect} from 'react';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(2),
    Width: 130,
  },
  selectEmpty: {
    marginTop: theme.spacing(4),
  },
}));


function App() {
  const classes = useStyles();
  const [grid, setgrid] = useState(Array.from({ length: 9 }, v => Array.from({ length: 9 }, v => '')));
  const [strGrid,setStrGrid]=useState("");
  const [message, setMessage] = useState("")
  const [diff, setdifficulty] = useState(1);
 
  const handleChange=(event)=>{
    const id=event.target.id.split(",");
    const row=id[0];
    const col=id[1];
    const tempGrid=[...grid]
    tempGrid[row][col]=event.target.value;
    setgrid(tempGrid)
    setMessage("");
 }

 const handleDifficulty=(event)=>{
   setdifficulty(event.target.value);
 }



 useEffect(() => {
  handleGenerate();
 },[])


 useEffect(() => {
   let str=""
    for(let i=0;i<9;i++){
      for(let j=0;j<9;j++){
        if(grid[i][j]==='')
         str+="0"
         else{
           str=str+""+grid[i][j];
         }
         
      }
    }
    setStrGrid(str)
 }, [grid])

 useEffect(() => {
  let k=0;
  let tempgrid=[...grid]
   for(let i=0;i<9;i++){
     for(let j=0;j<9;j++){
       if(strGrid.charAt(k)==='0'){
          tempgrid[i][j]=''
       }
       else{
          tempgrid[i][j]=strGrid.charAt(k)
       }
      
      k++;    
     }
    }
   
   setgrid(tempgrid)
}, [strGrid])


const handleClear=()=>{
  setStrGrid("");
  setMessage("");
}
   const handleSolve=(e)=>{
     const sudokuboard={"sudoku":strGrid}
     e.preventDefault();
     axios.post('https://sudoku-application-backend.herokuapp.com/solvemysudoku/', sudokuboard)
     .then(response =>(response['data']==="invalid")?setMessage('Invalid Board'):setStrGrid(response['data'].replaceAll('[','').replaceAll(']','').replaceAll(',','').replaceAll(' ','')));
     
    }
 

   const handleGenerate=(e)=>{
    setMessage("");
    const difficulty={"difficulty":diff}
     axios.post('https://sudoku-application-backend.herokuapp.com/generatesudoku/', difficulty)
      .then(response =>setStrGrid(response['data'].replaceAll('[','').replaceAll(']','').replaceAll(',','').replaceAll(' ','')))

    }

     const handleVerify=()=>{
       setMessage("");
     const sudokuboard={"sudokuboard":strGrid}
     axios.post('https://sudoku-application-backend.herokuapp.com/verifysudoku/', sudokuboard)
     .then(response =>setMessage(response['data']))
    }

  return (
   <>
      <center>
       <Typography className="heading" >SUDOKU</Typography>   
      </center>
      <Grid container className="gridboard">
        <Grid item xs={12} sm={12} lg={12} md={12}>
          <center>
            <Board grid={grid} handleChange={(event)=>handleChange(event)} />
          </center>
        </Grid>
        <Grid item xs={12} sm={12} lg={12} md={12}>
          <center>
            <Typography className="message" style={{color:(message==="Invalid Board !")?"red":"green"}}>{message}</Typography>
          <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Difficulty</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={diff}
          style={{width:"20rem" }}
          onChange={(event)=>handleDifficulty(event)}
        >
         
          <MenuItem value={1} >Easy</MenuItem>
          <MenuItem value={2}>Medium</MenuItem>
          <MenuItem value={3}>Hard</MenuItem>
        </Select>
        
      </FormControl>
      <br></br>
          <Button className="generate" onClick={handleGenerate}>Generate New Sudoku</Button>
          <Button className="solve" onClick={handleSolve}>Solve Sudoku</Button>
          <Button className="Verify" onClick={handleVerify}>Verify Sudoku</Button>
          <Button className="clear" onClick={handleClear}>Clear</Button>
          </center>
        </Grid>
      </Grid>
   </>
  );
}

export default App;