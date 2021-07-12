import React, { useState } from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { BsPeopleCircle } from 'react-icons/bs';
import { MdAdd } from 'react-icons/md';
import "./HeaderChatting.scss"

function Header() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    return (
        <div className = "header">
            <div className = "header__channel">
                <div className="header__channel__image" onclick={handleClick}>
                    <img
                    src="https://scontent-xsp1-2.xx.fbcdn.net/v/t1.6435-9/61439656_2219291788288474_2348156013401604096_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=174925&_nc_ohc=6VoZwyeWRaoAX-tIjOS&_nc_ht=scontent-xsp1-2.xx&oh=5eaff19ed06d90e3ef69298da794ab92&oe=60EE52C4" 
                    alt=""
                    height = "55"
                    width = "55"
                    />
                    <img 
                    src="https://scontent-xsp1-1.xx.fbcdn.net/v/t1.6435-9/40912876_704037819928881_7993023748053663744_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=gD_jsIYn8xIAX__Alp7&_nc_ht=scontent-xsp1-1.xx&oh=07daf86cc38a7fb19b3da76537e762ed&oe=60EE5345" 
                    alt=""
                    height = "55"
                    width = "55"
                    />
                    <img 
                    src="https://scontent-xsp1-2.xx.fbcdn.net/v/t1.18169-9/12033076_1644791465800643_2163255469806378933_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=ad2b24&_nc_ohc=XR2r2_lPPb0AX9fO6IJ&_nc_ht=scontent-xsp1-2.xx&oh=3576c0d6dbbb2bb11c1da0c05be7c65d&oe=60EF0114" 
                    alt=""
                    height = "55"
                    width = "55"
                    />
                </div>
                <div className="header__channel__addchannel">
                    <MdAdd />
                </div>
            </div>
            <div className="header__setting">
                <BsPeopleCircle className="icon" />
                <AiFillSetting className="icon" />
            </div>
        </div>
    )
}

export default Header;
