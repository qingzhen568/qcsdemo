import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
//引进样式
import './index.scss'
import axios from  'axios'
//引入ant design插件
import {Row,Col,Icon} from 'antd';


 class SkinCare extends Component{
     constructor(){
         super();
         this.state={
             headerImg:'',
             activeNum: 1,
             jieMianData:[],
             facialCreamData:[],
             eyeCreamData:[],
             currentPage:1,  //当前页初始值为1
             end:false, // end 用于判断数据是否加载到最后一条了,false表示还没到最后
         }
     }
     componentDidMount(){
        axios.get('tms/aladdin/get?code=h5_topfixed_img')
        .then((resp)=>{
            // console.log('图片',resp.data.data.datas[0].image_url)
            this.setState({
                headerImg: resp.data.data.datas[0].image_url
            })
        })
        //洁面卸妆数据 
         axios.get('item/ws/group_list?current_page=1&page_size=24&group_id=12983&device_id=fe189850-0ef2-11e9-9f26-2ff4a77268bb')
         .then((resp)=>{
            // console.log('洁面卸妆数据',resp.data.data.item_list)
            this.setState({
                jieMianData: resp.data.data.item_list
            })
         })
         //水乳面霜数据
         axios.get('item/ws/group_list?current_page=1&page_size=24&group_id=12984&device_id=fe189850-0ef2-11e9-9f26-2ff4a77268bb')
         .then((resp)=>{
            // console.log('水乳面霜数据',resp.data.data.item_list)
            this.setState({
                facialCreamData: resp.data.data.item_list
            })
         })
         //精华眼霜数据
         axios.get('item/ws/group_list?current_page=1&page_size=24&group_id=12985&device_id=fe189850-0ef2-11e9-9f26-2ff4a77268bb')
         .then((resp)=>{
            // console.log('精华眼霜数据',resp.data.data.item_list)
            this.setState({
                eyeCreamData: resp.data.data.item_list
            })
         })
         //调研滚动事件,加载更多页面数据
         this.myScroll();
     }
     myScroll=()=>{
         console.log("滚动事件this",this)
         let _this = this;
         //窗口滚动事件
         window.onscroll = function(){
            //获取滚动高度
            let myScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //获取窗口的可视高度
            let winHeight = document.documentElement.clientHeight;
           //获取当前页面的总高度
           let scrollHeight =document.body.scrollHeight;

            console.log(scrollHeight - myScrollTop+":"+ winHeight)
            if (scrollHeight - myScrollTop <= winHeight) { //当该条件为真时,表示滚动到页面底部了
                //触底时获取数据,并传递当前页面
                _this.loadMoreData(_this.state.currentPage+1);
                
                //更新当前页
                _this.setState({
                    currentPage: _this.state.currentPage+1
                })
            }
         }
     }
     //承接窗口滚动事件中,加载更多数
     loadMoreData =(i)=>{
        if (!this.state.end) { //this.state.end 为false,还没加载到最后,
            //继续获取数据
            axios.get('item/ws/group_list?current_page='+i+'&page_size=24&group_id=12983&device_id=fe189850-0ef2-11e9-9f26-2ff4a77268bb')
            .then(resp=>{
                console.log(resp)
                //判断是否是最后一页
                if (resp.data.data.item_list === undefined) {
                    // 是最后一页了,将end设为true
                    this.setState({
                        end:true
                    })
                }else{
                    //不是最后一页,继续加载数据
                    let oldArr = this.state.jieMianData;
                    let newArr = [];
                    newArr = oldArr.concat(resp.data.data.item_list)

                    this.setState({
                        jieMianData:newArr
                    })
                }
            })
            
        }
     }


     //点击导航栏触发 activeNav 函数并传对应要显示的div的标识,先设置初始值 activeNum:1
     activeNav= (num) =>{
         this.setState({
             activeNum: num
         })
     }
    //点击头部小于号回退按钮返回上一页,
    //先引入import {withRouter} from 'react-router-dom';再设置 export default withRouter(SkinCare) ;
    goBack =()=>{
        this.props.history.go(-1)
    }

    //渲染到页面上
    render(){
        return (
            <div id="SkinCare">
                <div className="headerImg"><img src={this.state.headerImg} alt="头部图片"/></div>
                <div className="skinCareTilte">
                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={3} ><Icon className="goBack" onClick={this.goBack} type="left"/></Col>
                        <Col span={18}>
                        <span>新宠精致美肌</span>
                        </Col>
                        <Col span={3}></Col>
                    </Row>
                </div>
                <div className="section">

                    <ul className="skinCareNav">
                        {/* 顶部导航栏,方法一 见index.js*/}
                        {/* 方法2:点击触发自定义函数 activeNav 并传个参数作为切换对应div的内容  */}
                        <li className={this.state.activeNum ===1 ? "navStyle selectedStyle":'navStyle'} onClick={()=>this.activeNav(1)}>洁面卸妆</li>
                        <li className={this.state.activeNum ===2 ? "navStyle selectedStyle":'navStyle'} onClick={()=>this.activeNav(2)}>水乳面霜</li>
                        <li className={this.state.activeNum ===3 ? "navStyle selectedStyle":'navStyle'} onClick={()=>this.activeNav(3)}>精华眼霜</li>
                    </ul>

                    {/* 洁面卸妆列表 */}
                    <div>{
                        this.state.activeNum === 1? 
                        <ul className="list">
                        {
                            this.state.jieMianData.map((item,index)=><li key={index} className="listItem">
                                <img src={item.over_image_url} alt={item.item_short_name}/>
                                <div className="itemInfo">
                                    <p className="saleOff">
                                        <span>{item.promotions}</span>
                                    </p>
                                    <p className="sale_point">{item.sale_point}</p>
                                    <p className="item_short_name">{item.item_short_name}</p>
                                    <p className="price_Cart">
                                        <span className="itemPrice">&yen;{item.min_price/100}</span>
                                        <span ><Icon className="iconCart" type="shopping-cart"/></span>
                                    </p>
                                    <p className="bePartedInSecKill">该商品参与秒杀</p>
                                </div>
                            </li>)
                        }
                        </ul>:''
                    }</div>

                    {/* 水乳面霜列表 */}
                    <div>{
                        this.state.activeNum === 2? 
                        <ul className="list">
                        {
                            this.state.facialCreamData.map((item,index)=><li key={index} className="listItem">
                                <img src={item.over_image_url} alt={item.item_short_name}/>
                                <div className="itemInfo">
                                    <p className="saleOff">
                                        <span>{item.promotions}</span>
                                    </p>
                                    <p className="sale_point">{item.sale_point}</p>
                                    <p className="item_short_name">{item.item_short_name}</p>
                                    <p className="price_Cart">
                                        <span className="itemPrice">&yen;{item.min_price/100}</span>
                                        <span ><Icon className="iconCart" type="shopping-cart"/></span>
                                    </p>
                                    <p className="bePartedInSecKill">该商品参与秒杀</p>
                                </div>
                            </li>)
                        }
                        </ul>:''
                    }</div>

                    {/* 精华眼霜列表 */}
                    <div>{
                        this.state.activeNum === 3? 
                        <ul className="list">
                        {
                            this.state.eyeCreamData.map((item,index)=><li key={index} className="listItem">
                                <img src={item.over_image_url} alt={item.item_short_name}/>
                                <div className="itemInfo">
                                    <p className="saleOff">
                                        <span>{item.promotions}</span>
                                    </p>
                                    <p className="sale_point">{item.sale_point}</p>
                                    <p className="item_short_name">{item.item_short_name}</p>
                                    <p className="price_Cart">
                                        <span className="itemPrice">&yen;{item.min_price/100}</span>
                                        <span ><Icon className="iconCart" type="shopping-cart"/></span>
                                    </p>
                                    <p className="bePartedInSecKill">该商品参与秒杀</p>
                                </div>
                            </li>)
                        }
                        </ul>:''
                    }</div>
                </div>
                
                
            </div>
        )
    }
}

export default withRouter(SkinCare) ;