const books = require("../data/books");
const sendResponse = require("../response/sendResponse");
const parseBody = require("../response/parseBody");
const getIdFromUrl = require("../response/getIdFromUrl");

function booksRoutes(req, res) {
  if (req.method === "GET" && req.url === "/books") {
    sendResponse(res, 200, books);
    return true;
  }
  
  if (req.method === "GET" && req.url.startsWith("/books/")) {
    const id = getIdFromUrl(req.url);

    const book = books.find((b) => b.id === id);

    if (!book) {
      sendResponse(res, 404, { error: "Book not found" });
      return true;
    }

    sendResponse(res, 200, book);
    return true;
  }

  if (req.method === "POST" && req.url === "/books") {
    parseBody(req, (err, data) => {
      if (err) {
        return sendResponse(res, 400, { error: "Invalid JSON" });
      }

      if (!data.title) {
        return sendResponse(res, 400, { error: "Title is required" });
      }

      if (!data.author) {
        return sendResponse(res, 400, { error: "Author is required" });
      }

      const newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1,
        title: data.title,
        author: data.author,
        year: data.year,
      };

      books.push(newBook);

      sendResponse(res, 201, newBook);
    });

    return true;
  }

  if (req.method === "PUT" && req.url.startsWith("/books/")) {
    parseBody(req, (err, data) => {
      if (err) {
        return sendResponse(res, 400, { error: "Invalid JSON" });
      }

      const id = getIdFromUrl(req.url);
      const index = books.findIndex((b) => b.id === id);

      if (index === -1) {
        return sendResponse(res, 404, { error: "Book not found" });
      }

      const updated = {
        id,
        title: data.title,
        author: data.author,
        year: data.year,
      };

      books[index] = updated;

      sendResponse(res, 200, updated);
    });

    return true;
  }

  if (req.method === "PATCH" && req.url.startsWith("/books/")) {
    parseBody(req, (err, data) => {
      if (err) {
        return sendResponse(res, 400, { error: "Invalid JSON" });
      }

      const id = getIdFromUrl(req.url);
      const book = books.find((b) => b.id === id);

      if (!book) {
        return sendResponse(res, 404, { error: "Book not found" });
      }

      if (data.title !== undefined) book.title = data.title;
      if (data.author !== undefined) book.author = data.author;
      if (data.year !== undefined) book.year = data.year;

      sendResponse(res, 200, book);
    });

    return true;
  }

  if (req.method === "DELETE" && req.url.startsWith("/books/")) {
    const id = getIdFromUrl(req.url);

    const index = books.findIndex((b) => b.id === id);

    if (index === -1) {
      sendResponse(res, 404, { error: "Book not found" });
      return true;
    }

    books.splice(index, 1);

    res.writeHead(204);
    res.end();

    return true;
  }
  if (req.method === "OPTIONS" && req.url === "/books") {
    res.setHeader("Allow", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.writeHead(204);
    res.end();
    return true;
  }

  return false;
}

module.exports = booksRoutes;