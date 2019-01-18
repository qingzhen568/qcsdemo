import React,{Component} from 'react'
import {withRouter,Link} from 'react-router-dom'
import {Icon,Badge} from 'antd'  
//引入样式
import './index.scss'
import axios from 'axios'
//引入头部标题
import HeaderTitle from '../../components/commons/headerTitle'

class ItemList extends Component{
    constructor(props){
        super(props);
        this.state={
            // headerImgUrl:'',  //#headerImg-2nd 
            listData:[],   //#list_1st.列表数据初始值
            navArr: this.props.navArr,  //调用商品列表时.将navArr导航数据和group_id传递过来,内容类似如下:
            // [ 
            // #nav_1st.并设置默认 group_id:12983(因为切换时,url改变的只是group_id,所以选中时需要重新赋值)
            //     {id:0,name:'洁面卸妆',group_id:12983,type:true},
            //     {id:1,name:'水乳面霜',group_id:12984,type:false},
            //     {id:2,name:'精华眼霜',group_id:12985,type:false},
            // ],
            group_id:this.props.group_id,   //group_id 和activity_id, category_id在同一条数据请求中
            current_page:1,  
            end:false,  //判断是否是最后一页,false表示还没加载完
            loading:false,  //#loading_2nd.设置初始值为false,隐藏 正在加载中 图标提示
            cartTotalNum:0  //购物车显示总数量
        }
    }
    //获取数据
    componentDidMount(){
        //#list_2nd.获取列表数据,调用函数getData
        this.getData(this.state.group_id)

        //#list_5th.当滚动到页面底部时,加载更多数据,
        this.myScroll();

        // #addToCart_5th_b. 调用 计算购物车商品总数的函数
        this.cartTotalNumFn();
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
            // console.log(scrollHeight-scrollTop,windowHeight)
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
                    //将获取到的数据拼接到原来的数据上
                    let oldListData = this.state.listData;
                    let newListData = [];
                    newListData = oldListData.concat(resp.data.data.item_list)
                    // console.log(newListData)
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
        // console.log(id)
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
            // console.log('listData下的group_id',resp.data.data.item_list)
            this.setState({
                listData: resp.data.data.item_list  //设置列表数据值
            })
        })
    }

    //点击回到首页
    backHome = ()=>{
        this.props.history.push('/')
    }

    // #addToCart_5th_c.计算购物车总数量
    cartTotalNumFn=()=>{
        let arr = JSON.parse(localStorage.getItem('cart'));
        var totalNum = 0;
        if(arr !==null && arr.length){ //localStorage中有缓存cart,而且长度不为零,则追加数量
            //判断是否是同一种商品,如果是,则只需修改数量,否则直接将全部商品信息添加追加到 goodsData中;
            arr.map((item)=>{ //#addToCart_3rd_e.遍历获取的缓存数据
                return totalNum += item.num;
            })
            this.setState({
                cartTotalNum: totalNum
            })
        }
    }

     // #addToCart_2nd.点击加入购物车函数
     addToCart=()=>{
        // #addToCart_4th_b. 添加时,显示提示信息,设置延时器,让提示信息在一定时间后隐藏
        let timer= null ;
        this.setState({
            isAddToCart:true
        })

        //#addToCart_3rd.点击加入购物车时,将该商品信息,如商品名称\价格\数量\图片地址存储到localStorage中
        let goodsData = [];  //#addToCart_3rd_a.注意用于添加新数据
        let flag = true; //#addToCart_3rd_b.设置标识,true标识新增,false表示修改,false表示购物车已经有原来商品信息,只需修改数量

        //#addToCart_3rd_d.将从缓存中获取的数据转换为数组
        let arr = JSON.parse(localStorage.getItem('cart'));
        if(arr !==null && arr.length){ //localStorage中有缓存cart,而且长度不为零,则追加数量
            //判断是否是同一种商品,如果是,则只需修改数量,否则直接将全部商品信息添加追加到 goodsData中;
            arr.map(item=>{ //#addToCart_3rd_e.遍历获取的缓存数据
                if (item.id === this.state.item_id) { //如果缓存里的id和该商品自身的item_id一致,则是同一种商品,只需修改数量
                    item.num++;
                    flag = false ; //将标识设置为false,这样不会执行 #addToCart_3rd_c.这一步
                }
                return goodsData.push(item); //#addToCart_3rd_f.将修改后的数据重新保存到 goodsData中
            })
        }

        if(flag){//#addToCart_3rd_c.如果购物车中没有点中的商品信息,则将该商品的所有信息添加到goodsData里
            goodsData.push({
                id:this.state.item_id,
                name:this.state.itemObj.sku_name,
                app_price:this.state.app_price,
                market_price:this.state.market_price,
                sku_img_url:this.state.itemObj.sku_img_url,
                num:1  //初始数量为1
            })
        }

        //#addToCart_3rd_d.将数据储存到缓存中,注意:用JSON.stringify,将数组转为字符串,因为缓存的设置key和value都只能是字符串
        localStorage.setItem('cart',JSON.stringify(goodsData));
        
        // #addToCart_4th_c. 设置延时器,让提示信息在一定时间后隐藏
        clearTimeout(timer);   //清除可能存在的延时器
        timer = setTimeout(()=>{  
            this.setState({
                isAddToCart: false  //设置为false 让 添加成功 的信息隐藏
            })
        },1000);
        
        this.cartTotalNumFn();  //点击加入购物车后,再次调用该函数,让数据随时更新
    }

    //清除为完成事件
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }
    render(){
        return (
            <div id="itemList">
                {/* 引用头部标题 */}
                <HeaderTitle  Title={this.props.Title} hideHeaderImg={this.props.hideHeaderImg} />
               
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
                            {/* #item_1st.点击列表中的单个商品信息时,将点中的item相关信息传递给 单个商品信息页面  启下:#item_2nd.去往pages目录下的item目录下的index.js */}
                                <Link to={{pathname:'item',search:'?item_id='+item.item_id+'&app_price='+item.min_app_price+'&market_price='+item.min_market_price+'&item_name='+item.item_name+'&sale_point='+item.sale_point+'&over_image_url='+item.over_image_url}}>
                                    <div><img src={item.over_image_url} alt={item.item_short_name}/></div>
                                    <div className="itemInfo">
                                        <p className="">
                                            <span className="saleOff">{item.promotions}</span>
                                        </p>
                                        <p className="sale_point">{item.sale_point}</p>
                                        <p className="item_short_name">{item.item_short_name}</p>
                                        <p className="price_Cart">
                                            <span className="itemPrice">&yen;{item.min_price/100}</span>
                                            <span ><Icon onClick={this.addToCart} className="iconCart" type="shopping-cart"/></span>
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
                {/* <HomeCouponCart /> */}
                <div id="homeCouponCart">
                    <span className="backHome" onClick={this.backHome}></span>
                    <Link to="/coupon"><span className="coupon" style={this.props.hideCoupon?{'display':'none'}:{'display':'block'}}></span></Link>
                    <Link to="/shoppingcart"> 
                    {/* 给购物车添加微章  <Badge count={this.state.total}>*/}
                        <Badge count={this.state.cartTotalNum}>
                            <span className="shoppingCart"></span>
                        </Badge >
                    </Link>
                </div>

            </div>
        )
    }
}

export default withRouter(ItemList);