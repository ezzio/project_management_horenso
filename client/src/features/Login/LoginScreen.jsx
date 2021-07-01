import React from 'react'
import "./LoginScreen.scss"
import LoginForm from './component/LoginForm.jsx';
import MaterialCommunityIconsIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";


function LoginScreen() {
    return (
        <div className='login'>
            <div className='login__form'>
                <LoginForm />
            </div>
            <button className='help-btn' 
                    style={{
                        height: 60,
                        width: 60,
                        marginLeft: 13,
                        marginTop: 325  
                    }}>
                <MaterialCommunityIconsIcon
                    name="comment-question"
                    style={{
                        color: "#fff",
                        fontSize: 24
                    }}
                ></MaterialCommunityIconsIcon>
                <span className='help-btn__text'>Help</span>
            </button>
            <div className='login__signup'>
                <span className='long__signup__text'>Don't have an account?</span>
            </div>
            <button className='signup-btn' 
                    style={{
                        height: 36,
                        width: 100
                     }}>
                <span className='ignup-btn__text'>Sign up</span>                
            </button>
            <div className='login__slogan-row'>
                <div className='login__slogan-row__stack'>
                    <input className='login__slogan-row__stack__text'>This is the slogan</input>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen
