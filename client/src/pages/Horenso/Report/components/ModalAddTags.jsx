import React from 'react'
import './ModalAddTags.scss'
import { useForm } from 'react-hook-form'

const ModalAddTags = ({ closeModal, onAddTags }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            type: 'complated',
            title: null,
            team: null,
            time: null,
            member: null,
            process: '0%'
        }
    });
    const onSubmit = (data) => {
        console.log(data);
        onAddTags(data);
    };



    return (
        <div className='modalBackground'>
            <div className="modalContainer">
                <div className="btn-exit">
                    <button onClick={() => closeModal(false)}>X</button>
                </div>
                <div className="modalContainer__title">
                    <h1>Add Tags</h1>
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
                                type="datetime-local"
                                name="timer"
                                id="timer"
                                {...register('time', { required: "true", })}
                            />
                            {errors.time && <p className='input-errors'>This field is required</p>}

                        </section>
                        <section className='tag-member'>
                            <label htmlFor="member">Member</label>
                            <input
                                className={errors.member ? "errors-outline" : 'input-normal'}
                                type="text"
                                placeholder="Member..."
                                name="member"
                                id='member'
                                {...register('member', { required: "true", })}
                            />
                            {errors.member && <p className='input-errors'>This field is required</p>}

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

export default ModalAddTags
