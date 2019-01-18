import React, { Component } from 'react';
import './index.scss';
import {Badge} from 'antd';
import {Link} from 'react-router-dom'

export default class Profile extends Component {
    
    //组件销毁前  ，将未更新完的状态停止
	componentWillUnmount(){
		this.setState=(state,callback)=>{
			return;
		}
    }
    constructor(){
        super();
        this.state = {
            totalCount:0
        }
    }
    exit=()=>{
        localStorage.removeItem('token');
        this.props.history.push('/login');
    }
    goBack=()=>{
        this.props.history.go(-1);
    }
    goToCart=()=>{
        this.props.history.push('/shoppingCart')
    }
    backToHome=()=>{
        this.props.history.push('/')
    }
    componentDidMount(){
        if (localStorage.getItem('cart')) {
            let cart = JSON.parse(localStorage.getItem('cart'));
            let num = 0;
            cart.map((item)=>{
               return num += item.count;
            })
            this.setState({
                totalCount:num
            })
        }
    }
    render() {
        return ( 
            <div className="profile">
                <div className='profileTopNav'>
                    <img onClick={this.goBack} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAkCAYAAACJ8xqgAAABZUlEQVR42q3WyyvEYRiG4THOyaGZWEoURUlRUsJkEslCSkQW8pfIQhaykFIW05SUIllISkkJCwklUSQREcl5NuO2sDA9m+/9eereXr2brz6f18Xj8TAtUtN/YIMUo599UqMXrJ++4n93YMW66YMS12fBOulNYCOU5Iq104vAxiyXtdCzwCYsl4XoUWBT5HfF6uleYDOU4orV0q3AopTqilXTtcDmKN0Vq6RLgS1QpitWTucCW6YsV6yUTgW2SjmuWDEdC2yd8lyxQjoU2CYFXbEA7QlsmwosTyoisN1fzAJGSV2XbwWDtC/QLS9oER0JdIMCVrSETgS6RrlWtIzOBLpC2Va0gi4EukRZVrSKrgQ6TxlWtIZuBDpLaVa0ju4EGqFUK9pADwKdpmQr2kxPAp0kvxVtpWeBjnv5z3TQq0BHvaBd9C7QYS9oD30KtNcLOkAx/Z2zo0MJH86Qm6DRNtqhsI99A4l6yQShLKnmAAAAAElFTkSuQmCC' alt=''/>
                    <Badge count={this.state.totalCount}>
                        <Link to='/shoppingCart'>
                        <img  onClick={this.goToCart} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAnCAYAAAB9qAq4AAACbUlEQVR42u3XP2hTURTH8Zc2TVoVtSjoIKZSlxYEzVCwSqdSOhhUpKLVSdTBQYeqoKhkEnEQRCni4J9iF+ninwoOUiRI31LxT0HRUlFppBiNsU2oNjF+hfPgDeYlvt53+wYPfMhyzj2/4d7AM4rF4lF8w5/K4y32oM7wQxEkib/VCYT9EPA4EhjBM6RQlN8Ww29FqJOwaj+q/BawDT8kYC+q/RawEa8l4Cfcxk1NruMCtjoFXIhHmM96jziCpUL2Y74ri5jTQ8lJ4wBasQFRD1nnn0FadidKBdyCd9I0jMUa30AYz2V3rlRTBMPSNIvVGgMuwKjsTjo1DsCqGAKaAm7GR9l716kxjhlpPIugpoBHkJG9x5wat2NCGocQ0hTwBgqyt9WpscF2F9JYqiFcLRKyM4P6cgODsKpdQ8CNeCP77qG23MA52z08pSHgQXyVfacRLDfQhc8yMKgh4CXb/etAoNxAA8ZlYAIhD8NV4YHsyiFS6ZApQ1No8TBgxPYon2BZpYOXMYsZHPYoXB0O4Zf1/4dwpcN7MYUC7qAJ6xRqw0VMS7hJNBmVlgRKQUdNYjeq/yXgIiThZU3jJbpR4+aOPLR9Nz/FLYWuoAfRuVziffgpAXv9+CnabPvSM/34pRfCKwmYRKffAgYQl4AFjGKH30KugAmrsviikInmuYZciyF8RwEqK49OVfexG/0YwQtFrmK58b988FiWIIadWOnyjBq0YxfWqwxXjz7bA7mPRhfnxJGVM8bQpSrgGuRhrw4X54zDXn2qAq7CB1iVwiYX5zyGVXmcVxUwiG0YQxoHEHZxThQmMrjmdJd/A1+43aI0unHkAAAAAElFTkSuQmCC' alt=''/>
                        </Link>
                    </Badge>
                </div>
                <div className='profileTop'>
                    <div className='profileTopBg'>
                        <div className='profileTopImage'>

                        </div>
                    </div>
                    <div className='cloud1'></div>
                    <div className='cloud2'></div>
                    <div className='cloud3'></div>
                    <div className='cloud4'></div>
                    <div className='backToHome' onClick={this.backToHome}>
                        <div>
                            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAASpJREFUOBHNlLFqAlEQRXeNAbELCFqlMv+gRX4gdaoEPyOVvX1qa0EISppUFhYJJEWKYBcQsbANKFiIiOuZdZ8M7uKQ1cKB48ybuXN1H6rnGREEwQ18QweuDPnhMQb3MAMXY4rK4a2EKUuX8Oxc9vKS8xP4CavxFsJr+AIr3hAU4g6qg+AO/iwnNZ9Q3yqLbUnzAhqwhv/GioU6ZEI3ihL04djoYVAU13eYwih8h3QvL6zN4cPDtSwe5MERH7EZeZQzvu8P5XCKEK/tRZ7CLfI4f8Os8bQL5p+wVk9Upc5F51iyDLtc9KPe4pvQ4vyge7q27nClxVGd1NvJLMOd0CgCN9eGM9dMkeVXEoY2/HHNFPk3tsNlF+EV3N/Xgrq2L5QeyExCtG3IO90Ggn7FQqG+3C4AAAAASUVORK5CYII=' alt=''/>
                            <span>回到首页</span>
                            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAkCAYAAACJ8xqgAAABZUlEQVR42q3WyyvEYRiG4THOyaGZWEoURUlRUsJkEslCSkQW8pfIQhaykFIW05SUIllISkkJCwklUSQREcl5NuO2sDA9m+/9eereXr2brz6f18Xj8TAtUtN/YIMUo599UqMXrJ++4n93YMW66YMS12fBOulNYCOU5Iq104vAxiyXtdCzwCYsl4XoUWBT5HfF6uleYDOU4orV0q3AopTqilXTtcDmKN0Vq6RLgS1QpitWTucCW6YsV6yUTgW2SjmuWDEdC2yd8lyxQjoU2CYFXbEA7QlsmwosTyoisN1fzAJGSV2XbwWDtC/QLS9oER0JdIMCVrSETgS6RrlWtIzOBLpC2Va0gi4EukRZVrSKrgQ6TxlWtIZuBDpLaVa0ju4EGqFUK9pADwKdpmQr2kxPAp0kvxVtpWeBjnv5z3TQq0BHvaBd9C7QYS9oD30KtNcLOkAx/Z2zo0MJH86Qm6DRNtqhsI99A4l6yQShLKnmAAAAAElFTkSuQmCC' alt=''/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
