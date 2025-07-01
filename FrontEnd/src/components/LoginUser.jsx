import  style from './LoginUser.module.css'
import { Link } from 'react-router-dom';
import {useState} from 'react'
function LoginUser()
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
    e.preventDefault();
    const data = {
    username,
    password,
    };

    fetch('https://foodprep-vhkl.onrender.com/Login', {
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
    if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
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
                <img src='public/FoodPrepImage.jpg' className={style.image} alt='Food_Prep_Image'></img>

                <div className={style.content}>
                    <div className={style.title}>FoodPrep</div>
                    <div className={style.text}>Welcome To FoodPrep</div>

                    <div className={style.LoginBox2}>
                        <span className="material-icons" style={{fontSize:24,verticalAlign:'middle',color:'black',marginRight:10}}>account_circle</span>
                        <input type='text' className={style.inputBox} placeholder='Enter Username' value={username} onChange={(e)=>setUsername(e.target.value)}></input>
                    </div>

                    <div className={style.LoginBox2}>
                        <span className="material-icons" style={{fontSize:24,verticalAlign:'middle',color:'black',marginRight:10}}>lock</span>
                        <input type='password' className={style.inputBox} placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                    </div>

                    <div className={style.LoginBox2}>
                        <div className={style.text2}>Have&apos;nt Registered Yet ?</div>
                        <Link to='/Register' className={style.text2}>Register Now</Link>
                    </div>
                    <button className={style.Login}>Log-In</button>
                </div>
            </div>   
        </div>
        </form>

    )
}
export default LoginUser;