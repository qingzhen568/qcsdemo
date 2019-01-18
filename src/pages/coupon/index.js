import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import './index.scss'

class Coupon extends Component{
    //点击回到首页
    backHome = ()=>{
        this.props.history.push('/')
    }
    render(){
        return (
            <div id="Coupon">
                优惠券页面
            </div>
        )
    }
}

export default withRouter(Coupon);