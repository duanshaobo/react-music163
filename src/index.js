import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// 导入antd的样式文件
import 'antd/dist/antd.css';
// 导入http.js
import './utils/http';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
