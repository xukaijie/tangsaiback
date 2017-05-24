
/*系统引导库*/

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Redirect, hashHistory, browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';

import style from './header.css';

export default class Header extends React.Component {

    constructor(props){

        super(props);

    }

    render(){

        return (

            <div className={style.container}>

                <div className={style.item}>
                    <img src={this.props.userList.header} className={style.header}/>
                    <span>你好,timpthy</span>

                </div>
            </div>

        )

    }

}
