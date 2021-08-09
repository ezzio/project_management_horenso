import React, { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import './Header.scss';


function Header() {

    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click);

    return (
        <div className="header">
            <div className="header__title">
                <p>Our goals</p>
                <button>Add new</button> 
            </div>
            <div className="header__status">
                <p>Time Create</p>
                <div className="icon" onClick = {handleClick}>
                    {click ? <FaTimes /> : <BsChevronDown /> }
                </div>
                
            </div>
        </div>
    )
}

export default Header;

