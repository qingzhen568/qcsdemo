import React,{Component} from 'react'
import axios from 'axios'
//引入样式
import './surprise.scss'

class Surprise extends Component{
    constructor(){
        super();
        this.state={
            takePartIn:[],
            surprise:[]
        }
    }
    componentDidMount(){
        // 立即参与的图片数据
        axios.get('topic/data/T20181229094234589?device_id=d20acfd0-0e2a-11e9-9d35-cb09ba619306')
        .then((resp)=>{
            // console.log("惊喜",resp.data.data.layout)
            this.setState({
                takePartIn:resp.data.data.layout[1].content.bg.image
            })
        })
    }
    render(){
        return (
            <div id="surpriseWrap">
               {/* 秒杀下面的立即参与 */}
               <div className="takePartIn">
                    <img src={this.state.takePartIn} alt= "立即参与"/>
                </div>
                 {/* 跨年惊喜大钜惠 */}
                <div id="surprise">
                    <img src="https://image.watsons.com.cn//upload/f2a33fb4.gif" alt="跨年惊喜大钜惠" />
                </div>
            </div>
        )
    }
}
export default Surprise;