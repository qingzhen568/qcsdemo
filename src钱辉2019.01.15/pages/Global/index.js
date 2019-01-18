import React, { Component } from 'react';
import './index.scss'

export default class Global extends Component {
    //组件销毁前  ，将未更新完的状态停止
	componentWillUnmount(){
		this.setState=(state,callback)=>{
			return;
		}
	}
    render() {
        return (
            <div id="global">
                全球购
            </div>
        )
    }
}
