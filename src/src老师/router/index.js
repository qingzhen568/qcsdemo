import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

//引入页面
import Main from '../pages/main'; 
import Global from '../pages/global'; 
import Life from '../pages/life'; 
import List from '../pages/list';
import Mask from '../pages/mask'; 
import Center from '../pages/center';
import Login from '../pages/login';
import Cart from '../pages/cart';
import Item from '../pages/item';
//引入组件
import Header from '../components/common/header';

//定义路由表
const App = ()=>(
	<BrowserRouter>
		<div>
			<Header />
			<div className="qcs-content">
				<Switch>
					<Route path="/" exact component={Main}/>
					<Route path="/global" exact component={Global}/>	
					<Route path="/life" exact component={Life}/>
					<Route path="/list" exact component={List}/>
					<Route path="/mask" exact component={Mask}/>
					<Route path="/login" exact component={Login}/>
					<Route path="/center" exact component={Center}/>
					<Route path="/cart" exact component={Cart}/>
					<Route path="/item" exact component={Item}/>
				</Switch>
			</div>
		</div>
		
	</BrowserRouter>
)


export default App;