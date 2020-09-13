import React from 'react';
import  {HashRouter as Router,Route,Switch,Redirect}  from  'react-router-dom';
//import {PrivateRoute} from './routes/private';
import asyncComponents from './components/async/AsyncComponent';
import config from './assets/js/conf/config.js';
const HomeComponent = asyncComponents(()=>import('./pages/home/home/index'));
const GoodsClassify = asyncComponents(()=>import('./pages/home/goods/classify'));
const GoodsSearch = asyncComponents(()=>import('./pages/home/goods/search'));
const GoodsDetails = asyncComponents(()=>import('./pages/home/goods/details'));
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
                            <Redirect to={config.path+"home/index"}></Redirect>
                        </Switch>
                    </React.Fragment>
                </Router>
            </React.Fragment>
        )
    }
}
