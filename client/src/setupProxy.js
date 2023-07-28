const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  const proxySever = createProxyMiddleware(['/api', '/socket'], {
    target: 'http://localhost:5000',
    changeOrigin: true,
    ws: true,
  });
  app.use(proxySever);
};
