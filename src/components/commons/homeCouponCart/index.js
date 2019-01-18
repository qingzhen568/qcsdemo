import React,{Component} from 'react'
import {withRouter,Link} from 'react-router-dom'
import './index.scss'
import {Badge} from 'antd'

class HomeCouponCart extends Component{
    constructor(){
        super();
        this.state={
            cartTotalNum:0
        }
    }
    componentDidMount(){
        this.cartTotalNumFn()
    }
    cartTotalNumFn=()=>{
        let arr = JSON.parse(localStorage.getItem('cart'));
        var totalNum = 0;
        if(arr !==null && arr.length){ //localStorage中有缓存cart,而且长度不为零,则追加数量
            //判断是否是同一种商品,如果是,则只需修改数量,否则直接将全部商品信息添加追加到 goodsData中;
            arr.map(item=>{ //#addToCart_3rd_e.遍历获取的缓存数据
                totalNum += item.num;
            })
            this.setState({
                cartTotalNum: totalNum
            })
        }
    }
   
    //点击回到首页
    backHome = ()=>{
        this.props.history.push('/')
    }
    render(){
        return (
            <div id="homeCouponCart">
                <span className="backHome" onClick={this.backHome}></span>
                <Link to="/coupon"><span className="coupon" style={this.props.hideCoupon?{'display':'none'}:{'display':'block'}}></span></Link>
                <Link to="/shoppingcart"> 
                {/* 给购物车添加微章  <Badge count={this.state.total}>*/}
                    <Badge count={this.state.cartTotalNum}>
                        <span className="shoppingCart"></span>
                    </Badge >
                </Link>
            </div>
        )
    }
}

export default withRouter(HomeCouponCart);