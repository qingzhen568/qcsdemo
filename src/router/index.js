import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

//引入页面
import Main from '../pages/main'
// 引入Main下的子页面
// 2019迎新'肌'
import MeetNewSkin from '../pages/main/meetNewSkin'
//新宠精致美肌页面
import SkinCare from  '../pages/main/skinCare'

//面膜中心
import Mask from '../pages/mask'
// 居家生活
import Life from '../pages/life'
// 购全球
import Global from '../pages/life'
//引入个人中心页面
import Profile from '../pages/proflie'
//引入登录页面
import LogIn from '../pages/login'
//引入优惠券页面
import Coupon from '../pages/coupon'
//引入购物页面
import ShoppingCart from '../pages/shoppingCart'
//引入我的订单页面
import OrderList from '../pages/orderList'
// 我的订单下的退货页面
import ReturnGoods from '../pages/orderList/returnGoods'
//引入单个商品信息页 
import Item from '../pages/item'
//引入组件
import Header from '../components/commons/header'

//定义路由表
const App = () =>(
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                {/* main主页(今日推荐) */}
                <Route path="/" exact component={Main} />
                {/* 面膜中心 */}
                <Route path="/mask"  component={Mask} />
                {/* 居家生活 */}
                <Route path="/life"  component={Life} />
                {/* 购全球 */}
                <Route path="/global"  component={Global} />
                {/* 主页面里的 2019迎新'肌' */}
                <Route path="/meetNewSkin" component={MeetNewSkin} />
                {/* 主页面里的新宠精致美肌页面 */}
                <Route path="/skincare" component={SkinCare}/>
                {/* 个人中心 */}
                <Route path="/profile" component={Profile}/>
                {/* 登录页面 */}
                <Route path="/login" component={LogIn} />
                {/* 优惠券页面 */}
                <Route path="/coupon" component={Coupon} />
                {/* 购物车页面 */}
                <Route path="/shoppingcart" component={ShoppingCart} />
                {/* 我的订单页面 */}
                <Route path="/orderList" component={OrderList} />
                {/* 我的订单下的退货页面 */}
                <Route path="/returnGoods" component={ReturnGoods} />
                {/* 引入列表渲染下的单个商品信息页  */}
                <Route path="/item" component={Item} />
            </Switch> 
        </div>
    </BrowserRouter>
)

export default App;