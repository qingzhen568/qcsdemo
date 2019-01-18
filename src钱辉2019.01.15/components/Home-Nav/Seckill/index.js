import React,{Component} from 'react';
import Time from '../../commons/time'
import './index.scss'

export default class Seckill extends Component {

  //组件销毁前  ，将未更新完的状态停止
	componentWillUnmount(){
		this.setState=(state,callback)=>{
			return;
		}
	}

    render(){
        return (
            <div className="seckill">
                <div className="time">
                    <div className="Timeout">
                        <span>今日秒杀</span>
                        <Time/>
                    </div>
                    <div>更多好货></div>
                </div>
                {
                    this.props.superise?
                    this.props.superise.map((item)=>{
                        return <div key={item.instance_id}>
                            {
                                item.instance_id === "15452077716059373"?
                                <div>
                                    
                                </div>
                                :''
                            }
                        </div>
                    })
                    :''
                }
                <div className="seckillContainer">
                    <ul className="seckillList">
                        {
                        this.props.seckillList.map((item)=>{
                            return<li className="seckillItem" key={item.item_id}>
                                <div>
                                    <img alt='' src={item.image_url}/>
                                    <div>
                                      
                                    </div>
                                </div>
                               <div className="seckillTitle">
                                    <span className="seckillItemTitle">{item.item_short_name}</span>
                                    <span className="ccc"></span>
                               </div>
                               <div className="itemPrice">
                                   <span>{item.promotion_price?'¥'+item.promotion_price/100:''}</span>
                                   <span>{item.market_price?'¥'+item.market_price/100:''}</span>
                               </div>
                            </li>
                        })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}