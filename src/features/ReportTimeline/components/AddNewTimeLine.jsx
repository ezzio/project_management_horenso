import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import './AddNewTimeLine.scss';
import moment from 'moment';

const AddNewTimeLine = ({ closeModal, onAddNewTimeLine, timelinedata }) => {
    const { register,
        handleSubmit,
        formState: { errors } } = useForm({
            defaultValues: {
                id: timelinedata.length + 1,
                title: null,
                performers: null,
                start_time: null,
                end_time: null,
                description: null,
                proccess: 'incompleted',
            }
        });
    const onSubmit = (data) => {
        onAddNewTimeLine(data);
        console.log(typeof data.id);
    };
    return (
        <div className="modalBackGround">
            <div className="modalContainer">
                <div className="btn-exit">
                    <button onClick={() => closeModal(false)}>X</button>
                </div>
                <div className="modalContainer__title">
                    <h1>Add Time Line</h1>
                </div>
                <div className="modalContainer__body">
                    <form action=""
                        onSubmit={handleSubmit(onSubmit)}
                        className="modalContainer__body__form"
                    >
                        <section className='timeline-title'>
                            <label htmlFor="title">Title</label>
                            <input
                                className={errors.title ? "errors-outline" : 'input-normal'}
                                type="text"
                                placeholder="Title..."
                                name="title"
                                {...register('title', { required: "true", })}
                            />
                            {errors.title && <p className='input-errors'>This field is required</p>}
                        </section>
                        <section className='timeline-performers'>
                            <label htmlFor="performers">Performers</label>
                            <input
                                className={errors.performers ? "errors-outline" : 'input-normal'}
                                type="text"
                                placeholder="Performers..."
                                name="performers"
                                {...register('performers', { required: "true", })}
                            />
                            {errors.performers && <p className='input-errors'>This field is required</p>}
                        </section>
                        <section className='timeline-start-time'>
                            <label htmlFor="start_time">Start Time</label>
                            <input
                                className={errors.start_time ? "errors-outline" : 'input-normal'}
                                type="date"
                                name="start_time"
                                {...register('start_time', { required: "true", })}
                            />
                            {errors.start_time && <p className='input-errors'>This field is required</p>}

                        </section>
                        <section className='timeline-end-time'>
                            <label htmlFor="end_time">End Time</label>
                            <input
                                className={errors.end_time ? "errors-outline" : 'input-normal'}
                                type="date"
                                name="end-time"
                                {...register('end_time', { required: "true", })}
                            />
                            {errors.end_time && <p className='input-errors'>This field is required</p>}

                        </section>
                        <section className='description'>
                            <label htmlFor="description">Description</label>
                            <textarea
                                className={errors.description ? "errors-outline" : 'input-normal'}
                                rows="3"
                                placeholder="Describe..."
                                name="description"
                                style={{ resize: 'none' }}
                                {...register('description', { required: "true", })}
                            />
                            {errors.description && <p className='input-errors'>This field is required</p>}

                        </section>
                        <section className='timeline-btn'>
                            <button
                                onClick={() => closeModal(false)}
                                className='btn-cancle'
                            >
                                Cancle
                            </button>
                            <button className="btn-submit" type='submit'>Submit</button>
                        </section>
                    </form>
                </div>
            </div>
        </div>
    )
}

AddNewTimeLine.propTypes = {
    closeModal: PropTypes.func,
    onAddNewTimeLine: PropTypes.func,
}

export default AddNewTimeLine
