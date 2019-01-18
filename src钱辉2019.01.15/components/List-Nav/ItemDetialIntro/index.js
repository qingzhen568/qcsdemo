import React,{Component} from 'react';

export default class ItemDetialIntro extends Component {
    render(){
        return(
            <div className='itemDetialIntro' style={{'width':'100%'}}>
                <ul style={{'width':'100%'}}>
                    {
                        this.props.intro.map((item,index)=>{
                            return <li key={item+index} style={{'width':'100%'}}>
                                <img src={item} alt='' style={{'width':'100%'}}/>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}