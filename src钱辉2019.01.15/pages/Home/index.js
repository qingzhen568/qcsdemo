import React, { Component } from 'react';
import axios from 'axios';
import './index.scss';
import HomeNav from '../../components/Home-Nav/Nav';
import Seckill from '../../components/Home-Nav/Seckill';
// import FixedImg from '../../components/Home-Nav/FixedImg/';
import HeadImg from '../../components/Home-Nav/HeadImg';
import Focus from '../../components/commons/focus';
import Sell from '../../components/Home-Nav/Sell';
import AgreeMask from '../../components/Home-Nav/AgreeMask';
import UnderFocus from '../../components/Home-Nav/UnderFocus';
import Footer from '../../components/Home-Nav/Footer';
import BackTop from '../../components/commons/BackTop'


let seckill = '/activity/specials/info?count=8&code=Home_flashSale__Top_Img&device_id=4af9b330-0b23-11e9-89cf-33fe10876299/activity/specials/info?count=8&code=Home_flashSale__Top_Img&device_id=4af9b330-0b23-11e9-89cf-33fe10876299'
let nav = '/aladdin/get_batch_data?codes=[%22new_header%22,%22new_Home_topBig_forcase_180105_1%22,%22new_Home_4navs_180105_1%22,%22new_Home_coupon_180105_4%22,%22Home_pingo_170505_5%22,%22Home_AboveTopic_activity_170505_7%22,%22Home_TopicCase_170505_7%22,%22Home_CategaryNavs_170505_7%22]&version=&app_channel=wap&plat=wap&access_token=&device_id=b51f0180-0e88-11e9-8bbb-a1c48f6084bd'
let headImg = '/aladdin/get_batch_data?codes=[%22new_header%22,%22new_Home_topBig_forcase_180105_1%22,%22new_Home_4navs_180105_1%22,%22new_Home_coupon_180105_4%22,%22Home_pingo_170505_5%22,%22Home_AboveTopic_activity_170505_7%22,%22Home_TopicCase_170505_7%22,%22Home_CategaryNavs_170505_7%22]&version=&app_channel=wap&plat=wap&access_token=&device_id=a8882110-0ef9-11e9-be1b-73332a11783f';
let superise = '/topic/data/T20181229094234589?device_id=4af9b330-0b23-11e9-89cf-33fe10876299';
let homeImg = '/topic/data/T20190102104814096?device_id=a8882110-0ef9-11e9-be1b-73332a11783f';
let sellOut = "/item/ws/group_list?current_page=1&page_size=24&group_id=12779&device_id=b0ddb480-0989-11e9-849c-814b0be9fe6f"
let list1 = '/item/ws/group_list?current_page=1&page_size=24&group_id=12965&device_id=a8882110-0ef9-11e9-be1b-73332a11783f'
let list2 = '/item/ws/group_list?current_page=1&page_size=24&group_id=12966&device_id=a8882110-0ef9-11e9-be1b-73332a11783f'
let list3 = '/item/ws/group_list?current_page=1&page_size=24&group_id=12967&device_id=a8882110-0ef9-11e9-be1b-73332a11783f'
let list4 = '/item/ws/group_list?current_page=1&page_size=24&group_id=12968&device_id=a8882110-0ef9-11e9-be1b-73332a11783f'
let focus = '/aladdin/get_batch_data?codes=[%22chajian%22]&version=&app_channel=wap&plat=wap&access_token=&device_id=4af9b330-0b23-11e9-89cf-33fe10876299'
let headFocus = '/aladdin/get_batch_data?codes=[%22new_header%22,%22sylunbo%22,%22new_Home_4navs_180105_1%22,%22new_Home_coupon_180105_4%22,%22cc_test_pic%22,%22Home_pingo_170505_5%22,%22Home_AboveTopic_activity_170505_7%22,%22Home_TopicCase_170505_7%22,%22Home_CategaryNavs_170505_7%22]&version=&app_channel=wap&plat=wap&access_token=&device_id=a93522d0-10ce-11e9-b20c-c5312079e9df';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            nav:[],
            coupon:[],
            headImg:[],
            focus:[],
            headImgList:[],
            superise:[],
            homeImg:[],
            sell:[],
            list1:[],
            list2:[],
            list3:[],
            list4:[],
            footNav:[],
            headFocus:[], 
            seckill : '',
            seckillList:[]
        }
    }
    componentDidMount(){
        axios.get(nav).then((resp)=>{
            // console.log(resp.data)
            // console.log(this),
            this.setState({
                nav:resp.data.data.new_Home_4navs_180105_1.datas,
                coupon:resp.data.data.new_Home_coupon_180105_4.datas
            })
        })
        axios.get(headImg).then((resp)=>{
            // console.log(resp.data.data)
            this.setState({
                headImg:resp.data.data.new_Home_topBig_forcase_180105_1.datas,
                headImgList:resp.data.data.Home_TopicCase_170505_7.datas,
                footNav:resp.data.data.Home_CategaryNavs_170505_7.datas
            })
        })
        axios.get(superise).then((resp)=>{
            // console.log(resp.data.data.layout)
            this.setState({
                superise:resp.data.data.layout
            })
        })
        axios.get(homeImg).then((resp)=>{
            // console.log(resp.data.data.layout)
            this.setState({
                homeImg:resp.data.data.layout
            })
        })
        axios.get(sellOut).then((resp)=>{
            // console.log(resp.data.data.item_list);
            this.setState({
                sell:resp.data.data.item_list
            })
        })
        axios.get(list1).then((resp)=>{
            // console.log(resp.data.data.item_list);
            this.setState({
                list1:resp.data.data.item_list
            })
        })
        axios.get(list2).then((resp)=>{
            // console.log(resp.data.data.item_list);
            this.setState({
                list2:resp.data.data.item_list
            })
        })
        axios.get(list3).then((resp)=>{
            // console.log(resp.data.data.item_list);
            this.setState({
                list3:resp.data.data.item_list
            })
        })
        axios.get(list4).then((resp)=>{
            // console.log(resp.data.data.item_list);
            this.setState({
                list4:resp.data.data.item_list
            })
        })
        axios.get(focus).then((resp)=>{
            // console.log(resp.data.data.chajian.datas);
            this.setState({
                focus:resp.data.data.chajian.datas
            })
        }) 
        axios.get(headFocus).then((resp)=>{
            // console.log(resp.data.data.sylunbo.datas);
            this.setState({
                headFocus:resp.data.data.sylunbo.datas
            })
        }) 
        axios.get(seckill).then((resp)=>{
            // console.log(resp.data.data.specials_item_v_o_s);
            this.setState({
                seckill:resp.data.data.specials_info_d_t_o.periods[0].end_time,
                seckillList:resp.data.data.specials_item_v_o_s
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
            <div id="home">
                <AgreeMask/>
                {/* <HeadImg headImg={this.state.headImg} /> */}
                <Focus focus={this.state.headFocus}/>
                <HomeNav nav={this.state.nav} coupon={this.state.coupon} />
                <Seckill superise={this.state.superise} seckillList={this.state.seckillList}/>
                {/* <FixedImg superise={this.state.superise}/> */}
                <Sell list={this.state.sell}/>
                <Focus focus={this.state.focus}/>
                <UnderFocus homeImg={this.state.homeImg} type={'newYear'}/>
                <Sell list={this.state.list1} style={{'background':'white'}} />
                <UnderFocus homeImg={this.state.homeImg} type={'list1'}/>
                <Sell list={this.state.list2} style={{'background':'white'}} length={'short'} />
                <UnderFocus homeImg={this.state.homeImg} type={'list2'}/>
                <Sell list={this.state.list3} style={{'background':'white'}} length={'short'} />
                <UnderFocus homeImg={this.state.homeImg} type={'list3'}/>
                <Sell list={this.state.list4} style={{'background':'white'}} />
                <UnderFocus homeImg={this.state.homeImg} type={'newGoods'}/>
                <HeadImg headImg={this.state.headImgList} style={{'marginBottom':'10px'}} />
                <Footer footNav={this.state.footNav} />
                <BackTop/>
            </div>
        )
    }
}
