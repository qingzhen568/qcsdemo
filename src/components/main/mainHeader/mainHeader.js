import React,{Component} from 'react'
import axios from 'axios'
//引入样式
import './mainHeader.scss'

class MainHeader extends Component {
    constructor(){
        super();
        this.state={
            headerGif:[],
            aboutGif:[],
            fourNavGif:[],
            luckMoneyGif:[]
        }
    }
    componentDidMount(){
        // 头部跨年盛典大背景图数据
        axios.get('topic/data/T20181229095710968?device_id=b2beebb0-0e2b-11e9-9cde-fb9ddcb01ef6').then((resp)=>{
            this.setState({
                headerGif: resp.data.data.layout[0].content.gifImage,
                aboutGif: resp.data.data.layout[1].content.bg.image
            })
        });
        //跨年盛典&红包&新人专享图片数据
        axios.get('aladdin/get_batch_data?codes=["new_header","new_Home_4navs_180105_1","new_Home_coupon_180105_4","Home_pingo_170505_5","Home_AboveTopic_activity_170505_7","Home_TopicCase_170505_7","Home_CategaryNavs_170505_7"]&version=&app_channel=wap&plat=wap&access_token=&device_id=b2beebb0-0e2b-11e9-9cde-fb9ddcb01ef6')
        .then((resp)=>{
            // console.log('四张',resp.data.data.new_Home_coupon_180105_4)
            this.setState({
                fourNavGif: resp.data.data.new_Home_4navs_180105_1.datas,
                luckMoneyGif: resp.data.data.new_Home_coupon_180105_4.datas
            })
        })
    }
    render(){
        return (
            <div id="mainHeader">
                <div className="bigBG">
                   {/* <Link to="/meetNewSkin"> <img src="https://image.watsons.com.cn//upload/dc0869f4.jpg?x-oss-process=image/quality,q_80/format,webp" alt="2019迎新肌" /></Link> */}
                    <img src="https://image.watsons.com.cn//upload/8e50f2e3.png?x-oss-process=image/indexcrop,y_800,i_0/quality,q_80/format,webp" alt="营业信息" />
                    {/* <img  src={this.state.headerGif} alt="跨年盛典大图"/>
                    <img  src={this.state.aboutGif} alt="关于我们"/> */}
                </div>
                <div className="fourNavGif">{
                    this.state.fourNavGif.map((item,index)=><div key={index} className="fourGifWrap">
                        <img src={item.image_url} alt={item.gmt_modified}/>
                    </div>)
                }</div>
                <div className="luckMoneyGif">{
                    this.state.luckMoneyGif.map((item,index)=><div key={index} className="luckMoneyGifWrap">
                        <img src={item.image_url} alt={item.gmt_modified}/>
                    </div>)
                }</div>
            </div>
        )
    }
}

export default MainHeader;