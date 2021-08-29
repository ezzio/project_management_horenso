import React from "react";
import PropTypes from "prop-types";
import "./ListMember.scss";

const ListMember = ({ members }) => {
    const moreMember = members.length;
    return (
        <div className="member-list">
            {members.map((member, index) => {
                if (index < 5) {
                    return (
                        <img
                            src={member}
                            alt="member"
                            className="member"
                            height="25"
                            width="25"
                        />
                    );
                } else {
                    return <div className="bonus-members"
                        height='25'
                        width='25'
                    >
                        {moreMember - 5}
                    </div>;
                }
            })}
        </div>
    );
};

ListMember.propTypes = {
    members: PropTypes.array,
};

export default ListMember;
