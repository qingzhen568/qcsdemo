import React,{Component} from 'react'

class Life extends Component{
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return
        }
    }
    render(){
        return (
            <div>居家生活</div>
        )
    }
}

export default Life;