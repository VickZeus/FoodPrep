import style from './HomePage.module.css'
import { OptionSection,Footer} from './AdminUI';
import { useState, useEffect } from 'react';


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

function Drop()
{
    const [item, setItem] = useState({
        name:'---',
        quantity:'0',
        image:'https://tse1.mm.bing.net/th/id/OIP.qISjQuz0VsrKxe81_sA7twHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        price:'0',
        discount:'0'
    }); 
    const fetchItem = async (itemName) => {
        try {
            const res = await fetch(`https://foodprep-vhkl.onrender.com/Inventory?name=${itemName}`);
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
        <>
            <OptionSection/>
            <div className={style.MainContent}>
                <SearchBar2 onSearch={fetchItem}/>
                <ItemDetails item={item}/>
            </div>
            <Footer/>
        </>

    )
}

function ItemDetails({item})
{const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        image: '',
        price: '',
        discount: ''
    });

    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name || '',
                quantity: item.quantity || '',
                image: item.image || '',
                price: item.price || '',
                discount: item.discount || ''
            });
        }
    }, [item]);

    const handleDrop = async () => {
        try {
            const res = await fetch(`http://localhost:3000/Drop/${formData.name}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                alert('Changes saved successfully!');
            } else {
                const error = await res.json();
                alert(`Failed to update: ${error.message}`);
            }
        } catch (err) {
            console.error(err);
            alert('Server error while updating item!');
        }
    };

    return(
        <div className={style.itemsection2}>
            <img src={formData.image || 'https://tse1.mm.bing.net/th/id/OIP.qISjQuz0VsrKxe81_sA7twHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'} className={style.itemimage} name="image"></img>
            
            <div className={style.detailsection}>

            <div className={style.itembox2}>
                <div className={style.itemhead2}>Item_Name :</div>
                <div className={style.itemdet2}>{formData.name}</div>

                <div className={style.itembox3}>
                    <div className={style.itemhead2}>Remaining_Quantity :</div>
                    <div className={style.itemdet2} name="quantity">{formData.quantity}</div>
                </div>
            </div>

            <div className={style.itembox2}>
                <div className={style.itemhead2}>Current_Price : </div>
                <div className={style.itemdet2} name="price">{formData.price}</div>

                <div className={style.itembox3}>
                    <div className={style.itemhead2}>Current_Dicount :</div>
                    <div className={style.itemdet2} name="discount">{formData.discount}</div>
                </div>
            </div>

            <button className={style.button3} onClick={handleDrop}>Drop Item</button>
            </div>
        </div>
    )
}


export default Drop;