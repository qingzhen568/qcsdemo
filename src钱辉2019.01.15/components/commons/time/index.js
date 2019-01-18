import React,{Component} from 'react';
import axios from 'axios'
import { setInterval } from 'timers';
import './index.scss'

export default  class Time extends Component {
    componentDidMount(){
        axios.get('https://h5.watsons.com.cn/activity/specials/info?count=8&code=Home_flashSale__Top_Img&device_id=5e5b6110-10b6-11e9-a466-074d7da98316')
        .then((resp)=>{
            if (resp.data.data.now) {
                   let  now = resp.data.data.now;
                   let  end = resp.data.data.specials_info_d_t_o.end_time;
                   this.getTime(end,now);
            }
            
        })
    }
    getTime=(end,now)=>{
        let almost = Math.floor((end-now)/1000);
        setInterval(() => {
            let differ = almost-=1;
            let S = Math.floor(differ%60)<10?'0'+Math.floor(differ%60):Math.floor(differ%60);
            let M = Math.floor(differ/60%60)<10?'0'+Math.floor(differ/60%60):Math.floor(differ/60%60);
            let H = Math.floor(differ/60/60%24)<10?'0'+Math.floor(differ/60/60%24):Math.floor(differ/60/60%24);
            this.setState({
                H:H,
                M:M,
                S:S
            })
        }, 1000);
    }
    constructor(){
        super();
        this.state = {
            H:0,
            M:0,
            S:0
        }
    }
    //组件销毁前  ，将未更新完的状态停止
	componentWillUnmount(){
		this.setState=(state,callback)=>{
			return;
		}
	}
//   手机号正则   /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
    render(){
        return (
            <div className="timer">
                <span>{this.state.H}</span>:
                <span>{this.state.M}</span>:
                <span>{this.state.S}</span>
            </div>
        )
    }
}