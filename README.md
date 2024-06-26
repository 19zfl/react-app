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
	index.jsx --- 入口文件
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

##### 扩展 Fetch

**文档**
> https://github.github.io/fetch/ （已失效）
> https://segmentfault.com/a/1190000003810652

**特点**
1. fetch：原生函数，不再使用XmlHttpRequest对象提交ajax请求
2. 老版本浏览器可能不支持

##### github搜索案例总结：

1. 设计状态是要考虑全面，例如带有网络请求的组件，要考虑请求失败怎么办

2. ES6小知识点：解构赋值+重命名

   ```
   let obj = {a:{b:1}}
   const {a} = obj // 传统解构赋值
   const {a:{b}} = obj // 连续解构赋值
   const {a:{b:value}} - obj // 连续解构赋值+重命名
   ```

3. 消息订阅与发布机制

   1. 先订阅，再发布（理解：有一种隔空对话的感觉）
   2. 适用于任意组件间通信
   3. 要在组件的componentWillUnmout中取消订阅

4. fetch发送请求（关注分离的设计思想）

   ```
   try {
   	const response = await fetch('/api/users')
   	const data = await response.json()
   	console.log(data)
   } catch(error) {
   	console.log(error.message)
   }
   ```

### React  Router

#### 相关理解：

**SPA的理解：**

- 单页Web应用（single page web application，SPA）
- 整个应用只有一个完整的页面
- 点击页面中的链接不会刷新页面，只会做页面的局部刷新
- 数据都需要通过ajax请求获取，并在前端异步展现

##### 路由的理解：

1. **什么是路由：**
   1. 一个路由就是一个映射关系（key：value）
   2. key为路径，value可能是function或component
2. **路由分类**
   1. 后端路由
      1. 理解：value是function，用来处理客户端提交的请求
      2. 注册路由：router.get(path, function(req, res))
      3. 工作过程：当node接收到一个请求时，根据请求路径找到匹配的路由，调用路由中的函数来处理请求，返回响应数据
   2. 前端路由：
      1. 浏览器路由，value是component，用于展示页面内容
      2. 注册路由：`<Route path="/test" component={Test}>`
      3. 工作过程：当浏览器的path变为/test时，当前路由组件就会变为Test组件

#### react-router-dom

理解：

- React的一个插件库
- 专门用来实现一个SPA应用
- 基于React的项目基本都会用此库

内置组件

- `<BrowserRouter>`

- `<HashRouter>`
- `<Route>`
- `<Redirect>`

- `<Link>`
- `<NavLink>`
- `<Switch`

#### 路由的基本使用：

1. 明确好界面中的导航区，展示区
2. 导航区的a标签改为Link标签：`<Link to='/xxx' component={Demo}></Link>`

3. 展示区写Route标签进行路径的匹配：`<Route path='/xxx' component={Demo}/>`

4. `<App>`的最外侧包裹一个`<BrowserRoute>`或`<HashRouter>`

##### 路由组件与一般组件

1. 写法不同：
   1. 一般组件：`<Demo/>`
   2. 路由组件：`<Route path='/xxx' component={<Demo>}/>`
2. 存放位置不同：
   1. 一般组件：components
   2. 路由组件：pages
3. 接收到的props不同：
   1. 一般组件：写组件标签是传递了什么，就能接收到什么
   2. 路由组件：接收到三个固定的属性

1. **history**: 
   1. **go**: *ƒ go(n)*
   2. **goBack**: *ƒ goBack()*
   3. **goForward**: *ƒ goForward()
   4. **push**: *ƒ push(path, state)*
   5. **replace**: *ƒ replace(path, state)*
2. **location**: 
   1. **pathname**: "/about"
   2. **search**: ""
   3. **state**: undefined
3. **match**: 
   1. **params**: {}
   2. **path**: "/about"
   3. **url**: "/about"

##### NavLink与封装NavLink

1. NavLink可以实现路由链接的高亮，通过activeClassName指定样式名；
2. 标签体内容是一个特殊的标签属性；
3. 通过this.props.children可以获取标签体内容.

##### Switch的使用

1. 通常情况下,path和component是一一对应关系;
2. Switch可以提高路由匹配效率(单一匹配)

##### 解决多级路径刷新页面样式丢失的问题

1. public/index.html中引入样式时不写 ./ 写 / (常用)
2. public/index.html中引入样式时不写 ./ 写 %PUBLIC_URL% (常用)
3. 使用HashRouter

##### 路由的严格匹配与模糊匹配

1. 默认使用的是模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】,且顺序要一致）
1. 开启严格匹配：`<Route exact={true} path='/home' component={Home}/>` exact={true}可以缩写成exact
1. 严格匹配不要随便开启，需要时再开，有些时候开启会导致无法继续匹配二级路由

##### Redirect的作用

1. 一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由
2. 具体编码：

```jsx
<Switch>
	<Route path="/home" component={Home} />
	<Route path="/about" component={About} />
	<Redirect to='/Home' />
</Switch>
```

##### 嵌套路由使用

