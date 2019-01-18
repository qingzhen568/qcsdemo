import React,{Component} from 'react'
import {withRouter,Redirect} from 'react-router-dom'
import {Button,Icon,Checkbox,Row,Col,Input} from 'antd'
import './index.scss'
//引入头部标题
import HeaderTitle from '../../components/commons/headerTitle'
import axios from 'axios';


class ShoppingCart extends Component{
    constructor(){
        super();
        this.state={
            tokenType:1,
            slogenList:[
                {id:0,title:'正品保证',icon:'https://image.watsons.com.cn//upload/27910d08.png'},
                {id:1,title:'屈臣氏品牌',icon:'https://image.watsons.com.cn//upload/278ce554.png'},
                {id:2,title:'7天退货',icon:'https://image.watsons.com.cn//upload/2e8ebc1f.png'}
            ],  
            recommendList:[],    //智能推荐商品
            cartTotalNum:0,
            totalPrice:0 , //合计(总价)
            cartData:[],  //购物车数据
            edit: false,  //点击头部右上角的编辑显示删除按钮等,同事更换文字为 完成
            // indeterminate: true, 
            checkAll: false, 
          
        }
    }
    
    //token验证
    componentWillMount(){
        axios({
            method:'get',
            url:'http://127.0.0.1:7001/center',
            headers:{
                'Authorization': localStorage['token']
            }
        }).then(resp=>{
            if(resp.data.code === 0){ //code===0,则表示授权成功,显示code:1,则表示授权失败
                this.setState({
                    tokenType:true
                })
            }else{
                this.setState({
                    tokenType:false
                })
            }
        })
    }
    
    componentDidMount(){
         // #addToCart_5th_b. 调用 计算购物车商品总数的函数
         this.cartTotalNumFn();  //初始时的 总数量

         //获取 recommendList  智能推荐商品列表数据
         axios.get('https://h5.watsons.com.cn/act/mop/aladdin/recommend?source=EXCLUSION&count=50&offset=0&items=8551')
         .then(resp=>{
            // console.log('智能推荐商品列表数据',resp.data.data.item_list)
            this.setState({
                recommendList: resp.data.data.item_list
            })
         })
         
    }

    cartTotalNumFn=()=>{
        //获取缓存里的商品数据
        let cartData = JSON.parse(localStorage.getItem('cart'));
        var totalNum = 0;
        if(cartData !==null && cartData.length){ //localStorage中有缓存cart,而且长度不为零,则追加数量
            //判断是否是同一种商品,如果是,则只需修改数量,否则直接将全部商品信息添加追加到 goodsData中;
            cartData.map(item=>{ //#addToCart_3rd_e.遍历获取的缓存数据
                return totalNum += item.num;
            })
            this.setState({
                cartTotalNum: totalNum,
                cartData: cartData
            })
        }
    }

    
    //点击头部 < 回到上一页
    goBack=()=>{
        this.props.history.go(-1);
    }
    //#editOrNot_2nd.点击头部编辑与完成的切换
    changeEdit=()=>{
        this.setState({
            edit:!this.state.edit  //点击取反
        })
    }
    //点击去往首页
    toHome=()=>{
        this.props.history.push('/');
    }
    //清除未完成事件
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }
    // #常用方法总结:
    //const 定义的引用类型比如对象、数组。const 声明会阻止对于变量绑定与变量自身值的修改，这意味着 const 声明并不会阻止对变量成员的值的修改。
    //#forEach和for语句很像(遍历、循环一个数组),#forEach接收一个回调函数。该函数数接收三个参数。argu1:遍历数组的内容item，argu2:遍历数组的索引index(位置)，argu3:数组本身(没什么用)。
    //#map和forEach极其相似。最大的区别是,map会将原数组映射出一个新数组。这个新数组由map的回调函数return。1st.在一个对象|数组中的拿到属性值的集合;2nd.往一个对象|数组中的插入一个索引or成员属性.
    //#filter(过滤)接收一个回调函数。该函数数接收三个参数。argu1:遍历数组的内容item，argu2:遍历数组的索引index(位置)，argu3:数组本身。
    //#filter的回调函数必须返回布尔值(true or false)。true表示该内容通过filter的考核.布尔值并不是全等类型的true or false。比如 undefined, 0, ''等都默认为false
    // #every:表示必须每一项都满足才返回true。只要有一个不满足的就返回false. 而#some的回调函数必须返回布尔值。只要有1️项满足条件,some就返回true。往往我们就可以到这个布尔值做很多判断。
    // #indexOf && lastIndexOf
