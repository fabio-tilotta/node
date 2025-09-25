// server.js
const app = require('./app');

// Configurazione porta
const PORT = process.env.PORT || 3001;

// Avvio del server
app.listen(PORT, () => {
  console.log(`🚀 Server avviato su http://localhost:${PORT}`);
  console.log(`📖 API Documentation disponibile su http://localhost:${PORT}`);
});