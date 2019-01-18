import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import {Button} from 'antd';
class Center extends Component{
	constructor(){
		super();
		this.state={
			tokenType:1
		}
	}
	
	//对于是否已经登录的判断我们放在componentWillMount
	componentDidMount(){
		//token的验证
		axios({
			method:'get',
			url:'http://192.168.2.251:7001/center',
			headers:{
				'Authorization':localStorage['token']
			}
		}).then((res)=>{
			console.log(res);
			if(res.data.code === 0){//登录状态获取成功
				this.setState({
					tokenType:true
				})
			}else{
				//this.props.history.push('/login');
				this.setState({
					tokenType:false
				})
			}
			console.log(this.state.tokenType);
		})
		
		
	}
	
	componentWillUnmount(){
		this.setState = (state,callback)=>{
			return;
		}
	}
	
	logout=()=>{
		localStorage['token'] = "";
		this.props.history.push('/login');
	}
	
	render(){
		if(this.state.tokenType){
			return<div>
			
				<h1>用户中心</h1>
				<Button type="primary"  onClick={this.logout}>退出</Button>
			</div>
		}else{
			return <Redirect to='/login' />
		}
		
		
	}
}

export default Center;