import React from 'react';
import { BiCheck, BiPieChart } from 'react-icons/bi';
import { BsPeopleCircle } from 'react-icons/bs';
import "./WorkPlace.scss";


function WorkPlace() {
    return (
        <div className="container">
            <div className="container__working">
                <table>
                    <tbody>
                        <tr>
                            <td><BiPieChart className="icon" /></td>
                            <td> Kanban </td>
                            <td><div className="btn-deadline">Urgent</div></td>
                            <td><div className="btn-deadline">$$$$</div></td>
                            <td><BsPeopleCircle className="icon" /></td>
                        </tr>
                        <tr>
                            <td><BiPieChart className="icon" /></td>
                            <td> Horenso </td>
                            <td><div className="btn-deadline">Long Term</div></td>
                            <td><div className="btn-deadline">$$$</div></td>
                            <td><BsPeopleCircle className="icon" /></td>
                        </tr>
                        <tr>
                            <td><BiPieChart className="icon" /></td>
                            <td> Github </td>
                            <td><div className="btn-deadline">Short Term</div></td>
                            <td><div className="btn-deadline">$$</div></td>
                            <td><BsPeopleCircle className="icon" /></td>
                        </tr>
                        <tr>
                            <td><BiPieChart className="icon" /></td>
                            <td> Login </td>
                            <td><div className="btn-deadline">01.09.2021</div></td>
                            <td><div className="btn-deadline">$</div></td>
                            <td><BsPeopleCircle className="icon" /></td>
                        </tr>
                    </tbody>
                </table>
                
            </div>

            <div className="container__successwork">
                <div className="container__successwork__title">
                    <p> Completed </p> <button> Hide </button> 
                </div>
                <div className="complete-task">
                    <table>
                        <tbody>
                            <tr>
                                <td><BiCheck className="icon" /></td>
                                <td> Database </td>
                                <td><div className="btn-complete">Urgent</div></td>
                                <td><div className="btn-complete">$$$</div></td>
                                <td><BsPeopleCircle className="icon" /></td>
                            </tr>
                            <tr>
                                <td><BiCheck className="icon" /></td>
                                <td> Chat </td>
                                <td><div className="btn-complete">Urgent</div></td>
                                <td><div className="btn-complete">$$</div></td>
                                <td><BsPeopleCircle className="icon" /></td>
                            </tr>
                            <tr>
                                <td><BiCheck className="icon" /></td>
                                <td> VideoCall </td>
                                <td><div className="btn-complete">Urgent</div></td>
                                <td><div className="btn-complete">$</div></td>
                                <td><BsPeopleCircle className="icon" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>
            
        </div>
    )
}

export default WorkPlace
