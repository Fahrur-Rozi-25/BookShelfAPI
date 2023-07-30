// const express = require('express');
// const router = express.Router();
// const bookController = require('./controllers/bookController');

// router.get('/books', bookController.getAllBooks);
// router.get('/books/:id', bookController.getBookById);
// router.post('/books', bookController.addBook);
// router.put('/books/:id', bookController.updateBook);
// router.delete('/books/:id', bookController.deleteBook);

// module.exports = router;
const bookController = require('./controllers/bookController');

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: bookController.getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: bookController.getBookByIdHandler,
  },
  {
    method: 'POST',
    path: '/books',
    handler: bookController.addBookHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: bookController.updateBookHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: bookController.deleteBookHandler,
  },
];

module.exports = routes;
