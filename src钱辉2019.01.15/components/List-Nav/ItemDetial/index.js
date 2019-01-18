import React,{Component} from 'react';
import axios from 'axios';
// import Fixed from '../../../components/commons/fixed';
import AddToCart from '../../commons/addToCart';
import Time from '../../commons/time';
import ItemDetialData from '../ItemDetialData';
import ItemDetialIntro from '../ItemDetialIntro';
import Recommend from '../Recommend';
import './index.scss'

export default class ItemDetial extends Component {
    constructor(props){
        super(props);
        this.state = {
            itemDetial:this.props.location.state.data,
            intro:[],
            recommend:[]
        }
        // console.log(this.state.itemDetial)
    }
    goBack=()=>{
        this.props.history.go(-1);
    }
    componentDidMount(){
        axios.get('/item/desc/data/get?item_uid=11_'+this.state.itemDetial.item_id)
        .then((resp)=>{
            // console.log(resp.data)
            this.setState({
                intro:resp.data
            })
        })
        // /act/mop/aladdin/recommend?source=ITEM_DETAIL&count=30&offset=0&item_id=23502
        axios.get('/act/mop/aladdin/recommend?source=ITEM_DETAIL&count=30&offset=0&item_id='+this.state.itemDetial.item_id)
        .then((resp)=>{
            // console.log(resp.data.data.item_list)
            this.setState({
                recommend:resp.data.data.item_list
            })
        })
    }
    render(){
        return(
            <div className='itemDetialContent'>
                <AddToCart props={this.props}/>
                {/* <Fixed display={this.state.display} height={this.state.height}/> */}
                <div className="listTitle" style={this.state.scrollTop>100?{'position':'fixed'}:{'position':'static'}}>
                    <span onClick={this.goBack}><img style={{'width':'20%'}} alt='' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAArCAYAAABmbJjGAAAAAXNSR0IArs4c6QAABFpJREFUWAm1l0tMVFcYx5kZqsmwkEBrlGLaQnlFE1MTSVzUxAcSGAYG6sRWujBxYaJiXBgTdcPOuCIpxrgxxuCiCTYdGCAtggkduoFJG018FBxtG5WFSkyTGXFgGH/f4LkebpkHd8aT3Hu+891z/r/znXse9zryPkBqbW1dX15ePlBdXf3X1NTUE0HYcs1paWnZND8/P4JuJVfY4XA0+/3+WzkFNTc3fxmLxUbi8fhnWgBz2DvsmiMr0+VybQESMEFE88rg4ODtnIDcbvd2AGNcG0y9PT80NHTcZrPFswY1NjbuXFxcHAVQZIKcAXJW+RzKsJITSQPt/ERSoLWPE8FxIF2aL88yqKmpaT+R3EBsrRIEEMM+BOSK8qnc0tAxXIeI4kdEPlJCQKJcXiA9yqfnq46I2dWBwGUuo5MAIna7vWVgYGBQF9dto7LuTGYDOUckP/BcX3//AalnUQ4nayd+vUGqenkM1wUqnNYrEcmLd5A/dP9KdtqhIwJbMBi8ROOTugCQZ/n5+bv7+/vv6P5kdsqIOjs78ycnJ68C+14XAPKY8l5W/CPdn8pOCuro6FgbCoVkZnl0ASD3uep48U91fzp7RRAL0cm+5aNxnUngz4KCgvre3t7nJn/a4v9mndfrXQdEZpAZ8juQXVYg0otlERHJx6z2X3kn20xdvMm54mEKR0z+jItGRJwlJUB+WwHi47R0ZwOR3iRARPIFwzUOpEbvIi/9em1trbe7u/uN7rdi21jtIi6nYolJ4DLT9yiwuMlvqSgRda0AeVJcXHwqVxDpmd3pdB5AcNzUzdLZ2dlhmYEmv+ViYta9Wzc/o7LPpGR53Zh0liaDzCjWiJvIBKanryKRyBiH3Ke604ptTG8WYpRh9LIbLzu4ZCZyBZg0ZVYAqs2yBStORG1EcJH8qKokOdHKbl3X19d3T/dnahsRqQYy05jWx8jl/DES4JKFhYUx3qd51zDqpDKSnkfT09MjlZWV8zTeowk4AX7HN/U439T/av60ZlKQtAQWqKqqeol4A0U1zPLV8y2wILCQ1MskpQSJAGITRPY3Q+mmqIZavn4O0Im7PH8g9dKltCARILLbRHAXUw5B1Uby/RUVFY95nvY4V41okzrR8/uIBonsG2pKRJIkQg8RPwc2mfAkuWUMkvaIPQQWwBSY+kKVd+fC/4bn5q2MR0tpVSBpgtg/NTU1stsLzLkkk7jvJbI1PL+l+QxTzSTDkanBetrMGXaT+hv1NgztRT5cTpAvO14sg0Tc4/GU8xs5SnT6H57sItfYzg6zrclHfyJlBRKFtra20rm5OflnrUoovr/9xEZ9UPZQcWUNEhH5C49Go8NEtlXKKhHZL0TWBux1TkAizDAWMoxDwHYokOTAAoWFhU1qpevPLNk+n+9VUVFRHcKjugDgz8Ph8Cc5A4l4T09PuKyszIXplzLQh2Rf04nQqteRCKRKExMTsfb29t6ZmZk1RHOEP8CnUv8t5ZCsbFYYHdAAAAAASUVORK5CYII="/></span>
                    <span className='itemDetial-Title'>{this.state.itemDetial.item_name}</span>
                </div>
                <div className='itemDetial'>
                    <div className='itemDetialImg'>
                        <img src={this.state.itemDetial.over_image_url} alt=''/>
                    </div>
                    <ul className='itemDetialNav'>
                        <li>开箱</li>
                        <li>体验</li>
                        <li>图片</li>
                    </ul>
                    <div className='itemDetialTime'>
                        <div className='itemDetialTime-intro'>
                            <span>秒杀</span>
                            <span>抢购中</span>
                        </div>
                        <span>剩余时间:</span>
                        <Time />
                    </div>
                    <div className='itemDetial-detial'>
                        <div className='itemDetial-sale_point'>
                            {this.state.itemDetial.sale_point}
                        </div>
                        <div className='itemDetial-name'>
                            {this.state.itemDetial.item_long_name}
                        </div>
                        <div className='itemDetial-price'>
                            <span><span className='itemDetial-price-icon'>¥  </span>{this.state.itemDetial.min_price/100}</span>
                            <span>¥{this.state.itemDetial.min_market_price/100}</span>
                        </div>
                    </div>
                </div>
                <ItemDetialData itemId={this.state.itemDetial.item_id}/>
                <Recommend recommend={this.state.recommend}/>
                <ItemDetialIntro intro={this.state.intro}/>
            </div>
        )
    }
}