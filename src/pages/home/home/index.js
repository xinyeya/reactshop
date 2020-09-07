/*eslint-disable*/
import React, {lazy, Suspense} from "react";
import {Route, Switch} from 'react-router-dom';
import Css from '../../../assets/css/home/home/index.module.css';
import config from "../../../assets/js/conf/config";
const IndexComponent = lazy(()=>import("../index"));
const CartComponent = lazy(()=>import("../cart"));
const UserComponent = lazy(()=>import("../../user/index/index"));

export default class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bHomeStyle: false, // 用于判断在哪个页面
            bCartStyle: true,
            bMyStyle: false
        }
    }

    // 在挂载之前被调用。
    // 它在 render() 之前调用，因此在此方法中同步调用 setState() 不会触发额外渲染。
    // 通常，我们建议使用 constructor() 来初始化 state。
    componentWillMount() {
        this.handleNavStyle(this.props)
    }

    // UNSAFE_componentWillReceiveProps() 会在已挂载的组件接收新的 props 之前被调用。
    // 如果你需要更新状态以响应 prop 更改（例如，重置它），
    // 你可以比较 this.props 和 nextProps 并在此方法中使用 this.setState() 执行 state 转换。
    componentWillReceiveProps(newProps) {
        this.handleNavStyle(newProps);
    }

    goPage(pUrl) {
        this.props.history.replace(config.path + pUrl);
    }

    handleNavStyle(props) {
        switch (props.location.pathname) {
            case config.path+"home/index":
                this.setState({
                    bHomeStyle: true,
                    bCartStyle: false,
                    bMyStyle: false
                });
                break;
            case config.path+"home/cart":
                this.setState({
                    bHomeStyle: false,
                    bCartStyle: true,
                    bMyStyle: false
                });
                break;
            case config.path+"home/my":
                this.setState({
                    bHomeStyle: false,
                    bCartStyle: false,
                    bMyStyle: true
                });
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div>
                <React.Fragment>
                    <Switch>
                        <Route path={config.path + 'home/index'} component={IndexComponent}/>
                        <Route path={config.path + 'home/cart'} component={CartComponent}/>
                        <Route path={config.path + 'home/my'} component={UserComponent}/>
                    </Switch>
                </React.Fragment>
                <div className={Css['bottom-nav']}>
                    <ul onClick={this.goPage.bind(this, 'home/index')}>
                        <li className={this.state.bHomeStyle ? Css['home'] + " " + Css['active'] : Css['home']}></li>
                        <li className={this.state.bHomeStyle ? Css['text'] + " " + Css['active'] : Css['text']}>首页</li>
                    </ul>
                    <ul onClick={this.goPage.bind(this, 'home/cart')}>
                        <li className={this.state.bCartStyle ? Css['cart'] + " " + Css['active'] : Css['cart']}></li>
                        <li className={this.state.bCartStyle ? Css['text'] + " " + Css['active'] : Css['text']}>购物车</li>
                    </ul>
                    <ul onClick={this.goPage.bind(this, 'home/my')}>
                        <li className={this.state.bMyStyle ? Css['my'] + " " + Css['active'] : Css['my']}></li>
                        <li className={this.state.bMyStyle ? Css['text'] + " " + Css['active'] : Css['text']}>我的</li>
                    </ul>
                </div>
            </div>
        );
    }
}