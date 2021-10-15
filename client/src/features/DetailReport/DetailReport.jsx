import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Divider, PageHeader, Space, Typography } from 'antd'
import { Doughnut } from 'react-chartjs-2';
import 'styles/Color.scss';
import './DetailReport.scss';
import Timeline from 'features/ReportTimeline/Timeline';
import AddNewTimeLine from 'features/ReportTimeline/components/AddNewTimeLine';
import { addTimeLine } from 'features/ReportTimeline/TimelineSlice';
import { useDispatch, useSelector } from 'react-redux';

const DetailReport = props => {
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    const timelines = useSelector(state => state.timeline)
    const handleAddNewTimeLine = (data) => {
        dispatch(addTimeLine(data));
        setOpenModal(false);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const timeChart = {
        labels: ['Complete', 'Loading'],
        datasets: [
            {
                label: '# of Votes',
                data: [15, 100 - 15],
                backgroundColor: ['#FF865E', '#ccc'],
            }
        ],
    }
    const proccessChart = {
        labels: ['%', '100%'],
        datasets: [
            {
                label: '# of Votes',
                data: [67, 100 - 67],
                backgroundColor: ['#FEE440', '#ccc'],
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
        <>
            {openModal && <AddNewTimeLine
                closeModal={setOpenModal}
                onAddNewTimeLine={handleAddNewTimeLine}
                timelinedata={timelines}
            />}
            <div className="detail-report">
                <div className="detail-report__header">
                    <div className="detail-report__header__title">
                        <h1>This is title</h1>
                        <p>September 15 - October 30</p>
                        <h3 className="medium">Complated</h3>
                    </div>
                    <div className="detail-report__header__performers">
                        <h4>Present Performers</h4>
                        <section className="image-performers">
                            {performers.map((performer) => (
                                <img
                                    src={performer}
                                    alt="avatar"
                                    width='40'
                                    height='40'
                                    className='performers'
                                />
                            ))}
                        </section>
                    </div>
                </div>
                <div className="detail-report__body">
                    <div className="detail-report__body__chart">
                        <div className="detail-report__body__chart__time-chart">
                            <h2>Time</h2>
                            <Doughnut
                                className="chart"
                                data={timeChart}
                                options={{
                                    maintainAspectRatio: false,
                                }}
                            />
                        </div>
                        <div className="detail-report__body__chart__proccess-chart">
                            <h2>Process</h2>
                            <Doughnut
                                className="chart"
                                data={proccessChart}
                                options={{
                                    maintainAspectRatio: false,
                                }}
                            />
                        </div>
                    </div>
                    <div className="detail-report__body__timeline">
                        <Timeline
                            timelines={timelines}
                            openModal={handleOpenModal}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

DetailReport.propTypes = {

}

export default DetailReport
