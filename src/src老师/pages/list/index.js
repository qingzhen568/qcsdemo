import React,{Component} from 'react';
import axios from 'axios';
import {Icon} from 'antd';
import {Link} from 'react-router-dom';
import './index.scss';

class List extends Component{
	constructor(){
		super();
		this.state = {
			topImg:'',
			listArr:[],
			page:1,//当前页
			end:false, //是否到最后 ，false 还没到最后
			type:false,
			group_id:12983,
			topArr:[
				{'id':0,'name':'洁面卸妆','group_id':12983,'type':true},
				{'id':1,'name':'水乳面霜','group_id':12984,'type':false},
				{'id':2,'name':'精华眼霜','group_id':12985,'type':false}
			]
		}
	}
	componentDidMount(){
		
		axios.get('tms/aladdin/get?code=h5_topfixed_img').then(res=>{
			console.log(res);
			this.setState({
				topImg:res.data.data.datas[0].image_url
			})
			
		})
		
		//调用 列表数据
		this.getData(this.state.group_id);
		
		//调用滚动事件
		this.Scroll();
	}
	
	Scroll(){
		let _this = this;
		//滚动事件
		window.onscroll = function(){
			//获取滚动高度
			let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			//获取窗口的可视高度
			let windowHeight = document.documentElement.clientHeight;
			//当前页面的总高度
			let scrollHeight = document.body.scrollHeight;
			
			console.log(scrollHeight-scrollTop +':'+windowHeight);
			if(scrollHeight-scrollTop <= windowHeight){
				//获取数据
				_this.moreData(_this.state.page+1);	
				//更新当前页
				_this.setState({
					page:_this.state.page+1
				})	
			}
		}
	}
	
	//获取数据
	moreData(i){
		if(!this.state.end){
			this.setState({
				type:true
			});
			axios.get('item/ws/group_list?current_page='+i+'&page_size=24&group_id='+this.state.group_id+'&device_id=20b178f0-0fc0-11e9-8e3d-1ff5ed74673e').then(res=>{
				console.log(res);
				//判断是否是最后一页
				if(res.data.data.item_list === undefined){
					this.setState({
						end:true
					})
				}else{
					let oldArr = this.state.listArr;
					let newArr = [];
					newArr = oldArr.concat(res.data.data.item_list);
					console.log(newArr);
					setTimeout(()=>{
						this.setState({
							listArr:newArr,
							type:false
						})
					},500);
					
				}
				
				
			})
			
		}	
			
	}
	goBack=()=>{
		this.props.history.go(-1);
		
	}
	
	changeBorder(id,group_id){
		console.log(id);
		let newArr = this.state.topArr;
		for(var i = 0;i<newArr.length;i++){
			if(i === id){
				newArr[i].type = true;
			}else{
				newArr[i].type = false;
			}
		}
		
		this.setState({
			topArr:newArr,
			group_id:group_id,
			page:1
		});
		
		//获取数据
		this.getData(group_id);
		
		
	}
	getData(group_id){
		axios.get('item/ws/group_list?current_page=1&page_size=24&group_id='+group_id+'&device_id=20b178f0-0fc0-11e9-8e3d-1ff5ed74673e').then(res=>{
			console.log(res);
			this.setState({
				listArr:res.data.data.item_list
			})
			
		})
	}
	
	render(){
		return (
			<div className="list-con">
				<div className="list-top-img"><img  src={this.state.topImg} alt="顶部图片"/></div>
				<h1><span onClick={this.goBack}>{"<"}</span> <span className="list-top-title">新宠精致美肌</span></h1>
				<ul className="list_top">
					{
						this.state.topArr.map((item,index)=><li onClick={()=>this.changeBorder(item.id,item.group_id)} className={item.type?"active":""} key={index}>{item.name}</li>)
					}
				</ul>
				
				<ul className="list_item">
				{
					this.state.listArr.map((item,index)=><li key={index}>
						<Link to={{pathname:'item',search:'?item_id='+item.item_id+'&app_price='+item.min_app_price+'&market_price='+item.min_market_price}}>
							<img src={item.over_image_url} alt={item.item_short_name}/><br/>
							{item.item_short_name}
						</Link>
					</li>)
				}
				</ul>
				<div className="loading" style={this.state.type && !this.state.end?{'display':'block'}:{'display':'none'}}><Icon type="sync" spin />正在加载中……</div>
				{this.state.end?<div className="end">我是有底线的……</div>:''}
			</div>
		)
	}
}

export default List;