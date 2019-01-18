import React,{Component} from 'react'
import axios from 'axios'
import {Icon} from 'antd'
import {Link,withRouter} from 'react-router-dom'
//引入样式
import './index.scss'

class GoodsList extends Component{
    constructor(){
        super();
        this.state={
            meetSkinData:[],
            topSale:[],
            skinCare:[],
            PersonalCare:[],
            dailyNecessities:[]
        }
    }
    componentDidMount(){
        // 今日秒杀下面的商品组
        axios.get('item/ws/group_list?current_page=1&page_size=24&group_id=12964&device_id=9e6e1e60-0ee4-11e9-9eb8-bfdbe83e373d')
        .then((resp)=>{
            // console.log("肌肤",resp.data.data.item_list)
            this.setState({
                meetSkinData: resp.data.data.item_list
            })
        })
  
        // 新年精制好物榜
        axios.get('item/ws/group_list?current_page=1&page_size=24&group_id=12965&device_id=fe189850-0ef2-11e9-9f26-2ff4a77268bb')
        .then((resp)=>{
            // console.log("新年精制好物榜",resp.data.data.item_list)
            this.setState({
                topSale: resp.data.data.item_list
            })
        })
        // 心动光耀潮妆
        axios.get('item/ws/group_list?current_page=1&page_size=24&group_id=12966&device_id=fe189850-0ef2-11e9-9f26-2ff4a77268bb')
        .then((resp)=>{
            // console.log("心动光耀潮妆",resp.data.data.item_list)
            this.setState({
                skinCare: resp.data.data.item_list
            })
        })
        // 大牌个护疯降
        axios.get('item/ws/group_list?current_page=1&page_size=24&group_id=12967&device_id=fe189850-0ef2-11e9-9f26-2ff4a77268bb')
        .then((resp)=>{
            // console.log("大牌个护疯降",resp.data.data.item_list)
            this.setState({
                PersonalCare: resp.data.data.item_list
            })
        })
        // 生活精品一件包邮
        axios.get('item/ws/group_list?current_page=1&page_size=24&group_id=12968&device_id=fe189850-0ef2-11e9-9f26-2ff4a77268bb')
        .then((resp)=>{
            // console.log("生活精品一件包邮",resp.data.data.item_list)
            this.setState({
                dailyNecessities: resp.data.data.item_list
            })
        })
        //  居家优选 一站凑单 需要数据渲染
    }
  
