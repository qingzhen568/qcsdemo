import React,{Component} from 'react';
import axios from 'axios';
//引进antd 对话框
import MyModal from '../../components/main/Modal/Modal';

//引入首页(今日推荐)样式
import './index.scss'
//引入头部组件
import MainHeader from '../../components/main/mainHeader/mainHeader'
//引入今天秒杀组件
import SecKill from '../../components/commons/SecKill'
//引进好货推荐组件
import Recommend from '../../components/main/recommend/recommend'
//引入版权说明
import CopyRight from '../../components/commons/copyRight'
//引入轮播图组件
import MySwiper from '../../components/commons/Swiper'
//引进 商品组 GroupList--- 新年新"肌"遇 
import GoodsList from '../../components/main/goodsList'
//引入回到顶部按钮
import ToTop from '../../components/commons/toTop'


class Main extends Component{
    //设置初始值
    constructor(){
        super();
        this.state={
            swiperData:[]
        }
    }
    //获取并设置轮播图数据
    componentDidMount(){
        axios.get('/aladdin/get_batch_data?codes=["chajian"]&version=&app_channel=wap&plat=wap&access_token=&device_id=184928e0-0a50-11e9-b735-edec1c5a654b')
        .then((resp)=>{
            this.setState({
                swiperData:resp.data.data.chajian.datas
            })
            // console.log(this.state.swiperData)
        })
    }
     //清除未完成事件
     componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }
    render(){
        return (
            <div id="recommend">
                {/* main页面(今日推荐)所有组件渲染出口处 */}
               
                {/* 进入首页弹框 */}
                <MyModal />
                {/* 轮播图 */}
                <MySwiper swiperData={this.state.swiperData} />
                {/* 跨年盛典 */}
                <MainHeader />
                
                {/* 今日秒杀 */}
                <SecKill />
               
                {/* 年终尖货畅销榜单 */}
               
                {/*  商品组 GoodsList--- 新年新"肌"遇  */}
                <GoodsList />
                {/* 大牌精选 好货推荐 */}
                <Recommend />
                <CopyRight />
                <ToTop />
            </div>
        )
    }
}
//导出Main对象
export default Main;