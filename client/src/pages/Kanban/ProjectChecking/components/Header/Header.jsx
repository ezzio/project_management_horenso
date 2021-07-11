import React from 'react';
import "./Header.scss";
import {RiCalendar2Line} from "react-icons/ri";

function Header() {
    return (
        <div id="header">
            <div id="nav">
                <div className="work-info">
                    <h2>Design System</h2>
                    <a href="">Edit</a>
                </div>
            </div>

            <div id="time">
                <div className="total-time">
                    <i><RiCalendar2Line /></i>
                    <h2>Total time</h2>
                </div>
            </div>
        </div>
    );
}

export default Header;