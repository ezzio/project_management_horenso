import React from 'react';
import "./Statistics.scss";
import {BsBag} from 'react-icons/bs';
import {GrMoney, GrPlan} from 'react-icons/gr';
import {GiProgression} from 'react-icons/gi';

function Statistics(props) {
    return (
        <div className="statistics">
            <div className="parameter-list">
                <div className="parameter-item">
                    <p className="parameter-name">Total time on Projects</p>
                    <h2 className="parameter-value">03:39 h</h2>
                    <i className='parameter-icon'><BsBag /></i>
                </div>

                <div className="parameter-item">
                    <p className="parameter-name">Earnings</p>
                    <h2 className="parameter-value">$2,409.20</h2>
                    <i className='parameter-icon'><GrMoney /></i>
                </div>

                <div className="parameter-item">
                    <p className="parameter-name">Costs</p>
                    <h2 className="parameter-value">$1,260.14</h2>
                    <i className='parameter-icon'><GrPlan /></i>
                </div>

                <div className="parameter-item">
                    <p className="parameter-name">Productivity</p>
                    <h2 className="parameter-value">93.57%</h2>
                    <i className='parameter-icon'><GiProgression /></i>
                </div>
            </div>
        </div>
    );
}

export default Statistics;