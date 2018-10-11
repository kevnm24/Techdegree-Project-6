const express = require('express');
const data = require('./data');
const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
  const locals = data.projects;
  res.render('index', {locals})
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/project:id', (req, res) => {
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
