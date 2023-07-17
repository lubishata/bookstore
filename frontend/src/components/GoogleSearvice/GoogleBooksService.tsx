// // src/GoogleBooksService.ts
// export interface Book {
//   id: string;
//   title: string;
//   authors: string[];
//   description: string;
//   thumbnail: string;
// }

// export async function searchBooks(query: string): Promise<Book[]> {
//   try {
//     const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
//     if (!response.ok) {
//       throw new Error('Network response was not ok.');
//     }
//     const data = await response.json();
//     const books: Book[] = data.items?.map((item: any) => ({
//       id: item.id,
//       title: item.volumeInfo.title,
//       authors: item.volumeInfo.authors || [],
//       description: item.volumeInfo.description || '',
//       thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
//     })) || [];
//     return books;
//   } catch (error) {
//     console.error('Error fetching books:', error);
//     return [];
//   }
// }