1. 注册子路由时要写上父路由的path值；
2. 路由的匹配是按照注册路由的顺序进行的。

##### 路由组件传递参数

1. params参数：

   > 路由链接(携带参数): `<Link to='/demo/test/tom/18'>详情</Link>`
   >
   > 注册路由(声明接收):`<Route path="/demo/test/:name/:age" component={Test}/>`
   >
   > 接受参数:`this.props.match.params`

2. search参数：

   > 路由链接(携带参数): `<Link to='/demo/test/?name=tom&age=18'>详情</Link>`
   >
   > 注册路由(无需声明，正常注册即可):`<Route path="/demo/test" component={Test}/>`
   >
   > 接受参数:`this.props.location.search`
   >
   > 备注：获取到的search是urlencoded编码字符串，需要借助querystring解析

3. state参数：

   > 路由链接(携带参数): `<Link to={{pathname:'/demo/test', state:{name:tom, age:19}}}>详情</Link>`
   >
   > 注册路由(无需声明，正常注册即可):`<Route path="/demo/test" component={Test}/>`
   >
   > 接受参数:`this.props.location.state`
   >
   > 备注：刷新也会保留数据

##### 编程式路由导航

借助this.props.history对象上的API对操作路由跳转、前进、后退

- this.props.history.go()
- this.props.history.push()
- this.props.history.replace()
- this.props.history.goBack()
- this.props.history.goForward()

##### BrowserRouter与HashRouter的区别

1. 底层原理不一样：
   1. BrowserRouter使用的是H5的history API，不兼容IE9及以下版本；
   2. HashRouter使用的是URL的哈希值。
2. url表现形式不一样：
   1. BrowserRouter的路径中没有#，例如：localhost:3000/demo/test
   2. HashRouter的路径中包含#，例如：localhost:3000/#/demo/test
3. 刷新后对路由state参数的影响：
   1. BrowserRouter没有任何影响，因为state保存在history对象中；
   2. HashRouter刷新后会导致路由state参数的丢失。
4. 备注：HashRouter可以用于解决一些路径错误相关的问题



### React UI组件库

##### 流行的开源React UI组件库

- material-ui（国外Google）
  - 官网：http://www.material-ui.com/#/
  - github：https://github.com/callemall/material-ui
- ant-design（国内蚂蚁金服）
  - 官网：https://ant-design.antgroup.com/index-cn?from=msidevs.net
  - github：https://github.com/ant-design/ant-design/

### Redux

#### 理解：

##### 学习文档：

1. 英文文档：https//redux.js.org/
2. 中文文档：http://www.redux.org.cn/
3. Github：https://github.com/reactjs/redux

##### Redux是什么？

- redux是一个专门用于做状态管理的js库（不是React插件库）；
- 它可以用于在React，Angular，Vue项目中，但基本与React配合使用；
- 作用：集中式管理React应用中多个组件共享状态。

##### 什么情况下需要使用Redux？

- 某个组件的状态，需要让其他组件可以随时拿到（共享）；
- 一个组件需要改变另一个组件的状态（通信）；
- 总体原则：能不用就不用，如果不用比较吃力就考虑使用。

##### Redux工作原理：

![image-20240625202023365](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/202406252020503.png)

##### Redux的三个核心概念

**action**

1. 动作对象
2. 包含两个属性
   1. type：标识属性，值为字符串，唯一，必要属性
   2. data：数据属性，值类型任意，可选属性
3. 例子：{type：‘ADD_STUDENT‘，data：{name：’tom‘，age：18}}

**reducer**

1. 用于初始化状态，加工状态
2. 加工时，根据旧的state和action，产生新的state的纯函数

**store**

1. 将state、action、reducer联系在一起的对象
2. 如何得到此对象？
   1. import {createStore} from 'redux'
   2. import reducer from './reducers'
   3. const store = createStore(reducer)
3. 此对象的功能？
   1. getState()：得到state
   2. dispatch(action)：分发action，触发reducer调用，产生新的state
   3. subscribe(listener)：注册监听，当产生了新的state时，自动调用

##### Redux的核心API























### 函数积累：

| 名称              | 含义               | 适用标签或对象 |
| ----------------- | ------------------ | -------------- |
| onMouseEnter      | 鼠标移入           | 所有原生标签   |
| onMouseLeave      | 鼠标移出           | 所有原生标签   |
| reduce            | 太多，见MDN解释    | array          |
| slice(start, end) | 截取字符串或者数组 | array,string   |

### 结构赋值：

![image-20240528092850145](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/202405280928317.png)

![image-20240528092909545](https://gitee.com/coder_zfl/markdown-image-cloud-drive/raw/master/markdown/202405280929594.png)

只能拿到value，keyWordNode是undefined

连续结构赋值加上重命名：

```js
let obj = {a:{b:1}}
const {a:{b}} = obj // 没有重命名写法
console.log(b) // 1
const {a:{b:data}} = obj // 重命名b
console.log(data) // 1
```



<font color=red>**关于jsx中书写html、css或者js的语法在react-basic中的01_介绍中。**</font>
