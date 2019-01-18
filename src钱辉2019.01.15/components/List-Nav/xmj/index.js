import React,{Component} from 'react';
import axios from 'axios';
import { Icon } from 'antd';
import {Link} from 'react-router-dom';
import Fixed from '../../commons/fixed'

import './index.scss';


let xmjImg = '/tms/aladdin/get?code=h5_topfixed_img';
export default class Xmj extends Component {
    constructor(){
        super();
        this.state = {
            topImg:'',
            list:[],
            page:1,
            scrollTop:0,
            end:false,
            show:false,
            type:false,
            groupId:12983,
            group:[
                {'id':0,'name':'洁面卸妆','groupId':12983,type:true},
                {'id':1,'name':'水乳面霜','groupId':12984,type:false},
                {'id':2,'name':'精华眼霜','groupId':12985,type:false},
            ],
            totalCount:0
        }
    }
    componentDidMount(){
        axios.get(xmjImg).then((resp)=>{
            this.setState({
                topImg:resp.data.data.datas[0].image_url
            })
        })

        if (localStorage.getItem('cart')) {
            let cart = JSON.parse(localStorage.getItem('cart'));
            let num = 0;
            cart.map((item)=>{
                return num += item.count;
            })
            this.setState({
                totalCount:num
            })
        }

        this.getData(this.state.groupId);
        //调用监听滚动事件
        this.scroll();
    }
    scroll(){
        let _this = this;
        window.onscroll = function(){
            //滚动高度
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
           
            _this.setState({
                scrollTop:scrollTop
            })
            //可视高度
            let Height = document.documentElement.clientHeight;
            //当前页面的总高度
            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            //判断
                if (scrollHeight-scrollTop<=Height) {
                    _this.loadMore(_this.state.page+1);
                    _this.setState({
                        page:_this.state.page+1
                    })
                }    
        }
    }
    loadMore=(i)=>{
        if (!this.state.end) {
            this.setState({
                type:true
            })
            //i可以用this.state.page代替
            axios.get('/item/ws/group_list?current_page='+i+'&page_size=24&group_id='+this.state.groupId+'&device_id=f99cdd20-0f53-11e9-8114-4b7506e1f294')
            .then((resp)=>{
                //判断是否是最后一页
                if (!resp.data.data.item_list) {
                    this.setState({
                        end:true,
                        type:false
                    })
                }else{
                    let oldList = this.state.list;
                    let newList = [];
                    newList = oldList.concat(resp.data.data.item_list);
                    this.setState({
                        list:newList
                    })
                    // console.log(newList)
                }
            })
        }
    }
    goBack=()=>{
        this.props.history.go(-1);
    }
        //组件销毁前  ，将未更新完的状态停止
	componentWillUnmount(){
		this.setState=(state,callback)=>{
			return;
		}
    }
    change(id,groupId){
        // console.log(id+":"+groupId);
        let newGroup = this.state.group;
        for (var i = 0; i < newGroup.length; i++) {
            const element = newGroup[i];
            // console.log(i)
            if (id===i) {
                element.type=true
            }else{
                element.type=false
            }
            this.setState({
                group:newGroup,
                //加载更多的时候,更改新加载数据的id,否则会加载第一页的数据
                groupId:groupId,
                end:false,
                page:1
            })
        }
        this.getData(groupId);
    }
    getData(groupId){
        axios.get('/item/ws/group_list?current_page=1&page_size=24&group_id='+groupId+'&device_id=f99cdd20-0f53-11e9-8114-4b7506e1f294')
        .then((resp)=>{
            // console.log(resp.data.data.item_list);
            this.setState({
                list:resp.data.data.item_list
            })
        })
    }
    render(){
        return(
            <div className="goodsList">
                <Fixed totalCount={this.state.totalCount} show={'none'}/>
                <div className='topImg'>
                    <img src={this.state.topImg} alt=''/>
                </div>
                <div className="listTitle" style={this.state.scrollTop>100?{'position':'fixed'}:{'position':'static'}}>
                    <span onClick={this.goBack}><img style={{'width':'20%'}} alt='' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAArCAYAAABmbJjGAAAAAXNSR0IArs4c6QAABFpJREFUWAm1l0tMVFcYx5kZqsmwkEBrlGLaQnlFE1MTSVzUxAcSGAYG6sRWujBxYaJiXBgTdcPOuCIpxrgxxuCiCTYdGCAtggkduoFJG018FBxtG5WFSkyTGXFgGH/f4LkebpkHd8aT3Hu+891z/r/znXse9zryPkBqbW1dX15ePlBdXf3X1NTUE0HYcs1paWnZND8/P4JuJVfY4XA0+/3+WzkFNTc3fxmLxUbi8fhnWgBz2DvsmiMr0+VybQESMEFE88rg4ODtnIDcbvd2AGNcG0y9PT80NHTcZrPFswY1NjbuXFxcHAVQZIKcAXJW+RzKsJITSQPt/ERSoLWPE8FxIF2aL88yqKmpaT+R3EBsrRIEEMM+BOSK8qnc0tAxXIeI4kdEPlJCQKJcXiA9yqfnq46I2dWBwGUuo5MAIna7vWVgYGBQF9dto7LuTGYDOUckP/BcX3//AalnUQ4nayd+vUGqenkM1wUqnNYrEcmLd5A/dP9KdtqhIwJbMBi8ROOTugCQZ/n5+bv7+/vv6P5kdsqIOjs78ycnJ68C+14XAPKY8l5W/CPdn8pOCuro6FgbCoVkZnl0ASD3uep48U91fzp7RRAL0cm+5aNxnUngz4KCgvre3t7nJn/a4v9mndfrXQdEZpAZ8juQXVYg0otlERHJx6z2X3kn20xdvMm54mEKR0z+jItGRJwlJUB+WwHi47R0ZwOR3iRARPIFwzUOpEbvIi/9em1trbe7u/uN7rdi21jtIi6nYolJ4DLT9yiwuMlvqSgRda0AeVJcXHwqVxDpmd3pdB5AcNzUzdLZ2dlhmYEmv+ViYta9Wzc/o7LPpGR53Zh0liaDzCjWiJvIBKanryKRyBiH3Ke604ptTG8WYpRh9LIbLzu4ZCZyBZg0ZVYAqs2yBStORG1EcJH8qKokOdHKbl3X19d3T/dnahsRqQYy05jWx8jl/DES4JKFhYUx3qd51zDqpDKSnkfT09MjlZWV8zTeowk4AX7HN/U439T/av60ZlKQtAQWqKqqeol4A0U1zPLV8y2wILCQ1MskpQSJAGITRPY3Q+mmqIZavn4O0Im7PH8g9dKltCARILLbRHAXUw5B1Uby/RUVFY95nvY4V41okzrR8/uIBonsG2pKRJIkQg8RPwc2mfAkuWUMkvaIPQQWwBSY+kKVd+fC/4bn5q2MR0tpVSBpgtg/NTU1stsLzLkkk7jvJbI1PL+l+QxTzSTDkanBetrMGXaT+hv1NgztRT5cTpAvO14sg0Tc4/GU8xs5SnT6H57sItfYzg6zrclHfyJlBRKFtra20rm5OflnrUoovr/9xEZ9UPZQcWUNEhH5C49Go8NEtlXKKhHZL0TWBux1TkAizDAWMoxDwHYokOTAAoWFhU1qpevPLNk+n+9VUVFRHcKjugDgz8Ph8Cc5A4l4T09PuKyszIXplzLQh2Rf04nQqteRCKRKExMTsfb29t6ZmZk1RHOEP8CnUv8t5ZCsbFYYHdAAAAAASUVORK5CYII="/></span>
                    <span>新宠精致美肌</span>
                </div>
                <ul className="headTitle" style={this.state.scrollTop>100?{'position':'fixed'}:{'position':'static'}}>
                    {
                        this.state.group.map((item,index)=>{
                            return <li key={item.id+index}
                             onClick={()=>this.change(item.id,item.groupId)}
                            className={item.type?'activeList':''}
                             >
                                {item.name}
                            </li>
                        })
                    }
                </ul>
                <ul className="listContent">
                    { 
                        this.state.list.map((item,index)=>{
                                return <li key={item.item_uid+index} className="xmjItem" >
                                <Link to={{ pathname:'/itemDetial/'+item.item_id+'',state:{data:item}}}>
                                <div className="itemImg">
                                    <img src={item.over_image_url} alt=''/>
                                   <div className="gift">
                                        {
                                            item.promotions?
                                            item.promotions.map((ele,ccc)=><span key={ele+ccc} className="giftItem">
                                            {ele}
                                            </span>)
                                            :''
                                        }
                                    </div>
                                </div>
                                </Link>
                                <div className="salePoint">{item.sale_point?item.sale_point:''}</div>
                                <div className="itemName">
                                    <span>{item.item_name.length&&item.item_name.length>13?item.item_name.slice(0,13):item.item_name}</span>
                                    {
                                        item.item_name.length>13?
                                        <span className="ccc">...</span>
                                        :''
                                    }
                                </div>
                                <div className="itemPrice">
                                    <span>¥{item.min_price/100}</span>
                                    <Link className='toCart' to='/shoppingCart'>
                                        <span></span>
                                    </Link>
                                </div>
                                {   
                                    item.specials?
                                    <span className="itemSpecial" style={{'background':'#FFE2EC'}}>
                                        {item.specials}
                                    </span>
                                    :   
                                    <span className="itemSpecial"></span>
                                }
                            </li>
                        })
                    }
                {    
                   this.state.type?
                    <div className="loading">
                        <Icon type="sync" spin />
                        加载中...
                    </div>
                    :''
                }
                 {
                    this.state.end?
                    <div className="loadAll">到底啦</div>
                    :''
                }
                </ul>
            </div>
        )
    }
}