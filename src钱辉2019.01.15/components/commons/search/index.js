import React, { Component } from 'react';
import { Input,Icon ,Drawer,Badge } from 'antd';
import {Link} from 'react-router-dom';
import './index.scss';
import axios from 'axios';

let search = '/search/hotWord'
export default class Search extends Component {
    constructor(){
        super();
        this.state = { 
            visible: false,
            searchList:[],
            searchHistory:[],
            arr:[],
            count:0
        };
    }
    componentDidMount(){
        axios.get(search).then((resp)=>{
            // console.log(resp.data.data.word_list)
            this.setState({
                searchList:resp.data.data.word_list
            })
        })
        if (localStorage.getItem('cart')) {
            let cart = JSON.parse(localStorage.getItem('cart'));
            let num = 0;
            cart.map((item)=>{
                return num += item.count;
            })
            this.setState({
                count:num
            })
        }
    }
    showDrawer = () => {
        this.setState({
          visible: true,
        });
      };
    
    onClose = () => {
    this.setState({
        visible: false,
    })}
    addVal=(ev)=>{
        let searchInput = document.querySelector("#searchInput");
        searchInput.value = ev.target.innerHTML;
        this.state.searchHistory.unshift(ev.target.innerHTML);
        let arr = [...new Set(this.state.searchHistory)]
        this.setState({
            arr:arr
        })
        // console.log(arr)
    }
    add=(ev)=>{
        let searchInput = document.querySelector("#searchInput");
        searchInput.value = ev.target.value;
        this.state.searchHistory.unshift(ev.target.value);
        let arr = [...new Set(this.state.searchHistory)]
        this.setState({
            arr:arr
        })
        // console.log(arr)
    }
            //组件销毁前  ，将未更新完的状态停止
	componentWillUnmount(){
		this.setState=(state,callback)=>{
			return;
		}
    }
    render() {
        return (
            <div id="searchBar">
                <div className="searchImg">
                    <Link to="/profile">
                    {   
                        localStorage['token']?
                        <img src='http://image.watsons.com.cn/upload/hahy4f2323.png' alt=''/>
                        :
                        <img alt='' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAoCAMAAACsAtiWAAABuVBMVEVMaXFLS0tKSkr///9LS0tmZmZQUFBLS0tLS0tNTU1LS0ttbW1MTExKSkpLS0tLS0tQUFBLS0tVVVVLS0tNTU1OTk5KSkpMTExOTk5KSkpLS0tNTU1LS0tKSkpLS0tLS0tLS0tLS0tKSkpLS0tVVVVKSkpKSkpbW1tKSkpLS0tLS0tLS0tKSkpVVVVKSkpLS0tLS0tLS0tLS0tLS0tNTU1VVVVLS0tKSkpKSkpKSkpKSkpLS0tLS0tKSkpOTk5MTExKSkpLS0tLS0tLS0tLS0tLS0tdXV1NTU1LS0tLS0tKSkpMTExPT0+AgIBKSkpKSkpRUVFLS0tMTExMTExLS0tLS0tLS0tKSkpMTExKSkpKSkpKSkpMTExMTExOTk5LS0tLS0tKSkpKSkpRUVFLS0tMTExVVVVMTExLS0tLS0tLS0tKSkpLS0tKSkpKSkpPT09MTExLS0tKSkpgYGBVVVVMTExLS0tKSkpOTk5LS0tLS0tLS0tMTExKSkpKSkpKSkpLS0tKSkpKSkpJSUlKSkpKSkpJSUlKSkpMTExKSkpKSkpKSkpNTU1LS0tKSkpLS0tMTExKSkpKSkpvRbMbAAAAknRSTlMA/ccB1gUQTvYK7gdo+89EI+8PsRQu+FckocNG1/BVd6r1GD0J3LoOWYXrnPcDvXAp3iwRSQbz8bKNhvzbrA0lH52rS3vQCx6TvNWAKgJn+hZYW2ujfoGXXonE/i9DNMGnfD4TrhsSkXpBdG7l2eMdOexgCAxloK9FZudtdt9I0Yjt6wfpcuL8curAuTzCdbBvkHh64aAAAAHoSURBVHjafdJVe9tAEAXQa5RkppgdQ2KnwTbMzMxcZmamlBnvL24/KZEtg87LzszL7swsCljXNn5mRe/c7EzMgnJqvjupSoyOoNiJHnI5t17jkawL7nkXGexth8axJnZP+KDyRAxsbUOeqZ5sDECjysguAap6Oh0oZo+w363eQmcMZfTRNnz40iY6UI5pkGal+x42ojzJzBfyPNgdQAXj/DoEIMcJVPSNvwCrc9mHigQagTXmUFltej+DDa5Dx2/uIMof0LHFTWTpgQ4HtyGyFjoE+uGlFTqqmcIcF6DjD/9ilm7o2GUSM5yHjj0KiNEFheUCVBkoVgyiBEviqOuzYjUUD1K8C9kS/QBG+VhJk+TF851A3f04bXfkUucrrgIYCRqqIDsukobb90jeOqrwYBH/9dJohyxwzhwkE9FQs5KHvXwtB+2tjOQ/46XLauyLcwyKti72mVDC18LJKXUR/RyUUCQc5/NpqNw2msdR6P0bLyenUWDYTGYFdecrS+/IsSloWD5+JtNPthxC9Y3dPQPJt3YU+cJPxn0eEv2rLj6DlvSBHcjsbG77U1eSggSEONAMjZc0QmNxgCEUetjAp9B6RJcmv8ooithvsgN5dTZeQ7HrPIO802xBiaGGNAqcsqJU+KR8/AOrtHob4EMLXwAAAABJRU5ErkJggg==' />
                    }
                    </Link>
                </div>
                    <Input
                    onClick={this.showDrawer}
                    onFocus = {this.jump}
                    className = "searchInput"
                    prefix={<Icon type="search" style={{ 'color': 'rgba(0,0,0,.5)','fontSize':'20px'}} />}
                    placeholder="面膜"
                    />
                <div className="shoppingCartImg">
                    <Link to='/shoppingCart'>
                        <Badge count={this.state.count}>
                            <img alt='' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABMNJREFUWAntmEtsE2cQx+NXEjsIAnLkQ1NSiSStiBChRm0tRSVN0rwKSIVy4VAkEBcOCCSEVODQQ3vl0mOrVuqlQgoVVFUeShoCLUqA8A7Q4qSAEQgcEFaAOMEvfrNZR47ttb3C6/TQkT7P7O48/jvffN/O56Ki/ziZOjo6DoDxiMlkWgaPxGKxO/CvA4HAr8PDw8HFxm+pqanpApxTBWJGXsHYYrfbX1ZXV18YHx+PLCZIAWgBgJ3xBGB+MmiDO+D10Wj0j4mJiQeLCdCUHJwpPwTAb9X7u7u7u39EjibrFeranBwoEon8xb1Xcp8svg9LeQl5ViiyJgeyWCwPZKGQxXcZn3d2djq5LshiIZ7M1DOSdLqvr++kYEvJTmtraxkgf0O5KRl8Aa99xPppenr6G1kgC4hFEWLhtAFwzYIHhb2QLe8Dq9V6NWWKVRw34DKtdqb3OCk/SlaDrOqUjKv6b8zMZnNM/MM3kpz9OCxnHEwLEIVrAHsMfweltwA31tPTM4VsOLGL3CD2VmKXM9wpq1gQzMzMXIc9UtGsD4VC8jYFIb/fL2WnlB5AA2kBDg4O3kNJ2aB5C6vNZlvLtWHTm/jmFRUVsrVJDQqNpgUoTwA2xhvMigz3NDY2piwoeZZvogbd+Fwqfon7pyZACvYqOk9FEbCeyclJTV3RyRcBah3xlog/MJzNFPQyOs9EEYN6Uu8Q2Uhilkrxv4phBugU++AtTYC9vb13UZRaFCovKSlZPyca91taWirZc6kRzrAPBjUBqkrXeROlDjH8yDhoc56JIR+HeOt3HjmcESDgLmL0XMzhHuEGkwCMr+BzQ0NDkYwAUb7AUADC6+vq6orhRpFgUeoPHpydnf0HHssIkDr0oeRnCC2trKysnxPz/9vU1PQ2Xleqni8zYy9EzgiQ56z06ChTHUaWTtuQOvR4PPbi4uLPiLGaIUFPcK0ATPstFqUEGkHeATjZZppbWlr6Mc7FLsGFthgOh5ezWreShF3EMMH93Pt9YGBAWZxZA6F8kU+dKC/BfjPgNmuH0/8EcIoRvuXLIWeifYC7HfeUbYqLAHgfZeUIEDfKNwfUS3yOAXI/X6wu5PmTZE4NAC1QH8atYoiza/CbjLwQfl/g00vdnaLNv5TsNOsUqwbHcPIJziTjI/SGe5IdGXWddYrVwCOAiyFb4NIOFaSzkdg5AfT5fOPo/isGZHJlW1vbpyIXgnLKBIUb5SAl38hGMlgmWaytrX3s9XpvGQ0yp0UiIJqbm110NHJW/VAFNU02Z1T5jRkv7cXfTup7wQLMGaAgYGqr6Xi/x5l0vWWMnEpEbHMgDo+Rjazk3kRdXQDFUBqGqqqqL3hb+TS9x7DJ/TzQSDAYPEQH8yQPvv53MZ8B3VNMs7CMb/PH7Px2erYzTEn8/DzvNJvgdrttTqdzA7XspO7+7u/vv6Jlo6vIGxoaltMsfIfjE/zbcMzhcPzAZ1CaTF3kcrkOY3+SBfcLzUJXe3v7Ni0HugACSP5h2M6I28lC0Q0Qmy8Z0r7JUWIVQDeJnI7igdI9S7nHW4dYvQ/jD5Dl3CydiF66n2AgnYtmmegCyDYgjvYCbAIeYHzFGGXoIupO/r06h58pxs+cf49qOXgNUjiqmEclOb4AAAAASUVORK5CYII=" />
                        </Badge>
                    </Link>
                </div>
                <Drawer
                placement="right"
                closable={false}
                visible={this.state.visible}
                >
                    <div className = "searchPage-input">
                        <Input
                            id='searchInput'
                            className="searchInput"
                            onChange={this.add}
                            prefix={<Icon type="search" style={{ 'color': 'rgba(0,0,0,.3)','fontSize':'20px'}} />}
                            placeholder="面膜"
                            />
                        <span onClick={this.onClose}>取消</span>
                    </div>
                    {
                        this.state.arr!==[]?
                        this.state.arr.map((item,index)=>{
                            return <div key={item}>{item}</div>
                        }):''
                    }
                    <div className='hotSearch'>热门搜索</div>
                    <ul className="searchList">
                        {
                            this.state.searchList.map((item)=><li key={item} onClick={this.addVal}>
                                {item}
                            </li>)
                        }
                    </ul>
                </Drawer>
            </div>

        )
    }
}
