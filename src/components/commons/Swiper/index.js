import React,{Component} from 'react'
//引入Swiper轮播插件,先在项目根目录下安装: npm i -s swiper@3.4.2  Bug:如果下载的是swiper 4.0+ 则无法实现自动轮播
import Swiper from 'swiper/dist/js/swiper.min.js'
import 'swiper/dist/css/swiper.min.css'
//引入swiper样式 ,注意:样式设置中要从最外层的往里面一层层设置
import './index.scss'

export default class MySwiper extends Component{
    // 使用轮播插件Swiper遇到的问题：
    //  1.使用 swiper的  4.0+版本时，无法自动轮播 ,安装 npm i -s swiper@3.4.2 版本
    //  2.用3.4.2版本时,手动拖拽不能轮播,因为请求图片数据是异步处理的,需要设置observer:true,  observerParents:true,
    //  3.第一幅图片一闪而过问题,使用延时器解决,
    //4.点击后无法自动轮播问题: autoplayDisableOnI autoplayDisableOnInteraction:false, 
    //  4.一个页面有多个轮播图存在时的bug 
    //  5.注意: className中的 "swiper-container" | "swiper-wrapper" | "swiper-slide" 这些名称是固定的不能更改
    componentDidMount(){
        new Swiper('.swiper-container',{
            loop:true,
            autoplay:1000,
            observer:true,  //observer:true, observeParents:true,设置异步获取图片数据, 解决无法拖动图片Bug,
            observeParents:true,
            autoplayDisableOnInteraction:false, 
            pagination : '.swiper-pagination',  //分页器
            prevButton:'.swiper-button-prev',   //前后按钮
            nextButton:'.swiper-button-next',
        })
    }
    render(){
        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                {/*# key :作用   某一项的唯一标识，key是不允许重复，如果没设置key或者key重复,则会报错 */}
                {/* 注意: className中的 "swiper-container" | "swiper-wrapper" | "swiper-slide" 不能更改*/}
                { 
                    this.props.swiperData.map((item,index)=><div key={index} className="swiper-slide">
                        <img src={item.image_url} alt={item.gmt_modified} />
                    </div>)
                }
                </div>
                {/* 分页器 */}
                <div className="swiper-pagination"></div>
                {/* 前进后退按钮 */}
                <div className="swiper-button-prev swiper-button-white"></div>
                <div className="swiper-button-next swiper-button-white"></div>
            </div>
        ) 
    }
}
