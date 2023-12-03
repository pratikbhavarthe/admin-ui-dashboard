import React from "react";

const SearchBox = ({ value, onChange, onFocus, totalCount, placeholder }) => {
  const handleInputChange = (e) => {
    onChange(e.currentTarget.value);
  };

  const handleInputFocus = (e) => {
    onFocus(e);
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        value={value}
        className="form-control"
        placeholder={placeholder}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
      />
      <div className="input-group-append">
        <span className="input-group-text">
          Total users &nbsp;&nbsp;
          <span className="badge bg-primary">{totalCount}</span>
        </span>
      </div>
    </div>
  );
};

export default SearchBox;
