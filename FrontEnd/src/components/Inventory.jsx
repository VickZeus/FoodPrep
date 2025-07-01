import style from './HomePage.module.css'
import { OptionSection,Footer} from './AdminUI';
import { useState } from 'react';


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

function SearchBar2({ onSearch })
{
    const [query, setQuery] = useState('');
    const handleClick = () => {
        if (query.trim()) {
            onSearch(query.trim());
        }
    };
    return(
        <>
            <div className={style.searchBarSection2}>
                <input className={style.searchBar} placeholder='Enter Item Name' value={query} onChange={(e)=>setQuery(e.target.value)}></input>
                <button className={style.searchButton} onClick={handleClick}>
                    <span className="material-icons">search</span>
                </button>
            </div>
        </>
    )
}

function Main()
{
    const [item, setItem] = useState(null); 
    const fetchItem = async (itemName) => {
        try {
            const res = await fetch(`http://localhost:3000/Inventory?name=${itemName}`);
            const data = await res.json();

            if (res.ok) {
                setItem(data);
            } else {
                setItem(null); // reset if not found
                alert('Item not found!');
            }
        } catch (err) {
            console.error(err);
            alert('Server error!');
        }
    };
    return(
        <div className={style.MainContent}>
            <SearchBar2 onSearch={fetchItem}/>
            <ItemDetails item={item}/>
        </div>
    )
}

function ItemDetails({item})
{
    return(
        <div className={style.itemsection}>
            <div className={style.itembox}>
                <div className={style.itemhead}>Item_Name :</div>
                <div className={style.itemname}>{item ? item.name:'Null'}</div>
            </div>

            <div className={style.itembox}>
                <div className={style.itemhead}>Quantity :</div>
                <input className={style.itemdet} placeholder={item ? item.quantity:0}></input>
            </div>

            <div className={style.itembox}>
                <div className={style.itemhead}>Item Image</div>
                <input className={style.itemdet} placeholder={item ? item.image :'--'}></input>
            </div>

            <div className={style.itembox}>
                <div className={style.itemhead}>Price</div>
                <input className={style.itemdet} placeholder={item ? item.price : 0}></input>
            </div>

            <div className={style.itembox}>
                <div className={style.itemhead}>Dicount</div>
                <input className={style.itemdet} placeholder={item ? item.discount : 0}></input>
            </div>
            <button className={style.button2}>Save Changes</button>

        </div>
    )
}


export default Inventory;