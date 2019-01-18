import React,{Component} from 'react';

import {NavLink} from 'react-router-dom';
import {Row,Col,Icon} from 'antd';
import './header.scss';
import {withRouter} from 'react-router-dom';


class Header extends Component{
	goCenter=()=>{
		this.props.history.push('/center');
	}
	render(){
		const pathname = this.props.location.pathname;
		return (
			<div>
			{
				pathname === '/' || pathname === '/life'||pathname === '/global'||pathname === '/mask'?
				<div className="qcs-header">
					{console.log(this.props.location.pathname)}
					<div className="qcs-search">
						<Row>
							<Col span={4} ><Icon className="qcs-user" type="user" onClick={this.goCenter}/></Col>
							<Col span={16}>aa</Col>
							<Col span={4}><Icon className="qcs-shopping" type="shopping-cart"/></Col>
						</Row>
					</div>
					<nav className="qcs-menu">
						<ul>
							<li><NavLink exact to="/" activeClassName="active">今日推荐</NavLink></li>
							<li><NavLink to="/mask" activeClassName="active">面膜中心</NavLink></li>
							<li><NavLink to="/life" activeClassName="active">居家生活</NavLink></li>
							<li><NavLink to="/global" activeClassName="active">购全球</NavLink></li>
						</ul>
					</nav>
				</div>:""
			}
				
			</div>	
		)
	}
}

export default withRouter(Header);