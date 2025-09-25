const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test')
  .then(() => console.log('Connesso a MongoDB!'))
  .catch(err => console.error('Errore di connessione:', err));