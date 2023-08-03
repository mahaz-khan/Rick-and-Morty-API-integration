import React, { useState, useEffect } from 'react';
import { Pagination } from 'flowbite-react';
import Card from "../components/card.js";
import SearchBar from "../components/SearchBar.js";

const Index = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [characterNotFound, setCharacterNotFound] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');

  const fetchCharacters = async (pageNumber, searchQuery = '', statusFilter = 'All') => {
    try {
      let url = searchQuery
        ? `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(searchQuery)}&page=${pageNumber}`
        : `https://rickandmortyapi.com/api/character?page=${pageNumber}`;

      if (statusFilter !== 'All') {
        url += `&status=${statusFilter.toLowerCase()}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length === 0) {
        setCharacterNotFound(true);
      } else {
        setCharacters(data.results);
        setCharacterNotFound(false);
      }
    } catch (error) {
      console.error('Error fetching characters:', error);
      setCharacterNotFound(false);
    }
  };

  useEffect(() => {
    fetchCharacters(currentPage, searchTerm, filterStatus);
  }, [currentPage, searchTerm, filterStatus]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (searchQuery) => {
    setSearchTerm(searchQuery);
    setCurrentPage(1);
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className='flex justify-center space-x-4 my-4  '>
        <button
          className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${filterStatus === 'Alive' ? 'bg-green-700' : ''}`}
          onClick={() => handleFilter('Alive')}
        >
          Alive
        </button>
        <button
          className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${filterStatus === 'Dead' ? 'bg-red-700' : ''}`}
          onClick={() => handleFilter('Dead')}
        >
          Dead
        </button>
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${filterStatus === 'unknown' ? 'bg-blue-700' : ''}`}
          onClick={() => handleFilter('unknown')}
        >
          Unknown
        </button>
      </div>

     <div className='pb-10 flex justify-center '><SearchBar onSearch={handleSearch} /></div> 
      {characterNotFound ? (
        <p className='text-center text-red-500 mt-4'>Sorry, this character is not available.</p>
      ) : (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-8'>
          {characters.map((character) => (
            <Card
              key={character.id}
              character={character}
              name={character.name}
              status={character.status}
              image={character.image}
              species={character.species}
              gender={character.gender}
            />
          ))}
        </div>
      )}

      <div className='flex justify-center my-4'>
        <Pagination
       
          currentPage={currentPage}
          onPageChange={handlePageChange}
          showIcons
          totalPages={34} // Set the total number of pages according to the API response or any desired value
        />
      </div>
    </div>
  );
};

export default Index;
