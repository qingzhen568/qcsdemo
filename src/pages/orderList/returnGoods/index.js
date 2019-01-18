import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import './index.scss'
//引入头部标题
import HeaderTitle from '../../../components/commons/headerTitle'


class ReturnGoods extends Component{
   constructor(){
       super();
       this.state={
            orderListArr:[
                {id:0,name:'全部',path:'/orderList?status=',type:true},
                {id:1,name:'待付款',path:'/orderList?status=10',type:false},
                {id:2,name:'待发货',path:'/orderList?status=30',type:false},
                {id:3,name:'待收货',path:'/orderList?status=40',type:false},
                {id:4,name:'待评价',path:'/orderList?status=50',type:false},
            ]
       }
   }
//   https://asset.watsons.com.cn/h5/static/css/return-goods.5cc350665dee94a45e5cd66ff943da04.css?bf3c3d54511daec735af
//    https://asset.watsons.com.cn/h5/static/js/return-goods.a1808706c7f43ff0c992.js?bf3c3d54511daec735af
   //点击切换我的订单导航栏
    ChangeOrderNav=(id,path)=>{
        let newArr = this.state.orderListArr;
        let len = newArr.length;
        for(let i=0; i<len; i++){
            if (i === id) {
                newArr[i].type = true;
            }else{
                newArr[i].type = false;
            }
        }
        this.setState({
            path:path
        })
        //跳转到点中的nav_item
        this.props.history.push(path)
    }

    //清除未完成的事件
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }
    
    render(){
        return (
            <div id="OrderList">
                {/* 引用头部标题 */}
                <HeaderTitle Title='退货' />

                <div className="order_menu_list_wrap">
                    <ul className="order_menu_list">{
                        this.state.orderListArr.map((item,index)=><li key={index} className={item.type?'active order_menu':'order_menu'}
                        onClick={()=>this.ChangeOrderNav(item.id,item.path)}
                        >
                            {item.name}
                        </li>)
                    }</ul>
                    
                </div>
                
                {/* 显示订单内容区 */}
                <div>
                    <div className="order_list_wrap">
                        <div className="empty_wrap">
                            <img src="https://asset.watsons.com.cn/h5/static/images/common/56e49551c37a958f3153171da.png" alt="暂无相关订单"/>
                            <p >暂无相关订单</p>
                        </div>
                    </div>
                </div>
             
                
            </div>
        )
    }
}
export default withRouter(ReturnGoods);