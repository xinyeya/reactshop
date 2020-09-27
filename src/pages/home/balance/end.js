import React from "react";
import {connect} from 'react-redux';
import Css from '../../../assets/css/home/balance/end.css'
import SubHeaderComponent from "../../../components/header/subheader";
import {safeAuth} from "../../../assets/js/utils/util";
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import action from '../../../actions/index'

class BalanceEnd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNum: ''
        };
        safeAuth(props);
    }

    componentDidMount() {
        this.getOrdernum();
    }

    // 获取订单编号
    getOrdernum() {
        let sUrl = config.baseUrl+"/api/order/lastordernum?uid="+this.props.state.user.uid+"&token="+config.token;
        request(sUrl).then(res=>{
            if (res.code === 200) {
                this.setState({
                    orderNum: res.data.ordernum
                }, ()=>{
                    this.clearCart();
                })
            }
        })
    }

    // 清空购物车
    clearCart() {
        this.props.dispatch(action.cart.clearCart());
    }

    // 查看订单
    replacePage(url) {
        this.props.history.replace(config.path+url);
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
                <SubHeaderComponent title={"订单结束"}></SubHeaderComponent>
                {/*主体*/}
                <div className={Css['main']}>
                    <div className={Css['list']+" "+Css['success']}>
                        订购成功
                    </div>
                    <div className={Css['list']+" "+Css['ordernum']}>
                        订单编号: {this.state.orderNum}
                    </div>
                    <div className={Css['list']} onClick={this.replacePage.bind(this, 'myorder/order?status=all')}>
                        查看订单
                    </div>
                    <div className={Css['pay-btn']}>
                        去付款
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
})(BalanceEnd);