const express = require("express");
const path = require("path");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const app = express();
const port = 3000;

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

app.use(connectLivereload());

// Set public folder as root
app.use(express.static('public'));

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));


app.get("/*", (req, res) => {
    res.sendFile(path.resolve("public", "index.html"));
});

// Listen for HTTP requests on port 3000
app.listen(port, () => {
  console.log('listening on %d', port);
});