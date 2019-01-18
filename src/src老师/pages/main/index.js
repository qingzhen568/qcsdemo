import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
//引入蚂蚁的对话框组件
import { Modal } from 'antd';

//引入轮播组件
import MySwiper from '../../components/main/swiper';

//引入样式
import './index.scss';

class Main extends Component{
	//设置初始值
	constructor(){
		super();
		this.state = {
			visible: true,//对话框是否显示
			swiperList:[]//轮播图的数据
		}
	}
	
	
	handleOk = (e) => {
	    console.log(e);
	    this.setState({
	      visible: false,
	    });
	}
	
	handleCancel = (e) => {
	    console.log(e);
	    this.setState({
	      visible: false,
	    });
	}
	
	
	componentDidMount(){
		axios.get('aladdin/get_batch_data?codes=["chajian"]&version=&app_channel=wap&plat=wap&access_token=638b4d2db133b04c8afef24e470a4701&device_id=ef62d140-0b0a-11e9-b5c2-5bc7378abcd9').then(res=>{
			console.log(res);
			this.setState({
				swiperList:res.data.data.chajian.datas
			})
			
		})
	}
	//组件未渲染完成，就销毁时的报错的解决方式
	componentWillUnmount(){
		this.setState=(state,callback)=>{
			return;
		}
	}
	render(){
		return (
			<div>
				<MySwiper swiperList={this.state.swiperList}/>
				<div>
		        
		        <Modal
		          visible={this.state.visible}
		          onOk={this.handleOk}
		          onCancel={this.handleCancel}
		          footer={null}
		        >
		          <img  src="https://image.watsons.com.cn//upload/6db00343.png" alt="弹框"/>
		        </Modal>
		      </div>
		      
		      <div className="xinmeiji"><Link to="/list"><img src="https://image.watsons.com.cn//upload/3965e404.jpg" alt="美肌"/></Link></div>
			</div>
		)
	}
}

export default Main;