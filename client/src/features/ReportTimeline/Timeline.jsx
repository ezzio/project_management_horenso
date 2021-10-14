import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
    VerticalTimeline,
    VerticalTimelineElement
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import 'styles/Color.scss';
import './Timeline.scss';
// import timelineData from './TimelineData';
import { MdDone } from 'react-icons/md';
import {
    AiOutlineLoading3Quarters,
    AiOutlinePlus
} from 'react-icons/ai';
import AddNewTimeLine from './components/AddNewTimeLine';
import { useDispatch, useSelector } from 'react-redux';
import { addTimeLine } from './TimelineSlice';

const Timeline = props => {
    const { timelines, openModal } = props;

    const complete = { background: '#06D6A0' };
    const incomplete = { background: '#F9C74F' };


    return (
        <div className='ctn ctn-timeline'>

            <h1>TIMELINE</h1>
            <VerticalTimeline>
                {
                    timelines.map((timeline) => {
                        let isCompleted = timeline.proccess === 'completed';
                        return (
                            <VerticalTimelineElement
                                key={timeline.id}
                                className='vertical-timeline-element'
                                date={`${timeline.start_time} to ${timeline.end_time}`}
                                iconStyle={isCompleted ? complete : incomplete}
                                icon={isCompleted ? <MdDone className="success-icon" />
                                    : <AiOutlineLoading3Quarters className="loading-icon" />}
                            >
                                <h3 className='vertical-timeline-title'>
                                    {timeline.title}
                                </h3>
                                <h5 className='vertical-timeline-performers'>
                                    {timeline.performers}
                                </h5>
                                <p>{timeline.description}</p>
                            </VerticalTimelineElement>
                        );
                    })
                }
                <VerticalTimelineElement
                    iconStyle={{ background: 'hsl(215, 92%, 64%)' }}
                    icon={<AiOutlinePlus />}
                    iconOnClick={openModal}
                    style={{ cursor: 'pointer' }}
                />
            </VerticalTimeline>
        </div>
    )
}

Timeline.propTypes = {

}

export default Timeline;