    render(){
        return (
            <div id="GoodsList">
              {/* 今日秒杀下面的商品组 */}
              {/* item/ws/group_list?current_page=1&page_size=24&group_id=12964&device_id=9e6e1e60-0ee4-11e9-9eb8-bfdbe83e373d */}
               {/* <ul className="meetSkinList">{
                   this.state.meetSkinData.map((item,index)=>{return index>11?"":<li key={index} className="meetSkinItem">
                        <img src={item.over_image_url} alt={item.brand_name}/>
                        <p className="meetSkinItemName">{item.item_short_name}</p>
                        <div className="meetSkinItemFooter">
                            <div className="ItemPrice">
                                <span className="min_app_price">&yen;{item.min_app_price/100}</span><s className="min_market_price">&yen;{item.min_market_price/100}</s> 
                            </div>
                            <span><Icon className="shoppingCart" type="shopping-cart"/></span>
                        </div>
               </li>})
               }</ul> */}
                
                {/* 新年精制好物榜 */}
               <img src="https://image.watsons.com.cn//upload/49c535e1.jpg?x-oss-process=image/quality,q_80/format,webp"  
               alt="新年精制好物榜"/>

               {/* 点击跳转到 新宠精致美肌 页面 skinCare.js */}
               <Link className="beautySkin" to="/skincare"><img src="https://image.watsons.com.cn//upload/3965e404.jpg?x-oss-process=image/quality,q_80/format,webp" alt="新宠精致美肌" /></Link>
               {/* <div className="beautySkin" onClick={this.beautySkin}><img src="https://image.watsons.com.cn//upload/3965e404.jpg?x-oss-process=image/quality,q_80/format,webp" alt="新宠精致美肌" /></div> */}
               <ul className="meetSkinList">{
                   this.state.topSale.map((item,index)=><li key={index} className="meetSkinItem">
                        <img src={item.over_image_url} alt={item.brand_name}/>
                        <p className="meetSkinItemName">{item.item_short_name}</p>
                        <div className="meetSkinItemFooter">
                            <div className="ItemPrice">
                                <span className="min_app_price">&yen;{item.min_app_price/100}</span><s className="min_market_price">&yen;{item.min_market_price/100}</s> 
                            </div>
                            <span><Icon className="shoppingCart" type="shopping-cart"/></span>
                        </div>
                   </li>)
               }</ul>
                
                {/* 心动光耀潮妆 */}
               <img src="https://image.watsons.com.cn//upload/c07e1956.jpg?x-oss-process=image/quality,q_80/format,webp" alt="心动光耀潮妆"/>
               <ul className="meetSkinList">{
                   this.state.skinCare.map((item,index)=>{return index<6? <li key={index} className="meetSkinItem">
                        <img src={item.over_image_url} alt={item.brand_name}/>
                        <p className="meetSkinItemName">{item.item_short_name}</p>
                        <div className="meetSkinItemFooter">
                            <div className="ItemPrice">
                                <span className="min_app_price">&yen;{item.min_app_price/100}</span><s className="min_market_price">&yen;{item.min_market_price/100}</s> 
                            </div>
                            <span><Icon className="shoppingCart" type="shopping-cart"/></span>
                        </div>
               </li>:''})
               }</ul>
              
               {/* 大牌个护疯降 */}
               <img src="https://image.watsons.com.cn//upload/e9c2df55.jpg?x-oss-process=image/quality,q_80/format,webp" alt="大牌个护疯降" />
               <ul className="meetSkinList">{
                   this.state.PersonalCare.map((item,index)=>{return index<6? <li key={index} className="meetSkinItem">
                        <img src={item.over_image_url} alt={item.brand_name}/>
                        <p className="meetSkinItemName">{item.item_short_name}</p>
                        <div className="meetSkinItemFooter">
                            <div className="ItemPrice">
                                <span className="min_app_price">&yen;{item.min_app_price/100}</span><s className="min_market_price">&yen;{item.min_market_price/100}</s> 
                            </div>
                            <span><Icon className="shoppingCart" type="shopping-cart"/></span>
                        </div>
               </li>:""})
               }</ul>
              
               {/* 生活精品一件包邮 */}
               <img src="https://image.watsons.com.cn//upload/91f5c8c8.jpg?x-oss-process=image/quality,q_80/format,webp" alt="生活精品一件包邮" />
               <ul className="meetSkinList">{
                   this.state.dailyNecessities.map((item,index)=><li key={index} className="meetSkinItem">
                        <img src={item.over_image_url} alt={item.brand_name}/>
                        <p className="meetSkinItemName">{item.item_short_name}</p>
                        <div className="meetSkinItemFooter">
                            <div className="ItemPrice">
                                <span className="min_app_price">&yen;{item.min_app_price/100}</span><s className="min_market_price">&yen;{item.min_market_price/100}</s> 
                            </div>
                            <span><Icon className="shoppingCart" type="shopping-cart"/></span>
                        </div>
               </li>)
               }</ul>

               <img src="https://image.watsons.com.cn//upload/2a161902.jpg?x-oss-process=image/indexcrop,y_800,i_0/quality,q_80/format,webp" alt="新年精制好物榜"/>
               
               {/* 居家优选 一站凑单 需要数据渲染 */}
               <img src="https://image.watsons.com.cn//upload/87f8d31c.jpg?x-oss-process=image/indexcrop,y_800,i_0/quality,q_80/format,webp" alt="居家优选 一站凑单" />
            </div>
        )
    }
}
export default withRouter(GoodsList);