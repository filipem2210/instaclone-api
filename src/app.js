const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');
const { errors } = require('celebrate');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(helmet());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(morgan('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(express.json());
app.use('/api/static/images/post', express.static(path.resolve(__dirname, '..', 'uploads', 'posts')));
app.use('/api/static/images/avatar', express.static(path.resolve(__dirname, '..', 'uploads', 'avatar')));
app.use('/api', require('./routes'));

app.use(errors());

module.exports = server;
