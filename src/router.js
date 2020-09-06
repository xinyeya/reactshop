import React, {lazy, Suspense} from 'react';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
// import {PrivateRoute} from './routes/private';
import config from './assets/js/conf/config';
const HomeComponent = lazy(()=>import("./pages/home/home/index"));
const GoodsClassify = lazy(()=>import("./pages/home/goods/classify"));

export default class RouterComponent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <React.Fragment>
          <Suspense fallback={<div></div>}>
              <Router>
                  <Switch>
                      <Route path={config.path + "home/index"} component={HomeComponent}/>
                      <Route path={config.path + "goods/classify"} component={GoodsClassify}/>
                      <Redirect to={config.path + 'home/index'} />
                  </Switch>
              </Router>
          </Suspense>
      </React.Fragment>
    );
  }
}