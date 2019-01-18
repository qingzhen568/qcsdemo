import React,{Component} from 'react';
import './index.scss';
import {Button} from 'antd';
import TopNav from '../TopNav';
import RecommendWrap from '../RecommendWrap';


export default class ShoppingCartContainer extends Component {
    //组件销毁前  ，将未更新完的状态停止
   componentWillUnmount(){
       this.setState=(state,callback)=>{
           return;
       }
   }
    constructor(){
        super();
        this.state = {
            new_slogen_list:[
                {'title':'正品保证','iconUrl':'https://image.watsons.com.cn//upload/27910d08.png'},
                {'title':'屈臣氏品牌','iconUrl':'https://image.watsons.com.cn//upload/278ce554.png'},
                {'title':'7天退货','iconUrl':'https://image.watsons.com.cn//upload/2e8ebc1f.png'}
            ],
            data:[]
        }
    }
    componentDidMount(){
        if (localStorage.getItem('cart')) {
            this.setState({
                data:JSON.parse(localStorage.getItem('cart'))
            })
        }
    }
    goHome=()=>{
        this.props.history.push('/');
    }
    render(){
        if(localStorage.getItem('cart')){
            return(
                <div className='shoppingCartContainer'>
                <ul className='shoppingCartContainer-new_slogen_list'>
                    {
                        this.state.new_slogen_list.map((item,index)=>{
                            return<li className='newLongListItem' key={item.iconUrl+index}>
                                    <img src={item.iconUrl} alt=''/>
                                    <span>{item.title}</span>
                            </li>
                        })
                    }
                </ul>
                    <div className='introContent'>
                    尊敬的屈臣氏用户：我们对《隐私政策》进行了更新。请仔细阅读《隐私政策》并确定了解我们对您个人信息的处理规则。
                    阅读过程中，如您有任何疑问，可联系我们的客服咨询，如您不同意协议中的任何条款，
                    您应立即停止继续使用屈臣氏提供的服务。【点击查阅】
                    </div>
                    <TopNav history={this.props.history}/>
                    <RecommendWrap/>
                </div>
            )}
            else{
            return(
                <div  className='shoppingCartContainer'>
                    <div className='shoppingIsNothing'>
                        <div className='shoppingCartBg'>
                            <img src='data:image/png;base64,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' alt=''/>
                        </div>
                        <div >剁剁剁！装满购物车!</div>
                        <Button onClick={this.goHome} className='shoppingCartToHome' type='primary'>去首页逛逛</Button>
                    </div>
                 <TopNav history={this.props.history}/>
                <RecommendWrap/>
                </div>
            )}
    }
}