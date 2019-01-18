import React,{Component} from 'react';

import './index.scss';
import Swiper from 'swiper/dist/js/swiper.min.js'
import 'swiper/dist/css/swiper.min.css'

export default class Focus extends Component {
    componentDidMount(){
        new Swiper(".swiper-container",{
            autoplay:2000,//--每2秒轮播一次
            loop:true,//--可以让图片循环轮播
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
            autoplayDisableOnInteraction:false,//--在点击之后可以继续实现轮播
            pagination:".swiper-pagination",//--让小圆点显示
            paginationClickable:true,//--实现小圆点点击
            prevButton:".swiper-button-prev",//--实现上一页的点击
            nextButton:".swiper-button-next",//--实现下一页的点击
            // effect:"flip"//--可以实现3D效果的轮播
        })
    }
    //组件销毁前  ，将未更新完的状态停止
	componentWillUnmount(){
		this.setState=(state,callback)=>{
			return;
		}
    }
    render(){
        return (
            <div className="focus">
               <div className="swiper-container">
                <div className="swiper-wrapper">
                {
                    this.props.focus.map((item,index)=>{
                        return <div className="swiper-slide" key={item.id+index}>
                            <img src={item.image_url} alt='' style={{'width':'100%'}} />
                        </div>
                    })
                }
                </div>
                <div className="swiper-pagination"></div>
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </div>
            </div>
        )
    }
}