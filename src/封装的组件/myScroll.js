// 公共组件-监听页面滚动触发回调函数
// 使用方法：在需要添加监听滚动的页面引入该组件；
// 接收的两个参数props:
// 1st.组件添加num属性，必填项，属性值为number，设置触发滚动回调执行的高度(默认值为0)，即页面距离底部还有多高执行回调函数；
// 2nd.添加ScrollCallback属性，必填项，属性值为function，设置满足页面滚动时触发条件所执行的回调函数；

// ps：经过测试，该组件兼容当前所有主流浏览器及ie9等低版本ie浏览器（我们项目兼容到ie9，再低版本的ie浏览器就没有测试）

 
import React,{Component} from 'react';
 
export default class MyScroll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type:true,  // 声明回调执行开关
        }
        this.myScroll = this.myScroll.bind(this);
    }
    componentDidMount() {
        // 挂载时,添加监听页面滚动事件
        window.addEventListener('scroll', this.myScroll)
    }
    componentWillUnmount() {
        // 组件卸载时,移除监听页面滚动事件
        window.removeEventListener('scroll', this.myScroll.bind(this));
    }
    myScroll(event) {
        // 获取滚动高度
        let scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (event.srcElement ? event.srcElement.body.scrollTop : 0);
        // 获取窗口可视高度
        let clientHeight = (event.srcElement && event.srcElement.documentElement.clientHeight) || document.body.clientHeight;
        // 获取页面的总高度
        let scrollHeight = (event.srcElement && event.srcElement.documentElement.scrollHeight) || document.body.scrollHeight;
        // 获取距离页面底部的高度
        let oHeight = scrollHeight - scrollTop - clientHeight;
        // 判断距离页面底部的高度
        if (oHeight <= (this.props.num || 0)) {
            // 判断执行回调条件
            if (this.state.type) {
                // 执行回调
                this.props.ScrollCallback();
                // 关闭判断执行开关
                this.setState({
                    type: false
                });
            }
        } else {
            // 打开判断执行开关
            this.setState({
                type: true
            });
        }
    }
    render() {
        return (
            <div></div>
        )
    }
}
