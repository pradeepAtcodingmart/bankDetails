const express = require('express');
const path = require('path'); // NEW
const app = express();
const port = process.env.PORT || 5000;
const DIST_DIR = path.join(__dirname, './build'); // NEW
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW

app.engine('html', require('express-dot-engine').__express);
app.use(express.static(DIST_DIR)); // NEW

app.get('/*', (req, res) => {
  res.sendFile(HTML_FILE); // EDIT
});
app.listen(port, function () {
  console.log('App listening on port: ' + port);
});
