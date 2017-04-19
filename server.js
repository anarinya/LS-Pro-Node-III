const express = require('express');
const bodyParser = require('body-parser');

const books = require('./books');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/books', (req, res) => res.send(books));

app.get('/book/:id', (req, res) => {
  const bookId = Number(req.params.id);
  let info = 'Book not found.';

  books.forEach(book => {
    if (book.id === bookId) info = book;
  });
  
  res.send(info);
});

app.post('/newBook', (req, res) => {
  const errors = [];
  const newBook = req.body;
  const keys = ['name', 'author', 'pageCount'];
  const newId = books.length + 1;

  // check for undefined book details
  keys.forEach((key) => {
    if (newBook[key] === undefined) {
      errors.push(`Cannot add book, missing book ${key}.`);
    }
  });

  if (errors.length) return res.send(errors.join('\r'));

  newBook.id = newId;
  books.push(newBook);

  res.send('Book added successfully!');
});

app.listen(port, () => console.log(`Server running on port ${port}.`));