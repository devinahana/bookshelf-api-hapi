import { v4 as uuidv4 } from 'uuid';
import { getLocalDateISO } from '../utils/utils.js';
import books from '../models/books.js';

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload;

  if (!name) {
    return h.response({
      	status: 'fail',
      	message: 'Gagal menambahkan buku. Mohon isi nama buku'
    	}).code(400);
  } else if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    }).code(400);
  }

  const id = uuidv4();
  const insertedAt = getLocalDateISO(new Date());
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;
  const book = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  };
  books.push(book);

  const isSuccess = books.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    }).code(201);
  }

  return h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  }).code(500);

};

const getAllBookHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  let fiteredBooks = books;

  if (name) {
    fiteredBooks = fiteredBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading === '0') {
    fiteredBooks = fiteredBooks.filter((book) => book.reading === false);
  } else if (reading === '1') {
    fiteredBooks = fiteredBooks.filter((book) => book.reading === true);
  }

  if (finished === '0') {
    fiteredBooks = fiteredBooks.filter((book) => book.finished === false);
  } else if (finished === '1') {
    fiteredBooks = fiteredBooks.filter((book) => book.finished === true);
  }

  const responseBooks = fiteredBooks.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  return h.response({
    status: 'success',
    data: {
      books: responseBooks,
    },
  });
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((book) => book.id === id)[0];
  if (book !== undefined) {
    return h.response({
      status: 'success',
      data: {
        book,
      },
    });
  }

  return h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
};

const editBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload;

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    }).code(400);
  } else if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    }).code(400);
  }

  const finished = pageCount === readPage;
  const updatedAt = getLocalDateISO(new Date());
  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
  	books[index] = {
      ...books[index],
      name,
      year,
		  author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt
  	};

    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
  }

  return h.response({
    status: 'fail',
  	message: 'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404);
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
  }

  return h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404);
};

export {
  addBookHandler,
  getAllBookHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler
};