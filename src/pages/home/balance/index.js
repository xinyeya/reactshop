import React from "react";
import {connect} from 'react-redux';
import Css from '../../../assets/css/home/balance/index.css'
import SubHeaderComponent from "../../../components/header/subheader";

class BalanceIndex extends React.Component {
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
                    {/*商品信息*/}
                    <div className={Css["goods-wrap"]}>
                        {/*商品列表*/}
                        <div className={Css['goods-list']}>
                            <div className={Css['image']}>
                                <img src="//vueshop.glbuys.com/uploadfiles/1524556213.jpg" alt=""/>
                            </div>
                            {/*产品参数*/}
                            <div className={Css['goods-param']}>
                                <div className={Css['title']}>
                                    老爹鞋女韩版dkfhk原宿白鸽网鞋透气网
                                </div>
                                <div className={Css['attr']}>
                                    <span>颜色: 蓝色</span>
                                    <span>尺码: 36</span>
                                </div>
                                <div className={Css['amount']}>
                                    × 1
                                </div>
                                <div className={Css['price']}>
                                    ￥255
                                </div>
                            </div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['image']}>
                                <img src="//vueshop.glbuys.com/uploadfiles/1524556213.jpg" alt=""/>
                            </div>
                            {/*产品参数*/}
                            <div className={Css['goods-param']}>
                                <div className={Css['title']}>
                                    老爹鞋女韩版dkfhk原宿白鸽网鞋透气网
                                </div>
                                <div className={Css['attr']}>
                                    <span>颜色: 蓝色</span>
                                    <span>尺码: 36</span>
                                </div>
                                <div className={Css['amount']}>
                                    × 1
                                </div>
                                <div className={Css['price']}>
                                    ￥255
                                </div>
                            </div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['image']}>
                                <img src="//vueshop.glbuys.com/uploadfiles/1524556213.jpg" alt=""/>
                            </div>
                            {/*产品参数*/}
                            <div className={Css['goods-param']}>
                                <div className={Css['title']}>
                                    老爹鞋女韩版dkfhk原宿白鸽网鞋透气网
                                </div>
                                <div className={Css['attr']}>
                                    <span>颜色: 蓝色</span>
                                    <span>尺码: 36</span>
                                </div>
                                <div className={Css['amount']}>
                                    × 1
                                </div>
                                <div className={Css['price']}>
                                    ￥255
                                </div>
                            </div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['image']}>
                                <img src="//vueshop.glbuys.com/uploadfiles/1524556213.jpg" alt=""/>
                            </div>
                            {/*产品参数*/}
                            <div className={Css['goods-param']}>
                                <div className={Css['title']}>
                                    老爹鞋女韩版dkfhk原宿白鸽网鞋透气网
                                </div>
                                <div className={Css['attr']}>
                                    <span>颜色: 蓝色</span>
                                    <span>尺码: 36</span>
                                </div>
                                <div className={Css['amount']}>
                                    × 1
                                </div>
                                <div className={Css['price']}>
                                    ￥255
                                </div>
                            </div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['image']}>
                                <img src="//vueshop.glbuys.com/uploadfiles/1524556213.jpg" alt=""/>
                            </div>
                            {/*产品参数*/}
                            <div className={Css['goods-param']}>
                                <div className={Css['title']}>
                                    老爹鞋女韩版dkfhk原宿白鸽网鞋透气网
                                </div>
                                <div className={Css['attr']}>
                                    <span>颜色: 蓝色</span>
                                    <span>尺码: 36</span>
                                </div>
                                <div className={Css['amount']}>
                                    × 1
                                </div>
                                <div className={Css['price']}>
                                    ￥255
                                </div>
                            </div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['image']}>
                                <img src="//vueshop.glbuys.com/uploadfiles/1524556213.jpg" alt=""/>
                            </div>
                            {/*产品参数*/}
                            <div className={Css['goods-param']}>
                                <div className={Css['title']}>
                                    老爹鞋女韩版dkfhk原宿白鸽网鞋透气网
                                </div>
                                <div className={Css['attr']}>
                                    <span>颜色: 蓝色</span>
                                    <span>尺码: 36</span>
                                </div>
                                <div className={Css['amount']}>
                                    × 1
                                </div>
                                <div className={Css['price']}>
                                    ￥255
                                </div>
                            </div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['image']}>
                                <img src="//vueshop.glbuys.com/uploadfiles/1524556213.jpg" alt=""/>
                            </div>
                            {/*产品参数*/}
                            <div className={Css['goods-param']}>
                                <div className={Css['title']}>
                                    老爹鞋女韩版dkfhk原宿白鸽网鞋透气网
                                </div>
                                <div className={Css['attr']}>
                                    <span>颜色: 蓝色</span>
                                    <span>尺码: 36</span>
                                </div>
                                <div className={Css['amount']}>
                                    × 1
                                </div>
                                <div className={Css['price']}>
                                    ￥255
                                </div>
                            </div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['image']}>
                                <img src="//vueshop.glbuys.com/uploadfiles/1524556213.jpg" alt=""/>
                            </div>
                            {/*产品参数*/}
                            <div className={Css['goods-param']}>
                                <div className={Css['title']}>
                                    老爹鞋女韩版dkfhk原宿白鸽网鞋透气网
                                </div>
                                <div className={Css['attr']}>
                                    <span>颜色: 蓝色</span>
                                    <span>尺码: 36</span>
                                </div>
                                <div className={Css['amount']}>
                                    × 1
                                </div>
                                <div className={Css['price']}>
                                    ￥255
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className={Css['total-wrap']}>
                        <li>商品总额</li>
                        <li>￥1192.00</li>
                    </ul>
                    <ul className={Css['total-wrap']}>
                        <li>运费</li>
                        <li>￥20.00</li>
                    </ul>
                </div>
                {/*支付订单*/}
                <div className={Css['balance-wrap']}>
                    <div className={Css['price-wrap']}>
                        <span>实付金额: </span><span>￥1212.00</span>
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