// const books = [
//     { id: '1L7ZtDUFeGs7VlEt', name: 'Buku A', year: 2010, author: 'John Doe', summary: 'Lorem ipsum dolor sit amet', publisher: 'Dicoding Indonesia', pageCount: 100, readPage: 25, reading: false, finished: false, insertedAt: '2021-03-04T09:11:44.598Z', updatedAt: '2021-03-04T09:11:44.598Z' },
//   ];
  
//   module.exports = books;
  
const { nanoid } = require('nanoid');

const books = [];

const getAllBooks = () => books;

const getBookById = (id) => books.find((book) => book.id === id);

const addBook = (newBook) => {
  const id = nanoid(10);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = newBook.pageCount === newBook.readPage;

  const book = {
    id,
    insertedAt,
    updatedAt,
    finished,
    ...newBook,
  };

  books.push(book);
  return id;
};

const updateBook = (id, updatedBook) => {
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex !== -1) {
    books[bookIndex] = { ...books[bookIndex], ...updatedBook };
  }
};

const deleteBook = (id) => {
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};
