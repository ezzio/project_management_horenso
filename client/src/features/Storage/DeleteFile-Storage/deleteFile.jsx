import { Button, message, Popconfirm } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { apiDeleteFile, deleteFile } from "../storageSlice";
const DeleteFile = ({ fileName }) => {
  const dispatch = useDispatch();
  const params = useParams();

  const handleClickDelete = () => {
    console.log("deleting...", fileName);
    dispatch(deleteFile(fileName));
    dispatch(
      apiDeleteFile({
        idProject: params.idProject,
        name_attachment: fileName,
      })
    );
    message.success(`"${fileName}" has been deleted!!!`);
  };

  function cancel(e) {
    console.log(e);
  }

  return (
    <>
      <Popconfirm
        title="Are you sure to delete this file?"
        onConfirm={handleClickDelete}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button type="danger" icon={<RiDeleteBin6Line />} size="medium" />
      </Popconfirm>
    </>
  );
};
export default DeleteFile;
