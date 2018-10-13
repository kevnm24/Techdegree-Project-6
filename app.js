const express = require('express');
const data = require('./data.json');
const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'));
app.use('/images', express.static('images'));

app.get('/', (req, res) => {
  res.render('index', {data})
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/projects:id', (req, res) => {
  res.render('project', {
    data: data,
    id: req.params.id
  })
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status)
  res.render('error');
})

app.listen(3000, () => {
	console.log('app is running')
})
