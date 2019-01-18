import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'

//引入头部标题
// import HeaderTitle from '../../../components/commons/headerTitle'
//引入列表
import ItemList from '../../itemList';


class SkinCare extends Component{

    constructor(){
        super();
        this.state={
            navArr:[
                {id:0,name:'乳液面霜',group_id:13174,type:true},
                {id:1,name:'水乳面霜',group_id:13173,type:false},
                {id:2,name:'精华眼霜',group_id:13172,type:false},
            ],
            group_id:13174,
            headerImgUrl:'/tms/aladdin/get?code=h5_topfixed_img'
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
            <div id="SkinCare">
                {/* 引用头部标题 */}
               
                <ItemList navArr={this.state.navArr} Title='深冬滋润护肤' group_id={this.state.group_id} headerImgUrl={this.state.headerImgUrl} />
            </div>
        )
    }
}

export default withRouter(SkinCare);