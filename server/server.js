const app = require('./index.js');
const port = 4004;

app.listen(port, () =>
  console.log(`listening on port ${port}`));