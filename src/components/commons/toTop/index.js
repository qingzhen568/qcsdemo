import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Icon} from 'antd'

class ToTop extends Component{
    constructor(props){
        super(props);
        this.state={
           show: false
        }
        this.toTop = this.toTop.bind(this);
    }
    componentDidMount(){
        window.addEventListener('scroll',()=>{
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop >= 300) {
                this.setState({
                    show: true
                })
            }else{
                this.setState({
                    show: false
                })
            }
        },false)
    }

    toTop=()=>{
        window.scrollTo(0,0);
    }
    //清除未完成事件
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }
    render(){
        return (
            // 点击回到顶部按钮 
            <div id="ToTop" onClick={this.toTop}>
                {this.state.show?<Icon type="arrow-up" />:''}
            </div>
        )
    }
}

export default withRouter(ToTop);