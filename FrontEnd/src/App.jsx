import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginUser from './components/LoginUser'
import RegisterUser from './components/RegisterUser'
import {HomePage} from './components/HomePage'
import Account from './components/Account'
import Cart from './components/Cart'
import Support from './components/Support'
import Inventory from './components/Inventory'
import Add from './components/Add'
import Drop from './components/Drop'




function App()
{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/Inventory" element={<Inventory/>}/>
            <Route path="/Login" element={<LoginUser/>}/>
            <Route path="/Register" element={<RegisterUser/>}/>
            <Route path="/HomePage" element={<HomePage/>}/>
            <Route path="/Account" element={<Account/>}/>
            <Route path="/Cart" element={<Cart/>}/>
            <Route path="/Support" element={<Support/>}/>
            <Route path="/Add" element={<Add/>}/>
            <Route path="/Drop" element={<Drop/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default App