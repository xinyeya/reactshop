import React from "react";
import Css from '../../../assets/css/user/myorder/details.css';
import {connect} from 'react-redux';
import SubHeaderComponent from "../../../components/header/subheader";
import {lazyImg, localParam, setScrollTop} from '../../../assets/js/utils/util';
import {request} from "../../../assets/js/libs/request";
import config from "../../../assets/js/conf/config";

class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ordernum: props.location.search?localParam(props.location.search).search.ordernum : "",
            name: "",
            cellphone: "",
            status: "",
            city: "",
            area: "",
            address: "",
            freight: 0,
            total: 0,
            trueTotal: 0,
            orderTime: "",
            goods: []
        }
    }

    componentDidMount() {
        setScrollTop();
        this.getData();
    }

    // 获取数据
    getData() {
        let url = config.baseUrl+"/api/user/myorder/desc?uid="+this.props.state.user.uid+"&ordernum="+this.state.ordernum+"&token="+config.token;
        request(url).then(res=>{
            if (res.code === 200) {
                this.setState({
                    name: res.data.name,
                    cellphone: res.data.cellphone,
                    address: res.data.address,
                    status: res.data.status,
                    province: res.data.province,
                    city: res.data.city,
                    area: res.data.area,
                    freight: res.data.freight,
                    total: res.data.total,
                    trueTotal: res.data.truetotal,
                    orderTime: res.data.ordertime,
                    goods: res.data.goods
                }, ()=>{
                    lazyImg();
                })
            }
        });
    }

    // 跳转商品详情页
    pushPage(url) {
        this.props.history.push(config.path+url);
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
                <SubHeaderComponent title={"订单详情"}></SubHeaderComponent>
                <div className={Css['main']}>
                    {/*订单编号*/}
                    <div className={Css['ordernum']}>
                        订单编号: {this.state.ordernum}
                    </div>
                    {/*地址盒子*/}
                    <div className={Css['address-wrap']}>
                        {/*四边形盒子*/}
                        <div className={Css['skew-wrap']}>
                            <div className={Css['skew']}></div>
                            <div className={Css['skew']}></div>
                            <div className={Css['skew']}></div>
                            <div className={Css['skew']}></div>
                            <div className={Css['skew']}></div>
                            <div className={Css['skew']}></div>
                            <div className={Css['skew']}></div>
                            <div className={Css['skew']}></div>
                            <div className={Css['skew']}></div>
                            <div className={Css['skew']}></div>
                            <div className={Css['skew']}></div>
                            <div className={Css['skew']}></div>
                        </div>
                        {/*地址信息*/}
                        <div className={Css['address-info']}>
                            <div className={Css['name']}>
                                <img src={require("../../../assets/images/common/my2.png")} alt=""/>
                                {this.state.name}
                            </div>
                            <div className={Css['cellphone']}>
                                <img src={require("../../../assets/images/common/cellphone.png")} alt=""/>
                                {this.state.cellphone}
                            </div>
                            <div className={Css['address']}>
                                {this.state.province}{this.state.city}{this.state.area}{this.state.address}
                            </div>
                        </div>
                        {/*四边形盒子*/}
                        <div className={Css['skew-wrap']}>
                            <div className={Css['skew']}></div>
                            <div className={Css['skew']}></div>
                            <div className={Css['skew']}></div>
                            <div className={Css['skew']}></div>
                            <div className={Css['skew']}></div>
                            <div className={Css['skew']}></div>
                            <div className={Css['skew']}></div>
                            <div className={Css['skew']}></div>
                            <div className={Css['skew']}></div>
                            <div className={Css['skew']}></div>
                            <div className={Css['skew']}></div>
                            <div className={Css['skew']}></div>
                        </div>
                    </div>
                    {/*标题*/}
                    <div className={Css['buy-title']}>
                        购买的宝贝
                    </div>
                    {/*宝贝列表*/}
                    {
                        this.state.goods.length>0?this.state.goods.map((item, index)=>{
                            return (
                                <div className={Css['goods-list']} key={index} onClick={this.pushPage.bind(this, "goods/details/item?gid="+item.gid)}>
                                    <div className={Css["image"]}>
                                        <img data-echo={item.image} src={require("../../../assets/images/common/lazyImg.jpg")} alt=""/>
                                    </div>
                                    <div className={Css['goods-info']}>
                                        <div className={Css['title']}>
                                            {item.title}
                                        </div>
                                        <div className={Css['attr']}>
                                            <span className={Css['amount']}>× {item.amount}</span>
                                            {
                                                item.param!==null && item.param.length>0?item.param.map((item1, index1)=>{
                                                    return (
                                                        <React.Fragment key={index1}>
                                                            <span>{item1.title}:{
                                                                item1.param!==null&&item1.param.length > 0 ?item1.param.map((item2, index2)=>{
                                                                    return (
                                                                        <React.Fragment key={index2}>
                                                                            {item2.title}
                                                                        </React.Fragment>
                                                                    )
                                                                }):""
                                                            }</span>
                                                        </React.Fragment>
                                                    )
                                                }):""
                                            }
                                        </div>
                                    </div>
                                    <div className={Css['price']}>
                                        ￥{item.price}
                                    </div>
                                </div>
                            )
                        }):""
                    }
                    {/*支付状态*/}
                    <ul className={Css['order-status']}>
                        <li>支付状态</li>
                        <li>{this.state.status === "0"?"待收款":this.state.status==='1'?"待收货":this.state.status==="2"?"已收货":""}</li>
                    </ul>
                    {/*商品总额*/}
                    <div className={Css['total-wrap']}>
                        <ul className={Css['total']}>
                            <li>商品总额</li>
                            <li>￥{this.state.total}</li>
                        </ul>
                        <ul className={Css['total']}>
                            <li>运费</li>
                            <li>￥{this.state.freight}</li>
                        </ul>
                    </div>
                    {/*实付金额*/}
                    <div className={Css['true-total']}>
                        <div className={Css['total']}>
                            实付金额: <span>￥{this.state.trueTotal}</span>
                        </div>
                        <div className={Css['order-time']}>
                            下单时间: {this.state.orderTime}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state=>{
    return {state}
})(OrderDetail);