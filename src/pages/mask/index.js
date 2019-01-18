import React,{Component} from 'react'
import './index.scss'
import axios from 'axios'
//引入头部轮播图
import  MySwiper from '../../components/commons/Swiper'
//引入 特权面膜抢购 
import Privilege from '../../components/mask/privilege'
//引入秒杀组件
import SecKill from '../../components/commons/SecKill'


class Mask extends Component{
    constructor(){
        super();
        this.state={
            swiperData:[],
        }
    }
    //获取并设置数据
    componentDidMount(){
        //获取并设置轮播图数据
        axios.get('tms/aladdin/get?code=Mask_center_banner_index_1')
        .then(resp=>{
            // console.log('面膜轮播数据',resp.data.data.datas);
            this.setState({
                swiperData: resp.data.data.datas
            })
        })
    }

    //清除未完成事件
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return
        }
    }
    render(){
        return (
            <div id="mask">
                {/* 面膜中心的所有组件都放在这里 */}
                {/* 引入轮播图组件 */}
                < MySwiper swiperData={this.state.swiperData} />
                {/* 特权面膜抢购数据 */}
                <Privilege />
                {/* 引入秒杀组件 */}
                <SecKill />
            </div>
        )
    }
}

export default Mask;