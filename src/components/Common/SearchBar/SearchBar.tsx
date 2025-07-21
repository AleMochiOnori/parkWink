import React, { useState } from 'react';
import './SearchBar.css';


interface Props {
  setSearchTerm: (term: string) => void;
  value : string;
}


const SearchBar: React.FC<Props> = ({ setSearchTerm , value }) => {
  return (
    <form className='search-input'>
      <input className='barraRicerca'
        type="text"
        placeholder="Cerca..."
        value={value}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ marginRight: '0.5rem' }}
      />
    </form>
  );
};

export default SearchBar;