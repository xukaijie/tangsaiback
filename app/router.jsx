import React, {Component} from 'react';
import {Router, Route, Redirect, IndexRoute, hashHistory,browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';


import Roots from './roots.jsx';

const lazyLoadPage = pageName => (location, cb) => {
    let bundle = require('bundle-loader?lazy!./components/private/' + pageName + '/index.jsx')
    bundle(component => cb(null, component))
}

/*var checkCount = 0;
const checkAccount = (state,replace)=>{


    if (state.location.pathname !="/" && checkCount == 0){

        /!*如果不是根目录 则先跳到仲裁路由*!/
        checkCount++;

        replace({pathname:'/arbitrate',query:{path:state.location.pathname}});
    }

}*/

const RouteConfig = (
    <Router history={browserHistory}>
        <Route path="/" component={Roots}>
            <IndexRoute getComponent={lazyLoadPage('guide')} />
           {/* <Route path="login" getComponent={lazyLoadPage('login')} />*/}
            <Route path="guide" getComponent={lazyLoadPage('guide')}>
                {/*<Route path="implementation" getComponent={lazyLoadPage('guide/implementation')}>
                    <Route path="taskdetail" getComponent={lazyLoadPage('guide/implementation/taskDetail')} />
                    <Route path="resumesearch/:service_id/:order_user_id/:job_id" getComponent={lazyLoadPage('guide/implementation/resumeSearch')} />
                </Route>*/}
            </Route>
        </Route>

    </Router>
);

export default RouteConfig;
