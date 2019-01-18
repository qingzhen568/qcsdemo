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
            //  activeNum: 1,
             listData:[],
             currentPage:1,  //当前页初始值为1
             end:false, // #TheEnd-2nd.用于判断数据是否加载到最后一条了,false表示还没到最后
             showLoading:false,   //#loading-2nd.用于显示 正在加载中 
             group_id:12983,  //用于每次切换选项卡时,给予不同的 group_id ,
             navArr:[
                 {'id':0,'name':'洁面卸妆',"group_id":'12983','type':true}, //type用于判断哪个选项被点中,从而渲染样式
                 {'id':1,'name':'水乳面霜',"group_id":'12984','type':false},
                 {'id':2,'name':'精华眼霜',"group_id":'12985','type':false}
             ]
         }
     }

     componentDidMount(){
         //头部图片数据
        axios.get('tms/aladdin/get?code=h5_topfixed_img')
        .then((resp)=>{
            // console.log('图片',resp.data.data.datas[0].image_url)
            this.setState({
                headerImg: resp.data.data.datas[0].image_url 
            })
        })
        //调用获取 列表(洁面卸妆|水乳面霜|精华眼霜)数据 的函数 
        this.getDate(this.state.group_id)
         //调研滚动事件,加载更多页面数据
         this.myScroll();

        //  axios.get('item/ws/group_list?current_page=1&page_size=24&group_id=12983&device_id=fe189850-0ef2-11e9-9f26-2ff4a77268bb')
        //  .then((resp)=>{
        //     // console.log('洁面卸妆数据',resp.data.data.item_list)
        //     this.setState({
        //         jieMianData: resp.data.data.item_list
        //     })
        //  })
         //水乳面霜数据
        //  axios.get('item/ws/group_list?current_page=1&page_size=24&group_id=12984&device_id=fe189850-0ef2-11e9-9f26-2ff4a77268bb')
        //  .then((resp)=>{
        //     // console.log('水乳面霜数据',resp.data.data.item_list)
        //     this.setState({精华眼霜
        //         facialCreamData: resp.data.data.item_list
        //     })
        //  })
        //精华眼霜数据
        //  axios.get('item/ws/group_list?current_page=1&page_size=24&group_id=12985&device_id=fe189850-0ef2-11e9-9f26-2ff4a77268bb')
        //  .then((resp)=>{
        //     // console.log('精华眼霜数据',resp.data.data.item_list)
        //     this.setState({
        //         eyeCreamData: resp.data.data.item_list
        //     })
        //  })
     }
     myScroll=()=>{
        //  console.log("滚动事件this",this)  使用箭头函数可以保存this指向实例
         let _this = this;
        //  console.log("滚动事件_this",_this)
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
                //触底时获取数据,并传递当前页码
                _this.loadMoreData(_this.state.currentPage+1);
                
                //更新当前页
                _this.setState({
                    currentPage: _this.state.currentPage+1
                })
            }
         }
     }
     //承接窗口滚动事件中,加载更多数据
     loadMoreData =(i)=>{
        if (!this.state.end) { //this.state.end 为false,数据还没到最后,
            this.setState({
                showLoading:true  //#loading-3rd.在加载数据时显示正在加载中提示
            })
            //继续获取数据
            
            axios.get('item/ws/group_list?current_page='+i+'&page_size=24&group_id='+this.state.group_id+'&device_id=8072d630-1092-11e9-8bde-09b9d4ed935b')
            .then(resp=>{
                // console.log("listData"+resp)
                //判断是否是最后一页
                if (resp.data.data.item_list === undefined) {
                    // 是最后一页了,则将end设为true
                    this.setState({
                        end:true   // !this.state.end 则为false 就不会进入这里
                    })
                }else{
                    //不是最后一页,则把即将加载的数据拼接到之前的数据中
                    let oldListData = this.state.listData;
                    let newListData = [];
                    newListData = oldListData.concat(resp.data.data.item_list)
                    setTimeout(()=>{
                        this.setState({
                            listData: newListData,  //将拼接的新数据赋值给listData
                            showLoading:false  //#loading-4th.加载完数据后将 正在加载中 的图标提示隐藏
                        })
                    },500)
                }
            })
        }
     }

    //点击头部小于号回退按钮返回上一页,
    //先引入import {withRouter} from 'react-router-dom';再设置 export default withRouter(SkinCare) ;
    goBack =()=>{
        this.props.history.go(-1)
    }

    //点击顶部导航栏并加载数据,将navArr中每个item的id和group_id传进入
    changeNav=(id,group_id)=>{
        console.log(id);
        let newArr = this.state.navArr;
        let len = newArr.length;
        for (let i = 0; i < len; i++) { //循环导航栏数组
            if (i === id) {  //如果数组下标和传递过来的 id 全等,就设置对应的item的type为true
                newArr[i].type = true;  
            }else{
                newArr[i].type = false;
            }
        }
        this.setState({
            navArr: newArr,
            group_id: group_id,  
            currentPage:1  //每次切换后,将当前页数重置为1
        });
        //调用获取数据的函数 getDate 并把切换后的 group_id 传进去,以获取对应的数据
        this.getDate(group_id);
    }
    //共用获取数据函数,更改url中的 group_id='+group_id+'
    getDate = (group_id)=>{
        axios.get('item/ws/group_list?current_page=1&page_size=24&group_id='+group_id+'&device_id=8072d630-1092-11e9-8bde-09b9d4ed935b')
        .then(resp=>{
            // console.log("共用函数", resp.data.data.item_list);
            this.setState({
                listData: resp.data.data.item_list   
            })
        })
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
                    <ul className="nav">
                        {/* 顶部导航栏,方法一 */}
                        {
                           this.state.navArr.map((item,index)=><li onClick={()=>this.changeNav(item.id,item.group_id)} className={item.type?'navStyle activeStyle':'navStyle'} key={index}>
                             {item.name}
                           </li>) 
                        }
                        {/* 方法2:点击触发自定义函数 activeNav 并传个参数作为切换对应div的内容 看index方式2 */}
                    </ul>

                    {/* 洁面卸妆|水乳面霜|精华眼霜列表渲染 */}
                    <ul className="listWrap">
                    {
                        this.state.listData.map((item,index)=><li key={index} className="listItem">
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
                    </ul>
                    {/*  #loading-1st 正在加载中 图标提示 */}
                    <div className="loading" style={this.state.showLoading && !this.state.end?{'display':'block'}:{'display':'none'}}><Icon type="loading" />正在加载中...</div>
                    {/* #TheEnd-1st.达到底部提示 */}
                    {this.state.end? <div className="TheEnd">我是有底线的,不能再低了!</div>:''}
                </div>
            </div>
        )
    }
}

export default withRouter(SkinCare) ;