import  style from './LoginUser.module.css'
import { Link } from 'react-router-dom';
function LoginUser()
{
    return(
        <div className={style.LoginContainer}>
            <div className={style.LoginBox}>
                <img src='public/FoodPrepImage.jpg' className={style.image} alt='Food_Prep_Image'></img>

                <div className={style.content}>
                    <div className={style.title}>FoodPrep</div>
                    <div className={style.text}>Welcome To FoodPrep</div>

                    <div className={style.LoginBox2}>
                        <span className="material-icons" style={{fontSize:24,verticalAlign:'middle',color:'black',marginRight:10}}>account_circle</span>
                        <input className={style.inputBox} placeholder='Enter Username'></input>
                    </div>

                    <div className={style.LoginBox2}>
                        <span className="material-icons" style={{fontSize:24,verticalAlign:'middle',color:'black',marginRight:10}}>lock</span>
                        <input className={style.inputBox} placeholder='Enter Password'></input>
                    </div>

                    <div className={style.LoginBox2}>
                        <div className={style.text2}>Have&apos;nt Registered Yet ?</div>
                        <Link to='/Register' className={style.text2}>Register Now</Link>
                    </div>
                    <button className={style.Login}>Log-In</button>
                </div>
            </div>   
        </div>
    )
}


export default LoginUser;