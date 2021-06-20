import React from 'react';
import { Search } from 'react-bootstrap-icons';

function SearchInput({ value, onChange }) {
  return (
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <Search />
        </span>
      </div>
      <input type="text" value={value} className="form-control" placeholder="Search" onChange={onChange} />
    </div>
  );
}

export default SearchInput;
