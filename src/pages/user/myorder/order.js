import React from "react";
import Css from '../../../assets/css/user/myorder/order.css';
import {connect} from 'react-redux';

class OrderPage extends React.Component {
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
            <React.Fragment>
                {/*订单列表盒子*/}
                <div className={Css['order-list']}>
                    {/*订单编号盒子*/}
                    <div className={Css['ordernum-wrap']}>
                        <div className={Css['order']}>订单编号: 123123</div>
                        <div className={Css['status']}>待付款</div>
                    </div>
                    {/*单个商品*/}
                    <div className={Css['item-list']}>
                        {/*缩略图*/}
                        <div className={Css['image']}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1484283665.jpg" alt=""/>
                        </div>
                        <div className={Css['title']}>
                            标题标题标题标题标题标题标题标题标题标题
                        </div>
                        <div className={Css['amount']}>
                            × 2
                        </div>
                    </div>
                    <div className={Css['item-list']}>
                        {/*缩略图*/}
                        <div className={Css['image']}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1484283665.jpg" alt=""/>
                        </div>
                        <div className={Css['title']}>
                            标题标题标题标题标题标题标题标题标题标题
                        </div>
                        <div className={Css['amount']}>
                            × 2
                        </div>
                    </div>
                    {/*总价*/}
                    <div className={Css['total-wrap']}>
                        <div className={Css['total']}>
                            实付金额: ￥897
                        </div>
                        {/*按钮*/}
                        <div className={Css['status-btn']}>
                            取消订单
                        </div>
                    </div>
                </div>
                <div className={Css['order-list']}>
                    {/*订单编号盒子*/}
                    <div className={Css['ordernum-wrap']}>
                        <div className={Css['order']}>订单编号: 123123</div>
                        <div className={Css['status']}>待付款</div>
                    </div>
                    {/*单个商品*/}
                    <div className={Css['item-list']}>
                        {/*缩略图*/}
                        <div className={Css['image']}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1484283665.jpg" alt=""/>
                        </div>
                        <div className={Css['title']}>
                            标题标题标题标题标题标题标题标题标题标题
                        </div>
                        <div className={Css['amount']}>
                            × 2
                        </div>
                    </div>
                    <div className={Css['item-list']}>
                        {/*缩略图*/}
                        <div className={Css['image']}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1484283665.jpg" alt=""/>
                        </div>
                        <div className={Css['title']}>
                            标题标题标题标题标题标题标题标题标题标题
                        </div>
                        <div className={Css['amount']}>
                            × 2
                        </div>
                    </div>
                    {/*总价*/}
                    <div className={Css['total-wrap']}>
                        <div className={Css['total']}>
                            实付金额: ￥897
                        </div>
                        {/*按钮*/}
                        <div className={Css['status-btn']}>
                            取消订单
                        </div>
                    </div>
                </div>
                <div className={Css['order-list']}>
                    {/*订单编号盒子*/}
                    <div className={Css['ordernum-wrap']}>
                        <div className={Css['order']}>订单编号: 123123</div>
                        <div className={Css['status']}>待付款</div>
                    </div>
                    {/*单个商品*/}
                    <div className={Css['item-list']}>
                        {/*缩略图*/}
                        <div className={Css['image']}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1484283665.jpg" alt=""/>
                        </div>
                        <div className={Css['title']}>
                            标题标题标题标题标题标题标题标题标题标题
                        </div>
                        <div className={Css['amount']}>
                            × 2
                        </div>
                    </div>
                    <div className={Css['item-list']}>
                        {/*缩略图*/}
                        <div className={Css['image']}>
                            <img src="//vueshop.glbuys.com/uploadfiles/1484283665.jpg" alt=""/>
                        </div>
                        <div className={Css['title']}>
                            标题标题标题标题标题标题标题标题标题标题
                        </div>
                        <div className={Css['amount']}>
                            × 2
                        </div>
                    </div>
                    {/*总价*/}
                    <div className={Css['total-wrap']}>
                        <div className={Css['total']}>
                            实付金额: ￥897
                        </div>
                        {/*按钮*/}
                        <div className={Css['status-btn']}>
                            取消订单
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(state=>{
    return {state}
})(OrderPage);