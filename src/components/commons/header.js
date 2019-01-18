import React,{Component} from 'react';
import {NavLink,withRouter} from 'react-router-dom';
//引进样式
import './header.scss';
//引入ant design插件
import {Row,Col,Icon,Input,Drawer,Badge} from 'antd';
import axios from 'axios';

class Header extends Component{
    constructor(){
        super();
        this.state={
            cartTotalNum:0,
            hotWord:[]
        }
    }

    //跳转到个人中心页面,跳转之前要先判断,如果已经登录,等直接跳到想去的页面,否则先跳到登录页面
    toProfile=()=>{
        this.props.history.push('/profile')
    }
    toShoppingCart=()=>{
        this.props.history.push('/shoppingcart')
    }

    // 点击头部搜索框出现搜索页面,显示热搜词列表
    state = { visible: false };
    showDrawer = () => {
        this.setState({
          visible: true,
        });
    };
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    componentDidMount(){
        // #addToCart_5th_b. 调用 计算购物车商品总数的函数
        this.cartTotalNumFn();

        //热搜词列表数据
        axios.get('https://h5.watsons.com.cn/search/hotWord')
        .then(resp=>{
            // console.log('热搜词列表数据',resp.data.data.word_list)
            this.setState({
                hotWord: resp.data.data.word_list
            })
        })
    }
    cartTotalNumFn=()=>{
        let arr = JSON.parse(localStorage.getItem('cart'));
        var totalNum = 0;
        if(arr !==null && arr.length){ //localStorage中有缓存cart,而且长度不为零,则追加数量
            //判断是否是同一种商品,如果是,则只需修改数量,否则直接将全部商品信息添加追加到 goodsData中;
            arr.map(item=>{ //#addToCart_3rd_e.遍历获取的缓存数据
                return totalNum += item.num;
            })
            this.setState({
                cartTotalNum: totalNum
            })
        }
    }

    render(){
        //注意:必须引入import {withRouter} from 'react-router-dom';和设置 export default withRouter(Header) ;
        //才能获取location|history|match等,如: this.props.location.pathname;
        //通过三目判断是否是,如果是才显示头部,否则不显示 pathname === '/' || pathname === '/life' || pathname === '/global' || pathname === '/mask'?
        const pathname = this.props.location.pathname;
        return (
            <div>{
                pathname === '/' || pathname === '/life' || pathname === '/global' || pathname === '/mask'?
                <div className="header">
                    <div className="searchWrap">
                {/* 1.先在项目目录下安装antd:   npm install antd --save
                    2.在src/index.js文件中引入 antd 样式:   import 'antd/dist/antd.css'; */}
                        <Row type="flex" justify="space-around" align="middle">
                            <Col span={4} ><Icon onClick={this.toProfile} className="profile" type="user"/></Col>
                            <Col span={16}>
                                <Input
                                    placeholder="搜你所想搜"
                                    prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    ref={node => this.userNameInput = node}
                                    // #Drawer_1st.点击搜索框显示抽屉
                                    onClick={this.showDrawer}
                                />
                                </Col>
                            <Col span={4}>
                                <Badge count={this.state.cartTotalNum}>
                                    <Icon onClick={this.toShoppingCart} className="shoppingCart" type="shopping-cart"/>
                                </Badge>
                            </Col>
                        </Row>
                        {/* #Drawer_2nd 点击头部搜索框 从右边出现搜索页面 */}
                        <Drawer
                            placement="right"
                            closable={false}
                            visible={this.state.visible}
                            width="100%"
                            >
                            <Row type="flex" justify="space-around" align="middle" className="search_header">
                                <Col span={20}>
                                    <Input
                                        placeholder="面膜"
                                        prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        ref={node => this.userNameInput = node}
                                    />
                                    </Col>
                                <Col span={3} onClick={this.onClose} >取消</Col>
                            </Row>
                            <div className="search_section">
                                <div className="search_title">热门搜索</div>
                                <ul className="search_list hotWord">
                                {
                                    this.state.hotWord.map((item)=><li key={item} >
                                        {item}
                                    </li>)
                                }
                                </ul>
                            </div>
                        </Drawer>
                    </div>
                    
                    {/* 顶部四大导航栏 */}
                    <nav className="topNavTabs">
                        <ul>
                            <li><NavLink to="/" exact activeClassName="active">今日推荐</NavLink></li>
                            <li><NavLink to="/mask" activeClassName="active">面膜中心</NavLink></li>
                            <li><NavLink to="/life" activeClassName="active">居家生活</NavLink></li>
                            <li><NavLink to="/global" activeClassName="active">购全球</NavLink></li>
                        </ul>
                    </nav>
                </div>:''
            }</div>
        )
    }
}

export default withRouter(Header) ;