import style from './HomePage.module.css'
import { OptionSection,Footer} from './AdminUI';
import { useState, useEffect } from 'react';


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
    const [item, setItem] = useState({
        name:'---',
        quantity:'0',
        image:'---',
        price:'0',
        discount:'0'
    }); 
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`http://localhost:3000/Inventory/${formData.name}`, {
                method: 'PUT',
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
        <div className={style.itemsection}>
            <div className={style.itembox}>
                <div className={style.itemhead}>Item_Name :</div>
                <div className={style.itemname}>{formData.name}</div>
            </div>

            <div className={style.itembox}>
                <div className={style.itemhead}>Quantity :</div>
                <input className={style.itemdet} name="quantity" value={formData.quantity}  onChange={handleChange}></input>
            </div>

            <div className={style.itembox}>
                <div className={style.itemhead}>Item Image</div>
                <input className={style.itemdet} name="image" value={formData.image} onChange={handleChange}></input>
            </div>

            <div className={style.itembox}>
                <div className={style.itemhead}>Price</div>
                <input className={style.itemdet} name="price" value={formData.price} onChange={handleChange}></input>
            </div>

            <div className={style.itembox}>
                <div className={style.itemhead}>Dicount</div>
                <input className={style.itemdet} name="discount" value={formData.discount} onChange={handleChange}></input>
            </div>
            <button className={style.button2} onClick={handleSave}>Save Changes</button>

        </div>
    )
}


export default Inventory;