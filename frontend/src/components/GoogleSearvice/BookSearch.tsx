// // src/YourComponent.tsx
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../store';
// // import { fetchBooks } from '../bookSlice';

// const BookSearch: React.FC = () => {
//   const [query, setQuery] = useState('');
//   const books = useSelector((state: RootState) => state.books.books);
//   const loading = useSelector((state: RootState) => state.books.loading);
//   const error = useSelector((state: RootState) => state.books.error);
//   const dispatch = useDispatch();

//   const handleSearch = () => {
//     // dispatch(fetchBooks(query));
//     console.log("search");
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>

//       {loading && <p>Loading...</p>}

//       {error && <p>Error: {error}</p>}

//       {books.map((book) => (
//         <div key={book.id}>
//           <h2>{book.title}</h2>
//           <p>Authors: {book.authors.join(', ')}</p>
//           <p>{book.description}</p>
//           {book.thumbnail && <img src={book.thumbnail} alt={book.title} />}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BookSearch;

// import React from 'react';
// import {useGetAllProductsQuery} from '../bookSlice';
// const BookSearch = () => {

//   const { data } = useGetAllProductsQuery();
//   console.log(data);

//  return (
//   <div>
//     salam
//   </div>
//  )

// }
// export default BookSearch;


// import { Link } from 'react-router-dom';

// function HeaderLogo() {
//     return (
//         <div>
//             <Link to="/" aria-label="Bookster" style={{textDecoration:"none"}}>
//                 <div id="header__id"> 
//                 BookApp         
//                 </div>
//             </Link>
//         </div>
//     );
// };


// export default HeaderLogo;


import {
  useGetAllProductsQuery,
  useGetProductQuery,
} from "./reducer/bookSlice";
import React from 'react';
export const Data = () => {
  const {
    data: allProductsData,
    error,
    isError,
    isLoading,
  } = useGetAllProductsQuery("/");
  const { data: singleProductData } = useGetProductQuery("iphone");

  console.log(allProductsData);
  console.log(singleProductData);

  if (isLoading) return <h1 style={{
    marginTop: "200px",
    position: "relative",
    display: "block",
    textAlign: "center",
  }}> Loading...</h1>;
  return <div style={{
    marginTop: "200px",
    position: "relative",
    display: "block",
    textAlign: "center",
  }}>
    {/* {books.map((book) => (
    //         <div key={book.id}>
    //           <h2>{book.title}</h2>
    //           <p>Authors: {book.authors.join(', ')}</p>
    //           <p>{book.description}</p>
    //           {book.thumbnail && <img src={book.thumbnail} alt={book.title} />}
    //         </div>
    //       ))} */}
    {allProductsData.products.map((item: any) => (
      <div key={item.id}>
        <h2>{item.title}</h2>
        <p>{item.title}</p>
        <p>{item.description}</p>
        {item.thumbnail && <img src={item.thumbnail} alt={item.title} />}
      </div>
    ))

    }

  </div>;
};