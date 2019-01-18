import React,{Component} from 'react';

export default class HeadImg extends Component {
    render(){
        return (
            <div>
              {
                this.props.headImg.map((item)=>{
                    return <div key={item.id}>
                        {/* {    
                            
                            item.content.gifImage?<div>
                                <img alt='' style={{'width':'100%'}} src={item.content.gifImage?item.content.gifImage:''} />
                            </div>
                            :''
                        }
                        {
                             item.content.bg?<div style={{'width':'100%','height':'auto','borderTop':'1px solid #888'}}>
                             <img style={{'width':'100%'}} src={item.content.bg.image} alt=''/>
                         </div>
                         :''
                        } */}
                        {
                            <div style={this.props.style}>
                                <img alt='' style={{'width':'100%'}} src={item.image_url?item.image_url:''} />
                            </div>
                        }
                    </div>
                })
              }
            </div>
        )
    }
}