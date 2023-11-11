import { Chip, Paper, Typography } from '@mui/material'
import './App.css'
import nick from "./assets/nichol.png"

function App() {

  return (
    <>
      <a href='cirrus://bouncy'>
        <Paper
        elevation={3}
        sx={{width: 300, height: 350}}
        >
          <img src={nick} style={{marginTop: 25, borderRadius: 10}}/>
          <Typography variant={'h4'} fontFamily={'K2D'} fontWeight={700} color={'#022f40'} sx={{marginBottom:1}}>Bouncy</Typography>
          <Chip label={"v1.0"} color={"primary"}/>
          <br/>
          <Typography variant={'caption'} fontFamily={'K2D'} color={'#022f40'}>have text bounce around your window</Typography>
        </Paper>
      </a>
      </>
    
  )
}

export default App
