import React,{Component} from 'react';
import { Checkbox } from 'antd';
import './index.scss'


export default class CartList extends Component {
    constructor(){
        super();
        this.state = {
            cartItem:[],
            display:'none',
            totalPrice:0,
            totalCount:0,

            // checked:true,
            checkedAll: false,
        }
    }
    componentDidMount(){
        let cartItem = JSON.parse(localStorage.getItem('cart'));
        if (cartItem) {
            this.setState({
                cartItem:cartItem
            })
            let arr =[];
            for(let i in cartItem){
                if(cartItem[i].checked){
                    arr.push(cartItem[i])
                    this.setState({
                        checkedAll:arr.length===cartItem.length
                    })
                }
            }
            this.totalPrice(cartItem);            
        }
    }
    delete=(item)=>{
       let cartItem = this.state.cartItem;
       for (let i = 0; i < cartItem.length; i++) {
           const element = cartItem[i];
           if (element.item_id === item.item_id) {
                cartItem.splice(i,1);
               localStorage.setItem('cart',JSON.stringify(cartItem));
               this.setState({
                cartItem:cartItem
               })
           }
       }
       //最后一条数据时,cart 缓存移除
       if (cartItem.length===0) {
           localStorage.removeItem('cart');
       }
       this.totalPrice(cartItem);
    }
    reduce=(item)=>{
        let cartItem = this.state.cartItem;
       for (let i = 0; i < cartItem.length; i++) {
           const element = cartItem[i];
           if (element.item_id === item.item_id) {
               if (element.count>1) {
                    element.count--;
                    localStorage.setItem('cart',JSON.stringify(cartItem));
                    this.setState({
                    cartItem:cartItem
                    })
                   
               }else{
                    this.setState({
                        display:'block'
                    })
                    clearTimeout(timeout);
                   let timeout = setTimeout(() => {
                        this.setState({
                            display:'none'
                        })
                    }, 2000);
               }
           }
       }
       this.totalPrice(cartItem);
    }
    add=(item)=>{
        let cartItem = this.state.cartItem;
       for (let i = 0; i < cartItem.length; i++) {
           const element = cartItem[i];
           if (element.item_id === item.item_id) {
               element.count++;
               localStorage.setItem('cart',JSON.stringify(cartItem));
               this.setState({
                cartItem:cartItem
               })
           }
       }
       this.totalPrice(cartItem);
    }
    totalPrice=(cartItem)=>{
        let totalPrice = 0;
        let totalCount = 0;
        for (let i = 0; i < cartItem.length; i++) {
            const element = cartItem[i];
            if (element.checked) {
                totalPrice += (element.count*(element.min_price/100));
                totalCount += element.count;               
            }
            this.setState({
                totalPrice:totalPrice,
                totalCount:totalCount,
                checked:element.checked
            }) 
        }
     }
     
     onChange = (item) => {
        let cartItem = this.state.cartItem;
        let checked = !item.checked;
        let checkArr = [];
        for (let i = 0; i < cartItem.length; i++) {
            const element = cartItem[i];
            if (element.item_id === item.item_id) {
                element.checked = checked;
                localStorage.setItem('cart',JSON.stringify(cartItem));
                this.setState({
                 cartItem:cartItem,
                //  checked:checked
                })
            }
            if (element.checked) {
                checkArr.push(element)
            }
            if (checkArr.length===cartItem.length) {
                this.setState({
                    checkedAll:true
                })
            }else{
                this.setState({
                    checkedAll:false
                })
            }
            
        }
        this.totalPrice(cartItem);
      }
    
      onCheckAllChange = () => {
        let cartItem = this.state.cartItem;
        this.setState({
          checkedAll:!this.state.checkedAll
        });
        for(let i in cartItem){
            cartItem[i].checked = !this.state.checkedAll;
        }
        localStorage.setItem('cart',JSON.stringify(cartItem));
        this.totalPrice(cartItem);
      }
      //组件销毁前  ，将未更新完的状态停止
     componentWillUnmount(){
         this.setState=(state,callback)=>{
             return;
         }
     }

