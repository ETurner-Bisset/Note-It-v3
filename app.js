const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');

const userRouter = require('./routes/userRoutes');
const noteRouter = require('./routes/noteRoutes');
const viewRouter = require('./routes/viewRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

app.use(cors());

// Helmet
// Set security HTTP headers

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [
          "'self'",
          '*.fontawesome.com',
          '*/public/js',
          'wss://:*/',
          'https://api.web3forms.com/submit',
          '*.axios.com',
        ],
        baseUri: ["'self'"],
        fontSrc: ["'self'", 'https:', 'data:'],
        scriptSrc: [
          "'self'",
          '*.fontawesome.com',
          'unsafe-inline',
          'wss://:*/',
        ],
        scriptSrcAttr: ["'self'"],
        objectSrc: ["'none'"],
        styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
        upgradeInsecureRequests: [],
      },
    },
  }),
);

// Logging in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiter
// Limit requests from one IP
const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Body parser to read data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Data sanitization against NoSQL query injections
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter polution
app.use(hpp());

// Serving static files
app.use(express.static(`${__dirname}/public`));

app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//  Route mounting
app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/notes', noteRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
