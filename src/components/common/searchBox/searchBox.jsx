import React from "react";

const SearchBox = ({ value, onChange, onFocus, totalCount, placeholder }) => {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        value={value}
        className="form-control"
        placeholder={placeholder}
        onChange={(e) => onChange(e.currentTarget.value)}
        onFocus={(e) => onFocus(e)}
      />
      <span className="input-group-text">
        Total users &nbsp;&nbsp;
        <span className="badge bg-primary">{totalCount}</span>
      </span>
    </div>
  );
};

export default SearchBox;
