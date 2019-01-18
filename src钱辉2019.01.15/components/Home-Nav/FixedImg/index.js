import React,{Component} from 'react';


export default class FixedImg extends Component {
            //组件销毁前  ，将未更新完的状态停止
	componentWillUnmount(){
		this.setState=(state,callback)=>{
			return;
		}
    }
    render(){
        return (
            <div className="fixedContent">
              <div className="fixed">
               {
                   this.props.superise.map((item)=>{
                       return <div key={item.instance_id} >
                           {    
                               item.instance_id==="15458917539562576"?
                               <img src={item.content.bg.image} alt=''
                               style={{'width':'100%'}} />:''
                           }
                             {    
                               item.instance_id==="15458765539278612"?
                               <img src={item.content.gifImage} alt=''
                               style={{'width':'100%'}} />:''
                           }
                             {    
                               item.instance_id==="15446858406021594"?
                               <img src={item.content.bg.image} alt=''
                               style={{'width':'100%'}} />:''
                           }
                       </div>
                   })
               }
              </div>
            </div>
        )
    }
}