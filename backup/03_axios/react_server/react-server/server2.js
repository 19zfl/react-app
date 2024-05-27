const express = require('express')
const app = express()

app.use((request, response, next)=>{
    console.log('有人请求了服务器2')
    console.log(request.get('Host'));
    console.log(request.url);
    next()
})

app.get('/cars', (request, response)=>{
    const cars = [
        {id:'001', name:'奔驰', price:50},
        {id:'002', name:'马自达', price:19},
        {id:'003', name:'捷达', price:12},
    ]
    response.send(cars)
})

app.listen(5001, (err)=>{
    if(!err) console.log('服务器2启动成功了，请求汽车信息地址为：http://localhost:5001/cars');
})