import style from './HomePage.module.css'
import {useNavigate } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useState, useEffect } from 'react';
function OptionSection()
{
    let navigate=useNavigate();
    return(
        <div className={style.titleSection}>
            <div className={style.title}>FoodPrep</div>

            <div className={style.buttonSection}>
                <button className={style.button} onClick={()=>navigate('/HomePage')}>
                    Home
                    <span className="material-icons" style={{fontSize:15,verticalAlign:'middle'}}>home</span>
                </button>
                <button className={style.button} onClick={()=>navigate('/Account')}>
                    Account
                    <span className="material-icons" style={{fontSize:15,verticalAlign:'middle'}}>account_circle</span>
                </button>
                <button className={style.button} onClick={()=>navigate('/Cart')}>
                    Cart
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
    const [items, setItems] = useState([]);

    const fetchItems = async (name = '') => {
        const url = name
            ? `http://localhost:3000/HomePage?name=${name}`
            : `http://localhost:3000/HomePage`; // default random

        try {
            const res = await fetch(url);
            const data = await res.json();

            if (res.ok) setItems(data);
            else setItems([]);
        } catch (err) {
            console.error('Failed to fetch items:', err);
            setItems([]);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    function discountPrice(a,disc)
    {
        return a-a*disc/100;
    }

    return (
        <div className={style.recContainer}>
            <h2 className={style.recTitle}>Shop Now!!</h2>
            <SearchBar onSearch={fetchItems} />
            {items.length === 0 ? (
                <div className={style.recommendation}>No Results Yet !!</div>
            ) : 
            (
            <div className={style.recGrid}>
                {items.map((item, index) => (
                    <div key={index} className={style.Card}>
                        <img
                            src={item.image || '/default.jpg'}
                            alt={item.name}
                            className={style.recImage}
                        />
                        <div className={style.details}>
                            <div className={style.details2}>
                                <div className={style.recName}> Item_Name : {item.name}</div>
                                <div className={style.recName}>Discount: {item.discount}%</div>
                            </div>

                            <div className={style.details2}>
                            <div className={style.recName}>Current Price :₹ {discountPrice(item.price,item.discount)}</div>
                            <div className={style.recName}>MRP : ₹{item.price}</div>
                            </div>

                            <div className={style.details2}>
                            <button className={style.button4}>Add To Cart</button>
                            <button className={style.button4}>Buy Now</button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
            )}
        </div>
    )
}

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleClick = () => {
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <div className={style.searchBarSection}>
            <input
                className={style.searchBar}
                placeholder="Search for an item..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className={style.searchButton} onClick={handleClick}>
                <span className="material-icons">search</span>
            </button>
        </div>
    );
}


function HomePage()
{
    return(
        <>
            <OptionSection/>
            <Recommendation/>
            <Footer/>
        </>
    )
}

export {HomePage,OptionSection,SearchBar,Recommendation,Footer};