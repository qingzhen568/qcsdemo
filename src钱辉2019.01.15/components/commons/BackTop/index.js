import React,{Component} from 'react';
import { Icon } from 'antd';
import './index.scss'

export default class BackTop extends Component {
    constructor(){
        super();
        this.state = {
            show:false
        }
    }
    componentDidMount(){
        window.addEventListener('scroll',this.handleScroll,true)
    }
    handleScroll=()=>{
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(scrollTop)
        if (scrollTop>100) {
            this.setState({
                show:true
            })
        }else{
            this.setState({
                show:false
            })
        }
    }
    backTop=()=>{
        document.documentElement.scrollTop=0;
        document.body.scrollTop=0;

    }
            //组件销毁前  ，将未更新完的状态停止
	componentWillUnmount(){
		this.setState=(state,callback)=>{
			return;
		}
    }
    render(){
        return(
            <div>
            {
                this.state.show?
                <div className="backTop" onClick={this.backTop}>
                    <Icon type="up-circle" />
                </div>
                :''
            }
            </div>
        )
    }
}