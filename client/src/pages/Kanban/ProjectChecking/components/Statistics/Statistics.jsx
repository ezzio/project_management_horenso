import React from 'react';
import "./Statistics.scss";
import {BsBag} from 'react-icons/bs';
import {GrMoney, GrPlan} from 'react-icons/gr';
import {GiProgression} from 'react-icons/gi';

function Statistics(props) {
    const data = [
        {name: 'Total time on Projects', value: '03:39', unit: 'h', icon: <BsBag/>},
        {name: 'Earnings', value: '2,409.20', unit: '$', icon: <GrMoney/>},
        {name: 'Costs', value: '1,260.14', unit: '$', icon: <GrPlan/>},
        {name: 'Productivity', value: '93.57', unit: '%', icon: <GiProgression/>},
]
    return (
        <div className="statistics">
            <div className="parameter-list">
                {data.map((d) => (
                    <div className="parameter-item">
                    <p className="parameter-name">{d.name}</p>
                    <h2 className="parameter-value">{d.value} {d.unit}</h2>
                    <i className='parameter-icon'>{d.icon}</i>
                </div>
                ))}
            </div>
        </div>
    );
}

export default Statistics;