    render(){
        return(
            <div className='cartListContent'>
                <div className='sellAlert' style={{'display':this.state.display}}>该商品最少1件起售</div>
                <div className='cartAccount' style={localStorage.getItem('cart')==='[]'?{'display':'none'}:{'display':'flex'}}>
                    <Checkbox
                        className='cartAccountCheck'
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkedAll}
                    >
                        全选
                    </Checkbox>
                    <div className='cartAccountPrice'>
                        <span>合计:</span>
                        <span>¥{this.state.totalPrice.toFixed(2)}</span>
                    </div>
                    <div className='cartAccountBtn'>去结算({this.state.totalCount})</div>
                </div>
                <ul className='cartList'>
                    {
                        this.state.cartItem.map((item,index)=>{
                            return<li className='cartListItem' key={item.item_id+index}>
                                    <div className='checkboxWrap'>
                                    <Checkbox onChange={()=>this.onChange(item)} 
                                    checked={item.checked}/>
                                    </div>
                                    <img className='cartListItemimg' src={item.over_image_url} alt=''/>
                                    <div className='cartListItemDetial'>
                                        <div className='cartListItemdetialIntro'>
                                            <div>{item.item_name}</div>
                                            <div>
                                                <span>¥{item.min_price/100}</span>
                                                <span>x{item.count}</span>
                                            </div>
                                        </div>
                                        <div style={this.props.edit?{'display':'block'}:{'display':'none'}} onClick={()=>this.delete(item)} className='deleteCartItem'>
                                            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAABDZJREFUWAntmEtIlFEUx2fGcZwZtAeRQmWBkGS1aiqSCETERxEtQoiQ2lQrgyiKaNWmqOgFrXqsgh6QtDN1MBNaVIS7LIxqY0FiLsIabRxn+p3PuR/3ew1Tzrjywp177znn/s//nvucz+/7x9TU1LQ2FAqdolsnOeDRPZ3JZG6hu9rT0/PVw8ZV7HeVeghbWlr2BAKBO36/f5WHiUUMqa/pdPpoX19fr0WRo5E3ocbGxnVlZWVDkFmBo2Ew+8m/qVsw0GfIEeTNlJuw+ZFKpbbE4/HRHDxMlQVMpM3NzRuIQh1gIUaXUZYlJSV7qXeQJ8nnyR/JuVItyvPkCsjdB6tbGYPvR5ak/b63t3dEyaU0CbE2lpaWlt6AyAHkEd2oiPUE2I+SyeSp/v7+n+LHINTQ0BCMRCKPIbM/6/wLI5imbRLOygtSgC3TGgasJgv4JJFIHBwcHEwFRQCZRiGD3R/KzrGxsYcVFRXJycnJohACOwN2qLKysgN/shvbw+HwbcrnBiGEp4UY5ZssmcDMzEwEIxEXPIHtE1Kzs7MPWJuH8LuTfAJHc4SITDWCNIKtVVVV5mKVyBacDYD4MjcLzeVk8b2e7DMihON95GOs/pPIoqKQRMe5SpF/2YHXcXFH3JgeOWdWs8vqIBWDyCUITqA/gvEvMSxUAr8crHv4WEF5gmkbZgo/DAwMfBMfJiFpSGptbW2g0wuq31hPtUNDQ7I1C5ZisVg0uyxWM9jtnENvdXDHXQTzkDJg4Zl1JZtvyY4uU2tT96VwHYSUgjLJJTqjtRekaixqD0/6TvC1tbWtYWTbCDPXUvy33odLd5e0uURf6nIO3PJoNNoyPT39Wq0RXe9WzxUhiz3hvcLaeirnhq7g7qtG/gx5t2wMXQeZw7S7uJQv6vJc9bwJEZ3KLNBKHZCIya6RdRGG2BJdh0x2kiQ5a/JKuabMDiCHlw8nRqmUkJB7yZheqSu5skUn55mlj25jr+cdIXvHYrU9CRGJzMTEhGXExSKh43oSwuiP3Pi68ULUcxFaCP8OH4uEHCGxCRYjZAuIo+kZITnMeHQv+Lb3PKk5hqagb56wEDRsKd0GYTxT7Cc1/UskBGCVSplP8iRk7wzoI8hEeeH12XSj6LqQzY6Pj9v/ncaR76af6PNKeRPio8FdEO+RLdOYfYq0u3njNfgK+Q57HzdbJXOEn9Eaz1pGJY4tzl3aCidXacEIBoPmZax86Z0dhFAajy+Ml8k/Wt24EHXeRvIhQp4s8gpI2TEdhDAaocM4hut5/56BVMH+LdbX10d4yJ3Gx1Lwv09NTX2yE3L86xADnqvn6HQha/yOUgjOOzHQKnA3ChD1s6zLy3ZQ1ymB+RWen/IZ5TgAm+2d/rcNlhCRJXETH9fccFwjpAyJlIxGPkTU8FS1LE5lk2/JGSW+PvPpZYBPLx+8+v0FmGN/cfPIA/YAAAAASUVORK5CYII=' alt=''/>
                                            删除
                                        </div>
                                    </div>
                                    <div className='changeBtnBox'>
                                        <div style={this.props.edit?{'display':'flex'}:{'display':'none'}} className='changeBtn'>
                                            <div onClick={()=>this.reduce(item)}>-</div>
                                            <div>{item.count}</div>
                                            <div onClick={()=>this.add(item)}>+</div>
                                        </div>
                                    </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}