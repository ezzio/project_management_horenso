import { Button, message, Modal, Select } from 'antd';
import {
  editTeammate,
  EditTeammateByUsername,
} from 'features/Teammate/teammateSlice';
import React, { useState } from 'react';
import { RiEditFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';

EditTeammate.propTypes = {};

function EditTeammate(props) {
  const { user, idProject } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Option } = Select;
  const [newTag, setNewTag] = useState('');

  const dispatch = useDispatch();

  const handleOnClickEdit = (user) => {
    setIsModalVisible(true);
    console.log(user);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function onChange(value) {
    console.log(`selected ${value}`);
    setNewTag(value);
  }

  const handleOk = () => {
    setIsModalVisible(false);
    // console.log("Change to: ", newTag);
    const action = {
      user_name: user.user_name,
      newRole: newTag,
      idProject: idProject,
    };
    dispatch(editTeammate(action));
    dispatch(EditTeammateByUsername(action));
    message.success(
      `Success !!! ${user.user_name}'s role has been updated to ${newTag}.`
    );
  };

  return (
    <>
      <Button
        type="primary"
        icon={<RiEditFill />}
        size="small"
        onClick={() => handleOnClickEdit(user)}
      />
      <Modal
        destroyOnClose={true}
        title="Change teammate role"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Select
          showSearch
          placeholder="Select role"
          optionFilterProp="children"
          onChange={onChange}
        >
          <Option value={user.tag !== 'Member' ? 'Member' : 'Leader'}>
            {user.tag !== 'Member' ? 'Member' : 'Leader'}
          </Option>
        </Select>
      </Modal>
    </>
  );
}

export default EditTeammate;
