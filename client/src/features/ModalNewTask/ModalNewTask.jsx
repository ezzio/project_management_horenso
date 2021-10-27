import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import './ModalNewTask.scss';
// import { CSSTransition } from 'react-transition-group';

const ModalNewTask = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);

  return (
    <div className="modal-ctn">
      <div className="modal-content">
        <div className="modal-content__header">
          <h4>Add new task</h4>
          <AiOutlineClose />
        </div>
        <form className="modal-content__body" onSubmit={handleSubmit(onSubmit)}>
          <StepOne step={stepOne} register={register} />
          <StepTwo step={stepTwo} register={register} />

          <div className="modal-content__footer">
            {stepOne ? (
              <>
                <p className="modal-content__footer__cancel">Cancel</p>
                <p
                  className="modal-content__footer__confirm"
                  onClick={() => {
                    setStepOne(false);
                    setStepTwo(true);
                  }}
                >
                  Next
                </p>
              </>
            ) : (
              <>
                <p
                  className="modal-content__footer__cancel"
                  onClick={() => {
                    setStepOne(true);
                    setStepTwo(false);
                  }}
                >
                  Back
                </p>
                <button
                  className="modal-content__footer__confirm"
                  type="submit"
                >
                  Confirm
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

const StepOne = ({ step, register }) => {
  return (
    <div className={!step ? 'step-ctn hide-step' : 'step-ctn'}>
      <section className="modal-content__body__priority">
        <label htmlFor="priority">Priority:</label>
        <select name="priority" {...register('priority')}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </section>
      <section className="modal-content__body__title">
        <label htmlFor="title">Title:</label>
        <input type="text" name="title"  />
      </section>
      <section className="modal-content__body__description">
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          rows="3"
          style={{ resize: 'none' }}
          {...register('description')}
        />
      </section>
      <section className="modal-content__body__time">
        <label htmlFor="start_time">Start Time:</label>
        <input
          type="datetime-local"
          name="start_time"
          {...register('start_time')}
        />
      </section>
      <section className="modal-content__body__time">
        <label htmlFor="end_time">End Time:</label>
        <input
          type="datetime-local"
          name="end_time"
          {...register('end_time')}
        />
      </section>
    </div>
  );
};

const StepTwo = ({ step, register }) => {
  const members = [
    {
      name: 'Koih Hana',
      avatar:
        'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
    },
    {
      name: 'Jack Will',
      avatar:
        'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
    },
    {
      name: 'MenGuy124',
      avatar:
        'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
    },
  ];
  return (
    <div className={!step ? 'step-ctn hide-step' : 'step-ctn'}>
      <section className="step-two-add-task">
        <label htmlFor="members" className="step-two-add-task__title">
          Members:
        </label>
        <div className="step-two-add-task__list-members">
          {members.map((member) => {
            return (
              <section className="step-two-add-task__list-members__member">
                <input
                  type="checkbox"
                  name="members"
                  value={member.name}
                  {...register('members')}
                />
                <img src={member.avatar} alt="avatar" height="35" width="35" />
                <label htmlFor="guy12">{member.name}</label>
              </section>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ModalNewTask;
