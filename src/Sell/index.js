import React,{Component} from 'react';
import './index.scss'

export default class Sell extends Component {
    render(){
        return <ul className="sellOut" style={this.props.style}>
            {   
                this.props.list.map((item,index)=>{
                    if(this.props.length&&index>this.props.list.length-3){
                        return  <li className="sellOutList" key={item.item_id}>
                        <div>
                            <img src={item.over_image_url} alt='' />    
                        </div>
                        <div className="sellOutTitle">
                            <span>{item.item_name.slice(0,16)}
                                <span className="ccc"></span>
                            </span>
                        </div>
                        <div className="sellOutPrice">
                            <div>
                            <span>{item.max_price?'¥'+item.max_price/100 :''}</span>
                            <span>{item.max_market_price?'¥'+item.max_market_price/100 :''}</span>
                            </div>
                            <span className="cartBtn"></span>
                        </div>
                        </li>
                    }else{
                        return <li className="sellOutList" key={item.item_id}>
                        <div>
                            <img src={item.over_image_url} alt='' />    
                        </div>
                        <div className="sellOutTitle">
                            <span>{item.item_name.slice(0,16)}
                                <span className="ccc"></span>
                            </span>
                        </div>
                        <div className="sellOutPrice">
                            <div>
                            <span>{item.max_price?'¥'+item.max_price/100 :''}</span>
                            <span>{item.max_market_price?'¥'+item.max_market_price/100 :''}</span>
                            </div>
                            <span className="cartBtn"></span>
                        </div>
                        </li>
                    }
                })
            }
        </ul>
    }
}