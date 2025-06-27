import style from './HomePage.module.css'
import { useNavigate } from 'react-router-dom'

function OptionSection()
{
    let navigate=useNavigate();
    return(
        <div className={style.titleSection}>
            <div className={style.title}>FoodPrep</div>

            <div className={style.buttonSection}>
                <button className={style.button} onClick={()=>navigate('/')}>Home</button>
                <button className={style.button} onClick={()=>navigate('/Account')}>Account</button>
                <button className={style.button} onClick={()=>navigate('/Cart')}>Cart</button>
                <button className={style.button} onClick={()=>navigate('/Support')}>Support</button>
            </div>

            <hr className={style.line}></hr>
        </div>
    )
}


function Recommendation()
{
    return(
        <>
            <div className={style.recommendation}>No Results Yet !!</div>
        </>
    )
}

function SearchBar()
{
    return(
        <div className={style.searchBarSection}>
            <input className={style.searchBar}></input>
            <button className={style.searchButton}>
                <span className="material-icons">search</span>
            </button>
        </div>
    )
}

function HomePage()
{
    return(
        <>
            <OptionSection/>
            <SearchBar/>
            <Recommendation/>
        </>
    )
}

export default HomePage;