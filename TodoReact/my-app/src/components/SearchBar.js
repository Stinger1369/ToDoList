import React, { useState } from 'react';
import './style/SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleSearch = () => {
      onSearch(searchTerm);
    };
  
    return (
        <div className="search">
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tasks by title"
            className="searchInput"
          />
          <button onClick={handleSearch} className="searchButton">Search</button>
        </div>
      );
    };
    
    export default SearchBar;
  
