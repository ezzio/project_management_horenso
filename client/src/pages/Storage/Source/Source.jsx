import React, { useState, useMemo} from 'react';
import './Source.scss';
import JsonData from './MOCK_DATA.json';
import {TableHeader, Pagination, Search } from "./components/DataTable";

function Source() {
    const [files, setFiles] = useState(JsonData);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const filesPerPage = 15;

    const headers = [
        {title:'Name', field:'Name', sortable: true},
        {title:'Date Created', field:'DateCreated',sortable: true},
        {title:'Last Edit', field:'LastEdit',sortable: true},
        {title:'Size', field:'Size',sortable: true},
        {title:'Member', field:'Member',sortable: true},
    ]

    const filesData = useMemo(() => {
        let computedFiles = files;

        //Searching files
        if (search) {
            computedFiles = computedFiles.filter(
                files =>
                    files.Name.toLowerCase().includes(search.toLowerCase()) ||
                    files.Member.toLowerCase().includes(search.toLowerCase()) ||
                    files.DateCreated.toLowerCase().includes(search.toLowerCase()) ||
                    files.LastEdit.toLowerCase().includes(search.toLowerCase()) ||
                    files.Size.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(computedFiles.length);

        //Sorting files
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedFiles = computedFiles.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
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
                    onSearch={value => {
                    setSearch(value);
                    setCurrentPage(1);}}
                />
                <div className="header-usertag">
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
                        onSorting={(field, order) =>
                            setSorting({ field, order })
                        }
                    />
                    <tbody>
                        {filesData.map(f => (
                            <tr>
                                <td>{f.Name}</td>
                                <td>{f.DateCreated}</td>
                                <td>{f.LastEdit}</td>
                                <td>{f.Size}</td>
                                <td>{f.Member}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination-outer">
                    <Pagination
                        total={totalItems}
                        itemsPerPage={filesPerPage}
                        currentPage={currentPage}
                        onPageChange={page => setCurrentPage(page)}

                    />
                </div>
            </div>
        </div>
    )
}

export default Source;