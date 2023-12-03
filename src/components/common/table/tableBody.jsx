import React, { Component } from "react";

class TableBody extends Component {
  renderCell = (item, column, columnProps, editItem) => {
    if (column.content)
      return column.content(item, columnProps, item.id === editItem.id);
    return item[column.path];
  };

  renderEditCell = (
    item,
    column,
    columnProps,
    editType,
    editData,
    editItem
  ) => {
    if (editType === "inputText") {
      return (
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={editItem[column.path]}
            onChange={(e) => {
              columnProps.handleItemUpdateData(e, column.path, item);
            }}
          />
        </div>
      );
    } else if (editType === "inputSelect") {
      return (
        <select
          id={this.createKey(item, column)}
          className="form-select"
          name={column.path || column.key}
          value={editItem[column.path]}
          onChange={(e) =>
            columnProps.handleItemUpdateData(e, column.path, item)
          }
        >
          {editData.map((ed) => (
            <option key={item.id + ed} value={ed.toLowerCase()}>
              {ed}
            </option>
          ))}
        </select>
      );
    }
  };

  createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };

  render() {
    const { data, columns, rowProps, columnProps, editItem } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr
            key={item.id}
            className={item.checked ? rowProps.rowCheckedClass : ""}
          >
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {column.editable === true && item.id === editItem.id
                  ? this.renderEditCell(
                      item,
                      column,
                      columnProps,
                      column.editType,
                      column.editData,
                      editItem
                    )
                  : this.renderCell(item, column, columnProps, editItem)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
