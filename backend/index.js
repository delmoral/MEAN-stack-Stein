const express = require('express');
const morgan = require('morgan');
const path = require('path');
const multer = require('multer');
const cors = require('cors');

// Initializations
const app = express();
const { mongoose } = require('./database');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const storage = multer.diskStorage({
    destination: path.join(__dirname, '/public/uploads'),
    filename(req, file, cb){
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({storage}).single('image'));
app.use(cors({origin:'http://localhost:4200'}));

// Routes
app.use('/api/products',require('./routes/products.routes'));
app.use('/api/',require('./routes/login.routes'));

// Starting
app.listen(app.get('port'), () =>{
    console.log('Server listening on port: ' + app.get('port'));
});