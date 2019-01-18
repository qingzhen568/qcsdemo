import React,{Component} from 'react';
import Xmj from '../../components/List-Nav/xmj';
import './index.scss'
import BackTop from '../../components/commons/BackTop'


export default class List extends Component {
    render(){
        return(
            <div className='goodsList'>
                <Xmj history={this.props.history}/>
                <BackTop/>
            </div>
        )
    }
}