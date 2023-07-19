export interface BookSeed {
  title: string;
  author: string;
  isbn: string;
  price: number;
  quantity: number;
}

export const bookSeedData: BookSeed[] = [
  {
    title: '1984',
    author: 'George Orwell',
    isbn: '9780451524935',
    price: 7.48,
    quantity: 10,
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    isbn: '9788129116123',
    price: 6.99,
    quantity: 15,
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '9780446310789',
    price: 11.49,
    quantity: 25,
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '9780743273565',
    price: 12.99,
    quantity: 17,
  },
  {
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    isbn: '9781451673319',
    price: 8.36,
    quantity: 41,
  },
  {
    title: 'The Count of Monte Cristo',
    author: 'Alexandre Dumas',
    isbn: '9789388423113',
    price: 13.99,
    quantity: 13,
  },
  {
    title: 'Lord of the Flies',
    author: 'William Golding',
    isbn: '9780399501487',
    price: 5.79,
    quantity: 74,
  },
  {
    title: 'Frankenstein',
    author: 'Mary Shelley',
    isbn: '9780486282114',
    price: 5.99,
    quantity: 33,
  },
  {
    title: 'The Hitchhiker’s Guide to the Galaxy',
    author: 'Douglas Adams',
    isbn: '9780671432416',
    price: 6.75,
    quantity: 8,
  },
  {
    title: 'War and Peace',
    author: 'Leo Tolstoy',
    isbn: '9781400079988',
    price: 19.29,
    quantity: 3,
  },
];
