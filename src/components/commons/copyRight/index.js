import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import './index.scss'

class CopyRight extends Component{
    render(){
        return (
            <div id="copyRight">
                <span>版权所有鄂ICP备11005814号-10</span>
                <span>粤公网安备 44010402000077号</span>
                <span>广州屈臣氏个人用品商店有限公司</span>
                <span>地址：广州市越秀区东风东路丽丰中心</span>
            </div>
        )
    }
}

export default withRouter(CopyRight);