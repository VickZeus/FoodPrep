import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'
import Account from './components/Account'
import Cart from './components/Cart'
import Support from './components/Support'


function App()
{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/Account" element={<Account/>}/>
            <Route path="/Cart" element={<Cart/>}/>
            <Route path="/Support" element={<Support/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default App