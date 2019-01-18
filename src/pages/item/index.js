import React,{Component} from 'react'
import './index.scss'
import {withRouter,Link} from 'react-router-dom'
import {Badge,Icon} from 'antd'
//  引入头部标题
import HeaderTitle from '../../components/commons/headerTitle'
import axios from 'axios';

//引入版权说明
import CopyRight from '../../components/commons/copyRight'

// ###item_1st.在itemList目录下,点击列表中的单个商品信息时,将点中的item相关信息传递过来  
//承上: #item_2nd.
class Item extends Component{
    constructor(props){
        super(props);
        this.state={
            itemObj:{},
            item_id:'',         // 商品id
            item_name:'',       // 商品名称
            app_price:0,        // 商品价格
            market_price:0,
            sale_point:'',      //商品卖点
            over_image_url:'',  //图片src
            activity_id:'',      //参与活动的id
            isAddToCart:false,  //表示是否成功添加到购物车
            cartTotalNum:0  ,   //购物车总是数量
            couponData:[],      //优惠券
            couponTitle:'',     //优惠券标题 领券
            sku_detailData:[],  //商品详情页图片
            recommendData:[],   //为您推荐数据列表 
            activity_brief:'',  //活动介绍
            activity_name:'',   //活动名称
            marketActivityData:[],   //所有参与活动的商品数据
            slogenList:[
                {id:0,title:'正品保证',icon:'https://image.watsons.com.cn//upload/27910d08.png'},
                {id:1,title:'满68免邮',icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAAAXNSR0IArs4c6QAABMpJREFUSA2dVn1oW1UUP+elabvUohW2tVHUbn/MgWNT3FTwa4ofndDphCEOLEWWJl0yrNWqDEfEIX7iyEebxg1xDtFu6iq6TDrUggX3n1YFRcHApHMO7bq51prkHX/3vrzyXpamHxfeux/nd87v3HPvPfcyzaNIoP9S4v/uJ+JVJOQnksuJ6Qy+MRJjlJp8Qxxt/3cuU1wJIMH4nTD+LL67QOCtgL0AR46Sx7OH+zpHZ8OVJZNg3zVk5hMgeEArMuVRD+Mb0bMx+W8YX0YsV1iO0AZgGTIT1bsg7QLpeCnpRWQSit1GBfoQwKUwOIH6ZSj3l1O2jUk47qecdKO/A+Q1IP0FpK2cjvxkY1TtIkPY7iNTPsF4NUSfkZfbOBn+y6lQqQ3SZsrRAIncqB01qm7lVOgHW2eGTEK9q6hQOIFwYDPQXmqKdHOUTRs431q6BpbQ5OmDINwCwt/g8HrbYUMZkYEBD4gOWUT8Affv7FoMkbLFb26douqVj8Lhb2CvmfLmfjWuiiajL/5sg2ANoL+Sb3m7JVr8n+ObpklqtoDwHNZws94HikzPyjRf0KYN3qU9WwSPRMWQQOxp6Ug8o9Q53XGKmF/Vpkzeo8cgvJ3EHIYXP1MqspqZRQMW+JOOeAzrFNFqhrcZGyMrTx2oo3NnT4Pahy13JcJobtYA4Y8XTRSIdc8QEX2piJRNfv2xC5jd51gixi5tNRDTmzWZQRhceJFgYivMvmZp8o/kq8cudBSWY7oHHgPhQ65TpSqrK8dPgrENyIs+x5CrWVyCA9pz4jGqMlp4b/tZN8jI6j54MDNu1J3G2j+cIKxBEMnnBBLw9ziDK5wy1ZbO5Gr8j+iMQXQeqWsT9+44WYpDeC27Qo1YM5nUgImCewbMv+txkRVUyH8tgTiOhlVA1Ijzk4GhBoQwR2w8jLP5nS1319gcVplUYRzT7alcMZyWhFPhT3EyOiFXWaQJ9TDCdguILkECOAonry4it3N/eMhql/kbxWUCD2bGWQ2R/LpSKKfDffB6m/ZezULMIczoOEJ3vYXl3cC8U6rn6otp2RXKgowyllCsI+BCgiYVfp88BBmrcNdhRjcVIfuQ1V8sgZfpsmWXOWNQda3K8rBBLbjHlpVBE/dFMkhs90JW3GmcIf+aUDmscwwhX4d1XQtHJ3D3fmVwfDs2Ah8BqI4kt9sJdrY5FRkhqlmLQ/oI+Zc/yNGN6kKtXPKFVzSAOY30ldNXDHbatRhU946JGWy0DFe2M5dUgsltZBYOwrlxMjwr1eWr1gxJU9+obyCWXoTzIxzkq+YyVkmO8K0n09ynMcI99i2vyfSgP/wctvcxxBjrNj0igcQNlQzOJpNQvAVH4zgcr4W9JHarRQoFHUZbUT/ZaHoQ/Tsgwu6TKPnr4/N5pskTb19GU//sgs6TiI46Uu+R/7o259q6yBQpCL1IUQnMMKCdYD4J5bfw6BlEOEb1WPGn7jA6lVRH4SGcwcdRq/ckXlj0PKd3vuTEqvZFZDYA2eJuEOLyE2c4kQN1xhmHwaVo+1EvsXWwGYbIY/QgR347M+ZozEqmMCK4hzp67yE24Tm1YsSV0iw7eEoQD4LkMGaOd8fspSJZqZr07K+n89OKsIEKnjNU1zC2kGfE/wg4wzvgfWe5AAAAAElFTkSuQmCC'},
                {id:2,title:'7天退货',icon:'https://image.watsons.com.cn//upload/2e8ebc1f.png'}
            ],  

        }
    }

    componentDidMount(){
        //对传递过来的列表页数据进行存储
        console.log('this.props.location.search',this.props.location.search);
        let item_id = new URLSearchParams(this.props.location.search).get('item_id');  //item_id必须先这样获取再在下面设置
        let item_name = new URLSearchParams(this.props.location.search).get('item_name')  //item_name必须先这样获取再在下面设置
        let sale_point= new URLSearchParams(this.props.location.search).get('sale_point')
        let over_image_url = new URLSearchParams(this.props.location.search).get('over_image_url')
        // console.log('图片1',over_image_url)
        this.setState({
            item_id:item_id,
            item_name: item_name,
            sale_point:sale_point,
            over_image_url: over_image_url,
            app_price: new URLSearchParams(this.props.location.search).get('app_price'),
            market_price: new URLSearchParams(this.props.location.search).get('market_price'),
        })
        // console.log('图片赋值后2',this.state.over_image_url)  为什么拿不到?
        //获取官网单条商品的数据
        axios.get('https://h5.watsons.com.cn/item/reviews/list?item_id='+item_id+'&count=1&offset=0').then(resp=>{
            this.setState({
                itemObj: resp.data.data.reviews[0]  
            })
        })

        // #addToCart_5th_b. 调用 计算购物车商品总数的函数
        this.cartTotalNumFn();  //初始时的 总数量

        //#coupon_2nd.获取优惠券数据
        axios.get('https://h5.watsons.com.cn/act/mop/item/coupons?item_id='+item_id+'&count=30&offset=0')
        .then(resp=>{
            this.setState({
                couponData: resp.data.data.coupons,
                couponTitle: resp.data.data.text
            })
        })

        // #marketActivityData  商品参与的活动 需要传: activity_id     和group_id 在同一条数据请求中
        // https://h5.watsons.com.cn/item/fullDiscount/ws/list?price_sort=0&activity_id=5341&count=20&offset=0
        axios.get('https://h5.watsons.com.cn/item/fullDiscount/ws/list?price_sort=0&activity_id=5341&count=20&offset=0')
        .then(resp=>{
            // console.log('marketActivityData',resp.data.data.marketActivity)
            this.setState({
                activity_brief: resp.data.data.marketActivity.activity_brief,
                activity_name: resp.data.data.marketActivity.activity_name,
                marketActivityData: resp.data.data.marketActivity.group_item_list
            })
        })


        //#recommendData 为您推荐数据列表    
        axios.get('https://h5.watsons.com.cn/act/mop/aladdin/recommend?source=ITEM_DETAIL&count=30&offset=0&item_id='+item_id)
        .then(resp=>{
            this.setState({
                recommendData: resp.data.data.item_list
            })
        })

        //###sku_detail 详情页图片数据
        axios.get('https://h5.watsons.com.cn/item/desc/data/get?item_uid=11_'+item_id)
        .then(resp=>{
            this.setState({
                sku_detailData: resp.data
            })
        })
    }

    // #addToCart_5th_c. 购物车商品总数量函数
    cartTotalNumFn=()=>{
        let arr = JSON.parse(localStorage.getItem('cart'));
        var totalNum = 0;
        if(arr !==null && arr.length){ //localStorage中有缓存cart,而且长度不为零,则追加数量
            //判断是否是同一种商品,如果是,则只需修改数量,否则直接将全部商品信息添加追加到 goodsData中;
            arr.map(item=>{ //#addToCart_3rd_e.遍历获取的缓存数据
                return totalNum += item.num;
            })
            this.setState({
                cartTotalNum: totalNum
            })
        }
    }

    // ###addToCart_2nd.点击加入购物车函数(非常重要)
    addToCart=()=>{
        // #addToCart_4th_b. 点击加入购物车后,提示'添加成功',设置延时器,让提示信息在一定时间后隐藏
        let timer= null ;
        this.setState({
            isAddToCart:true
        })

        //#addToCart_3rd.点击加入购物车时,将该商品信息,如商品名称\价格\数量\图片地址存储到localStorage中
        let goodsData = [];  //#addToCart_3rd_a.注意:用于添加新数据
        let flag = true;     //#addToCart_3rd_b.设置标识,true标识新增,false表示修改,false表示购物车已经有原来商品信息,只需修改数量

        //###addToCart_3rd_d.将从缓存中获取的数据转换为数组
        let arr = JSON.parse(localStorage.getItem('cart'));
        // console.log('arr',arr);
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

        if(flag){//###addToCart_3rd_c.如果购物车中没有点中的商品信息,则将该商品的所有信息添加到goodsData里
            goodsData.push({
                id:this.state.item_id,
                name:this.state.item_name,
                sku_spec:this.state.itemObj.sku_spec,
                app_price:this.state.app_price,
                market_price:this.state.market_price,
                over_image_url:this.state.over_image_url,
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

    //点击回到首页
    backHome = ()=>{
        this.props.history.push('/')
    }

    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
        clearTimeout(this.timer);   //清除定时器
    }
    
    render(){
        return (
            <div id="Item">
                {/* 引入头部标题 */}
                <HeaderTitle Title={this.state.item_name} />
                <div className="section">
                    {/* 主图栏 */}
                    <div className="mainImg">
                        <img src={this.state.over_image_url} alt={this.state.item_name}/>
                        <ul className="mainImg_list">
                            <li>开箱</li>
                            <li>体验</li>
                            <li>图片</li>
                        </ul>
                    </div>
                    {/* 商品信息栏 */}
                    <div className="goods_info_wrap">
                        <ul className="goods_info">
                            <li className="sale_point">{this.state.sale_point}</li>
                            <li className="item_long_name">{this.state.item_name}</li>
                            <li className="price_list">
                                <div className="app_priceWrap">
                                    <span >&yen;</span>
                                    <span className="app_price">{this.state.app_price/100}</span>
                                </div> 
                                {/* ? */}
                                <div className="market_priceWrap" style={this.state.market_price===0?{'display':'block'}:{'display':'none'}}>
                                    <span>&yen;</span>
                                    <span className="market_price">{this.state.market_price/100}</span>
                                </div >
                            </li>
                        </ul>
                        <div className="label_list_wrap">
                            <ul className="label_list">
                            {
                                this.state.slogenList.map((item)=><li key={item.title}>
                                    <img src={item.icon} alt={item.title}/>
                                    &nbsp;<p>{item.title}</p>
                                </li>)
                            }
                            </ul>
                        </div>
                    </div>
                     {/* 优惠券栏 */}
                    <ul className="coupon_wrap">
                        <li className="couponTitle">{this.state.couponTitle}</li>
                        {
                            this.state.couponData.map((item,index)=>{return index<=2?<li className="coupon_main" key={index}>
                                <div>{item.coupon_name}</div>
                            </li>:''})
                        }
                       <li className="arrowRight"><Icon type="right" /></li>
                    </ul> 
                    
                    {/* 商品参与的活动列表 */}
                    <div className="activity_wrap">
                        <div className="activity_list">
                        {/* style={this.state.activity_brief_name?{'display':'block'}:{'display':'none'}}  */}
                        {/* 还差一个点击事件显示更多 */}
                            <div className="activity marketActivity ">
                                <p>{this.state.activity_brief}</p>
                                <p>{this.state.activity_name}</p>
                                <div className="moreActivity">凑单<Icon type="right" /></div>
                            </div>
                            <div className="activity memberRight"><p>会员特权</p><p>购卡后两个月内享2次满150减20特权</p></div>
                            <div className="activity freeDelivery"><p>全场包邮</p><p>买满68元包邮</p></div>
                        </div>
                    </div>

                    {/* 配送服务 */}
                    <div className="deliveries_wrap">
                        <div className="deliveries_title">配送服务</div>
                        <ul className="deliveries">
                            <li className="delivery">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAAAXNSR0IArs4c6QAABMpJREFUSA2dVn1oW1UUP+elabvUohW2tVHUbn/MgWNT3FTwa4ofndDphCEOLEWWJl0yrNWqDEfEIX7iyEebxg1xDtFu6iq6TDrUggX3n1YFRcHApHMO7bq51prkHX/3vrzyXpamHxfeux/nd87v3HPvPfcyzaNIoP9S4v/uJ+JVJOQnksuJ6Qy+MRJjlJp8Qxxt/3cuU1wJIMH4nTD+LL67QOCtgL0AR46Sx7OH+zpHZ8OVJZNg3zVk5hMgeEArMuVRD+Mb0bMx+W8YX0YsV1iO0AZgGTIT1bsg7QLpeCnpRWQSit1GBfoQwKUwOIH6ZSj3l1O2jUk47qecdKO/A+Q1IP0FpK2cjvxkY1TtIkPY7iNTPsF4NUSfkZfbOBn+y6lQqQ3SZsrRAIncqB01qm7lVOgHW2eGTEK9q6hQOIFwYDPQXmqKdHOUTRs431q6BpbQ5OmDINwCwt/g8HrbYUMZkYEBD4gOWUT8Affv7FoMkbLFb26douqVj8Lhb2CvmfLmfjWuiiajL/5sg2ANoL+Sb3m7JVr8n+ObpklqtoDwHNZws94HikzPyjRf0KYN3qU9WwSPRMWQQOxp6Ug8o9Q53XGKmF/Vpkzeo8cgvJ3EHIYXP1MqspqZRQMW+JOOeAzrFNFqhrcZGyMrTx2oo3NnT4Pahy13JcJobtYA4Y8XTRSIdc8QEX2piJRNfv2xC5jd51gixi5tNRDTmzWZQRhceJFgYivMvmZp8o/kq8cudBSWY7oHHgPhQ65TpSqrK8dPgrENyIs+x5CrWVyCA9pz4jGqMlp4b/tZN8jI6j54MDNu1J3G2j+cIKxBEMnnBBLw9ziDK5wy1ZbO5Gr8j+iMQXQeqWsT9+44WYpDeC27Qo1YM5nUgImCewbMv+txkRVUyH8tgTiOhlVA1Ijzk4GhBoQwR2w8jLP5nS1319gcVplUYRzT7alcMZyWhFPhT3EyOiFXWaQJ9TDCdguILkECOAonry4it3N/eMhql/kbxWUCD2bGWQ2R/LpSKKfDffB6m/ZezULMIczoOEJ3vYXl3cC8U6rn6otp2RXKgowyllCsI+BCgiYVfp88BBmrcNdhRjcVIfuQ1V8sgZfpsmWXOWNQda3K8rBBLbjHlpVBE/dFMkhs90JW3GmcIf+aUDmscwwhX4d1XQtHJ3D3fmVwfDs2Ah8BqI4kt9sJdrY5FRkhqlmLQ/oI+Zc/yNGN6kKtXPKFVzSAOY30ldNXDHbatRhU946JGWy0DFe2M5dUgsltZBYOwrlxMjwr1eWr1gxJU9+obyCWXoTzIxzkq+YyVkmO8K0n09ynMcI99i2vyfSgP/wctvcxxBjrNj0igcQNlQzOJpNQvAVH4zgcr4W9JHarRQoFHUZbUT/ZaHoQ/Tsgwu6TKPnr4/N5pskTb19GU//sgs6TiI46Uu+R/7o259q6yBQpCL1IUQnMMKCdYD4J5bfw6BlEOEb1WPGn7jA6lVRH4SGcwcdRq/ckXlj0PKd3vuTEqvZFZDYA2eJuEOLyE2c4kQN1xhmHwaVo+1EvsXWwGYbIY/QgR347M+ZozEqmMCK4hzp67yE24Tm1YsSV0iw7eEoQD4LkMGaOd8fspSJZqZr07K+n89OKsIEKnjNU1zC2kGfE/wg4wzvgfWe5AAAAAElFTkSuQmCC" alt="同意"/>
                                <p className="delivery_text">快递配送</p>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAA6NJREFUWAnNWN1OE0EUnp3+ULpAiYAUIkpQwqUxPoRifAG89RE03hi50Hhj9DHUFzBWH8IYLwnaiIHaCobSX9LSXc833d3Mbnf2zxI9yXZnz5yfb87MnDlTjcWgarWqtxuNW4Zp3mGmeZVUl016YEJjrEKvCtO0b1zT3uszMx+LxWIbfVGI9MNpd3f3hmkYT0h40zTNXLgGAdO0UwJZ0jh/tr6+/jlMJxBIuVy+Muj1npPVewQgUFbliACZFL03qWz28dra2p5STtXxdWdnk0b0lgAUVDJx+ATohEaydW1jo+Snx/2YBOIBgXg3LhDwAVuwCdt+PkfCDUFajC/9hMfFo8X8kCLzSrbnAmJNByLhGylZ8W/aNE0GOb4rT5MDRCzMfv/LOKcjCCzWTCqTuW4vYGfk2B1xQUxMTLCp6WlWmJ1leV1nqVQqyLerD77EjrS4IiLIE8wwPlGnEyGXlucjNznJLi4uMgCRyTAMVj8+Zr+PjmS2si22Nuc3kWeGETGM7TggLq2sOCDgHA+Ic84uzM2x+YUFpXO5Az6RKMHTkLabJydHxAzNmDQCdnl1lWWzWeG8Vq2yVrMpAOhTUyJKAAP6Xi6zfr8v2kE/ZPN0ulCY5zg7ooCAMUwFQIA67bYAgTYi0mw0WKvVwqegXC50XEIOvoGBiwPMUg572SAg1+l0RsRPJV4qnR7pVzGAIW2doioZF79NUfixtyd4/V7P1YcPnXaQTVGmxZYFBsAWx7jDDGgMBgOGx4+wRvL5vOg6OzsTU+cnp+Atpyn/RwaiMCJySXFpCUc/zhT2q1YTb5W8lw8M0SfSq21965TIbBBYtD8PDnzXj0LdYXPKYKisEhEisChForK/nwgEMGDTJwaCDGun9Xq9zrrdbqIBAQNHjZlUW07xXWnrxrZHGNIodAemeT+2Mik0KavaAHo+2zmqTWDgqLaRZqMqeeVw6mY9h59XJugbvoGBWyX/hyBhVR/pigMOu2amkKy0pa1bAobhCcX5U0JGvHiUyWQcBbntMEMa8InrBsQEEHHvoJI/RG+k+/DwkGFt4NzBrolN5NO+89AWHtJ/UyqidiRUWxSuYZVjIzyHN3zAl12vwsVwjVjOUFWTwKNz8O0yCR9yBY9O4o2SdcF6QQeYC+ioZDyOFQmAcN1pYMUXCDqsO86/vXICCEKHewchfY1tBl4Sgi5swJZ3OmR7yojIQtZ1Y5t4t6PWtwRgfH9LyGDQPs8/av4ADpmfBI1PiscAAAAASUVORK5CYII=" alt="疑问"/>
                            </li>
                        </ul>
                    </div>

                    {/* 小编说 */}
                    <div className="brief_wrap">
                        <p className="brief_title">笋编说</p>
                        <div className="desc_content">
                            <img className="punctuation" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAZCAYAAADJ9/UkAAAAAXNSR0IArs4c6QAAA51JREFUSA2Nlk1IVFEUx2feqA00zgfoQFEQLSyS2hRls7CwIsMIpBaW5iKojdSiEIOiJFcRFUgQFK6iJPqAFk20CAmjKBUhMAkJXaRokx/jDNV897uTd7reeTO+B4d77v+c//+cd+feN9dmU57p6enV4XD4UCQSeRSNRpOM97E9fX19JUpaUXdkZKQMTh12D40EYy/jgbGxsVU60S4BitYbhnHdbrdvk5gcM5lMfzqdbvd4PB8lZjYuLi4G0LhFbJdJfACdjvLy8j4ZyxancIPD4XgK6JQBfYQYpoHjNPBKj4k5hXfT+EvMZxZfwn6h00oDz8TcPj8/7y0pKRmCtLEIKRuC+COVSgW8Xu83NXd8fNxZWVnZD7ZDxc18NBbAAzQwalC43kphIUSen/zLumhFRUUN2IqFlzS8jFeEb2BdwrH60Hnj7Ozsei0/b59ocX16mBXfYPA2ebtQz1Tn5HvKysrEm+YesNzGzYFFHNJdrOBOg010tUheodAmNZBMJkfVuRWfBlo5GUaQpZyxQpA5EN3SF2M8Hn+PxlcVs+A3GC6Xa0acYZLTFgjZFArF1Vy/3x9F4zxYTMVX8CfEhrNxdh8g2IyN6QSwiI4xz1spNII0cIz8ET0fLGyC9SzbKHNzcx4+NgGsimQD0jBLfBL/lErmrNdT7LWKSV98olnNAPMtmAP7jO3DLmK5B42GZcVzEcXh2/yGBuokJN4iFotVc7YnJbbSiMZDNE7IPDSiiUSiOrvsEtTHpfO8XcMHKDylYQWnYjUpXKslDHV3d38vWry0tLQFokcl0nUv84yKFfM5z43E12k5jzs7O9MFi4dCobUcw7MaaYLf6rmGFZyycm6a79ASJnmBJwIrWNzpdN4kvkYlQrrh8/nEH4Olhy/hNYpv1pJvu93unwIzLc4GuQSpSSVRuJ+d3KNixXw0zqBxTssZ5K/3rob9nxJs5+aRxjLSEAph4uhYetA4BTcm+WKEH15YWNA37z89fuNyEu6ohCX/D2JHrFQVVyU0uuClNJ0k8+Y8DUEQ9zaCQxpBvPlvrCWPpAGDg4OlFK3F3ppoiLtgm0bJTu0E9vLb5O5VMonfOISdZnO8kFihkYJbiX3Cll3D4Ef45LaJz7cZ12ATfSBpWXHm72hov5XCQjQYDH6Bozc5DHawUOFcMyx7Dd2L32kKuyDuZLmgRYd9UQU3ykrOYZ3ijFuk2mwQmkyuR5b5IhGNo6IJq6S/gGYrT1oW8i8AAAAASUVORK5CYII=" alt="左号" />
                            <div className="content">小编用一囤三的好货！cosme上的常客，深受好评！性价比杠杠的。用前摇一摇倒在化妆棉后轻敷眼部，平时难卸的防水眼线液和睫毛膏都能卸的干干净净。</div>
                            <img className="punctuation" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAZCAYAAADJ9/UkAAAAAXNSR0IArs4c6QAAA51JREFUSA2Nlk1IVFEUx2feqA00zgfoQFEQLSyS2hRls7CwIsMIpBaW5iKojdSiEIOiJFcRFUgQFK6iJPqAFk20CAmjKBUhMAkJXaRokx/jDNV897uTd7reeTO+B4d77v+c//+cd+feN9dmU57p6enV4XD4UCQSeRSNRpOM97E9fX19JUpaUXdkZKQMTh12D40EYy/jgbGxsVU60S4BitYbhnHdbrdvk5gcM5lMfzqdbvd4PB8lZjYuLi4G0LhFbJdJfACdjvLy8j4ZyxancIPD4XgK6JQBfYQYpoHjNPBKj4k5hXfT+EvMZxZfwn6h00oDz8TcPj8/7y0pKRmCtLEIKRuC+COVSgW8Xu83NXd8fNxZWVnZD7ZDxc18NBbAAzQwalC43kphIUSen/zLumhFRUUN2IqFlzS8jFeEb2BdwrH60Hnj7Ozsei0/b59ocX16mBXfYPA2ebtQz1Tn5HvKysrEm+YesNzGzYFFHNJdrOBOg010tUheodAmNZBMJkfVuRWfBlo5GUaQpZyxQpA5EN3SF2M8Hn+PxlcVs+A3GC6Xa0acYZLTFgjZFArF1Vy/3x9F4zxYTMVX8CfEhrNxdh8g2IyN6QSwiI4xz1spNII0cIz8ET0fLGyC9SzbKHNzcx4+NgGsimQD0jBLfBL/lErmrNdT7LWKSV98olnNAPMtmAP7jO3DLmK5B42GZcVzEcXh2/yGBuokJN4iFotVc7YnJbbSiMZDNE7IPDSiiUSiOrvsEtTHpfO8XcMHKDylYQWnYjUpXKslDHV3d38vWry0tLQFokcl0nUv84yKFfM5z43E12k5jzs7O9MFi4dCobUcw7MaaYLf6rmGFZyycm6a79ASJnmBJwIrWNzpdN4kvkYlQrrh8/nEH4Olhy/hNYpv1pJvu93unwIzLc4GuQSpSSVRuJ+d3KNixXw0zqBxTssZ5K/3rob9nxJs5+aRxjLSEAph4uhYetA4BTcm+WKEH15YWNA37z89fuNyEu6ohCX/D2JHrFQVVyU0uuClNJ0k8+Y8DUEQ9zaCQxpBvPlvrCWPpAGDg4OlFK3F3ppoiLtgm0bJTu0E9vLb5O5VMonfOISdZnO8kFihkYJbiX3Cll3D4Ef45LaJz7cZ12ATfSBpWXHm72hov5XCQjQYDH6Bozc5DHawUOFcMyx7Dd2L32kKuyDuZLmgRYd9UQU3ykrOYZ3ijFuk2mwQmkyuR5b5IhGNo6IJq6S/gGYrT1oW8i8AAAAASUVORK5CYII=" alt="右号" />
                        </div>
                    </div>

                    {/* 品牌介绍 */}
                    {/* <div className="brand_wrap">
                        <p className="brand">品牌</p>
                        <div className="desc_content">
                            <div className="brand_logo"><img className="" src="" alt="左号" /></div>
                            <div className="brand_info">
                                <div className="brand_name"></div>
                                <div className="brand_intro"></div>
                            </div>
                        </div>
                    </div> */}

                    {/* 用户评论 */}
                    <div className="comment_wrap"></div>

                    {/* 搜索栏的热搜词url: https://h5.watsons.com.cn/search/hotWord */}
                    {/* 为您推荐左侧滑动*/}
                    <div className="recommend_wrap">
                        <p className="recommend_title">为你推荐</p>
                        <div className="goodsWrap">
                            {
                                this.state.recommendData.map((item,index)=><ul key={index} className="ScrollXList">
                                    <li className="ScrollXItem">
                                        <img src={item.over_image_url} alt={item.item_short_name} />
                                        <p className="ScrollX_itemName">{item.item_short_name}</p>
                                        <p><span className="app_price">&yen;{item.min_app_price/100}</span></p>
                                    </li>
                                </ul>)
                            }
                        </div>

                    </div>
                    
                    {/* 商品详情页 */}
                    <div className="sku_detail">
                        {
                            this.state.sku_detailData.map((item,index)=><div key={index}>
                                 <img src={item} alt={item} />
                            </div>)
                        }
                    </div>
                         
                    {/* 版权说明 */}
                    <CopyRight />
                   
                </div>

            
                {/* #addToCart_5th 给购物车图标添加显示购物车数量的微标Badge 并将数据传传过去*/}
                <div id="homeCouponCart">
                    <span className="backHome" onClick={this.backHome}></span>
                    {/* <Link to="/coupon"><span className="coupon" style={this.props.hideCoupon?{'display':'none'}:{'display':'block'}}></span></Link> */}
                    <Link to="/shoppingcart"> 
                    {/* 给购物车添加微章  <Badge count={this.state.total}>*/}
                        <Badge count={this.state.cartTotalNum}>
                            <span className="shoppingCart"></span>
                        </Badge >
                    </Link>
                </div>

                <div className="cartOrBuy">
                    {/* #addToCart_1st. 添加加入购物车事件*/}
                    <div onClick={this.addToCart}>加入购物车</div>
                    <div >立即购买</div>
                </div>
                {/* #addToCart_4th_a. 点击加入购物车后,显示 添加成功 的提示 */}
                <div style={this.state.isAddToCart?{'display':'block'}:{'display':'none'}} className="isAddToCart">添加成功</div>
            </div>
        )
    }
}

export default withRouter(Item);