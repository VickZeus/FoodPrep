import  style from './LoginUser.module.css'
import { useState } from 'react';

function RegisterUser()
{
    const arr=['/profilepics/pic1.png', '/profilepics/pic2.png', '/profilepics/pic3.png','/profilepics/pic4.png']
    const [i,changeIndex]=useState(0);
    function ChangeImage()
    {
        changeIndex((i)=>((i+1)%arr.length));
    }

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        const data = {
        username:Username,
        password:Password,
        email:Email,
        phone:Phone,
        image:arr[i]
        };

        fetch('https://foodprep-vhkl.onrender.com/Register', {
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
        <form onSubmit={handleSubmit}>
        <div className={style.LoginContainer}>
            <div className={style.LoginBox}>
                <div className={style.image}>
        
                    <div className={style.imagechoose}>
                        <div className={style.text}>Choose Profile Picture</div>
                        <img src={arr[i]} alt='Profile Picture' id='profilePic' className={style.image2}></img>
                        <button type="button" className={style.imageButton} onClick={ChangeImage}>Next</button>
                    </div>
                </div>


                <div className={style.content}>
                    <div className={style.title}>FoodPrep</div>
                    <div className={style.text}>Click Cart Cook</div>

                    <div className={style.LoginBox2}>
                        <span className="material-icons" style={{fontSize:24,verticalAlign:'middle',color:'black',marginRight:10}}>account_circle</span>
                        <input type='text'  className={style.inputBox} placeholder='Enter Username' value={Username} onChange={(e)=>setUsername(e.target.value)} required/>
                    </div>

                    <div className={style.LoginBox2}>
                        <span className="material-icons" style={{fontSize:24,verticalAlign:'middle',color:'black',marginRight:10}}>lock</span>
                        <input  type='password' className={style.inputBox} placeholder='Enter Password' value={Password} onChange={(e)=>setPassword(e.target.value)} required/>
                    </div>

                    <div className={style.LoginBox2}>
                        <span className="material-icons" style={{fontSize:24,verticalAlign:'middle',color:'black',marginRight:10}}>mail</span>
                        <input type='email' className={style.inputBox} placeholder='Enter Email Address' value={Email} onChange={(e)=>setEmail(e.target.value)} required/>
                    </div>

                    <div className={style.LoginBox2}>
                        <span className="material-icons" style={{fontSize:24,verticalAlign:'middle',color:'black',marginRight:10}}>phone</span>
                        <input type='tel' className={style.inputBox} placeholder='Enter Phone Number' value={Phone} onChange={(e)=>setPhone(e.target.value)} required/>
                    </div>

                    <button className={style.Login}>Register</button>
                </div>
            </div>   
        </div>
        </form>
    )
}

export default RegisterUser;