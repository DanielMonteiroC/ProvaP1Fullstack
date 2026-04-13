const logger = (req, res, next) => {
  const method = req.method;
  const url = req.originalUrl;
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${method} ${url} - Body:`, req.body);
  
  // Opcional: Monitorizar quanto tempo a requisição demorou
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${timestamp}] ${method} ${url} - Status: ${res.statusCode} - ${duration}ms`);
  });

  next();
};

module.exports = logger;
