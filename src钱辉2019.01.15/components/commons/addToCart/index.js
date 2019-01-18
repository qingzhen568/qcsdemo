import React,{Component} from 'react';
import './index.scss';
import Fixed from '../fixed'

export default class AddToCart extends Component {
    //组件销毁前  ，将未更新完的状态停止
	componentWillUnmount(){
		this.setState=(state,callback)=>{
			return;
		}
    }
    constructor(props){
        super(props);
        this.state = {
            display: 'none',
            height:'100px',
            item : [],
            totalCount:0,
            show:'none'
        }
    }
    componentDidMount(){
        this.setState({
            item:this.props.props.location.state.data
        })
        this.totalCount();
    }
    addToCart=()=>{

        this.setState({
            show:'block'
        })
        clearTimeout(timeout);
        let timeout = setTimeout(() => {
            this.setState({
                show:'none'
            })
        }, 2000);
        let flag = true;//判断购物车是否为空,true为空

        let arr = [];
        //从缓存中获取购物车数据,并转为数组
        let data = JSON.parse(localStorage.getItem('cart'))
        if (data) {//已经有数据
            data.map((ele)=>{
                if (ele.item_id===this.state.item.item_id) {//同种商品
                    ele.count++;
                    flag=false;
                }
                return arr.push(ele);
            })
        }

        if (flag) {//添加的第一件商品
            this.state.item.count = 1;
            this.state.item.checked = true;
            arr.push(this.state.item);
        }
        localStorage.setItem('cart',JSON.stringify(arr));
        
        this.totalCount();
    }

    totalCount=()=>{
        if (localStorage.getItem('cart')) {
            let cart = JSON.parse(localStorage.getItem('cart'));
            let num = 0;
            cart.map((item)=>{
               return num += item.count;
            })
            this.setState({
                totalCount:num
            })
        }
    }
    render(){
        return(
            <div className='allFixedComponent'>
                <Fixed display={this.state.display} height={this.state.height} 
                totalCount={this.state.totalCount} show={this.state.show}/>
                <ul className='addToCart'>
                    <li onClick={this.addToCart}>加入购物车</li>
                    <li>立即购买</li>
                </ul>
            </div>
        )
    }
}