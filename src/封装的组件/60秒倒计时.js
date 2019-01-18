import React,{Component} from 'react'

export default class Timer extends Component{
    constructor(props){
        super(props);
        this.state={
            time: 60 //设置初始值为60s
        }
    }
    //倒计时
    myTimer =()=>{
        //清除可能存在的定时器
        clearInterval(this.timer);
        //创建定时器
        this.timer = setInterval(()=>{
            this.setState({
                time: this.state.time-1  //设置时间递减1
            },()=>{
                //如果修改后的时间是否小于1.则清除定时器
                if (this.state.time<=0) {
                    clearInterval(this.timer);
                    //跳出定时器循环
                    return
                }
                this.myTimer();
            })
        },1000)
    }

    render(){
        return (
            <div id="timer"></div>
        )
    }
}

// 在组件卸载时清除定时器
// componentWillUnmount(){
//     clearInterval(this.timer)
// }

// 在需要使用的地方直接调用myTimer方法即可;
// 比如:页面加载完成后调用案例如下:
// componentDidMount(){
//     this.myTimer()
// }