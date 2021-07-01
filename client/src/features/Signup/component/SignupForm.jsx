import React from 'react'
import MaterialIconsIcon from "react-native-vector-icons/dist/MaterialIcons";
import EntypoIcon from "react-native-vector-icons/dist/Entypo";

function SignUpForm() {
    return (
        <div className='form'>
            <span className='form__title'>Let's go</span>
            <div className='form__fullname-container'>
                <div className='fullname-textbox'
                    style={{
                        height: 45,
                        width: 400,
                        position: "absolute",
                        left: 1,
                        top: 22,
                        borderWidth: 1,
                        borderColor: "#000000",
                        borderStyle: "solid"
                    }}>
                    <span className='fullname-textbox__text'>John Smith</span>
                    <input className='fullname-textbox__input'></input>
                </div>
                <span className='form__fullname-container__text'>Full Name</span>
                <MaterialIconsIcon
                    name="person"
                    style={{
                        top: 27,
                        left: 0,
                        position: "absolute",
                        color: "rgba(128,128,128,1)",
                        fontSize: 40
                    }}
                ></MaterialIconsIcon>
            </div>
            <div className='form__icon'>
                <EntypoIcon
                name="mail"
                style={{
                    color: "rgba(128,128,128,1)",
                    fontSize: 40,
                    marginTop: 24
                }}
                ></EntypoIcon>
            </div>
            <div className='form__email-container'>
                <div className='email-textbox'
                    style={{
                        height: 45,
                        width: 400,
                        position: "absolute",
                        left: 0,
                        borderWidth: 1,
                        borderColor: "#000000",
                        top: 24,
                        borderStyle: "solid"
                    }}>
                    <span className='email-textbox__text'>example@mail.com</span>
                    <input className='email-textbox__input'></input>    
                </div>
                <span className='form__email-container__text'></span>  
            </div>
            <div className='form__password-container'>
                <div className='password-textbox'
                    style={{
                        height: 45,
                        width: 400,
                        position: "absolute",
                        left: 38,
                        top: 0,
                        borderWidth: 1,
                        borderColor: "#000000",
                        borderStyle: "solid"
                    }}>
                    <span className='password-textbox__text'>*****</span>
                    <input className='password-textbox__input'></input>
                </div>
                <EntypoIcon
                    name="lock"
                    style={{
                    top: 0,
                    left: 0,
                    position: "absolute",
                    color: "rgba(128,128,128,1)",
                    fontSize: 40
                }}
                ></EntypoIcon>   
            </div> 
            <button className='signup-btn'
                style={{
                    height: 45,
                    width: 400,
                    marginTop: 49,
                    marginLeft: 69
            }}>
                <span className='signup-btn__text'></span>
            </button>       
            <span className='form__password-text'></span>
            <span className='signup-github'>or signup with Github</span>
            <span className='form__tos'>
                By clicking the button above, you agree to our 
                <span style={{fontStyle: 'italic'}}>Terms of Service</span> 
                and
                <span style={{fontStyle: 'italic'}}>Privacy Policy</span>
            </span>
        </div>
    )
}

export default SignUpForm
