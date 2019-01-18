import React,{Component} from 'react';
import './index.scss';
import CartList from '../CartList'

export default class TopNav extends Component {
    //组件销毁前  ，将未更新完的状态停止
   componentWillUnmount(){
       this.setState=(state,callback)=>{
           return;
       }
   }
    goBack=()=>{
        this.props.history.go(-1)
    }
    constructor(){
        super();
        this.state = {
            edit:false,
            visible:'block'
        }
    }
    componentDidMount(){
      this.visible();
    }
    showBtn=()=>{
        this.setState({
            edit:!this.state.edit
        })
        this.visible();
    }
    visible=()=>{
        if (localStorage.getItem('cart')==='[]') {
            this.setState({
                visible:'none'
            })
        }
    }
    render(){
        return(
            <div>
            <div className='shoppingCartTopNav'>
                <img onClick={this.goBack} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAArCAYAAABmbJjGAAAAAXNSR0IArs4c6QAABFpJREFUWAm1l0tMVFcYx5kZqsmwkEBrlGLaQnlFE1MTSVzUxAcSGAYG6sRWujBxYaJiXBgTdcPOuCIpxrgxxuCiCTYdGCAtggkduoFJG018FBxtG5WFSkyTGXFgGH/f4LkebpkHd8aT3Hu+891z/r/znXse9zryPkBqbW1dX15ePlBdXf3X1NTUE0HYcs1paWnZND8/P4JuJVfY4XA0+/3+WzkFNTc3fxmLxUbi8fhnWgBz2DvsmiMr0+VybQESMEFE88rg4ODtnIDcbvd2AGNcG0y9PT80NHTcZrPFswY1NjbuXFxcHAVQZIKcAXJW+RzKsJITSQPt/ERSoLWPE8FxIF2aL88yqKmpaT+R3EBsrRIEEMM+BOSK8qnc0tAxXIeI4kdEPlJCQKJcXiA9yqfnq46I2dWBwGUuo5MAIna7vWVgYGBQF9dto7LuTGYDOUckP/BcX3//AalnUQ4nayd+vUGqenkM1wUqnNYrEcmLd5A/dP9KdtqhIwJbMBi8ROOTugCQZ/n5+bv7+/vv6P5kdsqIOjs78ycnJ68C+14XAPKY8l5W/CPdn8pOCuro6FgbCoVkZnl0ASD3uep48U91fzp7RRAL0cm+5aNxnUngz4KCgvre3t7nJn/a4v9mndfrXQdEZpAZ8juQXVYg0otlERHJx6z2X3kn20xdvMm54mEKR0z+jItGRJwlJUB+WwHi47R0ZwOR3iRARPIFwzUOpEbvIi/9em1trbe7u/uN7rdi21jtIi6nYolJ4DLT9yiwuMlvqSgRda0AeVJcXHwqVxDpmd3pdB5AcNzUzdLZ2dlhmYEmv+ViYta9Wzc/o7LPpGR53Zh0liaDzCjWiJvIBKanryKRyBiH3Ke604ptTG8WYpRh9LIbLzu4ZCZyBZg0ZVYAqs2yBStORG1EcJH8qKokOdHKbl3X19d3T/dnahsRqQYy05jWx8jl/DES4JKFhYUx3qd51zDqpDKSnkfT09MjlZWV8zTeowk4AX7HN/U439T/av60ZlKQtAQWqKqqeol4A0U1zPLV8y2wILCQ1MskpQSJAGITRPY3Q+mmqIZavn4O0Im7PH8g9dKltCARILLbRHAXUw5B1Uby/RUVFY95nvY4V41okzrR8/uIBonsG2pKRJIkQg8RPwc2mfAkuWUMkvaIPQQWwBSY+kKVd+fC/4bn5q2MR0tpVSBpgtg/NTU1stsLzLkkk7jvJbI1PL+l+QxTzSTDkanBetrMGXaT+hv1NgztRT5cTpAvO14sg0Tc4/GU8xs5SnT6H57sItfYzg6zrclHfyJlBRKFtra20rm5OflnrUoovr/9xEZ9UPZQcWUNEhH5C49Go8NEtlXKKhHZL0TWBux1TkAizDAWMoxDwHYokOTAAoWFhU1qpevPLNk+n+9VUVFRHcKjugDgz8Ph8Cc5A4l4T09PuKyszIXplzLQh2Rf04nQqteRCKRKExMTsfb29t6ZmZk1RHOEP8CnUv8t5ZCsbFYYHdAAAAAASUVORK5CYII=' alt=''/>
                <span>购物车</span>
                <div>
                    <span onClick={this.showBtn} style={{'display':this.state.visible}} >{this.state.edit?'完成':'编辑'}</span>
                </div>
            </div>
            <CartList edit={this.state.edit} />
            </div>
        )
    }
}