const http = require("http");
const booksRoutes = require("./routes/books");

const server = http.createServer((req, res) => {
  const handled = booksRoutes(req, res);

  if (!handled) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});