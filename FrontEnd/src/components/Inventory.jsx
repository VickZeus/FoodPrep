import style from './HomePage.module.css'
import {useNavigate } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { OptionSection,Footer} from './AdminUI';

function Inventory()
{
    return(
        <>
            <OptionSection/>
            <Main/>
            <Footer/>
        </>
    )
}

function SearchBar2()
{
    return(
        <>
            <div className={style.searchBarSection2}>
                <input className={style.searchBar} placeholder='Enter Item Name'></input>
                <button className={style.searchButton}>
                    <span className="material-icons">search</span>
                </button>
            </div>
        </>
    )
}

function Main()
{

    return(
        <div className={style.MainContent}>
            <SearchBar2/>
            <ItemDetails/>
        </div>
    )
}

function ItemDetails()
{
    return(
        <div className={style.itemsection}>
            <div className={style.itembox}>
                <div className={style.itemhead}>Item_Name :</div>
                <div className={style.itemname}>Null</div>
            </div>

            <div className={style.itembox}>
                <div className={style.itemhead}>Quantity :</div>
                <input className={style.itemdet} placeholder='Null'></input>
            </div>

            <div className={style.itembox}>
                <div className={style.itemhead}>Item Image</div>
                <input className={style.itemdet} placeholder='Null'></input>
            </div>

            <div className={style.itembox}>
                <div className={style.itemhead}>Price</div>
                <input className={style.itemdet} placeholder='Null'></input>
            </div>

            <div className={style.itembox}>
                <div className={style.itemhead}>Dicount</div>
                <input className={style.itemdet} placeholder='Null'></input>
            </div>
            <button className={style.button2}>Save Changes</button>

        </div>
    )
}


export default Inventory;