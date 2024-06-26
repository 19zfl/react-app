const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api1', { // 遇见/api1前缀请求，就会触发该代理配置
            target: 'http://localhost:5000', // 请求转发给谁
            changeOrigin: true, // 控制服务器收到的请求头中的Host的值
            pathRewrite: {'^/api1': ''} // 重写请求路径（必须），他会将请求路径中的‘/api’忽略，如果不写，请求路径中会多出/api1导致请求路径不对
        }),
        createProxyMiddleware('/api2', {
            target: 'http://localhost:5001',
        })
    )
}