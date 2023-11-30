import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material'
import Search from './Search.tsx'
import Footer from './components/Footer.tsx'

const routes = createBrowserRouter([
  {
    path: '/',
    element: (<App/>)
  },
  {
    path: '/search',
    element: (<Search/>)
  }
])

const theme = createTheme({
  typography: {
    fontFamily: 'K2D'
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={routes} />
      <Footer/>
    </ThemeProvider>
  </React.StrictMode>,
)
