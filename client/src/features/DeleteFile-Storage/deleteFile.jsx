import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteFile = ({ fileId }) => {
  const onDelete = (e) => {
    console.log("deleting...", fileId);
  };
  return (
    <button className="btn__btn-delete" onClick={onDelete}>
      <RiDeleteBin6Line />
    </button>
  );
};
export default DeleteFile;
