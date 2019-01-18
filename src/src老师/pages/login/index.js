import React,{Component} from 'react';
import './index.scss';
import {Input,Button} from 'antd';
import axios from 'axios';
class Login extends Component{
	//设置初始值
	constructor(){
		super();
		this.state = {
			phone:'',
			smsCode:'',
			des:'',
			buttonText:'发送验证码',
			disabled:false
		}
	}
	
	//将文本框的值保存到state中
	changePhoneFunc=(ev)=>{
		this.setState({
			phone:ev.target.value
		})
	}
	changeSmsCodeFunc=(ev)=>{
		this.setState({
			smsCode:ev.target.value
		})
	}
	//发送验证码
	//注意this指向
	sendSmsCode=()=>{
		//空白符
		let reg = /\S/;
		//手机格式(有待升级)
		let re = /^1\d{10}$/;
		//去掉空格
		let phone = this.state.phone.trim();
		//判断手机号码是否为空
		if(phone === '' || !reg.test(phone)){
			alert('请输入手机号码')
		}else if(!re.test(phone)){// 判断手机号码格式是否正确
			alert('手机号码格式错误');
		}else{//都符合，发送验证码
			//发送验证码，调用接口，更改按钮的状态和文字
			axios(
				{
					method:'get',
					url:'http://192.168.2.251:7001/sms/addSms?phone='+phone
				}
			).then((res)=>{
				console.log(res);
				//将提示信息保存到des中
				this.setState({
					des:res.data.success,
					disabled:true
					
				})
				//将按钮的文字进行更改
				let i= 60;
				let inter = setInterval(()=>{
					this.setState({
						buttonText:'重发('+i+'s)',
					})
					if(i<=0){
						this.setState({
							buttonText:'获取验证码',
							des:'',
							disabled:false
						})
						clearInterval(inter);
					}
					i = i-1;
				},1000)
				
			})
			
			
			
			
		}
		
		
		
		
	}
	
	//登录
	loginFunc=()=>{
		//验证
		//空白符
		let reg = /\S/;
		//手机格式(有待升级)
		let re = /^1\d{10}$/;
		//验证码格式
		let reSms = /^\d{4}$/;
		
		//去掉空格
		let phone = this.state.phone.trim();
		let smsCode = this.state.smsCode.trim();
		
		//开始验证
		if(phone === '' || !reg.test(phone) ){
			alert('请输入手机号码');
		}else if(smsCode === '' || !reg.test(smsCode)){
			alert('请输入验证码');
		}else if(!re.test(phone)){
			alert('手机号码格式错误');
		}else if(!reSms.test(smsCode)){
			alert('验证码格式错误');
		}else{//格式正确时，调用登录接口
			//post参数
			var params = new URLSearchParams();
			params.append('phone',this.state.phone);
			params.append('smsCode',this.state.smsCode);
			
			axios({
				method:'post',
				url:'http://192.168.2.251:7001/user/login',
				data:params//post传递的参数
			}).then((res)=>{
				console.log(res);
				//保存token
				localStorage['token'] = res.data.data.token;
				
				//跳转
				this.props.history.push('/center');	
			})
		}
		
		
		
	}
	
	componentWillUnmount(){
		this.setState = (state,callback)=>{
			return;
		}
	}
	
	
	render(){
		return (
			<div className="login-content">
				<h1><span className="login-back">{"<"}</span> <span className="login-title">登录/注册</span></h1>
				<div className="film_login">
					<Input type="text" placeholder="输入手机号" name="phone" onInput={this.changePhoneFunc}/>
					<br/>
					<br/>
					<Input type="code" className="yzm" placeholder="输入验证码" name="smsCode" onInput={this.changeSmsCodeFunc}/>
					<Button className="film_btn" disabled={this.state.disabled} type="primary" onClick={this.sendSmsCode}>{this.state.buttonText}</Button>
					<div className="des"> {this.state.des}</div>
					<Button className="film_btn1" type="primary" onClick={this.loginFunc}>登录/注册</Button>
				</div>
			</div>
		)
	}
}

export default Login;