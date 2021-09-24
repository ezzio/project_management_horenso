import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
    VerticalTimeline,
    VerticalTimelineElement
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import 'styles/Color.scss';
import './Timeline.scss';
import timelineData from './TimelineData';
import { MdDone } from 'react-icons/md';
import {
    AiOutlineLoading3Quarters,
    AiOutlinePlus
} from 'react-icons/ai';
import AddNewTimeLine from './components/AddNewTimeLine';

const Timeline = props => {
    const complete = { background: '#06D6A0' };
    const incomplete = { background: '#F9C74F' };
    const [openModal, setOpenModal] = useState(false)
    const handleAddNewTimeLine = (data) => {
        console.log(data)
    }
    return (
        <div className='ctn ctn-timeline'>
            {openModal && <AddNewTimeLine closeModal={setOpenModal} onAddNewTimeLine={handleAddNewTimeLine} />}
            <h1>TIMELINE</h1>
            <VerticalTimeline>
                {
                    timelineData.map((data) => {
                        let iconProccess = data.proccess === '100%';
                        return (
                            <VerticalTimelineElement
                                key={data.id}
                                className='vertical-timeline-element'
                                date={data.date}
                                iconStyle={iconProccess ? complete : incomplete}
                                icon={data.proccess === '100%' ? <MdDone /> : <AiOutlineLoading3Quarters />}
                            >
                                <h3 className='vertical-timeline-title'>
                                    {data.title}
                                </h3>
                                <h5 className='vertical-timeline-performers'>
                                    {data.performers}
                                </h5>
                                <p>{data.description}</p>
                            </VerticalTimelineElement>
                        );
                    })
                }
                <VerticalTimelineElement
                    iconStyle={{ background: 'hsl(215, 92%, 64%)' }}
                    icon={<AiOutlinePlus />}
                    iconOnClick={() => setOpenModal(true)}
                    style={{ cursor: 'pointer' }}
                />
            </VerticalTimeline>
        </div>
    )
}

Timeline.propTypes = {

}

export default Timeline;
