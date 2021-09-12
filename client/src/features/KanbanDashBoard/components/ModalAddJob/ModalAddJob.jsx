import React, { useState } from 'react'
import './ModalAddJob.scss'

const ModalAddJob = ({ closeModal }) => {
    const [level, setLevel] = useState('')
    const handleChange = (e) => {
        setLevel(e.target.value)
    };
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className='ctn-modal-add-job'>
            <form className="ctn-modal-add-job__form" onSubmit={handleSubmit}>
                <h3>ADD JOBS</h3>
                <div className='ctn-modal-add-job__form__title'>
                    <label htmlFor="title">Title</label>
                    <input type="text" placeholder='Title' />
                </div>
                <div className='ctn-modal-add-job__form__priority'>
                    <label htmlFor="level">Prority</label>
                    <select
                        onChange={(e) => handleChange(e)}
                        className={level === "High" ? "high" : level === "Medium" ? "medium" : "low"}
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div className='ctn-modal-add-job__form__members'>
                    <label htmlFor="members">Members</label>
                    <input type="text" placeholder='Members' />
                </div>
                <section className="ctn-modal-add-job__form__button-back">
                    <p onClick={() => closeModal(false)}>Cancle</p>
                    <button type="submit" className="submit" >Submit</button>
                </section>

            </form>
        </div>
    )
}

export default ModalAddJob
