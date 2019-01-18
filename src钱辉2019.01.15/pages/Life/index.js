import React, { Component } from 'react';

import './index.scss'

export default class Life extends Component {
    
    //组件销毁前  ，将未更新完的状态停止
	componentWillUnmount(){
		this.setState=(state,callback)=>{
			return;
		}
	}
    render() {
        return (
            <div id="life">
                居家生活
            </div>
        )
    }
}
