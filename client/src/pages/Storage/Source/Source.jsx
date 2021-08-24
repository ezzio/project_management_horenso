import React, { useState, useMemo } from "react";
import "./Source.scss";
import JsonData from "./MOCK_DATA.json";
import { TableHeader, Pagination, Search } from "./components/DataTable";
import { RiDownload2Fill, RiDeleteBin6Line } from "react-icons/ri";
import UploadFile from "features/File/File";

function Source() {
  const [files, setFiles] = useState(JsonData);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const filesPerPage = 15;

  const headers = [
    { title: "Name", field: "name", sortable: true },
    { title: "Last Modified", field: "lastModifiedDate", sortable: false },
    { title: "Size", field: "size", sortable: true },
    { title: "Member", field: "member", sortable: false },
    { title: "Action", sortable: false },
  ];

  const filesData = useMemo(() => {
    let computedFiles = files;

    //Searching files
    if (search) {
      computedFiles = computedFiles.filter(
        (files) =>
          files.name.toLowerCase().includes(search.toLowerCase()) ||
          files.member.toLowerCase().includes(search.toLowerCase()) ||
          files.lastModifiedDate.toLowerCase().includes(search.toLowerCase()) ||
          files.size.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedFiles.length);

    //Sorting files
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedFiles = computedFiles.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedFiles.slice(
      (currentPage - 1) * filesPerPage,
      (currentPage - 1) * filesPerPage + filesPerPage
    );
  }, [files, currentPage, search, sorting]);

  return (
    <div className="ctn Source">
      <div className="header">
        <Search
          onSearch={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
        />
        <div className="header__add-file">
          <UploadFile />
        </div>
        <div className="header__user-tag">
          <img
            src="https://assets.dragoart.com/images/11939_501/how-to-draw-iron-man-easy_5e4c9ed9b16b58.14188289_53732_3_3.png"
            alt="user-tag"
            height="35px"
            width="35px"
          />
        </div>
      </div>

      <div className="Source__content">
        <table className="Source__content-table">
          <TableHeader
            headers={headers}
            onSorting={(field, order) => setSorting({ field, order })}
          />
          <tbody>
            {filesData.map((f) => (
              <tr>
                <td>{f.name}</td>
                <td>{f.lastModifiedDate}</td>
                <td>{f.size}</td>
                <td>{f.member}</td>
                <td>
                  <div className="action">
                    <a href="#" className="btn__btn-download">
                      <RiDownload2Fill />
                    </a>
                    <a href="#" className="btn__btn-delete">
                      <RiDeleteBin6Line />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-outer">
          <Pagination
            total={totalItems}
            filesPerPage={filesPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
}

export default Source;
