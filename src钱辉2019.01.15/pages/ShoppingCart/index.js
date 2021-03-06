import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import './index.scss'
import ShoppingCartContainer from '../../components/ShoppingCart-Nav/ShoppingCartContainer'
 export default class ShoppingCart extends Component {
     //组件销毁前  ，将未更新完的状态停止
	componentWillUnmount(){
		this.setState=(state,callback)=>{
			return;
		}
    }
    constructor(){
        super();
        this.state = {
            tokenType:1
        }
    }
    componentDidMount(){
        axios({
            method:'get',
            url:'http://127.0.0.1:7001/center',
            headers:{
                'Authorization':localStorage['token']
            }
        }).then((resp)=>{
            // console.log(resp.data)
            if (resp.data.code===0) {
                this.setState({
                    tokenType:true
                })
            }else{
                this.setState({
                    tokenType:false
                })
            }
        })
    }
     render(){
        if(this.state.tokenType){
         return (
             <div id='shoppingCart'>
                 <ShoppingCartContainer history={this.props.history}/>
             </div>
         )
        }else{
           return <Redirect to='/login'/>
        }
     }
 }
