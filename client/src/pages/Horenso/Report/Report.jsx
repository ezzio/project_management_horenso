import Tag from 'features/Tag - Report/Tag';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiSortDown } from 'react-icons/bi';
import { MdSort } from 'react-icons/md';
import './Report.scss';

const Report = () => {
  const members = [
    'https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png',
    'https://static.remove.bg/remove-bg-web/3661dd45c31a4ff23941855a7e4cedbbf6973643/assets/start_remove-79a4598a05a77ca999df1dcb434160994b6fde2c3e9101984fb1be0f16d0a74e.png',
  ];
  return (
    <div className="ctn ctn-report">
      <div className="report__header">
        <section className="report__header__title">
          <h1>Reporting</h1>
          <i>All project in current month</i>
        </section>
        <button className="report__header__add-report">
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
        <Tag
          type="complated"
          title="UI Design"
          team="UI team"
          time="1 month left"
          members={members}
          process="47%"
        />
      </div>
    </div>
  );
};

export default Report;
