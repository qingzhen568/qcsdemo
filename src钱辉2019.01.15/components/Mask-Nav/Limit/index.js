import React,{Component} from 'react';
import {Button,Progress } from 'antd';
import './index.scss'

export default class Limit extends Component {
    render(){
        return(
            <div className='limit'>
                <ul className='limitItemContent'>
                    {
                        this.props.limit.map((item,index)=>{
                            return<li className='limitItem' key={item.sku_id+index}>
                                    <div className='limitItemLeft'>
                                        <div className='limitLeftImg'>
                                            <img src={item.image_url} alt=''/>
                                        </div>
                                        <div className='limitLeftTop'>
                                            <span>限量</span>
                                            <span>{item.stock_all}</span>
                                        </div>
                                        {
                                            item.status_name==="已售罄"?
                                            <div className='status_name'>
                                                <div>
                                                    抢光了
                                                </div>
                                            </div>
                                            :''
                                        }
                                    </div>
                                    <div className='limitItemRight'>
                                        <p>{item.item_short_name}</p>
                                        <div className='limitPriceBox'>
                                            <div>
                                                <img alt='' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAAXCAMAAAB03EJUAAAAllBMVEUAAAD/ZpH/XIj/WG7/ZZH/YIn/ZZL/ZZD/ZZL/ZpH/ZZL/ZpH/Xor/Y4//ZZH/ZpL/ZZL/ZZH/ZZH/ZZH/ZZL/ZZH/ZI//YY7/ZZH/ZZH/ZJD/ZJH/Y4//ZZL/ZZH/ZZL/ZZH/ZZH/ZZH/ZZH/ZZH/ZZH/ZJD/ZpL/ZZH/ZZL/ZZH/Y5D/ZZH/YY7/ZZH/ZJD/ZYz/ZpLDfCkvAAAAMXRSTlMA+gkEQBL3bdPftaUOHenj2VWujfPPNhq6nDBMI++noIZyZ6qAe0bIw76XK3cWWmInJsyFigAAA6JJREFUOMtNVVeC6jAMdOL03hNCCgQIbSm6/+XeyGbZNx84lqWxqhG/yIloxx+2bZs2EPFG6g0ghzNRIf7Ql2W5M+04fsg2Blr5PZrBZWF91V4d1p7nXQdQvTLvdvaA8xASpfF/VD4MTlZNdC0NAkZYa5g4OsOVbUUfVE8hoo4+uLo48OcNw2XvrxB2Q02QksZRMKS1lA7RxW0eZwgNAL8nIe6Qqg1tOvqihMkTQmf9IdL6WsywM0PJqnwHX/MoihY2FwJLuc3XmtKANTQSC5ewM3OTEgVbCyi+XCtpjEv1Ea0GtKQIaHTnYqmpSpCtw+FQwPoshTxwbP2ETOgsHb9cz8PFYN0iAYOq3x1ftRmPNHeUThUlfna5Q976qtoqtt3qwHldvR27qRMf7RHhMXq8XHcbr/B5XdzXIF2DypouBTmv9hmEx0g8kaVeIDasy9lwslYonBzDuOrPaILLdzFUjpP6BsNxbgIhJpvECM6URrbHxZAbokyaqg7psOxPqy3ZvO1P7rLVXG9c5Flvl/7DVsQZnQ+U7BwqJBzvImEnnJZ8dFRIZhkEN1sg5C6Y3uKDE/tcbQPksgjDcDLgZiT2BhUdZUfwNiMlPboPeo2Im1rdZZEqkGg9qA+6I0rfUU6vPi5vTdNssJ+lmGi8jRSeKRkCpDoM7jdU5CFE7MM4FvDVQd+C8ztdL1Jwdi4o9hCwQ7Tl63wUDBYhlosFWQZKOMKKNzPCBQkPmsuF0G4VxJhXiY+xsfb7H1/5bBnUFZTdYO8jwgXRjuCDCVvk4s49yAQXcMZ6SLNrgrNehV23Fz0QG1MeQYIQPcpqKN88CkJUMdb5Qfa4UghRcXaffohjbmZbbA1QcKr00EdznSImr/YCvstHIa6Eiuqh6KTAznlzRnC6fJ+uCkMu5Ynfhn4+AFOuWnjD02fCAaCsKEjVwMsf3oqWXwNTCOasBvHBRGSsokXYaOM/mDMxGtHneb597N0StW4EFNV8739DHOElOIGHlacqDY2BpbE0GhwuBnkd6wOx6+6PSNNVIsFQ9KTgZuxx5BpaBzipVBd61MnQoNrmFyrtIdywizfS+A1xJwYfzA9swek0mitTFC8hZ/qCCayEqpxTVbPzqRZn3E4d9C3VYyeJ8QNnAE7GBY95l0PYbKbwg2nX2sfDBOk9nG6mQE1xhs/+0wKZyT3mcxXZyx+hEem/HMD8gxQyMs2PUKpFi4EBlWiEtJ75+9NSMTQZ/wCYzJit6tBMAwAAAABJRU5ErkJggg=='/>
                                            </div>
                                            <span className="promotion_price">
                                               <span>¥</span> {item.promotion_price/100}
                                            </span>
                                            <span>
                                                {'¥'+item.market_price/100}
                                            </span>
                                        </div>
                                        <Progress percent={(item.stock_all-item.stock_left)*2} strokeLinecap ={'square'}
                                        strokeColor={'#FF6692'}   showInfo={false}
                                        style={{'transform':'skew(-30deg)','width': '2.92rem','height': '.13333rem','margin':'0 0 10px 5px'}}/>
                                        <div className='LimitLeftCount'>
                                            <span>{item.stock_all-item.stock_left}/{item.stock_all}</span>
                                            <Button className='sellOutBtn' type='primary'  style={{'height':'27px','width':'56.5px'}}
                                             disabled={item.status_name==="已售罄"?true:false}>
                                                {
                                                   item.status_name==="已售罄"?'抢光了':'抢购'
                                                }
                                            </Button>
                                        </div>
                                    </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}