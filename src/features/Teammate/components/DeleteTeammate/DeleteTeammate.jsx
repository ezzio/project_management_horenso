import { Button } from "antd";
import {
  deleteTeammate,
  DeleteTeammateByUsername,
} from "features/Teammate/teammateSlice";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Popconfirm, message } from "antd";

DeleteTeammate.propTypes = {};

function DeleteTeammate(props) {
  const { user_name, idProject } = props;
  const dispatch = useDispatch();

  const handleConfirmClick = (user_name) => {
    dispatch(deleteTeammate(user_name));
    dispatch(
      DeleteTeammateByUsername({
        user_name: user_name,
        idProject: idProject,
      })
    );
    // message.success(`Success !!! "${user_name}" has been deleted.`);
  };

  const cancel = (e) => {};

  return (
    <Popconfirm
      title="Are you sure you want to remove this member?"
      onConfirm={() => handleConfirmClick(user_name)}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <Button type="danger" icon={<RiDeleteBin6Line />} size="small" />
    </Popconfirm>
  );
}

export default DeleteTeammate;
