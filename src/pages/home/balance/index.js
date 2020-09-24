import React from "react";
import {connect} from 'react-redux';
import Css from '../../../assets/css/home/balance/index.css'
import SubHeaderComponent from "../../../components/header/subheader";
import {safeAuth} from "../../../assets/js/utils/util";
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import {Toast} from "antd-mobile";

class BalanceIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sName: '',
            sCellphone: '',
            sProvince: '',
            sCity: '',
            sArea: '',
            sAddress: ''
        };
        safeAuth(props);
    }

    componentDidMount() {
        if (sessionStorage['addressId']!==undefined) {
            this.getSelectAddress();
        }else{
            this.getDefaultAddress();
        }
    }

    // 跳转页面
    replacePage(url) {
        this.props.history.replace(config.path+url)
    }

    // 获取收货地址
    getSelectAddress() {
        if (sessionStorage['addressId'] !== undefined) {
            let sUrl = config.baseUrl+"/api/user/address/info?uid="+this.props.state.user.uid+"&aid="+sessionStorage['addressId']+"&token="+config.token;
            request(sUrl).then(res=>{
                if (res.code === 200) {
                    localStorage['addressId'] = res.data.aid;
                    this.setState({
                        sName: res.data.name,
                        sCellphone: res.data.sCellphone,
                        sProvince: res.data.province,
                        sCity: res.data.city,
                        sArea: res.data.area,
                        sAddress: res.data.address
                    });
                }
            })
        }
    }

    // 获取默认收货地址
    getDefaultAddress() {
        let sUrl = config.baseUrl + "/api/user/address/defaultAddress?uid="+this.props.state.user.uid+"&token="+config.token;
        request(sUrl).then(res=>{
            if (res.code === 200) {
                this.setState({
                    sName: res.data.name,
                    sCellphone: res.data.sCellphone,
                    sProvince: res.data.province,
                    sCity: res.data.city,
                    sArea: res.data.area,
                    sAddress: res.data.address
                });
            }
        })
    }

    // 提交收货地址
    submitOrder() {
        let sAddressId = sessionStorage['addressId'] || localStorage['addressId'];
        if (sAddressId !== undefined) {
            if (this.props.state.cart.total > 0) {

            } else {
                Toast.info("您的购物车还没有商品", 1);
            }
        }else{
            Toast.info("请选择收货地址", 1)
        }
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
                    <div className={Css['address-wrap']} onClick={this.replacePage.bind(this, "address/index")}>
                        {
                            sessionStorage['addressId'] !== undefined ||
                            localStorage['addressId'] !== undefined
                                ? <React.Fragment>
                                {/*用户地址信息*/}
                                <div className={Css['persion-info']}>
                                    <span>收货人: {this.state.sName}</span>
                                    <span>{this.state.sCellphone}</span>
                                </div>
                                {/*收货地址*/}
                                <div className={Css['address']}>
                                    <img src={require('../../../assets/images/home/cart/map.png')} alt="收货地址"/>
                                    <span>{this.state.sProvince} {this.state.sCity} {this.state.sArea} {this.state.sAddress}</span>
                                </div>
                            </React.Fragment>
                                :
                            <React.Fragment>
                                {/*如果没有收货地址*/}
                                <div className={Css['address-null']}>
                                    您的收货地址为空，点击添加收货地址
                                </div>
                            </React.Fragment>
                        }
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
                    <div className={Css['balance-btn']} onClick={this.submitOrder.bind(this)}>
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