import React,{Component} from 'react'
//引入样式
import './index.scss'

class ScrollX extends Component {
    constructor(){
        super();
        this.state={
            listData:[],
        }
    }
    
    // 组件卸载时清除定时器
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return
        }
    
    }

    render(){
        let listData = this.props.listData;
        return (
            <div id="ScrollX">
                <div className="goodsWrap">
                    {
                        listData.map((item,index)=><ul key={index} className="ScrollXList">
                            <li className="ScrollXItem">
                                <img src={item.over_image_url} alt={item.item_short_name} />
                                <p className="ScrollX_itemName">{item.item_short_name}</p>
                                <p><span className="promotion_price">&yen;{item.min_app_price/100}</span><s className="market_price">&yen;{item.min_market_price?item.min_market_price/100:''}</s></p>
                            </li>
                        </ul>)
                    }
                </div>
            </div>
        )
    }
}

export default ScrollX;