import React from 'react';
import './SignupScreen.scss';
import SignupForm from './component/SignupForm.jsx'
import MaterialCommunityIconsIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";

function SignupScreen() {
    return (
        <div className='Signup'>
            <div className='Signup__form'>
                <SignupForm 
                    style={{
                        width: 500,
                        height: 510
                    }}
                ></SignupForm>
            </div>
            <button className='help-btn'
                    style={{
                        height: 36,
                        width: 100,
                        marginLeft: 6
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
            <div className='Signup__already-joined'>
                <span className='Signup__already-joined__text'>Already joined?</span>
                <button className='login-btn'>
                    <span className='login-btn__text'>Login</span>
                </button>
            </div>
        </div>
    )
}

export default SignupScreen
