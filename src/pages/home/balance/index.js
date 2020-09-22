import React from "react";
import {connect} from 'react-redux';
import Css from '../../../assets/css/home/balance/index.css'
import SubHeaderComponent from "../../../components/header/subheader";
import {safeAuth} from "../../../assets/js/utils/util";

class BalanceIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        safeAuth(props);
    }

    componentDidMount() {
    }

    // 防止内存泄露
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        return (
            <div className={Css['page']}>
                {/*标题头*/}
                <SubHeaderComponent title={"确认订单"}></SubHeaderComponent>
                {/*主体*/}
                <div className={Css['main']}>
                    {/*地址*/}
                    <div className={Css['address-wrap']}>
                        {/*用户地址信息*/}
                        <div className={Css['persion-info']}>
                            <span>收货人: 王五</span>
                            <span>13717628483</span>
                        </div>
                        {/*收货地址*/}
                        <div className={Css['address']}>
                            <img src={require('../../../assets/images/home/cart/map.png')} alt="收货地址"/>
                            <span>天津和平区核平西里</span>
                        </div>
                        {/*箭头*/}
                        <div className={Css['arrow']}></div>
                        {/*分割线盒子*/}
                        <div className={Css['address-border-wrap']}>
                            {/*梯形*/}
                            <div className={Css['trapezoid'] + " " + Css['style1']}></div>
                            <div className={Css['trapezoid'] + " " + Css['style2']}></div>
                            <div className={Css['trapezoid'] + " " + Css['style1']}></div>
                            <div className={Css['trapezoid'] + " " + Css['style2']}></div>
                            <div className={Css['trapezoid'] + " " + Css['style1']}></div>
                            <div className={Css['trapezoid'] + " " + Css['style2']}></div>
                            <div className={Css['trapezoid'] + " " + Css['style1']}></div>
                            <div className={Css['trapezoid'] + " " + Css['style2']}></div>
                            <div className={Css['trapezoid'] + " " + Css['style1']}></div>
                            <div className={Css['trapezoid'] + " " + Css['style2']}></div>
                        </div>
                    </div>
                    {/*商品列表*/}
                    <div className={Css["goods-wrap"]}>
                        {
                            this.props.state.cart.aCartData.length > 0 ? this.props.state.cart.aCartData.map((item, index)=>{
                                return (
                                    item.checked ?
                                        <div key={index} className={Css['goods-list']}>
                                        <div className={Css['image']}>
                                            <img src={item.img} alt={item.title}/>
                                        </div>
                                        {/*产品参数*/}
                                        <div className={Css['goods-param']}>
                                            <div className={Css['title']}>
                                                {item.title}
                                            </div>
                                            <div className={Css['attr']}>
                                                {
                                                    item.attrs.length>0 ? item.attrs.map((item1, index1)=>{
                                                        return (
                                                            <span key={index1}>{item1.title}: {
                                                                item1.param.length>0?item1.param.map((item2, index2)=>{
                                                                    return (
                                                                        <React.Fragment key={index2}>
                                                                            {item2.title}
                                                                        </React.Fragment>
                                                                    )
                                                                }) : ""
                                                            }</span>
                                                        )
                                                    }) : ""
                                                }
                                            </div>
                                            <div className={Css['amount']}>
                                                × {item.amount}
                                            </div>
                                            <div className={Css['price']}>
                                                ￥{item.price}
                                            </div>
                                        </div>
                                    </div>
                                    :""
                                )
                            }) : ""
                        }
                    </div>
                    <ul className={Css['total-wrap']}>
                        <li>商品总额</li>
                        <li>￥{this.props.state.cart.total}</li>
                    </ul>
                    <ul className={Css['total-wrap']}>
                        <li>运费</li>
                        <li>￥{this.props.state.cart.freight}</li>
                    </ul>
                </div>
                {/*支付订单*/}
                <div className={Css['balance-wrap']}>
                    <div className={Css['price-wrap']}>
                        <span>实付金额: </span><span>￥{parseFloat(Math.round(this.props.state.cart.total+this.props.state.cart.freight).toFixed(2))}</span>
                    </div>
                    <div className={Css['balance-btn']}>
                        提交订单
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state=>{
    return {
        state
    }
})(BalanceIndex);