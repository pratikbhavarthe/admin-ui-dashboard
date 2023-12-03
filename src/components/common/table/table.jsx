import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({
  columns,
  data,
  rowProps,
  columnProps,
  editItem,
}) => {
  return (
    <table className="table table-hover" style={{ overflow: "scroll" }}>
      <TableHeader
        columns={columns}
        columnProps={columnProps}
        rowProps={rowProps}
      />
      <TableBody
        data={data}
        columns={columns}
        columnProps={columnProps}
        editItem={editItem}
        rowProps={rowProps}
      />
    </table>
  );
};

export default Table;
