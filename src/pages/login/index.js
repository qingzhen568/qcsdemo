import React,{Component} from 'react'
import {withRouter,Link} from 'react-router-dom'
import './index.scss'
//引入头部标题
import HeaderTitle from '../../components/commons/headerTitle'
import CopyRight from '../../components/commons/copyRight'
// 引入Form表单
import {Input, Button,Icon,Checkbox } from 'antd';
import axios from 'axios';

class LogIn extends Component{
   constructor(){
       super();
       this.state={
           phone:'',
           smsCode:'',
           tips:'',          //点击获取验证后,给的提示,如:验证码已经发送到尾号为6311的手机上，请注意查收
           disabled:false,  //点击发送验证码后,按钮改为true,禁用
           smsCodeText:'发送验证码' ,
           checked:false,
           smsCodeBG:false  //点击发送验证码按钮换背景色
       }
   }
    changePhoneFn=(ev)=>{
        this.setState({
            phone:ev.target.value
        })
   }
    changeSmsCodeFn=(ev)=>{
        this.setState({
            smsCode:ev.target.value
        })
    }

   //发送验证码,注意this指向
    sendSmsCode=()=>{
        //空白符正则
        let reg = /\S/;
        //手机格式正则 /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
        let phone_reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
        //去掉手机号码栏空格
        let phone = this.state.phone.trim();
        //判断手机号码是否为空
        if (phone === '' || !reg.test(phone)) {
            alert('请输入手机号码');
        }else if(!phone_reg.test(phone)){
            alert('手机号码格式错误')
        }else{
            //都符合验证规则,发送验证码,调用接口,更改按钮的状态和文字
            axios(
                {
                    method:'get',
                    url:'http://127.0.0.1:7001/sms/addSms?phone='+phone   //获取验证码接口
                }
            ).then(resp=>{
                console.log(resp);
                //将提示信息保存到tips中
                this.setState({
                    tips:resp.data.success,
                    disabled:true, //将获取验证码按钮禁用
                    smsCodeBG:true
                })
                //更改按钮文字
                let i = 60 ;
                let countDown = setInterval(()=>{ //必须使用箭头函数保留this指向
                    i -= 1 ;
                    this.setState({
                        smsCodeText: '重发('+i+')s',
                    })
                    if(i<=0){
                        this.setState({
                            disabled: false,
                            smsCodeText:'获取验证码',
                            tips:'' ,
                            smsCodeBG:false
                        })
                        clearInterval(countDown);
                    }
                },1000)
            })
        }
    }

    //登录验证
    loginFn=()=>{
         //空白符正则
         let reg = /\S/;
         //手机格式正则 /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
         let phone_reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
         //验证码格式正则:
         let smsCode_reg = /^\d{4}$/;
         //去掉手机号码栏空格
         let phone = this.state.phone.trim();
         //去掉验证码栏空格
         let smsCode = this.state.smsCode.trim();

         if (phone === '' || !reg.test(phone)) {
             alert('请输入手机号码');
         }else if(smsCode === '' || !reg.test(smsCode)){
             alert('请输入验证码');
         }else if(!phone_reg.test(phone)){
             alert('手机号码格式错误')
         }else if (!smsCode_reg.test(smsCode)) {
             alert('验证码格式错误')
         }else{
             //格式都正确,可以调用登录接口
             //注意:要先写post参数(最最重要),内容如下,phone和smsCode都是后台要求要传的参数,不能修改名称,区分大小写
             var params = new URLSearchParams();
             params.append('phone',this.state.phone);
             params.append('smsCode',this.state.smsCode)

            //发起请求
            axios(
                {
                    method:'post',
                    url:'http://127.0.0.1:7001/user/login',
                    data: params //post传递的参数
                }
            ).then(resp=>{
                console.log(resp); //显示 msg: "用户名登录成功"
                //保存token到localStorage
                localStorage['token'] = resp.data.data.token;
                //跳转到原先想去的页面,如个人中心
                this.props.history.push('/profile');
            })
         }
    }

    //清除未完成的事件
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }
    onChange=(ev)=> {
        // console.log(`checked = ${ev.target.checked}`);
        this.setState({
            checked: ev.target.checked
        })
    }
    render(){
        return (
            <div id="LogIn">
                {/* 引用头部标题 */}
                <HeaderTitle Title='登录/注册' hideHeaderImg="true" />
              
                <div className="form">
                    <p> <Icon type="exclamation-circle" />&nbsp;商城全新版本上线,手机登录更安全哦</p>
                    <p>
                        <Input type="text" className="phone" placeholder="输入手机号" name="phone" onInput={this.changePhoneFn} />
                    </p>
                    <p>
                        <Input type="code" className="yzm" placeholder="输入验证码" name="smsCode" onInput={this.changeSmsCodeFn} />
                        <Button className="smsCodebBtn" onClick={this.sendSmsCode} disabled={this.state.disabled} style={this.state.smsCodeBG?{'background':'lightgray'}:{'background':'#ff6692'}} type="primary">{this.state.smsCodeText}</Button>
                    </p>
                    <p className="tips">{this.state.tips}</p>
                    <p> <Checkbox onChange={this.onChange}></Checkbox>&nbsp;登录/注册即同意<Link to='#'>用户协议</Link>和<Link to='#'>隐私政策</Link></p>
                    <p>
                        <Button className="loginBtn" type="primary" onClick={this.loginFn} disabled={!this.state.checked} style={!this.state.checked?{'background':'lightgray'}:{'background':'#ff6692'}}  >登录/注册</Button>
                    </p>
                </div>


                {/* <div>
                <Icon type="exclamation-circle" />
                </div> */}
                {/* Form 表单 */}
                {/* <Form onSubmit={this.handleSubmit}>
                    手机号码
                    <Form.Item
                        {...formItemLayout}
                        label="手机号码"
                        >
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: '请输入您的手机号!' }],
                        })(
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="请输入手机号码" />
                        )}
                    </Form.Item>
                    获取验证码
                    <Form.Item
                        {...formItemLayout}
                        label="验证码"
                        >
                        <Row gutter={8}>
                            <Col span={12}>
                            {getFieldDecorator('captcha', {
                                rules: [{ required: true, message: '请输入您获取的验证码' }],
                            })(
                                <Input placeholder="输入验证码"  />
                            )}
                            </Col>
                            <Col span={12}>
                            <Button>发送验证码</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    同意协议
                    <Form.Item {...tailFormItemLayout}>
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>登录/注册即同意 <a href="">用户协议</a>和<a href="">隐私政策</a></Checkbox>
                        )}
                    </Form.Item>
                    登录按钮
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">登录/注册</Button>
                    </Form.Item>
                </Form> */}
                
                <CopyRight />
            </div>
        )
    }
}
export default withRouter(LogIn);