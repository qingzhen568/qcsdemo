import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './router';
import * as serviceWorker from './serviceWorker';
//引入配置px转rem
import 'react-flexible'
import 'reset-css'
//引入 antd 样式
import 'antd/dist/antd.css';
//引入小图标库
import 'font-awesome/css/font-awesome.min.css'

ReactDOM.render(<App></App>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
