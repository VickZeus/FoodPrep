import App from './App'
import { StrictMode } from 'react'
import ReactDom from 'react-dom/client'


ReactDom.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App/>
    </StrictMode>
)