import React, {lazy, Suspense} from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
// import {PrivateRoute} from './routes/private';
const IndexPages = lazy(()=>import("./pages/home/index"));

export default class RouterComponent extends React.Component{
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <React.Fragment>
          <Suspense fallback={<div></div>}>
              <Router>
                  <Switch>
                      <Route exact path={"/"} component={IndexPages}/>
                  </Switch>
              </Router>
          </Suspense>
      </React.Fragment>
    );
  }
}