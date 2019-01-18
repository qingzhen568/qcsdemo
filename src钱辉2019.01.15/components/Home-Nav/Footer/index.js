import React,{Component} from 'react';
import './index.scss'

export default class Footer extends Component {
    render(){
        return(
            <ul id="footNav">
                {
                   this.props.footNav.map((item)=>{
                       return<li key={item.id}>
                            <img src={item.image_url} alt=''/>
                       </li>
                   })
                }
            </ul>
        )
    }
}