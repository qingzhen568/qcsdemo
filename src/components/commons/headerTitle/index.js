import React,{Component} from 'react'
import {withRouter,Link} from 'react-router-dom'
import './index.scss'
import {Icon,Row,Col} from 'antd'  //#headerTitle_2nd.引入栅格布局
import axios from 'axios'

class HeaderTitle extends Component{
    constructor(){
        super();
        this.state={
            getfixed:false,
            showImg:true,
            headerImgUrl:''
        }
    }
    componentDidMount(){
          //#headerImg-3rd.获取头部图片数据并赋值
          axios.get('/tms/aladdin/get?code=h5_topfixed_img').then(resp=>{
            // console.log('图',resp.data.data.datas[0].image_url)
            this.setState({
                headerImgUrl: resp.data.data.datas[0].image_url
            })
        })
        //监听窗口滚动事件,滚动到一定高度将标题栏固定定位
        window.addEventListener('scroll',()=>{
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop >= 100) {
                this.setState({
                    getfixed: true,
                    showImg: false                
                })
            }else{
                this.setState({
                    getfixed: false,
                    showImg:true  //不再显示顶部新人红包图片
                })
            }
        },false)
    }
    //清除为完成事件
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }
    //点击回到首页
    goBack = ()=>{
        this.props.history.go(-1)
    }
    render(){
        return (
            <div id="HeaderTitle">
                {/* #头部图片Img 判断是否有Img?如果有则显示,否则不显示  */}
                <div style={this.state.showImg?{'display':'block'}:{'display':'none'}}>{this.props.hideHeaderImg?'': <Link to="#"><img src={this.state.headerImgUrl} alt="新人礼包"/></Link>} </div>
               
                {/* 头部标题 #Title  */}
                <div className="Title" style={this.state.getfixed?{'position':'fixed'}:{'position':'static'}}>
                    <Row>
                        <Col span={3}><Icon onClick={this.goBack} className="left" type="left" /></Col>
                        <Col span={18}>{this.props.Title}</Col>
                        <Col span={3}></Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default withRouter(HeaderTitle);