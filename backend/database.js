const mongoose = require('mongoose');
const URI = 'mongodb://localhost/lista-compra';

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then( db => console.log('DB is connected.'))
.catch( err => console.err(err));

module.exports = mongoose;