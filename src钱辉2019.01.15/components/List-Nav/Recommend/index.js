import React,{Component} from 'react';
import './index.scss'

export default class Recommend extends Component {
    render(){
        return(
            <div className='recommend'>
                <div className='recommendHead'>为您推荐</div>
                <div className='recommendContainer'>
                    <ul className='recommendList'>
                        {
                            this.props.recommend.map((item,index)=>{
                                return<li className='recommendItem' key={index+item.category_id+item.max_market_price}>
                                    <div className='recommendItemImg'>
                                        <img src={item.over_image_url} alt=''/>
                                    </div>
                                    <div className='recommendItemName'>
                                        {item.item_name}...
                                    </div>
                                    <p className='recommendItemPrice'>¥{item.min_price/100}</p> 
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}