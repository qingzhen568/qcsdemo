import React,{Component} from 'react';
//引入swiper轮播插件
import Swiper from 'swiper/dist/js/swiper.min.js';
import 'swiper/dist/css/swiper.min.css';
import './swiper.scss';
class MySwiper extends Component{
	/*
	 问题：1.使用 swiper的  4.***版本时，没有 自动轮播
	 2.该用3.4.2版本时，拖拽时不能轮播，原因是我们获取的异步数据，修改方式是：添加  observer:true, observeParents:true,
	 3.如果一个页面有多个轮播图存在时的bug 
	 * */
	componentDidMount(){
		new Swiper('.swiper-container', {
			loop:true,
			autoplay: 2000,//可选选项，自动滑动
			observer:true,//异步处理时需要添加
			observeParents:true,
			pagination:'.swiper-pagination',
			prevButton:'.swiper-button-prev',
			nextButton:'.swiper-button-next'
		})
	}
	
	render(){
		return (	
		<div className="swiper-container">
			<div className="swiper-wrapper">
			{
			  	this.props.swiperList.map((item,index)=><div key={index} className="swiper-slide">
			  		<img src={item.image_url} alt={item.gmt_modified}/>
			  	</div>)
			} 
			</div>
		  	<div className="swiper-button-prev"></div>
		    <div className="swiper-button-next"></div>
		    <div className="swiper-pagination"></div>
		</div>
			
		)
	}
}

export default MySwiper;