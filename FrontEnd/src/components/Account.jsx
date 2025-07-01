import  style from './LoginUser.module.css'
import { Link } from 'react-router-dom';
import {useState,useEffect} from 'react'
import {Footer,OptionSection} from './HomePage'
function Account()
{
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
            setUserData(JSON.parse(stored));
        }
    }, []);

    function handleSubmit(e) {
    e.preventDefault();


    fetch('https://foodprep-vhkl.onrender.com/Login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    })
    .then((res) => res.json())
    .then((response) => {
        alert(response.message);
        if (response.redirect) 
        {
        window.location.href = response.redirect;
        }
        if (response.user) 
        {
            localStorage.setItem('user', JSON.stringify(response.user));
            setUserData(response.user); 
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
                <img src={userData?.image ||'public/FoodPrepImage.jpg'} className={style.image} alt='Food_Prep_Image'></img>

                <div className={style.content}>
                    <div className={style.title}>Profile</div>
                    <div className={style.text}>Hey {userData?.username || 'Null'}  ,Your Details Are : </div>

                    <div className={style.LoginBox2}>
                        <div className={style.heading}>Phone Number :</div>
                        <div className={style.details}>{userData?.phone || 'Null'} </div>
                    </div>

                    <div className={style.LoginBox2}>
                        <div className={style.heading}>Email Id :</div>
                        <div className={style.details}>{userData?.email || 'Null'} </div>
                    </div>

                    <div className={style.LoginBox2}>
                        <div className={style.text2}>Want to edit details ? </div>
                        <Link to='/Register' className={style.text2}>Edit Account</Link>
                    </div>
                </div>
            </div>   
        </div>
        </form>   
        <Footer/>     
        </>


    )
}
export default Account;