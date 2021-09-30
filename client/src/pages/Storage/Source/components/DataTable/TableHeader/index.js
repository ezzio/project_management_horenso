import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";

const TableHeader = ({ headers, onSorting }) => {
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");

  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };

  return (
    <thead>
      <tr>
        {headers.map(({ title, field, sortable }) => (
          <th
            style={{ cursor: "pointer" }}
            key={title}
            onClick={() => (sortable ? onSortingChange(field) : null)}
          >
            {title}

            {/* Icons */}
            {sortingField && sortingField === field && (
              <p style={{ paddingLeft: "5px" }}>
                {sortingOrder === "asc" ? (
                  <FaArrowAltCircleDown />
                ) : (
                  <FaArrowAltCircleUp />
                )}
              </p>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
