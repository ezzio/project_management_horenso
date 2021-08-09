import React from 'react';
import { BiCheck, BiPieChart } from 'react-icons/bi';
import { BsPeopleCircle } from 'react-icons/bs';
import "./WorkPlace.scss";


function WorkPlace() {
    return (
        <div className="container">
            <div className="container__working">
                <div className="container__working__task">
                    <div className="title">
                        <BiPieChart className="icon" />
                        <p>Important Fix</p>
                    </div>
                    <div className="content">
                        <div>
                            <p>Urgen</p>
                        </div>

                        <div>
                            <p>$$$$</p>
                            <BsPeopleCircle className="icon" />
                        </div>
                    </div>
                </div>
                <div className="container__working__task">
                    <div className="title">
                        <BiPieChart className="icon" />
                        <p>Important Fix</p>
                    </div>
                    <div className="content">
                        <div>
                            <p>Short term</p>
                        </div>

                        <div>
                            <p>$$$</p>
                            <BsPeopleCircle className="icon" />
                        </div>
                    </div>
                </div>
                <div className="container__working__task">
                    <div className="title">
                        <BiPieChart className="icon" />
                        <p>Important Fix</p>
                    </div>
                    <div className="content">
                        <div>
                            <p>Long Term</p>
                        </div>

                        <div>
                            <p>$$</p>
                            <BsPeopleCircle className="icon" />
                        </div>
                    </div>
                </div>
                <div className="container__working__task">
                    <div className="title">
                        <BiPieChart className="icon" />
                        <p>Start new marketing campaign</p>
                    </div>
                    <div className="content">
                        <div>
                            <p>01.09.2021</p>
                        </div>

                        <div>
                            <p>$$</p>
                            <BsPeopleCircle className="icon" />
                        </div>
                    </div>
                </div>

            </div>

            <div className="container__complete">
                <div className="container__complete__title">
                    <p>Complete</p>
                    <button>Hide</button>
                </div>
                <div className="container__complete__task">
                    <div className="name">
                        <BiCheck className="icon" />
                        <p>Chatting</p>
                    </div>
                    <div className="content">
                        <div>
                            <p>Short term</p>
                        </div>

                        <div>
                            <p>$</p>
                            <BsPeopleCircle className="icon" />
                        </div>

                    </div>
                </div>
                <div className="container__complete__task">
                    <div className="name">
                        <BiCheck className="icon" />
                        <p>Video Call</p>
                    </div>
                    <div className="content">
                        <div>
                            <p>Long term</p>
                        </div>

                        <div>
                            <p>$$$</p>
                            <BsPeopleCircle className="icon" />
                        </div>

                    </div>
                </div>
                <div className="container__complete__task">
                    <div className="name">
                        <BiCheck className="icon" />
                        <p>Horenso</p>
                    </div>
                    <div className="content">
                        <div>
                            <p>23.07.2021</p>
                        </div>

                        <div>
                            <p>$$</p>
                            <BsPeopleCircle className="icon" />
                        </div>

                    </div>
                </div>
            </div>


        </div>
    )
}

export default WorkPlace