// ---#indexOf 从左到右检索数组/字符串是否存在某个值，如果存在返回当前存在值第一次出现的所在位置，否则返回 -1; #lastIndexOf 是用右边向左检索
//     const arr = [1, 4, 3, 4, 6]
//     console.log(arr.indexOf(7)) // -1
//     console.log(arr.indexOf(4)) // 1
// #find && findIndex ---#find() 方法会返回匹配的值; #findIndex() 方法则会返回匹配位置的索引
// find() 与 findIndex() 方法均会在回调函数第一次返回 true 时停止查找
//     let numbers = [25, 30, 35, 40, 45];  
//     console.log(numbers.find(n => n > 33));         // 35
//     console.log(numbers.findIndex(n => n > 33));    // 2


    // 购物车商品数量的增删结算功能
    // #delete_item_3rd.删除单条商品信息函数,将点中的商品下标index作为实参传递过来,
    deleteItem=(index)=>{
        //#delete_item_4th.先将点中的item数据从购物车数组中删除,splice(index,1)方法,返回值是对应index的被删除数据
        this.state.cartData.splice(index,1);
       //#delete_item_5th.经上一步删除操作后,this.state.cartData变成 原购物车数据减去被删数据 后的数组数据
        this.setState({
            cartData:this.state.cartData,  //重新设置购物车渲染数据
            edit:false  //设置edit:false 让页面回到非'编辑'状态
        })
        //#delete_item_6th.将删除后剩余的的购物车数据重新存储到缓存里,否则刷新页面时还是渲染删除前的数据,因为购物车商品列表的渲染是从缓存里获取数据的,
        localStorage.setItem('cart',JSON.stringify(this.state.cartData));

        //最后一条数据时,将 cart 缓存移除
        if (this.state.cartData.length===0) {
            localStorage.removeItem('cart');
        }
        this.TotalPrice(this.state.cartData)
    }

    //修改购物车列表中商品的数量
     //获取输入框的值, 有bug:可以输入符号'-';'+';-1等负数, 021等开头的
    ChangeNum = (ev,ind) => {
        // console.log('改变输入框数量',ind,ev.target.value);
        let newArr = this.state.cartData.map((item,index)=>{
            if (index === ind ) {
                item.num= ev.target.value
                return item;
            }else{
                return item;
            }
        })
        this.setState({
            cartData: newArr
        })
        localStorage.setItem('cart',JSON.stringify(this.state.cartData));
        // 改变数量后重新计算总价
        this.TotalPrice(this.state.cartData)
    };
    // #reduceNum 
    reduceNum=(ev,ind)=>{
        this.setState({
            cartData: this.state.cartData.map((item, index) => {
                if (index === ind) {
                    if(item.num <=1){
                        item.num = 1 ;
                        alert('该商品至少1件起售')
                        return item;
                    }else{
                        item.num -= 1 ;
                        return item;
                    }
                } else {
                    return item;
                }
            })
        })
        localStorage.setItem('cart',JSON.stringify(this.state.cartData));
        this.TotalPrice(this.state.cartData) ;
    }

    // #addNum 点击增加商品数量
    addNum=(ev,ind)=>{
        this.setState({
            cartData:this.state.cartData.map((item,index)=>{
                if(index === ind){
                    item.num += 1 ;
                    return item;
                }else {
                    return item;
                }
            })
        })
        localStorage.setItem('cart',JSON.stringify(this.state.cartData));
        this.TotalPrice(this.state.cartData)   //改变数量后重新计算总价
    }

    //单个产品点击选中事件  实现全选与不全选的操作 ,参数中 item 必不可少,否则每条商品无法点击
    checkAllOrNot =(ev,item,ind)=>{
        console.log(`item_checked = ${ev.target.checked}`);
        this.setState({
            cartData:this.state.cartData.map((item,index)=>{
                if(index === ind){
                    item.checked = !item.checked;
                }
                return item;
            })
        })

        //全选与否,必须用 #every:表示必须每一项都满足才返回true。只要有一个不满足的就返回false. 而#some的回调函数必须返回布尔值。只要有1️项满足条件,some就返回true。往往我们就可以到这个布尔值做很多判断。
        const flag = this.state.cartData.every((item)=>{
            if (item.checked ===false ) {
                return false;
            }else{
                return true;
            }
        })
        if (flag ===true) {
            this.setState({
                checkAll:true
            })
            // this.refs.checkAllItem.checked = true;
        }else{
            this.setState({
                checkAll:false
            })
            // this.refs.checkAllItem.checked = false;
        }
        this.TotalPrice(this.state.cartData);
    }
    
    //全选
    onCheckAllChange = (e) => {
        this.setState({
            checkAll:!this.state.checkAll  //全选与全不选的切换
        })
        this.state.cartData.forEach((item,index)=>{
            item.checked = !this.state.checkAll
        })
        localStorage.setItem('cart',JSON.stringify(this.state.cartData));
        this.TotalPrice(this.state.cartData);
    }

    //计算总价 totalPrice
    TotalPrice =( cartData )=>{
        var sum = 0;
        var count = 0;
        cartData.forEach((item,index)=>{
            // console.log('item.checked',item.checked)
            if (item.checked) {
                sum += item.num*(item.app_price/100);
                count += item.num;
            }
            this.setState({
                totalPrice: sum,
                cartTotalNum: count,
                checked:item.checked
            })
        })
        localStorage.setItem('cart',JSON.stringify(this.state.cartData));
    }

    //点击去结算,跳转到 订单页面
    settleAccounts=()=>{
        var orderList = [];
        this.state.cartData.forEach((item,index)=>{
            if (item.checked===true) {
                orderList.push(item);
            }
        })
        // console.log('orderList',orderList);
        window.localStorage.setItem('orderList',JSON.stringify(orderList));
        window.localStorage.setItem('totalPrice',JSON.stringify(this.state.totalPrice));
        this.props.history.push('/orderList');
    }
    //编辑时底部删除所选按钮
    removeItem=()=>{
        this.reduceNum()
    }

    render(){
        //判断是否已经登录,如果没有登录则先登录
        if (this.state.tokenType) {
            return (
                localStorage.getItem('cart')!=='[]'?   //判断缓存里是否存有cart的数据,这样没有选中商品时,也不会跳出购物车页
                <div id="shoppingCart">
                    {/* 头部标题 #Title  */}
                    <div className="Title">
                        <Row>
                            <Col span={3}><Icon onClick={this.goBack} className="left" type="left" /></Col>
                            <Col span={17}>购物车</Col>
                        {/* #editOrNot_1st.设置edit初始值为false,点击'编辑',显示商品删除按钮,点击'完成',隐藏删除按钮 */}
                        {/*  点击头部'编辑'按钮,切换底部文字为'删除所选',点击'删除所选'按钮时,将选中的商品删除并将文字切换为'去结算',顶部'完成'按钮切换为'编辑'; 点击'完成'按钮时,底部文字切换为'去结算' */}
                            <Col span={4} onClick={this.changeEdit}>{this.state.edit?<div>完成</div>:<div>编辑</div>}</Col>
                        </Row>
                    </div>

                    <ul className="slogen_list">
                    {
                        this.state.slogenList.map((item)=><li key={item.title}>
                            <img src={item.icon} alt={item.title}/>
                            &nbsp;<p>{item.title}</p>
                        </li>)
                    }
                    </ul>
                    <div className="top_notice">
                        尊敬的屈臣氏用户：我们对《隐私政策》进行了更新。请仔细阅读《隐私政策》并确定了解我们对您个人信息的处理规则。阅读过程中，如您有任何疑问，可联系我们的客服咨询，如您不同意协议中的任何条款，您应立即停止继续使用屈臣氏提供的服务。【点击查阅】
                    </div>
                    {/* 购物车商品列表 */}
                    <div className="trade_type_list">
                        <div className="trade_type">
                            <div className="trade_info">
                                <div style={{ borderBottom: '1px solid #E9E9E9' }} className="checkbox_wrap">
                                    <Checkbox
                                        //  ref='checkAllItem'
                                         onChange={this.onCheckAllChange}
                                         checked={this.state.checkAll}
                                    >
                                     屈臣氏国内仓
                                    </Checkbox>
                                </div>
                                {/* 没有购全选时显示: (再购¥68.00免运费)  如果总价大于零小于68则显示再购 多少 元免运费, 如果总价满68则显示: (已满¥68免运费) */}
                                <div className="freeDelivery_orNot">(已满¥68免运费)</div>
                            </div>
                        
                            {/* 加入购物的商品 */}
                            <ul className="group_list">
                                {
                                    this.state.cartData.map((item,index)=><li key={index} className="item_listWrap">
                                        <div className="item_list">
                                            <Checkbox checked={item.checked} onChange={(ev)=>this.checkAllOrNot(ev,item,index)} ></Checkbox>
                                            <div className="item_logo"><img src={item.over_image_url} alt={item.name} /></div>
                                            <div className="item_info">
                                                <p className="item_name">{item.name} </p>
                                                <p className="item_sku_list">{item.sku_spec}</p>
                                                {/* #delete_item_1st.通过是否点击头部'编辑'按钮决定显示还是隐藏删除商品操作 */}
                                                <div className="edit_wrap" style={this.state.edit?{'display':'block'}:{'display':'none'}}>
                                                {/* #delete_item_2nd.点击'删除按钮或文字时',调用删除函数 deleteItem(index) 并将下标index传递过去以明确要删除哪一个商品 */}
                                                    <p className="delete_btn" onClick={()=>this.deleteItem(index)}>
                                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAABDZJREFUWAntmEtIlFEUx2fGcZwZtAeRQmWBkGS1aiqSCETERxEtQoiQ2lQrgyiKaNWmqOgFrXqsgh6QtDN1MBNaVIS7LIxqY0FiLsIabRxn+p3PuR/3ew1Tzrjywp177znn/s//nvucz+/7x9TU1LQ2FAqdolsnOeDRPZ3JZG6hu9rT0/PVw8ZV7HeVeghbWlr2BAKBO36/f5WHiUUMqa/pdPpoX19fr0WRo5E3ocbGxnVlZWVDkFmBo2Ew+8m/qVsw0GfIEeTNlJuw+ZFKpbbE4/HRHDxMlQVMpM3NzRuIQh1gIUaXUZYlJSV7qXeQJ8nnyR/JuVItyvPkCsjdB6tbGYPvR5ak/b63t3dEyaU0CbE2lpaWlt6AyAHkEd2oiPUE2I+SyeSp/v7+n+LHINTQ0BCMRCKPIbM/6/wLI5imbRLOygtSgC3TGgasJgv4JJFIHBwcHEwFRQCZRiGD3R/KzrGxsYcVFRXJycnJohACOwN2qLKysgN/shvbw+HwbcrnBiGEp4UY5ZssmcDMzEwEIxEXPIHtE1Kzs7MPWJuH8LuTfAJHc4SITDWCNIKtVVVV5mKVyBacDYD4MjcLzeVk8b2e7DMihON95GOs/pPIoqKQRMe5SpF/2YHXcXFH3JgeOWdWs8vqIBWDyCUITqA/gvEvMSxUAr8crHv4WEF5gmkbZgo/DAwMfBMfJiFpSGptbW2g0wuq31hPtUNDQ7I1C5ZisVg0uyxWM9jtnENvdXDHXQTzkDJg4Zl1JZtvyY4uU2tT96VwHYSUgjLJJTqjtRekaixqD0/6TvC1tbWtYWTbCDPXUvy33odLd5e0uURf6nIO3PJoNNoyPT39Wq0RXe9WzxUhiz3hvcLaeirnhq7g7qtG/gx5t2wMXQeZw7S7uJQv6vJc9bwJEZ3KLNBKHZCIya6RdRGG2BJdh0x2kiQ5a/JKuabMDiCHlw8nRqmUkJB7yZheqSu5skUn55mlj25jr+cdIXvHYrU9CRGJzMTEhGXExSKh43oSwuiP3Pi68ULUcxFaCP8OH4uEHCGxCRYjZAuIo+kZITnMeHQv+Lb3PKk5hqagb56wEDRsKd0GYTxT7Cc1/UskBGCVSplP8iRk7wzoI8hEeeH12XSj6LqQzY6Pj9v/ncaR76af6PNKeRPio8FdEO+RLdOYfYq0u3njNfgK+Q57HzdbJXOEn9Eaz1pGJY4tzl3aCidXacEIBoPmZax86Z0dhFAajy+Ml8k/Wt24EHXeRvIhQp4s8gpI2TEdhDAaocM4hut5/56BVMH+LdbX10d4yJ3Gx1Lwv09NTX2yE3L86xADnqvn6HQha/yOUgjOOzHQKnA3ChD1s6zLy3ZQ1ymB+RWen/IZ5TgAm+2d/rcNlhCRJXETH9fccFwjpAyJlIxGPkTU8FS1LE5lk2/JGSW+PvPpZYBPLx+8+v0FmGN/cfPIA/YAAAAASUVORK5CYII=" alt="删除"/>
                                                        <span>删除</span>
                                                    </p>
                                                {/* #addOrReduce_1st.输入框|增加|减少按钮 */}
                                                    <div className="addOrReduce">
                                                        <Button onClick={(ev)=>this.reduceNum(ev,index)}><Icon type="minus" /></Button>
                                                        <Input type="number" value={item.num} onChange={(ev)=>this.ChangeNum(ev,index)} />
                                                        <Button onClick={(ev)=>this.addNum(ev,index)}><Icon type="plus" /></Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item_price_num">
                                                <p className="item_price">&yen;{item.app_price/100}</p>
                                                {/* 注意:这里的数量是直接从缓存里取的item.num */}
                                                <p className="item_num"><span>×</span>{item.num}</p>
                                            </div>
                                        </div>
                                    </li>)
                                }
                            </ul>
                        </div>
                    </div>

                    {/* 智能推荐商品*/}
                    <div className="recommendListWrap">
                        <div className="recommendListTitle">智能推荐商品</div>
                        <ul className="recommendList">
                            {
                                this.state.recommendList.map((item,index)=><li className="recommend_item" key={index}>
                                    <img src={item.over_image_url} alt={item.item_short_name} />
                                    <div className="item_promotions">
                                        <div className="promotion" style={item.promotions[0]?{'display':'block'}:{'display':'none'}}>{item.promotions[0]}</div>
                                        <div className="promotion" style={item.promotions[1]?{'display':'block'}:{'display':'none'}}>{item.promotions[1]}</div>
                                    </div>
                                    <div className="item_name">{item.item_short_name}</div>
                                    <div className="item_price_cart">
                                        <div className="item_price">&yen;{item.min_price/100}</div>
                                        <div className="item_cartBtn"><Icon type="shopping-cart"/></div>
                                    </div>
                                </li>)
                            }
                        </ul>
                    </div>

                    {/* 底部结算 */}
                    <div className="cart_footor">
                        <div className="cart_footor_left">
                            <div style={{ borderBottom: '1px solid #E9E9E9' }} className="checkbox_wrap">
                                <Checkbox
                                    // ref='checkAllItem'
                                    onChange={this.onCheckAllChange}
                                    checked={this.state.checkAll}
                                >
                                    全选
                                </Checkbox>
                            </div>
                            <div className="total_price_wrap">
                                <span>合计:</span>
                                <div className="total_price"><span className="yuan_mark">&yen;  </span><span className="total_price_num">{this.state.totalPrice}</span></div>
                            </div>
                        </div>
                        {/* 点击头部'编辑'按钮,切换底部文字为'删除所选',点击'删除所选'按钮时,将选中的商品删除并将文字切换为'去结算',顶部'完成'按钮切换为'编辑'; 点击'完成'按钮时,底部文字切换为'去结算' */}
                        {this.state.edit?<div className="cart_account_btn" onClick={this.removeItem}>删除所选<span>({this.state.cartTotalNum})</span></div>
                        :<div className="cart_account_btn" onClick={this.settleAccounts}>去结算<span>({this.state.cartTotalNum})</span></div>}
                    </div>
                </div>


                : <div id="emptyCart">  
                {/* 购物车还没有商品.显示购物车为空,去首页逛逛 */}
                    <HeaderTitle Title='购物车' hideHeaderImg="true" /> 
                    <div className="cart_empty">
                        <div className="icon_empty"><img src="data:image/png;base64,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" alt="cartEmpty" /></div>
                        <p className="tips">剁剁剁！装满购物车!</p>
                        <div className="antBtnWrap" onClick={this.toHome}><Button type="primary" >去首页逛逛</Button></div>
                    </div>
                </div>
            )
        }else{
            return <Redirect to="/login" />
        }   
    }
}

export default withRouter(ShoppingCart);