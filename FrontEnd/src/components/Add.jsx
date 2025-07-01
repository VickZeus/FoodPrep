import  style from './LoginUser.module.css'
import { useState } from 'react';
import {OptionSection,Footer} from './AdminUI'

function Add()
{

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState('');
    const [discount, setDiscount] = useState('');
    const [price, setPrice] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        const data = {
        name,
        quantity,
        image,
        discount,
        price
        };

        fetch('http://localhost:3000/Add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then((res) => res.json())
        .then((response) => {
            alert(response.message);
            if (response.redirect) 
            {
            window.location.href = response.redirect;
            }
        })
        .catch((err) => {
            console.error('Error:', err);
        });
    }
    return(
        <>
        <OptionSection/>
        <form onSubmit={handleSubmit}>
        <div className={style.LoginContainer}>
            <div className={style.LoginBox}>

                <div className={style.content2}>
                    <div className={style.title}>ADD ITEM</div>
                    <div className={style.text}>Enter Item Details</div>

                    <div className={style.LoginBox2}>
                        <span className="material-icons" style={{fontSize:24,verticalAlign:'middle',color:'black',marginRight:10}}>loyalty</span>
                        <input type='text'  className={style.inputBox} placeholder='Enter Item Name' value={name} onChange={(e)=>setName(e.target.value)} required/>
                    </div>

                    <div className={style.LoginBox2}>
                        <span className="material-icons" style={{fontSize:24,verticalAlign:'middle',color:'black',marginRight:10}}>production_quantity_limits</span>
                        <input  type='number' className={style.inputBox} placeholder='Enter Item Quantity' value={quantity} onChange={(e)=>setQuantity(e.target.value)} required/>
                    </div>

                    <div className={style.LoginBox2}>
                        <span className="material-icons" style={{fontSize:24,verticalAlign:'middle',color:'black',marginRight:10}}>attach_money</span>
                        <input type='number' className={style.inputBox} placeholder='Enter Item Price' value={price} onChange={(e)=>setPrice(e.target.value)} required/>
                    </div>

                    <div className={style.LoginBox2}>
                        <span className="material-icons" style={{fontSize:24,verticalAlign:'middle',color:'black',marginRight:10}}>broken_image</span>
                        <input type='text' className={style.inputBox} placeholder='Enter Item Image URL' value={image} onChange={(e)=>setImage(e.target.value)} required/>
                    </div>

                    <div className={style.LoginBox2}>
                        <span className="material-icons" style={{fontSize:24,verticalAlign:'middle',color:'black',marginRight:10}}>percent</span>
                        <input type='number' className={style.inputBox} placeholder='Enter Initial Discount' value={discount} onChange={(e)=>setDiscount(e.target.value)} required/>
                    </div>                    

                    <button className={style.Login}>Add Item</button>
                </div>
            </div>   
        </div>
        </form>
        <Footer/>
        </>

    )
}

export default Add;