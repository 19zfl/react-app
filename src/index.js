import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //   <React.StrictMode></React.StrictMode> 标签开始对说包组件内所有组件的代码语法审查，例如ref="input"，就会警告此写法过时了
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();