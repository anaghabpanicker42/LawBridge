
import { createRoot } from 'react-dom/client'


import MainRouter from './Routes/MainRouter'
import { BrowserRouter } from 'react-router'



createRoot(document.getElementById('root')).render(
 
    <BrowserRouter>
   <MainRouter/>
   </BrowserRouter>

  
)
