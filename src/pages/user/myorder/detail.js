import React from "react";
import Css from '../../../assets/css/user/myorder/details.css';
import {connect} from 'react-redux';
import SubHeaderComponent from "../../../components/header/subheader";

class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
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
                <SubHeaderComponent title={"订单详情"}></SubHeaderComponent>
                <div className={Css['main']}>
                    {/*订单编号*/}
                    <div className={Css['ordernum']}>
                        订单编号: 123456
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
                                <img src={require("../../../assets/images/common/my2.png")} alt=""/>李四
                            </div>
                            <div className={Css['cellphone']}>
                                <img src={require("../../../assets/images/common/cellphone.png")} alt=""/>13241993764
                            </div>
                            <div className={Css['address']}>
                                北京朝阳区北京朝阳区北京朝阳区
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
                    <div className={Css['goods-list']}>
                        <div className={Css["image"]}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1524556213.jpg" alt=""/>
                        </div>
                        <div className={Css['goods-info']}>
                            <div className={Css['title']}>
                                女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装
                            </div>
                            <div className={Css['attr']}>
                                <span className={Css['amount']}>× 1</span>
                                <span>颜色: 黑色</span>
                                <span>尺码: 37</span>
                            </div>
                        </div>
                        <div className={Css['price']}>
                            ￥255
                        </div>
                    </div>
                    <div className={Css['goods-list']}>
                        <div className={Css["image"]}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1524556213.jpg" alt=""/>
                        </div>
                        <div className={Css['goods-info']}>
                            <div className={Css['title']}>
                                女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装
                            </div>
                            <div className={Css['attr']}>
                                <span className={Css['amount']}>× 1</span>
                                <span>颜色: 黑色</span>
                                <span>尺码: 37</span>
                            </div>
                        </div>
                        <div className={Css['price']}>
                            ￥255
                        </div>
                    </div>
                    <div className={Css['goods-list']}>
                        <div className={Css["image"]}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1524556213.jpg" alt=""/>
                        </div>
                        <div className={Css['goods-info']}>
                            <div className={Css['title']}>
                                女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装
                            </div>
                            <div className={Css['attr']}>
                                <span className={Css['amount']}>× 1</span>
                                <span>颜色: 黑色</span>
                                <span>尺码: 37</span>
                            </div>
                        </div>
                        <div className={Css['price']}>
                            ￥255
                        </div>
                    </div>
                    <div className={Css['goods-list']}>
                        <div className={Css["image"]}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1524556213.jpg" alt=""/>
                        </div>
                        <div className={Css['goods-info']}>
                            <div className={Css['title']}>
                                女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装
                            </div>
                            <div className={Css['attr']}>
                                <span className={Css['amount']}>× 1</span>
                                <span>颜色: 黑色</span>
                                <span>尺码: 37</span>
                            </div>
                        </div>
                        <div className={Css['price']}>
                            ￥255
                        </div>
                    </div>
                    <div className={Css['goods-list']}>
                        <div className={Css["image"]}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1524556213.jpg" alt=""/>
                        </div>
                        <div className={Css['goods-info']}>
                            <div className={Css['title']}>
                                女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装
                            </div>
                            <div className={Css['attr']}>
                                <span className={Css['amount']}>× 1</span>
                                <span>颜色: 黑色</span>
                                <span>尺码: 37</span>
                            </div>
                        </div>
                        <div className={Css['price']}>
                            ￥255
                        </div>
                    </div>
                    <div className={Css['goods-list']}>
                        <div className={Css["image"]}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1524556213.jpg" alt=""/>
                        </div>
                        <div className={Css['goods-info']}>
                            <div className={Css['title']}>
                                女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装
                            </div>
                            <div className={Css['attr']}>
                                <span className={Css['amount']}>× 1</span>
                                <span>颜色: 黑色</span>
                                <span>尺码: 37</span>
                            </div>
                        </div>
                        <div className={Css['price']}>
                            ￥255
                        </div>
                    </div>
                    <div className={Css['goods-list']}>
                        <div className={Css["image"]}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1524556213.jpg" alt=""/>
                        </div>
                        <div className={Css['goods-info']}>
                            <div className={Css['title']}>
                                女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装
                            </div>
                            <div className={Css['attr']}>
                                <span className={Css['amount']}>× 1</span>
                                <span>颜色: 黑色</span>
                                <span>尺码: 37</span>
                            </div>
                        </div>
                        <div className={Css['price']}>
                            ￥255
                        </div>
                    </div>
                    <div className={Css['goods-list']}>
                        <div className={Css["image"]}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1524556213.jpg" alt=""/>
                        </div>
                        <div className={Css['goods-info']}>
                            <div className={Css['title']}>
                                女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装
                            </div>
                            <div className={Css['attr']}>
                                <span className={Css['amount']}>× 1</span>
                                <span>颜色: 黑色</span>
                                <span>尺码: 37</span>
                            </div>
                        </div>
                        <div className={Css['price']}>
                            ￥255
                        </div>
                    </div>
                    <div className={Css['goods-list']}>
                        <div className={Css["image"]}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1524556213.jpg" alt=""/>
                        </div>
                        <div className={Css['goods-info']}>
                            <div className={Css['title']}>
                                女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装女装
                            </div>
                            <div className={Css['attr']}>
                                <span className={Css['amount']}>× 1</span>
                                <span>颜色: 黑色</span>
                                <span>尺码: 37</span>
                            </div>
                        </div>
                        <div className={Css['price']}>
                            ￥255
                        </div>
                    </div>
                    {/*支付状态*/}
                    <ul className={Css['order-status']}>
                        <li>支付状态</li>
                        <li>待付款</li>
                    </ul>
                    {/*商品总额*/}
                    <div className={Css['total-wrap']}>
                        <ul className={Css['total']}>
                            <li>商品总额</li>
                            <li>￥24342</li>
                        </ul>
                        <ul className={Css['total']}>
                            <li>运费</li>
                            <li>￥22</li>
                        </ul>
                    </div>
                    {/*实付金额*/}
                    <div className={Css['true-total']}>
                        <div className={Css['total']}>
                            实付金额: <span>￥786667</span>
                        </div>
                        <div className={Css['order-time']}>
                            下单时间: 2020-04-03
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