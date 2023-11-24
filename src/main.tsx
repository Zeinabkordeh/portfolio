import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './hooks/theme.ts'
import './css/App.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes.tsx'
import { ThemeProvider } from './utils/themeContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode= {theme.config.initialColorMode}/>
      <RouterProvider router={router} />
    </ChakraProvider>
  </ThemeProvider>

  </React.StrictMode>,
)
