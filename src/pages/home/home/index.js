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
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <React.Fragment>
                    <Switch>
                        <Route path={config.path + 'home/index'} component={IndexComponent}/>
                        <Route path={config.path + 'home/cart'} component={CartComponent}/>
                        <Route path={config.path + 'home/user'} component={UserComponent}/>
                    </Switch>
                </React.Fragment>
                <div className={Css['bottom-nav']}>
                    <ul>
                        <li className={Css['home'] + " " + Css['active']}></li>
                        <li className={Css['text'] + " " + Css['active']}>首页</li>
                    </ul>
                    <ul>
                        <li className={Css['cart']}></li>
                        <li className={Css['text']}>购物车</li>
                    </ul>
                    <ul>
                        <li className={Css['my']}></li>
                        <li className={Css['text']}>我的</li>
                    </ul>
                </div>
            </div>
        );
    }
}