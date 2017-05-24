import React from 'react';
import ReactDOM from 'react-dom';


import { Router, Route, IndexRoute, Redirect ,hashHistory,browserHistory} from 'react-router';

import {connect} from 'react-redux';

import {fExportGetCookieMes} from 'cmPath/common.jsx';

import {USERID} from 'cmPath/config.jsx';

import {login} from 'actionPath/userAction.jsx';

import style from "./login.css";


 class Login extends React.Component{

    constructor(props){
        super(props);
    }

    login=()=>{

        var username = this.refs.user.value;
        var password = this.refs.password.value;
        let {dispatch} = this.props;

        password = hex_sha1("pony-b:"+password);

        dispatch(login(username,password,()=>{
            browserHistory.push("/guide/implementation/taskdetail")
        }))

    }


    componentDidMount(){

        if (fExportGetCookieMes(USERID)){

            browserHistory.push("/guide/implementation/taskdetail")

        }
    }

    render(){

        return(
            <div id={style.container}>


                <div className={style.top}>
                    <div>
                        <span style={{paddingRight:"20px"}}>用户名</span>
                        <input placeholder="请输入用户名" className={style.inputText} id={style.userid} ref="user"/>
                    </div>

                    <div>
                        <span style={{paddingRight:"36px"}}>密码</span>
                        <input placeholder="请输入密码" id={style.passwordid} className={style.inputText} ref="password"/>
                    </div>

                    <div>
                        <input value="登入" type="submit" onClick={this.login.bind(this)} id={style.loginId}/>

                    </div>
                </div>
            </div>

        )

    }


}

module.exports =connect()(Login);