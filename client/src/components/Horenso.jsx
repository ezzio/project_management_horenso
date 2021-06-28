import React from 'react'
import './Horenso.scss'
import image from '../images/avatar.jpg';

function Horenso() {
    return (
        <div className="container">
            <div className="sidebar">
                <div className="sidebar__title">
                    <p>CHATTING ROOM</p>
                </div>
                <div className="sidebar__content">
                    <div className="sidebar__content__avatar">
                        <img src={image} alt="avatar" />
                    </div>
                    <div className="sidebar__content__name">
                        <p>Jimmy Dang</p>
                    </div>
                    <div className="sidebar__content__role">
                        <p>Lead UX-UI Designer</p>
                        <p>active</p>
                    </div>
                </div>
                <div className="sidebar__status">
                    <div className="sidebar__status__online">
                        <label className="word">Online</label>
                        <label className="online">3</label>
                    </div>
                    <div className="sidebar__status__people">
                        <div className="character">
                            <img src={image} alt="avatar" />
                            <label>Thắng</label>
                            <div className="sidebar__status__people sidebar__status__people--message">2</div>
                        </div>
                        <div className="character">
                            <img src={image} alt="avatar" />
                            <label>Khoa</label>
                            <div className="sidebar__status__people sidebar__status__people--message">1</div>
                        </div>
                        <div className="character">
                            <img src={image} alt="avatar" />
                            <label>Minh</label>
                            <label></label>
                        </div>
                        <div className="character">
                            <img src={image} alt="avatar" />
                            <label>Nhut</label>
                            <label></label>
                        </div>
                        <div className="character">
                            <img src={image} alt="avatar" />
                            <label>Nhut</label>
                            <label></label>
                        </div>
                    </div> 
                </div>
            </div>
            <div className="chatBody">
                <div className="chatBody__textMessages">
                    <form>
                        <input type="text" name="message"/>
                        <input type="submit" vlaue="submit" />
                    </form>
                </div>
            </div>
            <div className="rightSidebar">
                <div className="rightSidebar__info">
                    <div className="rightSidebar__info__avatar">
                        <img src={image} alt="avatar" />
                    </div>
                    <div className="rightSidebar__info__email">
                        <p>pumk@gmail.com</p>
                    </div>
                    <div className="rightSidebar__info__name">
                        <p>Duong Dang Khoa</p>
                    </div>
                </div>
                <div className="rightSidebar__flowChart">
                </div>
            </div>
        </div>
        
    )
} 
export default Horenso
