import React, {Component} from 'react';
import {Router, Route, Redirect, IndexRoute, hashHistory,browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';

import style from './guide.css';

import Nav from 'pubComp/nav/nav.jsx';
import Header from 'pubComp/header/header.jsx';

class Guide extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){

        /*if(this.props.location.pathname == "/") {

         /!*老的用户复制本地存的邀请链接*!/
         if (location.href.indexOf("hid") != -1){

         let hid = location.href.split("hid=")[1];

         console.log(hid);

         hid = hid.substring(0,8);

         location.href =getCompanyLink()+"?hid="+hid;

         }else{
         /!*重定下到hr.html*!/
         location.href= getCompanyLink();

         }
         }*/

    }




    render() {
        return (
            <div className={style.container}>

                <div className={style.leftSide}>

                    <Nav />

                </div>

                <div className={style.rightSide}>

                    <Header {...this.props}/>
                    <br/>
                   {/* <ProductList />*/}

                </div>
            </div>
        )
    }
}

module.exports = connect((state)=>{

    return {userList:state.userList}
})(Guide);
