import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteFile = ({ fileName }) => {
  const onDelete = (e) => {
    console.log("deleting...", fileName);
  };
  return (
    <button className="btn__btn-delete" onClick={onDelete}>
      <RiDeleteBin6Line />
    </button>
  );
};
export default DeleteFile;
