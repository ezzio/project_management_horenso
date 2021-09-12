import React from 'react';
import PropTypes from 'prop-types';
import { BiCommentError } from 'react-icons/bi';
import { TiTick } from 'react-icons/ti';
import { AiOutlineFieldTime, AiOutlineTeam } from 'react-icons/ai';
import './Tag.scss';

const Tag = (props) => {
  // const { type, title, team, time, members, process } = props;
  const { tagList } = props;

  const tagIcon = () => {
    switch (tagList.type) {
      case 'complated':
        return <BiCommentError />;
      case 'approved':
        return <TiTick />;
      default:
        break;
    }
  };
  return (
    <div className="ctn-tag">
      <div className="tag__icon">{tagIcon()}</div>
      <div className="tag__content">
        <section className="tag__content__info">
          <h2 className="tag__content__info__title">{tagList.title}</h2>
          <div className="tag__content__info__detail">
            <section>
              <AiOutlineTeam />
              <p>{tagList.team}</p>
            </section>
            <section>
              <AiOutlineFieldTime />
              <p>{tagList.time}</p>
            </section>
          </div>
        </section>
        <section className="tag__content__footer-info">
          <section className="tag__content__footer-info__member">
            <p>Team member</p>
            <section>
              {tagList.members.map((member) => {
                return (
                  <img
                    src={member.avatar}
                    alt="member"
                    className="member__icon"
                    height="25"
                    width="25"
                  />
                );
              })}
            </section>
          </section>
          <section className="tag__content__footer-info__process">
            <p>Process</p>
            <p>{tagList.process}</p>
          </section>
        </section>
      </div>
    </div>
  );
};

Tag.propTypes = {
  tagList: PropTypes.object,
};

export default Tag;
