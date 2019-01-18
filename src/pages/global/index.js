import React,{Component} from 'react'

class Global extends Component{
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return
        }
    }
    render(){
        return (
            <div>购全球</div>
        )
    }
}

export default Global;