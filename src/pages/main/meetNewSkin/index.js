import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'

//引入头部标题
// import HeaderTitle from '../../../components/commons/headerTitle'
//引入列表
import ItemList from '../../itemList';


class MeetNewSkin extends Component{
    constructor(){
        super();
        this.state={
            navArr:[
                {id:0,name:'护肤专场',group_id:13010,type:true},
                {id:1,name:'个护专场',group_id:13012,type:false},
                {id:2,name:'彩妆专场',group_id:13014,type:false},
            ],
            group_id:13010,
        }
    }

     //清除为完成事件
     componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }
    render(){
        return (
            <div id="MeetNewSkin">
                {/* 引用头部标题 */}
                {/* <HeaderTitle Title='2019迎新"肌"'/> */}
                {/*  每个主题的itemList 只需设置新的 navArr 和 group_id初始值,并传给公用组件ItemList即可
                设置 hideHeaderImg="true" 则表示隐藏新人红包图片,不设则显示图片 */}
                <ItemList navArr={this.state.navArr}  group_id={this.state.group_id} Title='2019迎新"肌"' />
            </div>
        )
    }
}

export default withRouter(MeetNewSkin);