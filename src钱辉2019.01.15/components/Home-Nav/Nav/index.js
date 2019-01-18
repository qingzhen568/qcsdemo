import React,{Component} from 'react';
import './index.scss';

export default class Nav extends Component {
    render(){
        return (
            <div className="bgImage">
                <ul className='navEnter'>
                    {
                        this.props.nav.map((item)=>{
                            return <li key={item.id}>
                                <img src={item.image_url} alt='' />
                            </li>
                        })
                    }
                </ul>
                <div className="coupon">
                    {
                        this.props.coupon.map((item)=>{
                            return <div key={item.id}>
                                <img src={item.image_url} alt=''/>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}