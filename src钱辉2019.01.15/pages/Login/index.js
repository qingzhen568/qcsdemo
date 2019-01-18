import React,{Component} from 'react';
import './index.scss';
import { Button,Input } from 'antd';
import axios from 'axios'


export default class Login extends Component {
    //组件销毁前  ，将未更新完的状态停止
	componentWillUnmount(){
		this.setState=(state,callback)=>{
			return;
		}
    }
    constructor(){
        super();
        this.state ={
            phone:'13417516826',
            phoneTip:'',
            smsCodeTip:'',
            smsCode:'',
            tips:'',
            send:'获取验证码',
            disabled:false,
            sms:''
        }
    }
    checkNumber=(ev)=>{
        this.setState({
            phone:ev.target.value
        })
        let res = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
        if (res.test(ev.target.value)) {
            this.setState({
                phoneTip:''
            })
        }else{
            this.setState({
                phoneTip:'请输入正确的手机号'
            })
        }
    }
    checkCode=(ev)=>{
        this.setState({
            smsCode:ev.target.value
        })
        let res = /^\d{4}$/;
        if (res.test(ev.target.value)) {
            this.setState({
                smsCodeTip:''
            })
        }else{
            this.setState({
                smsCodeTip:'请输入正确的验证码'
            })
        }
    }
    sendSms=()=>{
        let res = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
        let res2 = /\S/;
        let phone = this.state.phone.trim();
        if (phone===''||!res2.test(phone)) {
            this.setState({
                phoneTip:'请输入手机号'
            })
        }else if (!res.test(phone)) {
            this.setState({
                phoneTip:'请输入正确的手机号'
            })
        }else{
            axios.get('http://127.0.0.1:7001/sms/addSms?phone='+phone)
            .then((resp)=>{
                // console.log(resp.data)
                axios.get('http://127.0.0.1:7001/sms/querySms?phone='+phone)
                .then((res)=>{
                    // console.log(res.data.success.smsCode)
                    this.setState({
                        smsCode:res.data.success.smsCode
                    })
                })
                this.setState({
                    tips:resp.data.success,
                    disabled:true,
                    phoneTip:''
                })
                let num = 60;
                let timer = setInterval(() => {
                    num --;
                    this.setState({
                        send:'重发('+num+')'
                    })
                    if (num<=0) {
                        this.setState({
                            tips:'',
                            send:'获取验证码',
                            disabled:false
                        })
                        clearInterval(timer);
                    }
                }, 1000);
            })
        }
    }
    loginProfile=()=>{
        // if (this.state.sms===Number(this.state.smsCode)) {
            let res = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
            let res3 = /\S/;
            let phone = this.state.phone.trim();
            if (phone===''||!res3.test(phone)) {
                this.setState({
                    phoneTip:'请输入手机号'
                })
            }else if (!res.test(phone)) {
                this.setState({
                    phoneTip:'请输入正确的手机号'
                })
            }
            else{
                var params = new URLSearchParams();
                params.append('phone',this.state.phone);
                params.append('smsCode',this.state.smsCode);
                // axios.post('http://192.168.2.251:7001/user/login',params)
                axios.post('http://127.0.0.1:7001/user/login',params)
                .then((resp)=>{
                    // console.log(resp.data.data)
                    localStorage['token']=resp.data.data.token;
                    this.props.history.push('/profile');
                }).catch((err)=>{
                    this.props.history.push('/login');
                })
            }
        // }else{
        //     this.setState({
        //         smsCodeTip:'输入的验证码有误'
        //     })
        // }
    }
    goBackHome=()=>{
        this.props.history.push('/');
    }
    render(){
        return(
            <div id='login'>
                <div className='loginTitle'>
                    <span onClick={this.goBackHome}>
                        <img alt='' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAArCAYAAABmbJjGAAAAAXNSR0IArs4c6QAABFpJREFUWAm1l0tMVFcYx5kZqsmwkEBrlGLaQnlFE1MTSVzUxAcSGAYG6sRWujBxYaJiXBgTdcPOuCIpxrgxxuCiCTYdGCAtggkduoFJG018FBxtG5WFSkyTGXFgGH/f4LkebpkHd8aT3Hu+891z/r/znXse9zryPkBqbW1dX15ePlBdXf3X1NTUE0HYcs1paWnZND8/P4JuJVfY4XA0+/3+WzkFNTc3fxmLxUbi8fhnWgBz2DvsmiMr0+VybQESMEFE88rg4ODtnIDcbvd2AGNcG0y9PT80NHTcZrPFswY1NjbuXFxcHAVQZIKcAXJW+RzKsJITSQPt/ERSoLWPE8FxIF2aL88yqKmpaT+R3EBsrRIEEMM+BOSK8qnc0tAxXIeI4kdEPlJCQKJcXiA9yqfnq46I2dWBwGUuo5MAIna7vWVgYGBQF9dto7LuTGYDOUckP/BcX3//AalnUQ4nayd+vUGqenkM1wUqnNYrEcmLd5A/dP9KdtqhIwJbMBi8ROOTugCQZ/n5+bv7+/vv6P5kdsqIOjs78ycnJ68C+14XAPKY8l5W/CPdn8pOCuro6FgbCoVkZnl0ASD3uep48U91fzp7RRAL0cm+5aNxnUngz4KCgvre3t7nJn/a4v9mndfrXQdEZpAZ8juQXVYg0otlERHJx6z2X3kn20xdvMm54mEKR0z+jItGRJwlJUB+WwHi47R0ZwOR3iRARPIFwzUOpEbvIi/9em1trbe7u/uN7rdi21jtIi6nYolJ4DLT9yiwuMlvqSgRda0AeVJcXHwqVxDpmd3pdB5AcNzUzdLZ2dlhmYEmv+ViYta9Wzc/o7LPpGR53Zh0liaDzCjWiJvIBKanryKRyBiH3Ke604ptTG8WYpRh9LIbLzu4ZCZyBZg0ZVYAqs2yBStORG1EcJH8qKokOdHKbl3X19d3T/dnahsRqQYy05jWx8jl/DES4JKFhYUx3qd51zDqpDKSnkfT09MjlZWV8zTeowk4AX7HN/U439T/av60ZlKQtAQWqKqqeol4A0U1zPLV8y2wILCQ1MskpQSJAGITRPY3Q+mmqIZavn4O0Im7PH8g9dKltCARILLbRHAXUw5B1Uby/RUVFY95nvY4V41okzrR8/uIBonsG2pKRJIkQg8RPwc2mfAkuWUMkvaIPQQWwBSY+kKVd+fC/4bn5q2MR0tpVSBpgtg/NTU1stsLzLkkk7jvJbI1PL+l+QxTzSTDkanBetrMGXaT+hv1NgztRT5cTpAvO14sg0Tc4/GU8xs5SnT6H57sItfYzg6zrclHfyJlBRKFtra20rm5OflnrUoovr/9xEZ9UPZQcWUNEhH5C49Go8NEtlXKKhHZL0TWBux1TkAizDAWMoxDwHYokOTAAoWFhU1qpevPLNk+n+9VUVFRHcKjugDgz8Ph8Cc5A4l4T09PuKyszIXplzLQh2Rf04nQqteRCKRKExMTsfb29t6ZmZk1RHOEP8CnUv8t5ZCsbFYYHdAAAAAASUVORK5CYII="/>
                    </span>
                    <span>登陆/注册</span>
                </div>
               <div className='loginForm'>
                    <div className='phoneInput'>
                        <Input className="loginInput" type='text' placeholder='输入手机号' onInput={this.checkNumber}/>
                        <div className='tips'>{this.state.phoneTip}</div>
                    </div>
                    <div className='smsCodeInput'>
                        <Input type='text' className='smsCode' placeholder='输入验证码' onInput={this.checkCode}/>
                        <Button type='primary' disabled={this.state.disabled} onClick={this.sendSms}>{this.state.send}</Button>
                    </div>
                    <div className='tipsBox'>
                        <div className='tips'>{this.state.smsCodeTip}</div>
                        <div className='tips'>{this.state.tips}</div>
                    </div>
                    <div className='submit'>
                        <Button type='primary' className='submit-btn' onClick={this.loginProfile}>登陆/注册</Button>
                    </div>
               </div>
            </div>
        )
    }
}