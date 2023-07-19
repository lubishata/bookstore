import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Book {
  // Define your book properties here based on the API response
  id: string;
  title: string;
  author: string;
  isbn: string;
  price: string;
  quantity: number;
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
//'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFjY291bnRAYWJ2Lmd6Iiwic3ViIjoxNiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2ODk3ODA5OTEsImV4cCI6MTY4OTc4NDU5MX0.29AluIhQjSTlEKsI1ir8UgVt99jrZiudJ9kKcniI9C8"

export const fetchBooks = (searchTerm: string): any => async (dispatch: any) => {
  try {
    dispatch(fetchBooksStart());
    const response = await fetch(`http://localhost:3000/books`, {
      headers: {
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFjY291bnRAYWJ2Lmd6Iiwic3ViIjoxNiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE2ODk3ODA5OTEsImV4cCI6MTY4OTc4NDU5MX0.29AluIhQjSTlEKsI1ir8UgVt99jrZiudJ9kKcniI9C8"
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    const data = await response.json();
    const booksData = data.data; // Assuming the API response contains an 'items' array
    const books = booksData.map((item: any) => ({
      id: item.id,
      title: item.title,
      author: item.author ? item.author : 'Unknown',
      isbn: item.isbn,
      price: item.price,
      quantity: item.quantity,
      // ... map other properties as needed
    }));
    dispatch(fetchBooksSuccess(books));
  } catch (error) {
    dispatch(fetchBooksFailure("error" || 'Failed to fetch books'));
  }
};
