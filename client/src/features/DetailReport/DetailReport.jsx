import React from 'react'
import PropTypes from 'prop-types'
import { Divider, PageHeader, Space, Typography } from 'antd'
import { Doughnut } from 'react-chartjs-2';
import 'styles/Color.scss';
import './DetailReport.scss';
import { PieChart } from 'react-minimal-pie-chart';

const DetailReport = props => {
    const dataChart = {
        labels: ['Approved', 'Complated'],
        datasets: [
            {
                label: '# of Votes',
                data: [2, 6],
                backgroundColor: ['hsl(215, 92%, 64%)', '#ccc'],
            }
        ],
    }

    const performers = [
        "https://pickaface.net/gallery/avatar/20120117_083743_291_Demo.png",
        "https://pickaface.net/gallery/avatar/20160110_040511_326_demo.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbzor8mTo6EcEwdpKqApm-ZnwVJhCz9o7FwHNS5OuyPhyT8fBhm5LHEJn8Uo2B2FOxn0I&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Xza7mmYZvJFhDo9ok7xrOpRxedpxoSXJF74aj_OqLC0x52IXaWygdWIljpkixGsrLqM&usqp=CAU"
    ]

    return (
        <div>
            <div className="detail-report">
                <div className="detail-report__header">
                    <div className="detail-report__header__title">
                        <h1>This is title</h1>
                        <p>September 15 - October 30</p>
                    </div>
                    <div className="detail-report__header__performers">
                        <h4>Present Performers</h4>
                        {performers.map((performer) => (
                            <img
                                src={performer}
                                alt="avatar"
                                width='40'
                                height='40'
                                className='performers'
                            />
                        ))}
                    </div>
                </div>
                <div className="detail-report__body">
                    <div className="detail-report__body__chart">
                        <div className="detail-report__body__chart__approve-chart">
                            <h2>Approved</h2>
                            <Doughnut
                                className="chart"
                                data={dataChart}
                                options={{
                                    maintainAspectRatio: false,
                                }}
                            />
                        </div>
                        <div className="detail-report__body__chart__proccess-chart">
                            <h2>Process</h2>
                            <PieChart
                                data={[{ value: 1, key: 1, color: 'hsl(215, 92%, 64%)' }]}
                                reveal={65}
                                lineWidth={20}
                                background="#bfbfbf"
                                lengthAngle={360}
                                rounded
                                animate
                                className="proccess-chart"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

DetailReport.propTypes = {

}

export default DetailReport
