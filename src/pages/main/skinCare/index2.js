import React,{Component} from 'react'
import {withRouter,Link} from 'react-router-dom'
import {Icon} from 'antd'  
//引入样式
import './index.scss'
import axios from 'axios'
//引入头部标题
import HeaderTitle from '../../components/commons/headerTitle'
//引入购物车|首页|优惠券组件
import HomeCouponCart from '../../components/commons/homeCouponCart'


class SkinCare extends Component{
    constructor(){
        super();
        this.state={
            headerImg:'',  //#headerImg-2nd 
            listData:[],   //#list_1st.列表数据初始值
            navArr:[ 
            //#nav_1st.并设置默认 group_id:12983(因为切换时,url改变的只是group_id,所以选中时需要重新赋值)
                {id:0,name:'洁面卸妆',group_id:12983,type:true},
                {id:1,name:'水乳面霜',group_id:12984,type:false},
                {id:2,name:'精华眼霜',group_id:12985,type:false},
            ],
            group_id:12983,
            current_page:1,  
            end:false,  //判断是否是最后一页,false表示还没加载完
            loading:false  //#loading_2nd.设置初始值为false,隐藏 正在加载中 图标提示
        }
    }
    //获取数据
    componentDidMount(){
        //#headerImg-3rd.获取头部图片数据并赋值
        axios.get('/tms/aladdin/get?code=h5_topfixed_img').then(resp=>{
            // console.log('图',resp.data.data.datas[0].image_url)
            this.setState({
                headerImg: resp.data.data.datas[0].image_url
            })
        })
        //#list_2nd.获取列表数据,调用函数getData
        this.getData(this.state.group_id)

        //#list_5th.当滚动到页面底部时,加载更多数据,
        this.myScroll();
    }
    //#list_6th
    myScroll=()=>{
        let _this = this;
        //监听窗口滚动事件
        window.onscroll = function(){
            //获取滚动高度
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //获取窗口可视高度
            let windowHeight = document.documentElement.clientHeight;
            //获取当前页面的总高度
            let scrollHeight = document.body.scrollHeight;
            console.log(scrollHeight-scrollTop,windowHeight)
            if (scrollHeight-scrollTop <= windowHeight) {//表示已经到达底部了
                //触底时获取数据,并将当前页的值+1,表示加载下一页传给加载数据的函数 loadMoreData
                _this.loadMoreData(_this.state.current_page+1);
                //更新当前页的值
                _this.setState({
                    current_page:_this.state.current_page+1
                })
            }
        }
    }
    //#list_7th.加载更多数据
    loadMoreData=(i)=>{
        if (!this.state.end) { //判断是否是最后一页数据了, this.state.end为false ,表示不是
            //#loading_3rd.加载更多数据之前设置为true,显示 正在加载中 图标提示
            this.setState({
                loading: true
            })
           //继续加载页面数据, 形参 i 接收 current_page这个实参,  group_id='+this.state.group_id+' 为不同选项group_id
            axios.get('item/ws/group_list?current_page='+i+'&page_size=24&group_id='+this.state.group_id+'&device_id=8072d630-1092-11e9-8bde-09b9d4ed935b')
            .then(resp=>{
                // console.log('加载更多',resp.data.data.item_list)
                //判断是否是最后一页,
                if (resp.data.data.item_list === undefined) {
                        //是最后一页,将文字提醒设置为true
                        this.setState({
                            end:true
                        }) 
                }else{
                    //加获取到的数据拼接到原来的数据上
                    let oldListData = this.state.listData;
                    let newListData = [];
                    newListData = oldListData.concat(resp.data.data.item_list)
                    console.log(newListData)
                    setTimeout(()=>{
                        this.setState({
                            listData: newListData,  //将拼接后的数据赋值给listData, 
                            loading: false     //#loading_4th.数据加载拼接完成后设置为false,隐藏 正在加载中 图标提示
                        })
                    },500)
                }
                // #list_8th切换选项后,应该将原来的当前页的值重置为1,在 changeNavTab 函数里改
            })
        }
    }

    //#headerTitle_3rd.给图标< 添加点击返回上一页事件,为了可以访问组件的history,location,match等属性,需要引入: withRouter
    //#headerTitle_4th. 引入 import {withRouter} from 'react-router-dom',并设置 export default withRouter(SkinCare);
    goBack=()=>{
        this.props.history.go(-1);
    }

    //#nav_4th.导航切换选项卡事件
    changeNavTab=(id,group_id)=>{
        console.log(id)
        //#nav_4th_a.遍历导航栏
        let newArr = this.state.navArr; 
        let len = newArr.length;
        for (let i = 0; i < len; i++) {
            if (i === id) {  //如果下标等于传递过来的选中item的 id ,则设置该item的type为true,然后设置不同样式
                newArr[i].type = true;
            }else{
                newArr[i].type = false; //否则为默认样式
            }
        }
        //#nav_4th_b.设置group_id等于传过来的item的 group_id,不然无法实现选中后改变样式,只是默认值
        this.setState({
            navArr:newArr,  //作用是什么?
            group_id: group_id ,
            current_page:1   // #list_8th切换选项后,应该将当前页的值重置为1,
        })
        //#nav_4th_c.点击切换后加载对应item列表数据
        this.getData(group_id)
    }
    //获取数据函数 #list_3rd | #nav_5th
    getData = (group_id)=>{
        axios.get('item/ws/group_list?current_page=1&page_size=24&group_id='+group_id+'&device_id=8072d630-1092-11e9-8bde-09b9d4ed935b')
        .then(resp=>{
            // console.log('listData',resp.data.data.item_list)
            this.setState({
                listData: resp.data.data.item_list  //设置列表数据值
            })
        })
    }

    render(){
        return (
            <div id="SkinCare">
                {/* 引用头部标题 */}
                <HeaderTitle headerImgUrl={this.state.headerImg} Title='新宠精致美肌' />
               
                {/* 主体部分 */}
                <div className="section">
                    {/* 导航栏 #nav_2nd.遍历渲染; #nav_3rd.给nav中的每个item添加点击事件,并给点中的选项设置不同样式*/}
                    {/* onClick={()=>this.changeNavTab(item.id,item.group_id)} 以懒加载形式,单需要时才调用 */}
                    <ul className="nav">
                        {
                            this.state.navArr.map((item,index)=><li onClick={()=>this.changeNavTab(item.id,item.group_id)} className={item.type?'active':''} key={index}>
                                {item.name}
                            </li>)
                        }
                    </ul>
                    {/* #list_4th. 洁面卸妆|水乳面霜|精华眼霜列表渲染 */} 
                    <ul className="listWrap">
                        {
                            this.state.listData.map((item,index)=><li key={index} className="listItem">
                                <Link to="#">
                                    <div><img src={item.over_image_url} alt={item.item_short_name}/></div>
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
                                        <p><span className="bePartedInSecKill">该商品参与秒杀</span></p>
                                    </div>
                                </Link>
                            </li>)
                        }
                    </ul>
                    {/* 显示 正在加载中 图标提示 */}
                    <div style={this.state.loading && !this.state.end?{'display':'block'}:{'display':'none'}} className="loading"><Icon type="loading" />正在加载中...</div>
                    {/* 到底部时,设置文字提醒 */}
                    {this.state.end?<div className="TheEnd">我是有底线的,不能再低了!</div>:''}
                </div>
                {/* 引入右下角的回到首页|优惠券|购物车的插件 */}
                <HomeCouponCart />
            </div>
        )
    }
}

export default withRouter(SkinCare);