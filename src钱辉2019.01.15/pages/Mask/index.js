import React, { Component } from 'react';
import './index.scss';
import axios from 'axios';
import Focus from '../../components/commons/focus';
import Limit from '../../components/Mask-Nav/Limit';
import Seckill from '../../components/Home-Nav/Seckill'


let limit = 'activity/specials/info?code=Mask_center_products_index_4&access_token=undefined';
let focus = '/tms/aladdin/get?code=Mask_center_banner_index_1';
let maskSeckill = '/activity/specials/info?count=8&code=seckill_maskcenter_real&device_id=a93522d0-10ce-11e9-b20c-c5312079e9df';

export default class Mask extends Component {
    constructor(){
        super();
        this.state = {
            limit:[],
            focus:[],
            maskSeckillList:[],
            seckillEndTime:''
        }
    }
    componentDidMount(){
        axios.get(limit).then((resp)=>{
            // console.log(resp.data.data.specials_item_v_o_s)
            this.setState({
                limit:resp.data.data.specials_item_v_o_s
            })
        })
        axios.get(focus).then((resp)=>{
            // console.log(resp.data.data.datas)
            this.setState({
                focus:resp.data.data.datas
            })
        })
        axios.get(maskSeckill).then((resp)=>{
            console.log(resp.data.data.specials_item_v_o_s)
            this.setState({
                // seckillEndTime:resp.data.data.specials_info_d_t_o.end_time,
                maskSeckillList:resp.data.data.specials_item_v_o_s
            })
        })
    }
        //组件销毁前  ，将未更新完的状态停止
	componentWillUnmount(){
		this.setState=(state,callback)=>{
			return;
		}
	}
    render() {
        return (
            <div id="mask">
                <Focus focus={this.state.focus}/>
                <Limit limit={this.state.limit}/>
                <Seckill  seckillList={this.state.maskSeckillList}/>
            </div>
        )
    }
}
