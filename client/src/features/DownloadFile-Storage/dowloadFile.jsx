import { RiDownload2Fill } from "react-icons/ri";

function DownloadFile({ fileId }) {
  const onDownload = (e) => {
    console.log("downloading....", fileId);
  };
  return (
    <button className="btn__btn-download" onClick={onDownload}>
      <RiDownload2Fill />
    </button>
  );
}

export default DownloadFile;
