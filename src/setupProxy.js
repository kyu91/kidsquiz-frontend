const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
    '/api',
    createProxyMiddleware({
      // target: 'http://13.125.34.115:5000',
      target: 'http://localhost:5000',
      pathRewrite: {
        '^/api':'',
      },
      changeOrigin: true
    })
  )

};