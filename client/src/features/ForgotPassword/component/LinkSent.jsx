import React from 'react'
import './LinkSent.scss'
import { SiMinutemailer } from 'react-icons/si';
import { Link } from 'react-router-dom'


function LinkSent() {

    return (
        <form  className='sent-form'>
            <div className='sent-form__title'>
                <span className='sent-form__title__text'>Welcome!</span>
            </div>
            <SiMinutemailer style={{position: 'absolute', fontSize: 150, top: 100, left: 170}}/>
            <div className='sent-form__content'>
                <span className='sent-form__content__text1'>Recovery link sent</span>
                <span className='sent-form__content__text2'>Please check your email inbox</span>
                <span className='sent-form__content__text3'>or <Link>Sign in</Link> </span>
            </div>
        </form>
    )
}

export default LinkSent
