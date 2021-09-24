import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import './AddNewTimeLine.scss';

const AddNewTimeLine = ({ closeModal, onAddNewTimeLine }) => {
    const { register,
        handleSubmit,
        formState: { errors } } = useForm({
            // defaultValues: {
            //     type: 'complated',
            //     title: null,
            //     team: null,
            //     time: null,
            //     member: null,
            //     process: '0%'
            // }
        });
    const onSubmit = (data) => {
        console.log(data);
        // onAddNewTimeLine(data);
    };
    return (
        <div>
            <div className="modalContainer">
                <div className="btn-exit">
                    <button onClick={() => closeModal(false)}>X</button>
                </div>
                <div className="modalContainer__title">
                    <h1>Add Reports</h1>
                </div>
                <div className="modalContainer__body">
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <section className='tag-title'>
                            <label htmlFor="title">Title</label>
                            <input
                                className={errors.title ? "errors-outline" : 'input-normal'}
                                type="text"
                                placeholder="Title..."
                                name="title"
                                id='title'
                                {...register('title', { required: "true", })}
                            />
                            {errors.title && <p className='input-errors'>This field is required</p>}
                        </section>
                        <section className='tag-team'>
                            <label htmlFor="team">Team</label>
                            <input
                                className={errors.team ? "errors-outline" : 'input-normal'}
                                type="text"
                                placeholder="Team..."
                                name="team"
                                id='team'
                                {...register('team', { required: "true", })}
                            />
                            {errors.team && <p className='input-errors'>This field is required</p>}
                        </section>
                        <section className='tag-time-success'>
                            <label htmlFor="time">Time</label>
                            <input
                                className={errors.time ? "errors-outline" : 'input-normal'}
                                type="date"
                                name="timer"
                                id="timer"
                                {...register('time', { required: "true", })}
                            />
                            {errors.time && <p className='input-errors'>This field is required</p>}

                        </section>
                        <section className='tag-member'>
                            <label htmlFor="description">Description</label>
                            <textarea
                                className={errors.description ? "errors-outline" : 'input-normal'}
                                rows="3"
                                placeholder="Describe..."
                                name="description"
                                style={{ resize: 'none' }}
                                id='description'
                                {...register('discription', { required: "true", })}
                            />
                            {errors.description && <p className='input-errors'>This field is required</p>}

                        </section>
                        <section className='tag-btn'>
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
