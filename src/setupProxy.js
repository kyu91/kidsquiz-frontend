const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://13.125.34.115:4000',
      // target: 'https://localhost:4000',
      pathRewrite: {
        '^/api':'',
      },
      changeOrigin: true
    })
  )

};