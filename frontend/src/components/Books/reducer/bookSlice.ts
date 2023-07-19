import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Book {
  // Define your book properties here based on the API response
  id: string;
  title: string;
  author: string;
  // ... other properties
}

interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    fetchBooksStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBooksSuccess(state, action: PayloadAction<Book[]>) {
      state.loading = false;
      state.books = action.payload;
    },
    fetchBooksFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchBooksStart, fetchBooksSuccess, fetchBooksFailure } = booksSlice.actions;

export default booksSlice.reducer;

export const fetchBooks = (searchTerm: string): any => async (dispatch:any) => {
    try {
      dispatch(fetchBooksStart());
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      const booksData = data.items; // Assuming the API response contains an 'items' array
      const books = booksData.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : 'Unknown',
        // ... map other properties as needed
      }));
      dispatch(fetchBooksSuccess(books));
    } catch (error) {
      dispatch(fetchBooksFailure("error"|| 'Failed to fetch books'));
    }
  };
  