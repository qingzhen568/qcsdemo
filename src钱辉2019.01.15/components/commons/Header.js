import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './header.scss';
import Search from './search';
import {withRouter} from 'react-router-dom';



class Header extends Component {
    render() {
        const pathname = this.props.location.pathname
        return (
            <div id="TopBar">
            
                {
                    pathname==='/'|| pathname==='/global'|| pathname==='/life'|| pathname==='/mask'?
                     <div>
                        <Search />
                        <ul id="navBar">
                            <li><NavLink exact to="/" activeClassName="active">今日推荐</NavLink></li>
                            <li><NavLink to="/mask" activeClassName="active">面膜中心</NavLink></li>
                            <li><NavLink to="/life" activeClassName="active">居家生活</NavLink></li>
                            <li><NavLink to="/global" activeClassName="active">购全球</NavLink></li>
                        </ul>
                    </div>
                    :''    
                }
            </div>
        )
    }
}
export default withRouter(Header);
