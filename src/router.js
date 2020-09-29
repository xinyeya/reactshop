import React from 'react';
import  {HashRouter as Router,Route,Switch,Redirect}  from  'react-router-dom';
import asyncComponents from './components/async/AsyncComponent';
import {AuthRoute} from "./routes/private";
import config from './assets/js/conf/config.js';
const HomeComponent = asyncComponents(()=>import('./pages/home/home/index'));
const GoodsClassify = asyncComponents(()=>import('./pages/home/goods/classify'));
const GoodsSearch = asyncComponents(()=>import('./pages/home/goods/search'));
const GoodsDetails = asyncComponents(()=>import('./pages/home/goods/details'));
const LoginIndex = asyncComponents(()=>import('./pages/home/login'));
const RegIndex = asyncComponents(()=>import('./pages/home/reg'));
const BalanceIndex = asyncComponents(()=>import('./pages/home/balance'));
const AddressIndex = asyncComponents(()=>import("./pages/home/address"));
const AddressAdd = asyncComponents(()=>import("./pages/home/address/add"));
const AddressMod = asyncComponents(()=>import("./pages/home/address/mod"));
const BalanceEnd = asyncComponents(()=>import("./pages/home/balance/end"));
const ProfileIndex = asyncComponents(()=>import("./pages/user/profile/index"));
const MyOrder = asyncComponents(()=>import("./pages/user/myorder/index"));
const Transfer = asyncComponents(()=>import("./pages/transfer/index"));
const OrderDetail = asyncComponents(()=>import('./pages/user/myorder/detail'));
const AddReview = asyncComponents(()=>import('./pages/user/myorder/add_review'));
const UserAddressIndex = asyncComponents(()=>import('./pages/user/address/index'));

export default class RouterComponent extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Router>
                    <React.Fragment>
                        <Switch>
                            <Route path={config.path+"home"} component={HomeComponent} ></Route>
                            <Route path={config.path+"goods/classify"} component={GoodsClassify} ></Route>
                            <Route path={config.path+"goods/search"} component={GoodsSearch} ></Route>
                            <Route path={config.path+"goods/details"} component={GoodsDetails} ></Route>
                            <Route path={config.path+"login/index"} component={LoginIndex} ></Route>
                            <Route path={config.path+"reg/index"} component={RegIndex} ></Route>
                            <Route path={config.path+"transfer"} component={Transfer} ></Route>
                            <AuthRoute path={config.path+"balance/index"} component={BalanceIndex} ></AuthRoute>
                            <AuthRoute path={config.path+"address/index"} component={AddressIndex} ></AuthRoute>
                            <AuthRoute path={config.path+"address/add"} component={AddressAdd} ></AuthRoute>
                            <AuthRoute path={config.path+"address/mod"} component={AddressMod} ></AuthRoute>
                            <AuthRoute path={config.path+"balance/end"} component={BalanceEnd} ></AuthRoute>
                            <AuthRoute path={config.path+"profile/index"} component={ProfileIndex} ></AuthRoute>
                            <AuthRoute path={config.path+"myorder"} component={MyOrder} ></AuthRoute>
                            <AuthRoute path={config.path+"order/detail"} component={OrderDetail} ></AuthRoute>
                            <AuthRoute path={config.path+"order/add_review"} component={AddReview} ></AuthRoute>
                            <AuthRoute path={config.path+"user/address"} component={UserAddressIndex} ></AuthRoute>
                            <Redirect to={config.path+"home/index"}></Redirect>
                        </Switch>
                    </React.Fragment>
                </Router>
            </React.Fragment>
        )
    }
}
