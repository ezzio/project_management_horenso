import { RiDownload2Fill } from "react-icons/ri";
import FileSaver from "file-saver";

function DownloadFile({ file, fileName }) {
  const onDownload = () => {
    var fileDownload = new File(["Hello, world!"], fileName, {
      type: "text/plain;charset=utf-8",
    });
    FileSaver.saveAs(fileDownload);
  };
  return (
    <button className="btn__btn-download" onClick={onDownload}>
      <RiDownload2Fill />
    </button>
  );
}

export default DownloadFile;
