import React,{Component} from 'react'
import axios from 'axios'
//引入样式
import './index.scss'

class SecKill extends Component {
    constructor(){
        super();
        this.timer=null;
        this.state={
            SecKillData:[],
            timeStamp:[],
            Hour:0,
            Minute:0,
            Second:0
        }
    }
    
    componentDidMount(){
        //获取秒杀时间戳数据 | 秒杀图片数据
        axios.get('activity/specials/info?count=8&code=Home_flashSale__Top_Img&device_id=6a626350-0e31-11e9-8baf-f3e645fe26d5')
        .then((resp)=>{
            // console.log('timeStamp',resp.data.data.specials_time_ranges)
            this.setState({
                SecKillData: resp.data.data.specials_item_v_o_s,        //秒杀数据
                timeStamp: resp.data.data.specials_time_ranges[0].end   //时间戳数据
            })
            // console.log(this.state.timeStamp)
            this.CountDownFunc(this.state.timeStamp);
        })
    }
    // 组件卸载时清除定时器
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return
        }
        clearInterval(this.timer)
    }
   //设置定时器,时间递减
   CountDownFunc = (time)=>{
        let nowTime = new Date().getTime();
        //将毫秒数转为秒数
        let totalSeconds = (time - nowTime)/1000;
       // 清除可能存在的定时器
        clearInterval(this.timer)
        //创建定时器
        this.timer = setInterval(()=>{
            totalSeconds -= 1 ;
            if (totalSeconds>0) {
                //不足60秒的剩余秒数
                let oSecond = Number(Math.floor(totalSeconds%60)) ;
                //不足60分钟的剩余分钟数
                let oMinute = Number(Math.floor(totalSeconds/60%60)) ;
                //不足24小时的剩余小时数
                let oHour = Number(Math.floor(totalSeconds/60/60%24)) ;
                this.setState({
                    Hour:oHour>9?oHour:'0'+oHour,
                    Minute:oMinute>9?oMinute:'0'+oMinute,
                    Second:oSecond>9?oSecond:"0"+oSecond
                })
            }else{
                clearInterval(this.timer); //倒计时结束时触发父组件的方法
                return;
            }
        },1000)
    }

    render(){
        return (
            <div id="SecKill">
                <div className="SecKill_title">
                    <div>
                        <span className="title">今日秒杀</span>
                        <div className="timeStamp">
                            <span>{this.state.Hour}</span>:
                            <span>{this.state.Minute}</span>:
                            <span>{this.state.Second}</span>
                        </div>
                    </div>
                    <span>更多好货&gt;</span>
                </div>
                <div className="goodsWrap">
                    {
                        this.state.SecKillData.map((item,index)=><ul key={index} className="SecKillList">
                            <li className="SecKillItem">
                                <img src={item.image_url} alt={item.item_id} />
                                <p className="SecKill_itemName">{item.item_short_name}</p>
                                <p><span className="promotion_price">&yen;{item.promotion_price/100}</span><s className="market_price">&yen;{item.market_price/100}</s></p>
                            </li>
                        </ul>)
                    }
                </div>
            </div>
        )
    }
}

export default SecKill;