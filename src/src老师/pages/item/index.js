import React,{Component} from 'react';
import axios from 'axios';
import {Icon,Badge} from 'antd';
import './index.scss';
class Item extends Component{
	constructor(props){
		super(props);
		this.state = {
			itemObj:{},
			item_id:'',
			app_price:0,
			market_price:0,
			success:false,//表示是否添加成功
			total:0
		}
	}
	
	componentDidMount(){
		//对列表页传过来的数据进行保存
		console.log(this.props.location.search);
		let item_id = new URLSearchParams(this.props.location.search).get('item_id');
		this.setState({
			item_id:item_id,
			app_price:new URLSearchParams(this.props.location.search).get('app_price'),
			market_price:new URLSearchParams(this.props.location.search).get('market_price')
		})
		axios.get('/item/reviews/list?item_id='+item_id+'&count=1&offset=0').then((res)=>{
			console.log(res);
			this.setState({
				itemObj:res.data.data.reviews[0]
			})
		});
		//初始时的 总数量
		this.totalFunc();
	}
	//计算总数量
	totalFunc=()=>{
		let arr =  JSON.parse(localStorage.getItem('cart'));
		var total = 0;
		if(arr != null && arr.length){//有，追加数据
			//判断如果是同一种商品，需要修改num，如果不同的商品，直接将数据追加到 data数组中
			arr.map((item)=>{
				total += item.num
				
			})
			this.setState({
				total:total
			})
		}
	}
	
	//添加购物车函数
	addCartFunc=()=>{
		let timeout = '';
		//显示提示
		this.setState({
			success:true
		})
		console.log(this.state);
		//需要将 商品名称、图片地址、价格、数量添加到缓存中
		let data = [];//添加新数据
		let flag = true;//添加或修改的标识位，true表示新增，false表示修改
		
		
		//将从缓存中拿出的数据转数组
		let arr =  JSON.parse(localStorage.getItem('cart'));
		console.log(arr);
		if(arr != null && arr.length){//有，追加数据
			//判断如果是同一种商品，需要修改num，如果不同的商品，直接将数据追加到 data数组中
			arr.map((item)=>{
				if(item.id == this.state.item_id){//同种商品
					item.num++;
					flag = false;
				}
				data.push(item);
			})
		}
		
		//没有，新增数据 
		if(flag){
			data.push({
				id:this.state.item_id,
				img_src:this.state.itemObj.sku_img_url,
				app_price:this.state.app_price,
				market_price:this.state.market_price,
				name:this.state.itemObj.sku_name,
				num:1//数量
			})
		}
		
		//将数据保存到 缓存
		//JSON.stringify 数组转字符串
		localStorage.setItem('cart',JSON.stringify(data));
		
		clearTimeout(timeout);
		
		timeout = setTimeout(()=>{
			this.setState({
				success:false
			})
		},1000);
		//计算总数量
		this.totalFunc();
		
	}
	componentWillUnmount(){
		
	}
	
	
	render(){
		let itemObj = this.state.itemObj;
		return (
			<div className="item">
				<h1 className="item_title">内容页</h1>
				<div className="item_content">
					<img src={itemObj.sku_img_url} alt={itemObj.sku_name}/><br/>
					{itemObj.sku_name}
				</div>
				<div className="btns">
					<div onClick={this.addCartFunc}>加入购物车</div>
					<div>立即购买</div>
				</div>
				<div className="add_success" style={this.state.success?{'display':'block'}:{'display':'none'}}>添加成功</div>
				<div className="icon_btn">
					<Icon type="home" className="home" />
					<Badge count={this.state.total}>
					<Icon type="shopping-cart"  className="shopping-cart"/>
					</Badge>
				</div>
			</div>
		)
	}
}

export default Item;