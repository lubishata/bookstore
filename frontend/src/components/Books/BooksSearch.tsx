// components/BooksPage.tsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchBooks, Book } from './reducer/bookSlice';

const BooksPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.books.books);
  const loading = useSelector((state: RootState) => state.books.loading);
  const error = useSelector((state: RootState) => state.books.error);

  

  const handleSearch = () => {
    dispatch(fetchBooks(searchTerm));
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default BooksPage;
