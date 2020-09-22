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
const AddressAdd = asyncComponents(()=>import("./pages/home/address/add"))

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
                            <AuthRoute path={config.path+"balance/index"} component={BalanceIndex} ></AuthRoute>
                            <AuthRoute path={config.path+"address/index"} component={AddressIndex} ></AuthRoute>
                            <AuthRoute path={config.path+"address/add"} component={AddressAdd} ></AuthRoute>
                            <Redirect to={config.path+"home/index"}></Redirect>
                        </Switch>
                    </React.Fragment>
                </Router>
            </React.Fragment>
        )
    }
}
