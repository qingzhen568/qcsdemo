import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class UnderFocus extends Component {
    render(){
        return (
            <div className="underFocus">
               {    
                   this.props.type === 'newYear'?
                   this.props.homeImg.map((item,index)=>{
                       return <div key={item.instance_id}>
                            <div>
                                {
                                    index===7?
                                    <img src={item.content.image} alt='' style={{'width':'100%'}}/>
                                    :''
                                }
                            </div>
                            <Link to='/list'>
                             {
                                 index===8?
                                 <img src={item.content.image} alt='' style={{'width':'100%'}}/>
                                 :''
                             }
                        </Link>
                       </div>
                   })
                   :''
               }
               {     
                   this.props.type === 'list1'?
                    this.props.homeImg.map((item,index)=>{
                        return <div key={item.instance_id}>
                            {
                                 index===10?
                                 <img src={item.content.image} alt='' style={{'width':'100%'}}/>
                                 :''
                             }
                        </div>
                    }):''
               }
                 {     
                   this.props.type === 'list2'?
                    this.props.homeImg.map((item,index)=>{
                        return <div key={item.instance_id}>
                             {
                                 index===12?
                                 <img src={item.content.image} alt='' style={{'width':'100%'}}/>
                                 :''
                             }
                        </div>
                    }):''
               }
                {     
                   this.props.type === 'list3'?
                    this.props.homeImg.map((item,index)=>{
                        return <div key={item.instance_id}>
                             {
                                 index===14?
                                 <img src={item.content.image} alt='' style={{'width':'100%'}}/>
                                 :''
                             }
                        </div>
                    }):''
               }
               {    
                   this.props.type === 'newGoods'?
                   this.props.homeImg.map((item,index)=>{
                       return <div key={item.instance_id}>
                            <div>
                                {
                                    index===16?
                                    <img src={item.content.bg.image} alt='' style={{'width':'100%'}}/>
                                    :''
                                }
                            </div>
                            <div>
                             {
                                 index===17?
                                 <img src={item.content.bg.image} alt='' style={{'width':'100%'}}/>
                                 :''
                             }
                        </div>
                       </div>
                   })
                   :''
               }
            </div>
        )
    }
}