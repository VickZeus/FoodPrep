import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginUser from './components/LoginUser'
import RegisterUser from './components/RegisterUser'
import {HomePage} from './components/HomePage'
import Account from './components/Account'
import Cart from './components/Cart'
import Support from './components/Support'



function App()
{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginUser/>}/>
            <Route path="/Register" element={<RegisterUser/>}/>
            <Route path="/HomePage" element={<HomePage/>}/>
            <Route path="/Account" element={<Account/>}/>
            <Route path="/Cart" element={<Cart/>}/>
            <Route path="/Support" element={<Support/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default App