import React,{Component} from 'react'
import axios from 'axios'
import './recommend.scss'

class Recommend extends Component{
    constructor(){
        super();
        this.state={
            recommendData:[],
            footerSixData:[]
        }
    }
    componentDidMount(){
        axios.get('aladdin/get_batch_data?codes=["new_header","new_Home_topBig_forcase_180105_1","new_Home_4navs_180105_1","new_Home_coupon_180105_4","Home_pingo_170505_5","Home_AboveTopic_activity_170505_7","Home_TopicCase_170505_7","Home_CategaryNavs_170505_7"]&version=&app_channel=wap&plat=wap&access_token=&device_id=aaafc600-0e8b-11e9-8d8c-f108b9b519de')
        .then((resp)=>{
            // console.log('56底部',resp.data.data.Home_TopicCase_170505_7.datas)
            this.setState({
                recommendData: resp.data.data.Home_TopicCase_170505_7.datas,
                footerSixData: resp.data.data.Home_CategaryNavs_170505_7.datas  
            })
        })
    }
    render(){
        return (
            <div id="recommendWrap">
                {/* 大牌精选 好货推荐 */}
                <div id="recommend">
                    <span className="recommend_title"><img src="https://image.watsons.com.cn//upload/8c3676f5.jpg?x-oss-process=image/quality,q_80/format,webp" alt="大牌精选 好货推荐" /></span>
                {
                    this.state.recommendData.map((item,index)=><div key={index} className="recommendItem">
                        <img src={item.image_url} alt={item.topic_id} />
                    </div>)
                }
                </div>
                {/* 底部: HomefooterSix_CategaryNavs_170505_7 */}
                <div id="footerSix">
                {
                    this.state.footerSixData.map((item,index)=><div key={index} className="footerSixItem">
                        <img src={item.image_url} alt={item.topic_id} />
                    </div>)
                }
                </div>
            </div>
        )
    }
}
export default Recommend;