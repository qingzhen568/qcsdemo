import React,{Component} from 'react';
import axios from 'axios';
import './index.scss';

// let detial = '/act/mop/item/coupons?item_id=2509&count=30&offset=0';
// let detial = '/item/desc/data/get?item_uid=11_23502'
export default class ItemDetialData extends Component {
    //组件销毁前  ，将未更新完的状态停止
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }
    constructor(props){
        super(props);
        this.state = {
            itemId:this.props.itemId,
            itemDetialcoupon:[
                {'name':'正品保证','url':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAAAXNSR0IArs4c6QAABMpJREFUSA2dVn1oW1UUP+elabvUohW2tVHUbn/MgWNT3FTwa4ofndDphCEOLEWWJl0yrNWqDEfEIX7iyEebxg1xDtFu6iq6TDrUggX3n1YFRcHApHMO7bq51prkHX/3vrzyXpamHxfeux/nd87v3HPvPfcyzaNIoP9S4v/uJ+JVJOQnksuJ6Qy+MRJjlJp8Qxxt/3cuU1wJIMH4nTD+LL67QOCtgL0AR46Sx7OH+zpHZ8OVJZNg3zVk5hMgeEArMuVRD+Mb0bMx+W8YX0YsV1iO0AZgGTIT1bsg7QLpeCnpRWQSit1GBfoQwKUwOIH6ZSj3l1O2jUk47qecdKO/A+Q1IP0FpK2cjvxkY1TtIkPY7iNTPsF4NUSfkZfbOBn+y6lQqQ3SZsrRAIncqB01qm7lVOgHW2eGTEK9q6hQOIFwYDPQXmqKdHOUTRs431q6BpbQ5OmDINwCwt/g8HrbYUMZkYEBD4gOWUT8Affv7FoMkbLFb26douqVj8Lhb2CvmfLmfjWuiiajL/5sg2ANoL+Sb3m7JVr8n+ObpklqtoDwHNZws94HikzPyjRf0KYN3qU9WwSPRMWQQOxp6Ug8o9Q53XGKmF/Vpkzeo8cgvJ3EHIYXP1MqspqZRQMW+JOOeAzrFNFqhrcZGyMrTx2oo3NnT4Pahy13JcJobtYA4Y8XTRSIdc8QEX2piJRNfv2xC5jd51gixi5tNRDTmzWZQRhceJFgYivMvmZp8o/kq8cudBSWY7oHHgPhQ65TpSqrK8dPgrENyIs+x5CrWVyCA9pz4jGqMlp4b/tZN8jI6j54MDNu1J3G2j+cIKxBEMnnBBLw9ziDK5wy1ZbO5Gr8j+iMQXQeqWsT9+44WYpDeC27Qo1YM5nUgImCewbMv+txkRVUyH8tgTiOhlVA1Ijzk4GhBoQwR2w8jLP5nS1319gcVplUYRzT7alcMZyWhFPhT3EyOiFXWaQJ9TDCdguILkECOAonry4it3N/eMhql/kbxWUCD2bGWQ2R/LpSKKfDffB6m/ZezULMIczoOEJ3vYXl3cC8U6rn6otp2RXKgowyllCsI+BCgiYVfp88BBmrcNdhRjcVIfuQ1V8sgZfpsmWXOWNQda3K8rBBLbjHlpVBE/dFMkhs90JW3GmcIf+aUDmscwwhX4d1XQtHJ3D3fmVwfDs2Ah8BqI4kt9sJdrY5FRkhqlmLQ/oI+Zc/yNGN6kKtXPKFVzSAOY30ldNXDHbatRhU946JGWy0DFe2M5dUgsltZBYOwrlxMjwr1eWr1gxJU9+obyCWXoTzIxzkq+YyVkmO8K0n09ynMcI99i2vyfSgP/wctvcxxBjrNj0igcQNlQzOJpNQvAVH4zgcr4W9JHarRQoFHUZbUT/ZaHoQ/Tsgwu6TKPnr4/N5pskTb19GU//sgs6TiI46Uu+R/7o259q6yBQpCL1IUQnMMKCdYD4J5bfw6BlEOEb1WPGn7jA6lVRH4SGcwcdRq/ckXlj0PKd3vuTEqvZFZDYA2eJuEOLyE2c4kQN1xhmHwaVo+1EvsXWwGYbIY/QgR347M+ZozEqmMCK4hzp67yE24Tm1YsSV0iw7eEoQD4LkMGaOd8fspSJZqZr07K+n89OKsIEKnjNU1zC2kGfE/wg4wzvgfWe5AAAAAElFTkSuQmCC'},
                {'name':'满68包邮','url':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAAAXNSR0IArs4c6QAABMpJREFUSA2dVn1oW1UUP+elabvUohW2tVHUbn/MgWNT3FTwa4ofndDphCEOLEWWJl0yrNWqDEfEIX7iyEebxg1xDtFu6iq6TDrUggX3n1YFRcHApHMO7bq51prkHX/3vrzyXpamHxfeux/nd87v3HPvPfcyzaNIoP9S4v/uJ+JVJOQnksuJ6Qy+MRJjlJp8Qxxt/3cuU1wJIMH4nTD+LL67QOCtgL0AR46Sx7OH+zpHZ8OVJZNg3zVk5hMgeEArMuVRD+Mb0bMx+W8YX0YsV1iO0AZgGTIT1bsg7QLpeCnpRWQSit1GBfoQwKUwOIH6ZSj3l1O2jUk47qecdKO/A+Q1IP0FpK2cjvxkY1TtIkPY7iNTPsF4NUSfkZfbOBn+y6lQqQ3SZsrRAIncqB01qm7lVOgHW2eGTEK9q6hQOIFwYDPQXmqKdHOUTRs431q6BpbQ5OmDINwCwt/g8HrbYUMZkYEBD4gOWUT8Affv7FoMkbLFb26douqVj8Lhb2CvmfLmfjWuiiajL/5sg2ANoL+Sb3m7JVr8n+ObpklqtoDwHNZws94HikzPyjRf0KYN3qU9WwSPRMWQQOxp6Ug8o9Q53XGKmF/Vpkzeo8cgvJ3EHIYXP1MqspqZRQMW+JOOeAzrFNFqhrcZGyMrTx2oo3NnT4Pahy13JcJobtYA4Y8XTRSIdc8QEX2piJRNfv2xC5jd51gixi5tNRDTmzWZQRhceJFgYivMvmZp8o/kq8cudBSWY7oHHgPhQ65TpSqrK8dPgrENyIs+x5CrWVyCA9pz4jGqMlp4b/tZN8jI6j54MDNu1J3G2j+cIKxBEMnnBBLw9ziDK5wy1ZbO5Gr8j+iMQXQeqWsT9+44WYpDeC27Qo1YM5nUgImCewbMv+txkRVUyH8tgTiOhlVA1Ijzk4GhBoQwR2w8jLP5nS1319gcVplUYRzT7alcMZyWhFPhT3EyOiFXWaQJ9TDCdguILkECOAonry4it3N/eMhql/kbxWUCD2bGWQ2R/LpSKKfDffB6m/ZezULMIczoOEJ3vYXl3cC8U6rn6otp2RXKgowyllCsI+BCgiYVfp88BBmrcNdhRjcVIfuQ1V8sgZfpsmWXOWNQda3K8rBBLbjHlpVBE/dFMkhs90JW3GmcIf+aUDmscwwhX4d1XQtHJ3D3fmVwfDs2Ah8BqI4kt9sJdrY5FRkhqlmLQ/oI+Zc/yNGN6kKtXPKFVzSAOY30ldNXDHbatRhU946JGWy0DFe2M5dUgsltZBYOwrlxMjwr1eWr1gxJU9+obyCWXoTzIxzkq+YyVkmO8K0n09ynMcI99i2vyfSgP/wctvcxxBjrNj0igcQNlQzOJpNQvAVH4zgcr4W9JHarRQoFHUZbUT/ZaHoQ/Tsgwu6TKPnr4/N5pskTb19GU//sgs6TiI46Uu+R/7o259q6yBQpCL1IUQnMMKCdYD4J5bfw6BlEOEb1WPGn7jA6lVRH4SGcwcdRq/ckXlj0PKd3vuTEqvZFZDYA2eJuEOLyE2c4kQN1xhmHwaVo+1EvsXWwGYbIY/QgR347M+ZozEqmMCK4hzp67yE24Tm1YsSV0iw7eEoQD4LkMGaOd8fspSJZqZr07K+n89OKsIEKnjNU1zC2kGfE/wg4wzvgfWe5AAAAAElFTkSuQmCC'},
                {'name':'7天退货','url':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAYAAACQ0cTtAAAAAXNSR0IArs4c6QAABMpJREFUSA2dVn1oW1UUP+elabvUohW2tVHUbn/MgWNT3FTwa4ofndDphCEOLEWWJl0yrNWqDEfEIX7iyEebxg1xDtFu6iq6TDrUggX3n1YFRcHApHMO7bq51prkHX/3vrzyXpamHxfeux/nd87v3HPvPfcyzaNIoP9S4v/uJ+JVJOQnksuJ6Qy+MRJjlJp8Qxxt/3cuU1wJIMH4nTD+LL67QOCtgL0AR46Sx7OH+zpHZ8OVJZNg3zVk5hMgeEArMuVRD+Mb0bMx+W8YX0YsV1iO0AZgGTIT1bsg7QLpeCnpRWQSit1GBfoQwKUwOIH6ZSj3l1O2jUk47qecdKO/A+Q1IP0FpK2cjvxkY1TtIkPY7iNTPsF4NUSfkZfbOBn+y6lQqQ3SZsrRAIncqB01qm7lVOgHW2eGTEK9q6hQOIFwYDPQXmqKdHOUTRs431q6BpbQ5OmDINwCwt/g8HrbYUMZkYEBD4gOWUT8Affv7FoMkbLFb26douqVj8Lhb2CvmfLmfjWuiiajL/5sg2ANoL+Sb3m7JVr8n+ObpklqtoDwHNZws94HikzPyjRf0KYN3qU9WwSPRMWQQOxp6Ug8o9Q53XGKmF/Vpkzeo8cgvJ3EHIYXP1MqspqZRQMW+JOOeAzrFNFqhrcZGyMrTx2oo3NnT4Pahy13JcJobtYA4Y8XTRSIdc8QEX2piJRNfv2xC5jd51gixi5tNRDTmzWZQRhceJFgYivMvmZp8o/kq8cudBSWY7oHHgPhQ65TpSqrK8dPgrENyIs+x5CrWVyCA9pz4jGqMlp4b/tZN8jI6j54MDNu1J3G2j+cIKxBEMnnBBLw9ziDK5wy1ZbO5Gr8j+iMQXQeqWsT9+44WYpDeC27Qo1YM5nUgImCewbMv+txkRVUyH8tgTiOhlVA1Ijzk4GhBoQwR2w8jLP5nS1319gcVplUYRzT7alcMZyWhFPhT3EyOiFXWaQJ9TDCdguILkECOAonry4it3N/eMhql/kbxWUCD2bGWQ2R/LpSKKfDffB6m/ZezULMIczoOEJ3vYXl3cC8U6rn6otp2RXKgowyllCsI+BCgiYVfp88BBmrcNdhRjcVIfuQ1V8sgZfpsmWXOWNQda3K8rBBLbjHlpVBE/dFMkhs90JW3GmcIf+aUDmscwwhX4d1XQtHJ3D3fmVwfDs2Ah8BqI4kt9sJdrY5FRkhqlmLQ/oI+Zc/yNGN6kKtXPKFVzSAOY30ldNXDHbatRhU946JGWy0DFe2M5dUgsltZBYOwrlxMjwr1eWr1gxJU9+obyCWXoTzIxzkq+YyVkmO8K0n09ynMcI99i2vyfSgP/wctvcxxBjrNj0igcQNlQzOJpNQvAVH4zgcr4W9JHarRQoFHUZbUT/ZaHoQ/Tsgwu6TKPnr4/N5pskTb19GU//sgs6TiI46Uu+R/7o259q6yBQpCL1IUQnMMKCdYD4J5bfw6BlEOEb1WPGn7jA6lVRH4SGcwcdRq/ckXlj0PKd3vuTEqvZFZDYA2eJuEOLyE2c4kQN1xhmHwaVo+1EvsXWwGYbIY/QgR347M+ZozEqmMCK4hzp67yE24Tm1YsSV0iw7eEoQD4LkMGaOd8fspSJZqZr07K+n89OKsIEKnjNU1zC2kGfE/wg4wzvgfWe5AAAAAElFTkSuQmCC'}
            ],
            coupons:[]
        }
    }
    componentDidMount(){
        axios.get('/act/mop/item/coupons?item_id='+this.state.itemId+'&count=30&offset=0')
        .then((resp)=>{
            // console.log(resp.data.data.coupons)
            this.setState({
                coupons:resp.data.data.coupons
            })
        })
    }
    render(){
        return(
            <div className='itemDetialData'>
                <ul className='itemDetialcoupon'>
                    {
                        this.state.itemDetialcoupon.map((item,index)=>{
                            return<li className='itemCoupon' key={item.url+index}>
                                    <img src={item.url} alt=''/>
                                    <span>{item.name}</span>
                            </li>
                        })
                    }
                </ul>
                <ul className='itemCouponWrap'>
                    领券
                    {
                        this.state.coupons.map((item,index)=>{
                            return<li key={item.coupon_code+index} className='itemCouponWrap-item' >
                                    {item.coupon_name}
                            </li>
                        })
                    }
                    <img src='https://image.watsons.com.cn//upload/52bcb62d.png' style={{'width':'1.5%'}} alt=''/>
                </ul>
            </div>
        )
    }
}