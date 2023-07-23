const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/request', (req, res) => {
  const url = req.query.url;
  const headers = req.query.headers;
  const params = req.query.params;

  fetch(url, { headers, params })
    .then(response => {
      res.status(response.status);
      res.set(response.headers);
      return response.text();
    })
    .then(body => res.send(body))
    .catch(error => res.status(500).send(error.message));
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});