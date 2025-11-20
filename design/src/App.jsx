import './GlobalStyles.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

/*Importando páginas */
import Auth from './pages/auth/Auth'
import Home from './pages/home/Home';

function App() {

return (

  <BrowserRouter>
    <Routes>

      <Route path='/' element={<Auth/>}/>
      <Route path='/home' element={<Home/>}/>

    </Routes>
  </BrowserRouter>

)

}

export default App;