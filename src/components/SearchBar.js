import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className='flex flex-col  sm:flex-row items-center '>
      <input
        type='text'
        placeholder='Search characters...'
        className='py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button
        className='ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-4 sm:mt-0 px-4 rounded'
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
