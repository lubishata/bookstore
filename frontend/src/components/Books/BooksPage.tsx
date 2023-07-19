// components/BooksPage.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchBooks, Book } from './reducer/bookSlice';

const BooksPage: React.FC = () => {
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.books.books);
  const loading = useSelector((state: RootState) => state.books.loading);
  const error = useSelector((state: RootState) => state.books.error);

  // Fetch books when the component mounts (without the need for search)
  useEffect(() => {
    dispatch(fetchBooks('react')); // Replace 'react' with the default search term you want
  }, [dispatch]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {books.map((book:Book) => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            {/* Display other book properties as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksPage;
