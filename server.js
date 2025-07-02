const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;

const server = http.createServer((req, res) => {
  // Handle root path and file paths
  let filePath = "." + req.url;
  if (filePath === "./") {
    filePath = "./index.html"; // Double-check this filename for spaces/typos!
  }

  // Set MIME types
  const extname = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
  };

  const contentType = mimeTypes[extname] || "application/octet-stream";

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === "ENOENT") {
        // Serve 404 page
        fs.readFile("./404.html", (error404, content404) => {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(content404 || "404 Not Found");
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      // Serve the file with the correct Content-Type
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
