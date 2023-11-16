import React from 'react';
import './style/FilterOptions.css';

const FilterOptions = ({ onShowCompletedChange, onShowUncompletedChange, showCompleted, showUncompleted }) => {
  return (
    <div className="filterOptions">
      <label>
        Show Completed
        <input 
          type="checkbox" 
          checked={showCompleted}
          onChange={e => onShowCompletedChange(e.target.checked)} 
        />
      </label>
      <label>
        Show Uncompleted
        <input 
          type="checkbox" 
          checked={showUncompleted}
          onChange={e => onShowUncompletedChange(e.target.checked)} 
        />
      </label>
    </div>
  );
};

export default FilterOptions;
