import Tag from 'features/Tag - Report/Tag';
import { addTag } from 'features/Tag - Report/TagSlice';
import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiSortDown } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import ModalAddTags from './components/ModalAddTags';
import './Report.scss';


const Report = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const tags = useSelector(state => state.tags);

  const handleAddTags = (data) => {
    console.log("New data: ", data);
    // const action = addTag(data)
    // console.log({ action });
    // dispatch(addTag(data));
  }
  console.log({ tags });

  return (
    <>
      {openModal && <ModalAddTags
        closeModal={setOpenModal}
        className="modal-add"
        onAddTags={handleAddTags}
      />}
      <div className="ctn ctn-report">
        <div className="report__header">
          <section className="report__header__title">
            <h1>Reporting</h1>
            <i>All project in current month</i>
          </section>
          <button
            className="report__header__add-report"
            onClick={() => setOpenModal(!openModal)}
          >
            <AiOutlinePlus />
          </button>
        </div>
        <div className="report__filter">
          <section className="report__filter__selectors">
            <section className="select">
              <p>All</p>
              <div className="select__notify">1</div>
            </section>
            <section className="select">
              <p>Complated</p>
              <div className="select__notify">0</div>
            </section>
            <section className="select">
              <p>Approved</p>
              <div className="select__notify">0</div>
            </section>
          </section>
          <section className="select-sort">
            <BiSortDown />
            <b>Time</b>
          </section>
        </div>
        <div className="report__list">
          {tags.map((tag) => {
            return <Tag tagList={tag} />
          })}
        </div>
      </div>
    </>
  );
};

export default Report;
