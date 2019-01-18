import React,{Component} from 'react';
import './index.scss';
import axios from 'axios'


export default class RecommendWrap extends Component {
    //组件销毁前  ，将未更新完的状态停止
   componentWillUnmount(){
       this.setState=(state,callback)=>{
           return;
       }
   }
    constructor(){
        super();
        this.state = {
            recommend:[],
            data:[]
        }
    }
    componentDidMount(){ 
        let cartItem = JSON.parse(localStorage.getItem('cart'));
        let itemId = [];
        if (cartItem) {
            for (let i = 0; i < cartItem.length; i++) {
                const element = cartItem[i];
                itemId.push(element.item_id)
            }            
        }
        axios.get("/act/mop/aladdin/recommend?source=EXCLUSION&count=50&offset=0&items="+itemId.toString()+"")
        .then((resp)=>{
            // console.log(resp.data.data.item_list)
            this.setState({
                recommend:resp.data.data.item_list
            })
        })
    }
    // addToCart=(item)=>{
    //     let cartItem = JSON.parse(localStorage.getItem('cart'));
    //     let flag = true;
    //     let arr = [];
    //     if (cartItem) {
    //         for(let i in cartItem){
    //             if (cartItem[i].item_id===item.item_id) {
    //                 cartItem[i].count++;
    //                 flag=false
    //             }else{
    //                 cartItem.push(item)
    //             }
    //         }
    //         console.log(cartItem);
    //         localStorage.setItem('cart',JSON.stringify(cartItem));
    //     }
    //     if (flag) {
    //         item.count = 1;
    //         item.checked = true;
    //         arr.push(item);
    //         this.setState({
    //             data:arr
    //         })
    //         localStorage.setItem('cart',JSON.stringify(arr));
    //     }
    // }
    render(){
        return(
            <div className='recommendWrap'>
                <div className='recommendTitle'>智能推荐商品</div>
                <div className='recommendWrapList'>
                    {
                        this.state.recommend.map((item,index)=>{
                            return<div className='recommendListItem' key={index+item.item_id+item.min_price+item.item_uid}>
                                    <div className="recommendListItemImg">
                                        <img src={item.over_image_url} alt=''/>
                                    </div>
                                    <div className='recommendListItemPromotion'>
                                        {
                                            item.promotions.map((ele,ccc)=>{
                                                return <div key={ccc+ele}>
                                                   {ele}
                                                </div>
                                            })
                                        }
                                    </div>
                                    <div className='recommendListItemName'>{item.item_name}</div>
                                    <div className='recommendListItemPrice'>
                                        <span>¥{item.min_price/100}</span>
                                        <span className='remmendListItemCart'></span>
                                    </div>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}