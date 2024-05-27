# React应用

本项目接着react-basic

### React CLI

- xxx脚手架：用来帮助程序员快速搭建一个基于xxx库的模板项目
  - 包含了所有需要的配置（语法检查、jsx编译、devServer等）
  - 下载好了所有相关的依赖
  - 可以直接运行一个简单效果
- React提供了一个用于创建React项目的脚手架库：create-react-app
- 项目的整体技术架构为：React + WebPack + ES6 + ESlint
- 使用脚手架开发项目的特点：模块化、组件化、工程化

#### 创建项目并启动

- 第一步，全局安装：npm install -g create-react-app
- 第二步，切换到想创项目的目录，使用命令：create-react-app hello-react
- 第三步，进入项目文件夹：cd hello-react
- 第四步，启动项目npm start

#### React脚手架项目结构

```
public --- 静态资源文件夹
	favicon --- 网站页签图标
	index.html --- 主页面
	logo192.png --- logo图
	logo512.png --- logo图
	manifest.json --- 应用加壳的配置文件
	robots.txt --- 爬虫协议文件
src -- 源码文件夹
	App.css --- App组件样式
	App.js --- App组件
	App.test.js --- 用于给App做测试
	index.css --- 样式
	index.js --- 入口文件
	logo.svg --- logo图
	reportWebVitals.js --- 页面性能分析文件（需要web-vitals库的支持）
	setupTests.js --- 组件单元测试文件（需要jest-dom库的支持）
```

#### 功能界面的组件化编码流程

1. 拆分组件：拆分界面，抽取组件
2. 实现静态组件：使用组件实现静态页面效果
3. 实现动态组件
   1. 动态显示初始化数据
      1. 数据类型
      2. 数据名称
      3. 保存在哪个组件
   2. 交互（从绑定事件监听开始）

#### 组件的组合使用-ToDoList

重要思路：

- 如果子组件需要修改父组件的数据，那么父组件需要向子组件传递一个箭头函数的props，子组件拿到箭头函数就可以进行传递数据

- 拆分组件，实现静态组件，注意：className、style写法
- 动态初始化列表，如何确认将数据放在哪个组件的state中
  - 某个组件使用：放在自身的state中
  - 某些组件使用：放在它们共同的父组件state中（官方称此操作为：状态提升）
- 关于父子之间通信：
  - 父组件给子组件传递数据：通过props传递
  - 子组件给父组件传递数据：通过props传递，要求父组件提前给子组件传递一个函数
- 注意：defaultChecked和checked的区别，类似有：defaultValue和value
- 状态在哪，操作状态的方法就在哪

### React  Ajax

#### 前置说明：

- React本身只关注于界面，并不包含发送Ajax请求的代码
- 前端应用只需要通过Ajax请求与后台进行交互（json数据）
- React应用中需要集成第三方Ajax库（或自己封装）

#### 常用的Ajax请求库

- jQuery比较重，如果需要另外引入，不建议使用
- axios轻量级，建议使用
  - 封装XmlHttpRequest对象的Ajax
  - Promise风格
  - 可以用在浏览器端和node服务器端

#### axios

##### 前端解决跨域问题

**方法一：**package.json中添加一段代码如下图：

![image-20240527231550263](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/202405272315335.png)

>解释：proxy代理的意思，就是相当于本地开启了代理，使用了资源目标所在ip加端口，localhost:5000这个ip地址是请求目标ip地址，添加了之后，在发送请求之后（请求路径是自己：localhost:3000），如果参数在自己项目的public文件夹中有，优先获取本地自己的，如果本地public文件夹没有，则向目标ip地址请求资源，缺点是配置了之后只能访问此ip端口的资源，而不能访问其他ip端口资源，如果你的项目需要访问多个ip端口的资源，这样就无法到达你的预期。

**方法二：**使用React脚手架提供的setupProxy.js文件配置，如下图，分别是老版本和最新版本的配置示例：

![image-20240528000829518](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/202405280008624.png)

![image-20240528000908984](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/202405280009039.png)

接下来的图片展示了changeOrigin和pathRewrite两个属性写与不写的区别：

![image-20240528001203497](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/202405280012544.png)

![image-20240528001210775](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/202405280012809.png)

解释：请求端是：localhost:3000，被请求端是：localhost:5000

如果不写changeOrigin，则被请求方会得到你的真实ip：port

如果不写pathRewrite，则请求路径中会多出一段字符串，而被请求放暴露的请求接口路径没有这一段，会导致请求不到数据

##### React脚手架配置代理总结：

**方法一：**

> 在package.json中追加如下配置

```js
"proxy": "http://localhost:5000"
```

说明：

1. 优点：配置简单，前端请求资源时可以不加任何前缀。
2. 缺点：不能配置多个代理。
3. 工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000（优先匹配前端资源）

**方法二：**

1.第一步：创建代理配置文件

```js
在src下创建setupProxy.js文件
```

2.编写setupProxy.js配置具体代理规则：

```js
// 旧版本api
const proxy = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        proxy('/api1', { // /api1是需要转发的请求（所有带有/api1前缀的请求都会转发给5000
            target: 'http://localhost:5000', // 配置转发目标地址（能返回数据的服务器地址）
            changeOrigin: true, // 控制服务器收到的请求头中的Host字段的值
            pathRewrite: {'^/api1': ''} // 去除请求前缀，保证交给后台服务器的是正常请求地址（必须配置）
        }),
        proxy('/api2', {
            target: 'http://localhost:5001',
        })
    )
}
// changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000(自己)
// changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000(请求方的ip:port)
// changeOrigin默认值为false，但我们一般将changeOrigin值设为true
```

```js
// React18 api
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
```

说明：

1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
2. 缺点：配置繁琐，前端请求资源时必须加前缀。



### React  Router

### React UI组件库

### Redux



函数积累：

| 名称         | 含义            | 适用标签或对象 |
| ------------ | --------------- | -------------- |
| onMouseEnter | 鼠标移入        | li、           |
| onMouseLeave | 鼠标移出        | li、           |
| reduce       | 太多，见MDN解释 | array          |
