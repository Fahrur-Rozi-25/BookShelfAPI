
// const books = require('../models/bookModel');
// const { nanoid } = require('nanoid');


// const getAllBooks = (req, res) => {
//     res.json({ status: 'success', data: { books } });
//   };

//   const getBookById = (req, res) => {
//     const id = req.params.id;
//     const book = books.find((book) => book.id === id);
//     if (book) {
//       res.json({ status: 'success', data: { book } });
//     } else {
//       res.status(404).json({ status: 'fail', message: 'Buku tidak ditemukan' });
//     }
//   };

// const addBook = (req, res) => {
//     const {
//       name,
//       year,
//       author,
//       summary,
//       publisher,
//       pageCount,
//       readPage,
//       reading,
//     } = req.body;
  
//     if (!name) {
//       return res.status(400).json({ status: 'fail', message: 'Gagal menambahkan buku. Mohon isi nama buku' });
//     }
  
//     if (readPage > pageCount) {
//       return res.status(400).json({ status: 'fail', message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount' });
//     }
  
//     const id = nanoid(10);
//     const insertedAt = new Date().toISOString();
//     const updatedAt = insertedAt;
//     const finished = pageCount === readPage;
  
//     const newBook = {
//       id,
//       name,
//       year,
//       author,
//       summary,
//       publisher,
//       pageCount,
//       readPage,
//       reading,
//       finished,
//       insertedAt,
//       updatedAt,
//     };
  
//     books.push(newBook);
//     res.status(201).json({ status: 'success', message: 'Buku berhasil ditambahkan', data: { bookId: id } });
//   };


//   const updateBook = (req, res) => {
//     const id = req.params.id;
//     const {
//       name,
//       year,
//       author,
//       summary,
//       publisher,
//       pageCount,
//       readPage,
//       reading,
//     } = req.body;
  
//     const bookIndex = books.findIndex((book) => book.id === id);
//     if (bookIndex === -1) {
//       return res.status(404).json({ status: 'fail', message: 'Gagal memperbarui buku. Id tidak ditemukan' });
//     }
  
//     if (!name) {
//       return res.status(400).json({ status: 'fail', message: 'Gagal memperbarui buku. Mohon isi nama buku' });
//     }
  
//     if (readPage > pageCount) {
//       return res.status(400).json({ status: 'fail', message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount' });
//     }
  
//     const updatedAt = new Date().toISOString();
//     const finished = pageCount === readPage;
  
//     const updatedBook = {
//       ...books[bookIndex],
//       name,
//       year,
//       author,
//       summary,
//       publisher,
//       pageCount,
//       readPage,
//       reading,
//       finished,
//       updatedAt,
//     };
  
//     books[bookIndex] = updatedBook;
//     res.json({ status: 'success', message: 'Buku berhasil diperbarui' });
//   };
  

//   const deleteBook = (req, res) => {
//     const id = req.params.id;
//     const bookIndex = books.findIndex((book) => book.id === id);
//     if (bookIndex === -1) {
//       return res.status(404).json({ status: 'fail', message: 'Buku gagal dihapus. Id tidak ditemukan' });
//     }
  
//     books.splice(bookIndex, 1);
//     res.json({ status: 'success', message: 'Buku berhasil dihapus' });
//   };

// module.exports = {
//     getAllBooks,
//     getBookById,
//     addBook,
//     updateBook,
//     deleteBook,
//   };

const bookModel = require('../models/bookModel');

const getAllBooksHandler = (request, h) => {
  const books = bookModel.getAllBooks();
  return { status: 'success', data: { books } };
};

const getBookByIdHandler = (request, h) => {
  const id = request.params.bookId;
  const book = bookModel.getBookById(id);
  if (book) {
    return { status: 'success', data: { book } };
  } else {
    return h.response({ status: 'fail', message: 'Buku tidak ditemukan' }).code(404);
  }
};

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    return h.response({ status: 'fail', message: 'Gagal menambahkan buku. Mohon isi nama buku' }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({ status: 'fail', message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount' }).code(400);
  }

  const newBook = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  };

  const bookId = bookModel.addBook(newBook);
  return h.response({ status: 'success', message: 'Buku berhasil ditambahkan', data: { bookId } }).code(201);
};

const updateBookHandler = (request, h) => {
  const id = request.params.bookId;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const book = bookModel.getBookById(id);

  if (!book) {
    return h.response({ status: 'fail', message: 'Gagal memperbarui buku. Id tidak ditemukan' }).code(404);
  }

  if (!name) {
    return h.response({ status: 'fail', message: 'Gagal memperbarui buku. Mohon isi nama buku' }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({ status: 'fail', message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount' }).code(400);
  }

  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;

  const updatedBook = {
    ...book,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    updatedAt,
  };

  bookModel.updateBook(id, updatedBook);
  return h.response({ status: 'success', message: 'Buku berhasil diperbarui' }).code(200);
};

const deleteBookHandler = (request, h) => {
  const id = request.params.bookId;
  const book = bookModel.getBookById(id);

  if (!book) {
    return h.response({ status: 'fail', message: 'Buku gagal dihapus. Id tidak ditemukan' }).code(404);
  }

  bookModel.deleteBook(id);
  return h.response({ status: 'success', message: 'Buku berhasil dihapus' }).code(200);
};

module.exports = {
  getAllBooksHandler,
  getBookByIdHandler,
  addBookHandler,
  updateBookHandler,
  deleteBookHandler,
};
