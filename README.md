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



### React  Ajax

### React  Router

### React UI组件库

### Redux