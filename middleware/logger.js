const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  
  // Logghiamo informazioni sulla richiesta
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', JSON.stringify(req.body, null, 2));
  }
  
  next();
};

module.exports = logger;