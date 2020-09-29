import React from 'react';
import Css from '../../../assets/css/user/my/index.css';
import action from '../../../actions/index';
import {connect} from 'react-redux';
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/libs/request";
import SubHeaderComponent from "../../../components/header/subheader";
import {Modal} from "antd-mobile";

class  IndexComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            sHead: require("../../../assets/images/user/my/default-head.png"),
            sNickname: '昵称',
            iPoints: 0
        };
    }

    componentDidMount(){
        this.getUserInfo();
    }

    // 安全退出
    outLogin() {
        if (this.props.state.user.isLogin === true) {
            Modal.alert('', "确定要退出吗？", [
                {
                    text: '取消',
                    onPress: () => {},
                    style: 'default'
                },
                {
                    text: "确定",
                    onPress: () => {
                        let sUrl = config.baseUrl+"/api/home/user/safeout?token="+config.token;
                        request(sUrl, "post", {
                            uid: this.props.state.user.uid
                        }).then(res=>{
                            if (res.code === 200) {
                                // 清理缓存
                                this.props.dispatch(action.user.outLogin());
                                // 清空购物车
                                this.props.dispatch(action.cart.clearCart());
                                this.props.history.push(config.path+"login/index");
                            }
                        })
                    }
                }
            ]);
        }else{
            this.props.history.push(config.path+"login/index");
        }
    }

    // 获取用户信息
    getUserInfo() {
        if (this.props.state.user.isLogin === true) {
            let sUrl = config.baseUrl + "/api/user/myinfo/userinfo/uid/" + this.props.state.user.uid + "?token=" + config.token;
            request(sUrl).then(res => {
                if (res.code === 200) {
                    this.setState({
                        sHead: res.data.head !=="" ? res.data.head : this.state.sHead,
                        sNickname: res.data.nickname,
                        iPoints: res.data.points
                    })
                }
            })
        }
    }

    // 跳转页面
    pushPage(url) {
        this.props.history.push(config.path+url);
    }

    // 关闭页面后清除数据防止内存溢出
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render(){
        return(
            <div>
                <SubHeaderComponent title={"会员中心"}></SubHeaderComponent>
                {/*用户信息盒子*/}
                <div className={Css['user-info-wrap']}>
                    {/*头像*/}
                    <div className={Css['head']}>
                        <img src={this.state.sHead} alt={this.state.sNickname}/>
                    </div>
                    {/*昵称*/}
                    <div className={Css['nickname']}>
                        {this.state.sNickname}
                    </div>
                    <div className={Css['points']}>
                        我的积分: {this.state.iPoints}
                    </div>
                </div>
                {/*订单*/}
                <div className={Css['order-name-wrap']}>
                    <div className={Css['order-name']}>全部订单</div>
                    <div className={Css['show-order']} onClick={this.pushPage.bind(this, "myorder/order?status=all")}>查看全部订单 &gt;</div>
                </div>
                {/*订单状态*/}
                <div className={Css['order-status-wrap']}>
                    <div className={Css['item']} onClick={this.pushPage.bind(this, "myorder/order?status=0")}>
                        <div className={Css['icon']+" "+Css['wait']}></div>
                        <div className={Css['text']}>待支付</div>
                    </div>
                    <div className={Css['item']} onClick={this.pushPage.bind(this, "myorder/order?status=1")}>
                        <div className={Css['icon']+" "+Css['take']}></div>
                        <div className={Css['text']}>待收货</div>
                    </div>
                    <div className={Css['item']} onClick={this.pushPage.bind(this, "myorder/review?status=2")}>
                        <div className={Css['icon']+" "+Css['comment']}></div>
                        <div className={Css['text']}>待评价</div>
                    </div>
                </div>
                {/*菜单*/}
                <div className={Css['menu-list-wrap']}>
                    <ul onClick={this.pushPage.bind(this, 'profile/index')}>
                        <li>个人资料</li>
                        <li></li>
                    </ul>
                    <ul onClick={this.pushPage.bind(this, 'user/address/index')}>
                        <li>收货地址</li>
                        <li></li>
                    </ul>
                    <ul>
                        <li>绑定手机</li>
                        <li></li>
                    </ul>
                    <ul>
                        <li>修改密码</li>
                        <li></li>
                    </ul>
                    <ul>
                        <li>我的收藏</li>
                        <li></li>
                    </ul>
                    {/*注册登录*/}
                    <div className={Css['btn']} onClick={this.outLogin.bind(this)}>
                        {this.props.state.user.isLogin===true ? "安全退出" : "登录/注册"}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state=>{
    return {state}
})(IndexComponent)