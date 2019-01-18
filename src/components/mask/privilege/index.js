import React,{Component} from 'react'
import './index.scss'
import axios from 'axios';
import {Button} from 'antd';

class Privilege extends Component{
    constructor(){
        super();
        this.state={
            Privilege:[]
        }
    }
    // 特权面膜抢购数据
    componentDidMount(){
        axios.get('activity/specials/info?code=Mask_center_products_index_4&access_token=9f866f599eb7a0e28c48d2cf16afba58')
        .then(resp=>{
            this.setState({
                Privilege:  resp.data.data.specials_item_v_o_s
            })
        })

    }

    //清除未完成事件
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }

    render(){
        return (
            <div id="Privilege">
                <div className="privilege_info"></div>
                <div className="privilege_title">
                    <div>
                        <p className="title"> 特权面膜抢购</p>
                        <p className="desc">每款最多限购<span>3</span>件</p>
                    </div>
                    <img src="https://asset.watsons.com.cn/act/static/images/mask-center/f32ab5c224e50c8935e6b23ec.png" alt="上新时间" />
                </div>
                <ul className="item_list">
                    {
                        this.state.Privilege.map((item)=><li key={item.item_id} className="item">
                            <div className="item_left">
                                <img src={item.image_url} alt="item.item_short_name"/>
                            </div>
                            <div className="item_right">
                                <div className="sale_point">{item.sale_point}</div>
                                <div className="item_name">{item.item_short_name}</div>
                                <div className="item_desc"></div>
                                <div className="item_priceWrap">
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAAXCAMAAAB03EJUAAAAllBMVEUAAAD/ZpH/XIj/WG7/ZZH/YIn/ZZL/ZZD/ZZL/ZpH/ZZL/ZpH/Xor/Y4//ZZH/ZpL/ZZL/ZZH/ZZH/ZZH/ZZL/ZZH/ZI//YY7/ZZH/ZZH/ZJD/ZJH/Y4//ZZL/ZZH/ZZL/ZZH/ZZH/ZZH/ZZH/ZZH/ZZH/ZJD/ZpL/ZZH/ZZL/ZZH/Y5D/ZZH/YY7/ZZH/ZJD/ZYz/ZpLDfCkvAAAAMXRSTlMA+gkEQBL3bdPftaUOHenj2VWujfPPNhq6nDBMI++noIZyZ6qAe0bIw76XK3cWWmInJsyFigAAA6JJREFUOMtNVVeC6jAMdOL03hNCCgQIbSm6/+XeyGbZNx84lqWxqhG/yIloxx+2bZs2EPFG6g0ghzNRIf7Ql2W5M+04fsg2Blr5PZrBZWF91V4d1p7nXQdQvTLvdvaA8xASpfF/VD4MTlZNdC0NAkZYa5g4OsOVbUUfVE8hoo4+uLo48OcNw2XvrxB2Q02QksZRMKS1lA7RxW0eZwgNAL8nIe6Qqg1tOvqihMkTQmf9IdL6WsywM0PJqnwHX/MoihY2FwJLuc3XmtKANTQSC5ewM3OTEgVbCyi+XCtpjEv1Ea0GtKQIaHTnYqmpSpCtw+FQwPoshTxwbP2ETOgsHb9cz8PFYN0iAYOq3x1ftRmPNHeUThUlfna5Q976qtoqtt3qwHldvR27qRMf7RHhMXq8XHcbr/B5XdzXIF2DypouBTmv9hmEx0g8kaVeIDasy9lwslYonBzDuOrPaILLdzFUjpP6BsNxbgIhJpvECM6URrbHxZAbokyaqg7psOxPqy3ZvO1P7rLVXG9c5Flvl/7DVsQZnQ+U7BwqJBzvImEnnJZ8dFRIZhkEN1sg5C6Y3uKDE/tcbQPksgjDcDLgZiT2BhUdZUfwNiMlPboPeo2Im1rdZZEqkGg9qA+6I0rfUU6vPi5vTdNssJ+lmGi8jRSeKRkCpDoM7jdU5CFE7MM4FvDVQd+C8ztdL1Jwdi4o9hCwQ7Tl63wUDBYhlosFWQZKOMKKNzPCBQkPmsuF0G4VxJhXiY+xsfb7H1/5bBnUFZTdYO8jwgXRjuCDCVvk4s49yAQXcMZ6SLNrgrNehV23Fz0QG1MeQYIQPcpqKN88CkJUMdb5Qfa4UghRcXaffohjbmZbbA1QcKr00EdznSImr/YCvstHIa6Eiuqh6KTAznlzRnC6fJ+uCkMu5Ynfhn4+AFOuWnjD02fCAaCsKEjVwMsf3oqWXwNTCOasBvHBRGSsokXYaOM/mDMxGtHneb597N0StW4EFNV8739DHOElOIGHlacqDY2BpbE0GhwuBnkd6wOx6+6PSNNVIsFQ9KTgZuxx5BpaBzipVBd61MnQoNrmFyrtIdywizfS+A1xJwYfzA9swek0mitTFC8hZ/qCCayEqpxTVbPzqRZn3E4d9C3VYyeJ8QNnAE7GBY95l0PYbKbwg2nX2sfDBOk9nG6mQE1xhs/+0wKZyT3mcxXZyx+hEem/HMD8gxQyMs2PUKpFi4EBlWiEtJ75+9NSMTQZ/wCYzJit6tBMAwAAAABJRU5ErkJggg==" alt="抢购价" />
                                    &yen;<span className="sale_price">{item.radix}</span><span className="market_price"> &yen;{item.market_price/100}</span>
                                </div>
                                <div className="item_progress"></div>
                                <div className="item_saleNum">{item.stock_all-item.stock_left}/{item.stock_all}</div>
                                <Button>抢购</Button>
                            </div>
                        </li>)
                    }
                </ul>
            </div>
        )
    }
}

export default Privilege;