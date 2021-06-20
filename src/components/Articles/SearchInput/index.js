import React from 'react';
import PropTypes from 'prop-types';
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

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SearchInput;
