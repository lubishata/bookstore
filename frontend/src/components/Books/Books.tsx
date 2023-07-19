import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchBooks, Book } from './reducer/bookSlice';
import BooksPage from './BooksPage';
import BooksSearch from './BooksSearch';


const Books: React.FC = () => {

  return (
    <div style={{
      margin: "50px auto",
      position: "relative",
      display: "block",
      textAlign: "center",
    }}>
      <BooksSearch />
      <BooksPage />
    </div>
  );
};

export default Books;
