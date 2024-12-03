import * as handler from '../services/handler.js';

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: handler.addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: handler.getAllBookHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: handler.getBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: handler.editBookByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: handler.deleteBookByIdHandler,
  },
];

export default routes;