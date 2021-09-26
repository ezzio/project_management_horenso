import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import './ModalCreateProject.scss';
import logo from 'assets/images/create-new-project.jpg';
import { useForm } from 'react-hook-form';

const ModalCreateProject = (state) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const [stepOne, setStepOne] = useState(true);

  return (
    <div className="modal-create-project">
      <div className="modal-create-project__content">
        {stepOne ? (
          <section className="modal-create-project__content__header">
            <div style={{ width: '24px', height: '100%' }}></div>
            <section className="modal-create-project__content__header__logo">
              <img src={logo} alt="img" height="100" />
              <h2 style={{ color: 'black' }}>Create new project</h2>
            </section>
            <AiOutlineClose />
          </section>
        ) : (
          <section className="modal-create-project__content__header-min">
            <BiArrowBack onClick={() => setStepOne(true)} />
            <h2 style={{ color: 'black' }}>Time for this?</h2>
            <AiOutlineClose />
          </section>
        )}

        <form
          className="modal-create-project__content__body"
          onSubmit={handleSubmit(onSubmit)}
        >
          <StepOne register={register} />

          <section className="modal-create-project__content__body__submit">
            <button type="submit">Let's go</button>
          </section>
        </form>
      </div>
    </div>
  );
};

const StepOne = ({ register }) => {
  return (
    <div className={'modal-create-project__content__body__stepOne'}>
      <label htmlFor="title">Project name</label>
      <input
        type="text"
        placeholder="Enter project name"
        {...register('title')}
      />
    </div>
  );
};

export default ModalCreateProject;
