import style from './HomePage.module.css'
import {useNavigate } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';



function OptionSection()
{
    let navigate=useNavigate();
    return(
        <div className={style.titleSection}>
            <div className={style.title}>FoodPrep</div>

            <div className={style.buttonSection}>
                <button className={style.button} onClick={()=>navigate('/Admin')}>
                    Home
                    <span className="material-icons" style={{fontSize:15,verticalAlign:'middle'}}>home</span>
                </button>
                <button className={style.button} onClick={()=>navigate('/Inventory')}>
                    Inventory
                    <span className="material-icons" style={{fontSize:15,verticalAlign:'middle'}}>account_circle</span>
                </button>
                <button className={style.button} onClick={()=>navigate('/Cart')}>
                    BestSellers
                     <span className="material-icons" style={{fontSize:18,verticalAlign:'middle'}}>shopping_cart</span>
                </button>
                <button className={style.button} onClick={()=>navigate('/Support')}>
                    Support
                    <span className="material-icons" style={{fontSize:18,verticalAlign:'middle'}}>live_help</span>
                </button>
            </div>

            <hr className={style.line}></hr>
        </div>
    )
}

function Footer()
{
    return(
        <div className={style.footer}>
            <hr className={style.line}></hr>
            <div className={style.issue}>Got An Issue ? Let Us Know at :</div>


            <div className={style.HelpSection}>
                <div className={style.container}>
                    <span className="material-icons" style={{fontSize:16,verticalAlign:'middle'}}>mail</span>
                    <a href='mailto:foodprep.management@gmail.com'>
                        foodprep.management@gmail.com
                    </a>
                </div>
                
                <div className={style.container}>
                    <span className="material-icons" style={{fontSize:16,verticalAlign:'middle'}}>call</span>
                    <a href="tel:+917985415814">
                        +91 7985415814
                    </a>
                </div>
            </div>

            <div className={style.issue}>Make Sure To Follow Us At : </div>
            <div className={style.HelpSection}>
                <div className={style.container}>
                    <FontAwesomeIcon icon={faInstagram} style={{fontSize:15,marginRight:2,marginLeft:5,verticalAlign:'middle'}}/>
                    <a href='https://www.instagram.com/vick.zeus/'>@FoodPrep</a>
                </div>

                <div className={style.container}>
                    <FontAwesomeIcon icon={faLinkedin} style={{fontSize:14,marginRight:2,marginLeft:5,verticalAlign:'middle'}}/>
                    <a href='https://www.linkedin.com/in/abhisheksingh160405'>FoodPrep</a>
                </div>
            </div>

            <div className={style.rightsReserved}>
                <div className={style.textc}>Built with ❤️ by Team FoodPrep ✨</div>
                <div className={style.texts}>© 2025 FoodPrep, All rights reserved.</div>
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

function AdminUI()
{
    return(
        <>
            <OptionSection/>
            <SearchBar/>
            <Recommendation/>
            <Footer/>
        </>
    )
}

export {AdminUI,OptionSection,SearchBar,Recommendation,Footer};